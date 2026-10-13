'use client'

import { useState, useRef, useEffect } from 'react'
import { format } from 'date-fns'
import { Upload, Search, Image, FileText, Trash2, Copy, Check, X, Filter } from 'lucide-react'
import { uploadFile, validateImageFile, deleteFile } from '@/lib/supabase/storage'
import { createClient } from '@/lib/supabase/client'

interface MediaItem {
  id: string
  filename: string
  storage_path: string
  download_url: string
  mime_type: string
  file_size: number
  folder: string
  created_at: string
}

interface Props {
  initialMedia: MediaItem[]
  uploadedBy: string
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaLibraryManager({ initialMedia, uploadedBy }: Props) {
  const [media, setMedia] = useState(initialMedia)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
  }

  // Realtime subscription for Media Library
  useEffect(() => {
    const channel = supabase
      .channel('media-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'media_library',
      }, (payload: any) => {
        setMedia(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          return [payload.new as MediaItem, ...prev]
        })
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'media_library',
      }, (payload: any) => {
        setMedia(prev => prev.filter(m => m.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const uploadMedia = async (file: File) => {
    const err = validateImageFile(file)
    if (err) { showToast('error', err); return }
    setUploading(true)
    try {
      const { storagePath, downloadUrl } = await uploadFile(file, 'media', p => setProgress(p))
      const { data, error } = await supabase.from('media_library').insert({
        filename: file.name,
        storage_path: storagePath,
        download_url: downloadUrl,
        mime_type: file.type,
        file_size: file.size,
        folder: 'media',
        created_by: uploadedBy,
      }).select().single()
      if (error) throw error
      setMedia(prev => [data, ...prev])
      showToast('success', 'Uploaded successfully')
    } catch {
      showToast('error', 'Upload failed')
    } finally {
      setUploading(false); setProgress(0)
    }
  }

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
    showToast('success', 'URL copied to clipboard!')
  }

  const deleteMedia = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.filename}"?`)) return
    try {
      await deleteFile(item.storage_path)
    } catch {
      // Continue even if storage delete had an issue
    }
    const { error } = await supabase.from('media_library').delete().eq('id', item.id)
    if (error) { showToast('error', 'Failed to delete'); return }
    setMedia(prev => prev.filter(m => m.id !== item.id))
    showToast('success', 'Deleted')
  }

  const filtered = media.filter(m => {
    const matchSearch = !search || (m.filename || '').toLowerCase().includes(search.toLowerCase())
    const isImg = Boolean(m.mime_type?.startsWith('image/'))
    const matchType = !filterType || (filterType === 'image' ? isImg : !isImg)
    return matchSearch && matchType
  })

  const isImage = (mime?: string) => Boolean(mime?.startsWith('image/'))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Media Library</h2>
          <p className="text-sm text-[#626262]">{media.length} files</p>
        </div>
        <label className="flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer">
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload size={16} />
          )}
          {uploading ? `Uploading ${progress}%` : 'Upload Files'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async e => {
              const files = Array.from(e.target.files ?? [])
              for (const f of files) await uploadMedia(f)
              e.target.value = ''
            }}
          />
        </label>
      </div>

      {/* Upload progress */}
      {uploading && (
        <div className="mb-4">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="bg-transparent text-sm outline-none flex-1" />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="admin-input w-36 text-sm">
          <option value="">All Types</option>
          <option value="image">Images</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
          <Image size={36} className="mb-3 opacity-30" />
          <p className="font-medium">No files found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="group bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-md transition-all">
              <div className="relative aspect-square bg-[#F5F5F5]">
                {isImage(item.mime_type) && item.download_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.download_url} alt={item.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#9CA3AF]">
                    <FileText size={28} />
                    <span className="text-xs uppercase">{item.mime_type ? item.mime_type.split('/')[1] : 'FILE'}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => copyUrl(item.download_url, item.id)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#FCE5E9]"
                    title="Copy URL"
                  >
                    {copied === item.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-[#A50026]" />}
                  </button>
                  <button
                    onClick={() => deleteMedia(item)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-medium text-[#242424] truncate">{item.filename}</p>
                <p className="text-[10px] text-[#9CA3AF]">
                  {formatBytes(item.file_size)} · {format(new Date(item.created_at), 'MMM d')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
