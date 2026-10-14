'use client'

import { useState, useRef, useCallback, useEffect, useSyncExternalStore } from 'react'
import NextImage from 'next/image'
import { Upload, X, Check, Trash2, Eye, EyeOff, Edit2, Search, ImageIcon, Plus, RefreshCw, GripVertical, ChevronUp, ChevronDown, Save, AlertTriangle } from 'lucide-react'
import { uploadFile, validateImageFile, deleteFile } from '@/lib/supabase/storage'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'

interface GalleryImage {
  id: string
  title: string
  description: string
  alt_text: string
  category_id: string | null
  storage_path: string
  download_url: string
  file_size: number
  display_order: number
  status: string
  created_at: string
  gallery_categories?: { name: string }
}

interface Category {
  id: string
  name: string
  slug: string
}

interface UploadItem {
  file: File
  preview: string
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
  title: string
  altText: string
  categoryId: string
}

interface Props {
  initialImages: GalleryImage[]
  categories: Category[]
}

const byOrder = (a: GalleryImage, b: GalleryImage) =>
  a.display_order - b.display_order ||
  new Date(b.created_at).getTime() - new Date(a.created_at).getTime()

// Session cookies are read imperatively — no subscription is required
const noopSubscribe = () => () => {}

export default function GalleryManager({ initialImages, categories }: Props) {
  const [images, setImages] = useState<GalleryImage[]>([...initialImages].sort(byOrder))
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [showUploader, setShowUploader] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [dirty, setDirty] = useState(false)
  const [savingSeq, setSavingSeq] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isDemoSession = useSyncExternalStore(
    noopSubscribe,
    () => typeof document !== 'undefined' && document.cookie.includes('sps_demo_session=super_admin'),
    () => false
  )
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  // Realtime subscription for gallery updates
  useEffect(() => {
    const channel = supabase
      .channel('gallery-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'gallery_images',
      }, async (payload: { new: { id: string } }) => {
        const { data } = await supabase
          .from('gallery_images')
          .select('*, gallery_categories(name)')
          .eq('id', payload.new.id)
          .single()
        if (data) setImages(prev => {
          if (prev.some(img => img.id === data.id)) return prev
          return [...prev, data].sort(byOrder)
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'gallery_images',
      }, async (payload: { new: { id: string } }) => {
        const { data } = await supabase
          .from('gallery_images')
          .select('*, gallery_categories(name)')
          .eq('id', payload.new.id)
          .single()
        if (data) setImages(prev => prev.map(img => img.id === data.id ? data : img).sort(byOrder))
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'gallery_images',
      }, (payload: { old: { id: string } }) => {
        setImages(prev => prev.filter(img => img.id !== payload.old.id))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase])

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newUploads: UploadItem[] = []
    Array.from(files).forEach(file => {
      const err = validateImageFile(file)
      if (err) { showToast('error', err); return }
      newUploads.push({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'pending',
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        altText: '',
        categoryId: categories[0]?.id ?? '',
      })
    })
    setUploads(prev => [...prev, ...newUploads])
  }

  const uploadAll = useCallback(async () => {
    setLoading(true)
    const pending = uploads.filter(u => u.status === 'pending')
    const baseOrder = Math.min(0, ...images.map(img => img.display_order)) - 1

    for (let i = 0; i < pending.length; i++) {
      const upload = pending[i]
      setUploads(prev =>
        prev.map(u => u.preview === upload.preview ? { ...u, status: 'uploading' } : u)
      )

      try {
        const { storagePath, downloadUrl } = await uploadFile(
          upload.file,
          'gallery',
          (progress) => {
            setUploads(prev =>
              prev.map(u => u.preview === upload.preview ? { ...u, progress } : u)
            )
          }
        )

        const { data: newImage, error } = await supabase
          .from('gallery_images')
          .insert({
            title: upload.title || upload.file.name,
            alt_text: upload.altText || upload.title || upload.file.name,
            category_id: upload.categoryId || null,
            storage_path: storagePath,
            download_url: downloadUrl,
            mime_type: upload.file.type,
            file_size: upload.file.size,
            display_order: baseOrder - i,
            status: 'draft',
          })
          .select('*, gallery_categories(name)')
          .single()

        if (error) throw error

        setImages(prev => [...prev, newImage].sort(byOrder))
        setUploads(prev =>
          prev.map(u => u.preview === upload.preview ? { ...u, status: 'done', progress: 100 } : u)
        )
        showToast('success', `"${upload.title}" uploaded successfully`)
      } catch (err) {
        const msg = isDemoSession
          ? 'Demo session is active — sign in with your real Supabase admin account to save to Storage.'
          : err instanceof Error ? err.message : 'Upload failed'
        setUploads(prev =>
          prev.map(u => u.preview === upload.preview ? { ...u, status: 'error', error: msg } : u)
        )
        showToast('error', `Failed to upload "${upload.title}"`)
      }
    }
    setLoading(false)
  }, [uploads, supabase, images, isDemoSession])

  const toggleStatus = async (image: GalleryImage) => {
    const newStatus = image.status === 'published' ? 'draft' : 'published'
    const { error } = await supabase
      .from('gallery_images')
      .update({ status: newStatus })
      .eq('id', image.id)
    if (error) { showToast('error', 'Failed to update status'); return }
    setImages(prev => prev.map(img => img.id === image.id ? { ...img, status: newStatus } : img))
    showToast('success', `Image ${newStatus === 'published' ? 'published' : 'unpublished'}`)
  }

  const deleteImage = async (image: GalleryImage) => {
    if (!confirm(`Delete "${image.title}"? This cannot be undone.`)) return
    const { error } = await supabase.from('gallery_images').delete().eq('id', image.id)
    if (error) { showToast('error', 'Failed to delete'); return }
    setImages(prev => prev.filter(img => img.id !== image.id))
    if (image.storage_path?.startsWith('gallery/')) {
      try { await deleteFile(image.storage_path) } catch { /* storage cleanup is best-effort */ }
    }
    showToast('success', 'Image deleted')
  }

  const saveEdit = async () => {
    if (!editingImage) return
    const { error } = await supabase
      .from('gallery_images')
      .update({
        title: editingImage.title,
        description: editingImage.description,
        alt_text: editingImage.alt_text,
        category_id: editingImage.category_id,
      })
      .eq('id', editingImage.id)
    if (error) { showToast('error', 'Failed to save'); return }
    setImages(prev => prev.map(img => img.id === editingImage.id ? editingImage : img))
    setEditingImage(null)
    showToast('success', 'Image updated')
  }

  const isFiltered = Boolean(search || filterCategory || filterStatus)

  const filtered = images.filter(img => {
    const matchSearch = !search || img.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = !filterCategory || img.category_id === filterCategory
    const matchStatus = !filterStatus || img.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  const handleDrop = (from: number, to: number) => {
    if (isFiltered || from === to) return
    const next = [...images]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setImages(next)
    setDirty(true)
  }

  const move = (index: number, dir: -1 | 1) => {
    if (isFiltered) return
    const target = index + dir
    if (target < 0 || target >= images.length) return
    const next = [...images]
    ;[next[index], next[target]] = [next[target], next[index]]
    setImages(next)
    setDirty(true)
  }

  const saveSequence = async () => {
    setSavingSeq(true)
    const results = await Promise.all(
      images.map((img, idx) =>
        supabase.from('gallery_images').update({ display_order: idx + 1 }).eq('id', img.id)
      )
    )
    setSavingSeq(false)
    const failed = results.find(r => r.error)
    if (failed) {
      showToast('error', failed.error?.message ?? 'Failed to save sequence')
      return
    }
    setImages(prev => prev.map((img, idx) => ({ ...img, display_order: idx + 1 })))
    setDirty(false)
    showToast('success', 'Gallery sequence saved')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Demo session warning */}
      {isDemoSession && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs leading-relaxed text-amber-900">
            <span className="font-bold">Demo session active.</span> Uploads are kept in this browser only and are
            NOT saved to Supabase Storage. Log out and sign in with your Supabase admin account to persist images.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Gallery Images</h2>
          <p className="text-sm text-[#626262]">{images.length} images · {images.filter(i => i.status === 'published').length} published · drag cards to set order</p>
        </div>

        {dirty && (
          <button
            onClick={saveSequence}
            disabled={savingSeq}
            className="flex items-center gap-2 bg-[#242424] hover:bg-black disabled:opacity-60 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            {savingSeq ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            {savingSeq ? 'Saving...' : 'Save Sequence'}
          </button>
        )}

        <button
          onClick={() => setShowUploader(!showUploader)}
          className="flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Upload Images
        </button>
      </div>

      {/* Upload Panel */}
      {showUploader && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h3 className="font-bold text-[#242424] mb-4">Upload New Images</h3>

          {/* Dropzone */}
          <div
            className={`dropzone p-8 text-center mb-4 cursor-pointer ${dragOver ? 'drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={32} className="mx-auto text-[#A50026] mb-3" />
            <p className="font-semibold text-[#242424] mb-1">Drag & drop images or click to browse</p>
            <p className="text-sm text-[#9CA3AF]">JPEG, PNG, WebP, GIF · Max 10MB per file</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />
          </div>

          {/* Upload queue */}
          {uploads.length > 0 && (
            <div className="space-y-3 mb-4">
              {uploads.map((u, i) => (
                <div key={u.preview} className="bg-[#F5F5F5] rounded-xl p-3 flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
                  <img src={u.preview} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <input
                      value={u.title}
                      onChange={e => setUploads(prev => prev.map((item, j) =>
                        j === i ? { ...item, title: e.target.value } : item
                      ))}
                      placeholder="Image title"
                      className="admin-input mb-1.5 text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        value={u.altText}
                        onChange={e => setUploads(prev => prev.map((item, j) =>
                          j === i ? { ...item, altText: e.target.value } : item
                        ))}
                        placeholder="Alt text (for SEO)"
                        className="admin-input text-sm flex-1"
                      />
                      <select
                        value={u.categoryId}
                        onChange={e => setUploads(prev => prev.map((item, j) =>
                          j === i ? { ...item, categoryId: e.target.value } : item
                        ))}
                        className="admin-input text-sm w-36"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    {u.status === 'uploading' && (
                      <div className="progress-bar mt-2">
                        <div className="progress-bar-fill" style={{ width: `${u.progress}%` }} />
                      </div>
                    )}
                    {u.status === 'error' && (
                      <p className="text-xs text-red-600 mt-1">{u.error}</p>
                    )}
                  </div>
                  <div className="flex items-start gap-1">
                    {u.status === 'done' && <Check size={16} className="text-green-600 mt-1" />}
                    {u.status !== 'uploading' && u.status !== 'done' && (
                      <button
                        onClick={() => setUploads(prev => prev.filter((_, j) => j !== i))}
                        className="text-[#626262] hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {uploads.some(u => u.status === 'pending') && (
            <button
              onClick={uploadAll}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Upload size={16} />}
              Upload {uploads.filter(u => u.status === 'pending').length} Image(s)
            </button>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-[#9CA3AF]"
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="admin-input w-40 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="admin-input w-36 text-sm"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {isFiltered && images.length > 0 && (
        <p className="text-xs text-[#626262] bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg px-3 py-2 mb-4">
          Reordering is paused while filters are active. Clear search / filters to drag images into sequence.
        </p>
      )}

      {/* Gallery grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
          <ImageIcon size={40} className="mb-3 opacity-30" />
          <p className="font-medium">No images found</p>
          <p className="text-sm mt-1">Upload images to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filtered.map((image, index) => {
            const isActiveDrag = dragIndex === index
            const isDropTarget = overIndex === index && dragIndex !== null && dragIndex !== index
            return (
            <div
              key={image.id}
              draggable={!isFiltered}
              onDragStart={() => !isFiltered && setDragIndex(index)}
              onDragOver={e => { if (isFiltered) return; e.preventDefault(); setOverIndex(index) }}
              onDragEnd={() => { setDragIndex(null); setOverIndex(null) }}
              onDrop={e => {
                e.preventDefault()
                if (!isFiltered && dragIndex !== null) handleDrop(dragIndex, index)
                setDragIndex(null)
                setOverIndex(null)
              }}
              className={`group relative bg-white rounded-xl border overflow-hidden transition-all
                ${!isFiltered ? 'cursor-grab active:cursor-grabbing' : ''}
                ${isDropTarget ? 'border-[#A50026] ring-2 ring-[#FCE5E9] scale-[1.02]' : 'border-[#E5E5E5]'}
                ${isActiveDrag ? 'opacity-50' : 'hover:shadow-md'}`}
            >
              <div className="relative aspect-square bg-[#F5F5F5]">
                {image.download_url ? (
                  <NextImage
                    src={image.download_url}
                    alt={image.alt_text || image.title || 'Gallery image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
                    <ImageIcon size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <button
                    onClick={() => setEditingImage(image)}
                    aria-label="Edit image"
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#FCE5E9] transition-colors"
                  >
                    <Edit2 size={14} className="text-[#A50026]" />
                  </button>
                  <button
                    onClick={() => toggleStatus(image)}
                    aria-label={image.status === 'published' ? 'Unpublish image' : 'Publish image'}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#FCE5E9] transition-colors"
                  >
                    {image.status === 'published' ? <EyeOff size={14} className="text-[#626262]" /> : <Eye size={14} className="text-green-600" />}
                  </button>
                  <button
                    onClick={() => deleteImage(image)}
                    aria-label="Delete image"
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
                <span className={`absolute top-2 left-2 badge ${image.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                  {image.status}
                </span>
                {!isFiltered && (
                  <span className="absolute top-2 right-2 min-w-6 h-6 px-1.5 rounded-full bg-white/95 text-[10px] font-bold text-[#242424] flex items-center justify-center shadow-sm">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-[#242424] truncate">{image.title || 'Untitled'}</p>
                <p className="text-[10px] text-[#9CA3AF] truncate">
                  {image.gallery_categories?.name ?? 'Uncategorized'} · {format(new Date(image.created_at), 'MMM d, yyyy')}
                </p>
                <div className="mt-2 flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-[#9CA3AF]">
                    <GripVertical size={12} className={isFiltered ? 'opacity-30' : ''} />
                    {isFiltered ? 'Locked' : 'Drag'}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => move(index, -1)}
                      disabled={isFiltered || index === 0}
                      aria-label="Move image earlier"
                      className="w-8 h-8 sm:w-7 sm:h-7 rounded-md border border-[#E5E5E5] flex items-center justify-center text-[#626262] hover:bg-[#F5F5F5] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronUp size={12} />
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={isFiltered || index === filtered.length - 1}
                      aria-label="Move image later"
                      className="w-8 h-8 sm:w-7 sm:h-7 rounded-md border border-[#E5E5E5] flex items-center justify-center text-[#626262] hover:bg-[#F5F5F5] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronDown size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5F5F5]">
              <h3 className="font-bold text-[#242424]">Edit Image</h3>
              <button onClick={() => setEditingImage(null)} className="text-[#626262] hover:text-[#242424]">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {editingImage.download_url && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#F5F5F5]">
                  <NextImage
                    src={editingImage.download_url}
                    alt={editingImage.alt_text || editingImage.title || 'Gallery image'}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-[#626262] mb-1 block">Title</label>
                <input
                  value={editingImage.title}
                  onChange={e => setEditingImage({ ...editingImage, title: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#626262] mb-1 block">Alt Text</label>
                <input
                  value={editingImage.alt_text}
                  onChange={e => setEditingImage({ ...editingImage, alt_text: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#626262] mb-1 block">Description</label>
                <textarea
                  value={editingImage.description ?? ''}
                  onChange={e => setEditingImage({ ...editingImage, description: e.target.value })}
                  rows={3}
                  className="admin-input resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#626262] mb-1 block">Category</label>
                <select
                  value={editingImage.category_id ?? ''}
                  onChange={e => setEditingImage({ ...editingImage, category_id: e.target.value || null })}
                  className="admin-input"
                >
                  <option value="">Uncategorized</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-5">
              <button
                onClick={() => setEditingImage(null)}
                className="flex-1 py-2.5 border border-[#E5E5E5] rounded-xl text-sm font-medium text-[#626262] hover:bg-[#F5F5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-2.5 bg-[#A50026] hover:bg-[#85001F] text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
