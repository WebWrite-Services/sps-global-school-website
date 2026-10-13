'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import NextImage from 'next/image'
import { Upload, X, Check, Trash2, Eye, EyeOff, Edit2, Search, ImageIcon, Plus, RefreshCw } from 'lucide-react'
import { uploadFile, validateImageFile } from '@/lib/firebase/storage'
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

export default function GalleryManager({ initialImages, categories }: Props) {
  const [images, setImages] = useState(initialImages)
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [showUploader, setShowUploader] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
      }, async (payload: any) => {
        const { data } = await supabase
          .from('gallery_images')
          .select('*, gallery_categories(name)')
          .eq('id', payload.new.id)
          .single()
        if (data) setImages(prev => [data, ...prev])
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'gallery_images',
      }, async (payload: any) => {
        const { data } = await supabase
          .from('gallery_images')
          .select('*, gallery_categories(name)')
          .eq('id', payload.new.id)
          .single()
        if (data) setImages(prev => prev.map(img => img.id === data.id ? data : img))
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'gallery_images',
      }, (payload: any) => {
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
            status: 'draft',
          })
          .select('*, gallery_categories(name)')
          .single()

        if (error) throw error

        setImages(prev => [newImage, ...prev])
        setUploads(prev =>
          prev.map(u => u.preview === upload.preview ? { ...u, status: 'done', progress: 100 } : u)
        )
        showToast('success', `"${upload.title}" uploaded successfully`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Upload failed'
        setUploads(prev =>
          prev.map(u => u.preview === upload.preview ? { ...u, status: 'error', error: msg } : u)
        )
        showToast('error', `Failed to upload "${upload.title}"`)
      }
    }
    setLoading(false)
  }, [uploads, supabase])

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

  const filtered = images.filter(img => {
    const matchSearch = !search || img.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = !filterCategory || img.category_id === filterCategory
    const matchStatus = !filterStatus || img.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

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

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Gallery Images</h2>
          <p className="text-sm text-[#626262]">{images.length} images · {images.filter(i => i.status === 'published').length} published</p>
        </div>
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

      {/* Gallery grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
          <ImageIcon size={40} className="mb-3 opacity-30" />
          <p className="font-medium">No images found</p>
          <p className="text-sm mt-1">Upload images to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(image => (
            <div key={image.id} className="group bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-md transition-all">
              <div className="relative aspect-square bg-[#F5F5F5]">
                {image.download_url ? (
                  <NextImage
                    src={image.download_url}
                    alt={image.alt_text}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
                    <ImageIcon size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setEditingImage(image)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#FCE5E9] transition-colors"
                  >
                    <Edit2 size={14} className="text-[#A50026]" />
                  </button>
                  <button
                    onClick={() => toggleStatus(image)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#FCE5E9] transition-colors"
                  >
                    {image.status === 'published' ? <EyeOff size={14} className="text-[#626262]" /> : <Eye size={14} className="text-green-600" />}
                  </button>
                  <button
                    onClick={() => deleteImage(image)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
                <span className={`absolute top-2 left-2 badge ${image.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                  {image.status}
                </span>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-[#242424] truncate">{image.title || 'Untitled'}</p>
                <p className="text-[10px] text-[#9CA3AF]">
                  {image.gallery_categories?.name ?? 'Uncategorized'} · {format(new Date(image.created_at), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          ))}
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
                <img
                  src={editingImage.download_url}
                  alt=""
                  className="w-full h-40 object-cover rounded-xl"
                />
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
