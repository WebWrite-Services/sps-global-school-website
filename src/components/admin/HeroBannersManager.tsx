'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, GripVertical, ChevronUp, ChevronDown, Check, X, Save } from 'lucide-react'
import { uploadFile, deleteFile, validateImageFile } from '@/lib/supabase/storage'
import { createClient } from '@/lib/supabase/client'

interface HeroBanner {
  id: string
  internal_name: string
  image_path: string
  image_url: string
  display_order: number
  is_active: boolean
  created_at: string
}

interface Props {
  initialBanners: HeroBanner[]
  uploadedBy: string
}

const byOrder = (a: HeroBanner, b: HeroBanner) => a.display_order - b.display_order

export default function HeroBannersManager({ initialBanners, uploadedBy }: Props) {
  const [banners, setBanners] = useState<HeroBanner[]>([...initialBanners].sort(byOrder))
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dirty, setDirty] = useState(false)
  const [savingSeq, setSavingSeq] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
  }

  // Realtime subscription for hero banners
  useEffect(() => {
    const channel = supabase
      .channel('hero-banners-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'hero_banners',
      }, (payload: { new: HeroBanner }) => {
        setBanners(prev => {
          if (prev.some(b => b.id === payload.new.id)) return prev
          return [...prev, payload.new].sort(byOrder)
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'hero_banners',
      }, (payload: { new: HeroBanner }) => {
        setBanners(prev => prev
          .map(b => b.id === payload.new.id ? payload.new : b)
          .sort(byOrder))
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'hero_banners',
      }, (payload: { old: { id: string } }) => {
        setBanners(prev => prev.filter(b => b.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const uploadImage = async (file: File) => {
    const err = validateImageFile(file)
    if (err) { showToast('error', err); return }
    setUploading(true)
    try {
      const { storagePath, downloadUrl } = await uploadFile(file, 'hero-banners', p => setProgress(p))
      const nextOrder = banners.length > 0 ? Math.max(...banners.map(b => b.display_order)) + 1 : 1
      const { data, error } = await supabase.from('hero_banners').insert({
        internal_name: file.name,
        image_path: storagePath,
        image_url: downloadUrl,
        display_order: nextOrder,
        is_active: true,
        created_by: uploadedBy,
      }).select().single()
      if (error) throw error
      setBanners(prev => [...prev, data].sort(byOrder))
      showToast('success', 'Image uploaded')
    } catch {
      showToast('error', 'Upload failed')
    } finally {
      setUploading(false); setProgress(0)
    }
  }

  const deleteBanner = async (banner: HeroBanner) => {
    if (!confirm('Delete this banner image?')) return
    if (banner.image_path) {
      try {
        await deleteFile(banner.image_path)
      } catch {
        // Continue even if storage delete had an issue
      }
    }
    const { error } = await supabase.from('hero_banners').delete().eq('id', banner.id)
    if (error) { showToast('error', 'Failed'); return }
    setBanners(prev => prev.filter(b => b.id !== banner.id))
    showToast('success', 'Deleted')
  }

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= banners.length) return
    const next = [...banners]
    ;[next[index], next[target]] = [next[target], next[index]]
    setBanners(next)
    setDirty(true)
  }

  const handleDrop = (from: number, to: number) => {
    if (from === to) return
    const next = [...banners]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setBanners(next)
    setDirty(true)
  }

  const saveSequence = async () => {
    setSavingSeq(true)
    const results = await Promise.all(
      banners.map((b, idx) =>
        supabase.from('hero_banners').update({ display_order: idx + 1 }).eq('id', b.id)
      )
    )
    const failed = results.find(r => r.error)
    setSavingSeq(false)
    if (failed) { showToast('error', failed.error?.message ?? 'Failed to save sequence'); return }
    setBanners(prev => prev.map((b, idx) => ({ ...b, display_order: idx + 1 })))
    setDirty(false)
    showToast('success', 'Sequence saved')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Hero Banners</h2>
          <p className="text-sm text-[#626262]">{banners.length} images · drag to set hero order</p>
        </div>

        {dirty && (
          <button
            onClick={saveSequence}
            disabled={savingSeq}
            className="flex items-center gap-2 bg-[#242424] hover:bg-black disabled:opacity-60 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Save size={16} /> {savingSeq ? 'Saving...' : 'Save Sequence'}
          </button>
        )}

        <label className="flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer">
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload size={16} />
          )}
          {uploading ? `Uploading ${progress}%` : 'Upload Image'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async e => {
              const file = e.target.files?.[0]
              if (file) await uploadImage(file)
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

      {/* List */}
      {banners.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
          <p className="font-medium">No hero banners yet</p>
          <p className="text-xs mt-1">Upload images — hero section will show them in this sequence.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={e => { e.preventDefault(); setOverIndex(index) }}
              onDragEnd={() => { setDragIndex(null); setOverIndex(null) }}
              onDrop={e => {
                e.preventDefault()
                if (dragIndex !== null) handleDrop(dragIndex, index)
                setDragIndex(null); setOverIndex(null)
              }}
              className={`bg-white rounded-2xl border overflow-hidden flex items-stretch cursor-grab active:cursor-grabbing transition-colors
                ${overIndex === index && dragIndex !== null && dragIndex !== index ? 'border-[#A50026] bg-[#FFF7F8]' : 'border-[#E5E5E5]'}
                ${dragIndex === index ? 'opacity-50' : ''}`}
            >
              {/* Order + drag handle */}
              <div className="flex flex-col items-center justify-center gap-1 px-3 sm:px-4 border-r border-[#F0F0F0] bg-[#FAFAFA]">
                <GripVertical size={16} className="text-[#9CA3AF]" />
                <span className="text-xs font-bold text-[#626262]">#{index + 1}</span>
              </div>

              {/* Thumbnail */}
              <div className="w-36 sm:w-52 shrink-0 relative bg-[#F5F5F5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={banner.image_url} alt="" className="w-full h-full object-cover" style={{ minHeight: 72 }} />
              </div>

              {/* Actions */}
              <div className="flex-1 p-3 flex items-center justify-between gap-3 min-w-0 px-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#242424] truncate">{banner.internal_name || 'Hero image'}</p>
                  <p className="text-xs text-[#9CA3AF]">Position {index + 1} of {banners.length}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] hover:text-[#A50026] disabled:opacity-30 disabled:hover:bg-transparent"
                    aria-label="Move up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === banners.length - 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] hover:text-[#A50026] disabled:opacity-30 disabled:hover:bg-transparent"
                    aria-label="Move down"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    onClick={() => deleteBanner(banner)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#626262] hover:text-red-600"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
