'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, List, ListOrdered, Link as LinkIcon, Quote,
  Heading2, Heading3, Eye, Save, Send, ArrowLeft, Check, X,
  Upload, AlertCircle, ChevronDown
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { uploadFile, validateImageFile } from '@/lib/supabase/storage'
import Link from 'next/link'

interface Category { id: string; name: string }
interface BlogData {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  category_id?: string
  seo_title?: string
  seo_description?: string
  status?: string
  is_featured?: boolean
  published_at?: string | null
  featured_image_url?: string
  featured_image_path?: string
}

interface Props {
  categories: Category[]
  authorId: string
  blog?: BlogData
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
}

export default function BlogEditor({ categories, authorId, blog }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const isEdit = !!blog?.id

  const [title, setTitle] = useState(blog?.title ?? '')
  const [slug, setSlug] = useState(blog?.slug ?? '')
  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? '')
  const [categoryId, setCategoryId] = useState(blog?.category_id ?? '')
  const [seoTitle, setSeoTitle] = useState(blog?.seo_title ?? '')
  const [seoDesc, setSeoDesc] = useState(blog?.seo_description ?? '')
  const [isFeatured, setIsFeatured] = useState(blog?.is_featured ?? false)
  const [status, setStatus] = useState(blog?.status ?? 'draft')
  const [publishedAt, setPublishedAt] = useState(blog?.published_at?.slice(0, 16) ?? '')
  const [featuredImageUrl, setFeaturedImageUrl] = useState(blog?.featured_image_url ?? '')
  const [featuredImagePath, setFeaturedImagePath] = useState(blog?.featured_image_path ?? '')
  const [imageUploading, setImageUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'content' | 'seo'>('content')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [slugAutoGenerate, setSlugAutoGenerate] = useState(!isEdit)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your blog post...' }),
    ],
    content: blog?.content ?? '',
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  })

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (slugAutoGenerate) setSlug(slugify(val))
  }

  const uploadFeaturedImage = async (file: File) => {
    const err = validateImageFile(file)
    if (err) { showToast('error', err); return }
    setImageUploading(true)
    try {
      const { storagePath, downloadUrl } = await uploadFile(file, 'blogs')
      setFeaturedImageUrl(downloadUrl)
      setFeaturedImagePath(storagePath)
    } catch {
      showToast('error', 'Image upload failed')
    } finally {
      setImageUploading(false)
    }
  }

  // SEO checklist
  const seoChecks = [
    { label: 'SEO Title', ok: seoTitle.length >= 10 && seoTitle.length <= 60 },
    { label: 'Meta Description', ok: seoDesc.length >= 50 && seoDesc.length <= 160 },
    { label: 'URL Slug', ok: /^[a-z0-9-]+$/.test(slug) && slug.length > 0 },
    { label: 'Featured Image', ok: !!featuredImageUrl },
    { label: 'Content Length', ok: (editor?.getText().length ?? 0) > 200 },
  ]
  const seoScore = Math.round((seoChecks.filter(c => c.ok).length / seoChecks.length) * 100)

  const save = useCallback(async (saveStatus: string = status) => {
    if (!title.trim()) { showToast('error', 'Title is required'); return }
    if (!slug.trim()) { showToast('error', 'Slug is required'); return }

    setSaving(true)
    const payload = {
      title,
      slug,
      excerpt,
      content: editor?.getHTML() ?? '',
      category_id: categoryId || null,
      author_id: authorId,
      seo_title: seoTitle || title,
      seo_description: seoDesc,
      featured_image_url: featuredImageUrl,
      featured_image_path: featuredImagePath,
      is_featured: isFeatured,
      status: saveStatus,
      published_at: saveStatus === 'published' && !publishedAt
        ? new Date().toISOString()
        : publishedAt ? new Date(publishedAt).toISOString() : null,
    }

    const { data, error } = isEdit
      ? await supabase.from('blogs').update(payload).eq('id', blog!.id!).select().single()
      : await supabase.from('blogs').insert(payload).select().single()

    if (error) {
      const msg = error.code === '23505'
        ? 'Slug already exists. Please use a different URL slug.'
        : error.message
      showToast('error', msg)
      setSaving(false)
      return
    }

    showToast('success', saveStatus === 'published' ? 'Blog published!' : 'Saved as draft')
    setSaving(false)
    if (!isEdit && data) router.push(`/admin/blogs/${data.id}/edit`)
  }, [title, slug, excerpt, editor, categoryId, authorId, seoTitle, seoDesc, featuredImageUrl, featuredImagePath, isFeatured, status, publishedAt, isEdit, blog, supabase, router])

  const ToolbarButton = ({ onClick, active, children, title }: {
    onClick: () => void; active?: boolean; children: React.ReactNode; title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-sm
        ${active ? 'bg-[#A50026] text-white' : 'text-[#626262] hover:bg-[#F5F5F5] hover:text-[#242424]'}`}
    >
      {children}
    </button>
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blogs" className="flex items-center gap-1.5 text-sm text-[#626262] hover:text-[#A50026] transition-colors">
          <ArrowLeft size={16} /> Blogs
        </Link>
        <span className="text-[#E5E5E5]">/</span>
        <span className="text-sm font-medium text-[#242424]">{isEdit ? 'Edit Post' : 'New Post'}</span>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => save('draft')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] bg-white rounded-xl text-sm font-medium text-[#626262] hover:bg-[#F5F5F5] transition-colors disabled:opacity-60"
          >
            <Save size={14} /> Save Draft
          </button>
          <button
            onClick={() => save('published')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#A50026] hover:bg-[#85001F] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
          >
            <Send size={14} /> {isEdit ? 'Update & Publish' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Blog Post Title..."
              className="w-full text-2xl font-bold text-[#242424] placeholder:text-[#9CA3AF] outline-none border-none bg-transparent"
            />
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F5F5F5]">
              <span className="text-xs text-[#9CA3AF]">URL:</span>
              <div className="flex items-center gap-1 flex-1">
                <span className="text-xs text-[#9CA3AF]">/blogs/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={e => { setSlug(slugify(e.target.value)); setSlugAutoGenerate(false) }}
                  className="text-xs text-[#A50026] outline-none bg-transparent border-b border-dashed border-[#A50026] min-w-0 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Tabs: content / SEO */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="flex border-b border-[#F5F5F5]">
              {(['content', 'seo'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors
                    ${tab === t ? 'text-[#A50026] border-b-2 border-[#A50026]' : 'text-[#626262] hover:text-[#242424]'}`}
                >
                  {t === 'seo' ? 'SEO Settings' : 'Content'}
                </button>
              ))}
            </div>

            {tab === 'content' && (
              <div>
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-0.5 px-4 py-2.5 border-b border-[#F5F5F5]">
                  <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Bold">
                    <Bold size={14} />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Italic">
                    <Italic size={14} />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Heading 2">
                    <Heading2 size={14} />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} title="Heading 3">
                    <Heading3 size={14} />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Bullet List">
                    <List size={14} />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Numbered List">
                    <ListOrdered size={14} />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Blockquote">
                    <Quote size={14} />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => {
                      const url = window.prompt('URL:')
                      if (url) editor?.chain().focus().setLink({ href: url }).run()
                    }}
                    active={editor?.isActive('link')}
                    title="Link"
                  >
                    <LinkIcon size={14} />
                  </ToolbarButton>
                </div>
                <EditorContent editor={editor} className="tiptap-editor min-h-[400px]" />
              </div>
            )}

            {tab === 'seo' && (
              <div className="p-5 space-y-4">
                {/* SEO Score */}
                <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-xl">
                  <div className={`text-3xl font-bold ${seoScore >= 80 ? 'text-green-600' : seoScore >= 50 ? 'text-[#FFC52E]' : 'text-red-500'}`}>
                    {seoScore}%
                  </div>
                  <div>
                    <p className="font-semibold text-[#242424] text-sm">SEO Score</p>
                    <p className="text-xs text-[#626262]">
                      {seoScore >= 80 ? 'Great! Post is well optimized.' : seoScore >= 50 ? 'Good, but a few things to improve.' : 'Needs attention.'}
                    </p>
                  </div>
                  <div className="ml-auto space-y-1">
                    {seoChecks.map(c => (
                      <div key={c.label} className="flex items-center gap-2 text-xs">
                        {c.ok ? <Check size={12} className="text-green-600" /> : <X size={12} className="text-red-500" />}
                        <span className={c.ok ? 'text-[#626262]' : 'text-red-600'}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#626262] mb-1 block">SEO Title ({seoTitle.length}/60)</label>
                  <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} maxLength={60} className="admin-input" placeholder="Optimized page title for search engines" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#626262] mb-1 block">Meta Description ({seoDesc.length}/160)</label>
                  <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} maxLength={160} rows={3} className="admin-input resize-none" placeholder="Brief description for search results" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish settings */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <h3 className="font-bold text-[#242424] text-sm mb-4">Publish Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#626262] mb-1 block">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="admin-input text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              {status === 'scheduled' && (
                <div>
                  <label className="text-xs font-semibold text-[#626262] mb-1 block">Schedule Date & Time</label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={e => setPublishedAt(e.target.value)}
                    className="admin-input text-sm"
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-[#626262] mb-1 block">Category</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="admin-input text-sm">
                  <option value="">Uncategorized</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#A50026]"
                />
                <span className="text-sm text-[#242424]">Featured Post</span>
              </label>
            </div>
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <h3 className="font-bold text-[#242424] text-sm mb-4">Featured Image</h3>
            {featuredImageUrl ? (
              <div className="relative">
                <img src={featuredImageUrl} alt="Featured" className="w-full h-40 object-cover rounded-xl" />
                <button
                  onClick={() => { setFeaturedImageUrl(''); setFeaturedImagePath('') }}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label className="dropzone flex flex-col items-center justify-center p-6 cursor-pointer gap-2">
                {imageUploading ? (
                  <div className="animate-spin w-6 h-6 border-2 border-[#A50026] border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Upload size={20} className="text-[#9CA3AF]" />
                    <p className="text-sm text-[#626262]">Upload featured image</p>
                    <p className="text-xs text-[#9CA3AF]">JPEG, PNG, WebP · Max 10MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && uploadFeaturedImage(e.target.files[0])}
                />
              </label>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <h3 className="font-bold text-[#242424] text-sm mb-3">Excerpt</h3>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={4}
              className="admin-input resize-none text-sm"
              placeholder="Short description for blog cards and previews..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
