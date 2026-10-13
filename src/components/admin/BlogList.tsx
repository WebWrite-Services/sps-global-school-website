'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Blog {
  id: string
  title: string
  slug: string
  status: string
  is_featured: boolean
  published_at: string | null
  created_at: string
  blog_categories?: { name: string } | null
  profiles?: { full_name: string } | null
}

interface Category {
  id: string
  name: string
}

interface Props {
  initialBlogs: Blog[]
  categories: Category[]
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  draft:     { label: 'Draft',     cls: 'badge-draft' },
  published: { label: 'Published', cls: 'badge-published' },
  scheduled: { label: 'Scheduled', cls: 'badge-scheduled' },
  archived:  { label: 'Archived',  cls: 'badge-archived' },
}

export default function BlogList({ initialBlogs, categories }: Props) {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  // Realtime subscription: new blogs appear instantly
  useEffect(() => {
    const channel = supabase
      .channel('blogs-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'blogs',
      }, async (payload: any) => {
        // Fetch with relations
        const { data } = await supabase
          .from('blogs')
          .select('*, blog_categories(name), profiles(full_name)')
          .eq('id', payload.new.id)
          .single()
        if (data) setBlogs(prev => [data, ...prev])
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'blogs',
      }, async (payload: any) => {
        const { data } = await supabase
          .from('blogs')
          .select('*, blog_categories(name), profiles(full_name)')
          .eq('id', payload.new.id)
          .single()
        if (data) setBlogs(prev => prev.map(b => b.id === data.id ? data : b))
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'blogs',
      }, (payload: any) => {
        setBlogs(prev => prev.filter(b => b.id !== payload.old.id))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase])

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const toggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published'
    const update: Record<string, unknown> = { status: newStatus }
    if (newStatus === 'published' && !blog.published_at) update.published_at = new Date().toISOString()

    const { error } = await supabase.from('blogs').update(update).eq('id', blog.id)
    if (error) { showToast('error', 'Failed to update'); return }
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, status: newStatus } : b))
    showToast('success', `Blog ${newStatus === 'published' ? 'published' : 'unpublished'}`)
  }

  const deleteBlog = async (blog: Blog) => {
    if (!confirm(`Delete "${blog.title}"? This cannot be undone.`)) return
    const { error } = await supabase.from('blogs').delete().eq('id', blog.id)
    if (error) { showToast('error', 'Failed to delete'); return }
    setBlogs(prev => prev.filter(b => b.id !== blog.id))
    showToast('success', 'Blog deleted')
  }

  const filtered = blogs.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !filterStatus || b.status === filterStatus
    const matchCategory = !filterCategory || b.blog_categories?.name === filterCategory
    return matchSearch && matchStatus && matchCategory
  })

  const uniqueCategories = Array.from(new Set(blogs.map(b => b.blog_categories?.name).filter(Boolean)))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Blog Posts</h2>
          <p className="text-sm text-[#626262]">{blogs.length} total · {blogs.filter(b => b.status === 'published').length} published</p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> New Blog Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-input w-36 text-sm">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="archived">Archived</option>
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="admin-input w-40 text-sm">
          <option value="">All Categories</option>
          {uniqueCategories.map(c => <option key={c} value={c as string}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
            <p className="font-medium">No blog posts found</p>
            <Link href="/admin/blogs/create" className="mt-3 text-sm text-[#A50026] hover:underline">
              Create your first post →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Published</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Author</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5]">
                {filtered.map(blog => {
                  const s = STATUS_LABELS[blog.status] ?? STATUS_LABELS.draft
                  return (
                    <tr key={blog.id} className="hover:bg-[#FFF7F8] transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          {blog.is_featured && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC52E] shrink-0" title="Featured" />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-[#242424] leading-tight">{blog.title}</p>
                            <p className="text-[11px] text-[#9CA3AF]">/{blog.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-[#626262]">{blog.blog_categories?.name ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`badge ${s.cls}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-[#626262]">
                          {blog.published_at ? format(new Date(blog.published_at), 'MMM d, yyyy') : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-[#626262]">{blog.profiles?.full_name ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            href={`/admin/blogs/${blog.id}/edit`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] hover:text-[#A50026] transition-colors"
                          >
                            <Edit2 size={15} />
                          </Link>
                          <button
                            onClick={() => toggleStatus(blog)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] transition-colors"
                            title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {blog.status === 'published'
                              ? <EyeOff size={15} />
                              : <Eye size={15} className="text-green-600" />
                            }
                          </button>
                          <button
                            onClick={() => deleteBlog(blog)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#626262] hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
