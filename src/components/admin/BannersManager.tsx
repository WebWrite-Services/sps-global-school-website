'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Plus, Upload, Edit2, Trash2, Eye, EyeOff, Check, X, Move } from 'lucide-react'
import { uploadFile, validateImageFile } from '@/lib/supabase/storage'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface Banner {
  id: string
  internal_name: string
  heading: string
  description: string
  desktop_image_path: string
  desktop_image_url: string
  mobile_image_url: string
  primary_button_text: string
  primary_button_url: string
  secondary_button_text: string
  secondary_button_url: string
  display_order: number
  is_active: boolean
  starts_at: string | null
  ends_at: string | null
  created_at: string
}

interface Props {
  initialBanners: Banner[]
  uploadedBy: string
}

const emptyForm = {
  internal_name: '', heading: '', description: '',
  primary_button_text: '', primary_button_url: '',
  secondary_button_text: '', secondary_button_url: '',
  starts_at: '', ends_at: '', is_active: false,
}

export default function BannersManager({ initialBanners, uploadedBy }: Props) {
  const [banners, setBanners] = useState(initialBanners)
  const [showForm, setShowForm] = useState(false)
  const [editBanner, setEditBanner] = useState<Banner | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [desktopFile, setDesktopFile] = useState<File | null>(null)
  const [desktopPreview, setDesktopPreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
  }

  // Realtime subscription for banners
  useEffect(() => {
    const channel = supabase
      .channel('banners-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'homepage_banners',
      }, (payload: any) => {
        setBanners(prev => {
          if (prev.some(b => b.id === payload.new.id)) return prev
          return [...prev, payload.new as Banner].sort((a, b) => a.display_order - b.display_order)
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'homepage_banners',
      }, (payload: any) => {
        setBanners(prev =>
          prev.map(b => b.id === payload.new.id ? (payload.new as Banner) : b)
            .sort((a, b) => a.display_order - b.display_order)
        )
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'homepage_banners',
      }, (payload: any) => {
        setBanners(prev => prev.filter(b => b.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleDesktopFile = (file: File) => {
    const err = validateImageFile(file)
    if (err) { showToast('error', err); return }
    setDesktopFile(file)
    setDesktopPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!form.heading.trim()) { showToast('error', 'Heading is required'); return }
    if (!desktopFile && !editBanner) { showToast('error', 'Desktop image is required'); return }
    setUploading(true)

    let desktopPath = editBanner?.desktop_image_path ?? ''
    let desktopUrl = editBanner?.desktop_image_url ?? ''

    if (desktopFile) {
      try {
        const result = await uploadFile(desktopFile, 'banners')
        desktopPath = result.storagePath
        desktopUrl = result.downloadUrl
      } catch {
        showToast('error', 'Image upload failed'); setUploading(false); return
      }
    }

    const nextOrder = banners.length > 0 ? Math.max(...banners.map(b => b.display_order)) + 1 : 1
    const payload = {
      ...form,
      desktop_image_path: desktopPath,
      desktop_image_url: desktopUrl,
      display_order: editBanner?.display_order ?? nextOrder,
      created_by: uploadedBy,
      starts_at: form.starts_at || null,
      ends_at: form.ends_at || null,
    }

    if (editBanner) {
      const { data, error } = await supabase.from('homepage_banners').update(payload).eq('id', editBanner.id).select().single()
      if (error) { showToast('error', error.message); setUploading(false); return }
      setBanners(prev => prev.map(b => b.id === editBanner.id ? data : b))
      showToast('success', 'Banner updated')
    } else {
      const { data, error } = await supabase.from('homepage_banners').insert(payload).select().single()
      if (error) { showToast('error', error.message); setUploading(false); return }
      setBanners(prev => [...prev, data])
      showToast('success', 'Banner created')
    }

    setForm(emptyForm); setDesktopFile(null); setDesktopPreview(''); setShowForm(false); setEditBanner(null)
    setUploading(false)
  }

  const toggleActive = async (banner: Banner) => {
    const { error } = await supabase.from('homepage_banners').update({ is_active: !banner.is_active }).eq('id', banner.id)
    if (error) { showToast('error', 'Failed'); return }
    setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, is_active: !banner.is_active } : b))
    showToast('success', banner.is_active ? 'Banner deactivated' : 'Banner activated')
  }

  const deleteBanner = async (banner: Banner) => {
    if (!confirm(`Delete "${banner.internal_name}"?`)) return
    const { error } = await supabase.from('homepage_banners').delete().eq('id', banner.id)
    if (error) { showToast('error', 'Failed'); return }
    setBanners(prev => prev.filter(b => b.id !== banner.id))
    showToast('success', 'Deleted')
  }

  const openEdit = (b: Banner) => {
    setEditBanner(b)
    setForm({
      internal_name: b.internal_name, heading: b.heading, description: b.description ?? '',
      primary_button_text: b.primary_button_text ?? '', primary_button_url: b.primary_button_url ?? '',
      secondary_button_text: b.secondary_button_text ?? '', secondary_button_url: b.secondary_button_url ?? '',
      starts_at: b.starts_at?.slice(0, 16) ?? '', ends_at: b.ends_at?.slice(0, 16) ?? '',
      is_active: b.is_active,
    })
    setDesktopPreview(b.desktop_image_url)
    setShowForm(true)
  }

  const Field = ({ label, field, type = 'text', placeholder = '' }: { label: string; field: keyof typeof emptyForm; type?: string; placeholder?: string }) => (
    <div>
      <label className="text-xs font-semibold text-[#626262] mb-1 block">{label}</label>
      <input
        type={type}
        value={form[field] as string}
        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
        className="admin-input text-sm"
        placeholder={placeholder}
      />
    </div>
  )

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
          <h2 className="text-xl font-bold text-[#242424]">Homepage Banners</h2>
          <p className="text-sm text-[#626262]">{banners.length} banners · {banners.filter(b => b.is_active).length} active</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditBanner(null); setForm(emptyForm); setDesktopPreview('') }}
          className="flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> New Banner
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h3 className="font-bold text-[#242424] mb-4">{editBanner ? 'Edit Banner' : 'New Banner'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Internal Name *" field="internal_name" placeholder="e.g. Admission 2026 Campaign" />
            <Field label="Heading *" field="heading" placeholder="e.g. Admissions Open 2026–27" />
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[#626262] mb-1 block">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={2} className="admin-input text-sm resize-none"
              />
            </div>
            <Field label="Primary Button Text" field="primary_button_text" placeholder="Enquire Now" />
            <Field label="Primary Button URL" field="primary_button_url" placeholder="/admission-form-2026-27" />
            <Field label="Secondary Button Text" field="secondary_button_text" placeholder="Learn More" />
            <Field label="Secondary Button URL" field="secondary_button_url" placeholder="/about-us" />
            <Field label="Start Date & Time" field="starts_at" type="datetime-local" />
            <Field label="End Date & Time" field="ends_at" type="datetime-local" />
          </div>

          {/* Desktop image */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-[#626262] mb-2 block">Desktop Banner Image {editBanner ? '' : '*'}</label>
            {desktopPreview ? (
              <div className="relative">
                <img src={desktopPreview} alt="Banner preview" className="w-full h-40 object-cover rounded-xl" />
                <button onClick={() => { setDesktopFile(null); setDesktopPreview('') }} className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center">
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label className="dropzone flex items-center gap-3 p-4 cursor-pointer">
                <Upload size={18} className="text-[#A50026]" />
                <div>
                  <p className="text-sm text-[#242424] font-medium">Upload banner image</p>
                  <p className="text-xs text-[#9CA3AF]">JPEG, PNG, WebP · Recommended 1920×600px</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleDesktopFile(e.target.files[0])} />
              </label>
            )}
          </div>

          <label className="flex items-center gap-2.5 mb-4 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="w-4 h-4 accent-[#A50026]" />
            <span className="text-sm text-[#242424]">Activate banner immediately</span>
          </label>

          <div className="flex gap-3">
            <button onClick={() => { setShowForm(false); setEditBanner(null) }} className="flex-1 py-2.5 border border-[#E5E5E5] rounded-xl text-sm font-medium text-[#626262] hover:bg-[#F5F5F5]">Cancel</button>
            <button onClick={handleSubmit} disabled={uploading} className="flex-1 py-2.5 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white rounded-xl text-sm font-semibold">{uploading ? 'Saving...' : 'Save Banner'}</button>
          </div>
        </div>
      )}

      {/* Banner list */}
      {banners.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
          <p className="font-medium">No banners yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.sort((a, b) => a.display_order - b.display_order).map(banner => (
            <div key={banner.id} className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden flex">
              {banner.desktop_image_url ? (
                <div className="w-32 sm:w-48 shrink-0 relative">
                  <img src={banner.desktop_image_url} alt="" className="w-full h-full object-cover" style={{ minHeight: 80 }} />
                </div>
              ) : (
                <div className="w-32 sm:w-48 shrink-0 bg-[#F5F5F5] flex items-center justify-center">
                  <p className="text-xs text-[#9CA3AF]">No image</p>
                </div>
              )}
              <div className="flex-1 p-4 flex items-center gap-4 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-[#242424] truncate">{banner.heading}</p>
                    <span className={`badge ${banner.is_active ? 'badge-active' : 'badge-inactive'}`}>
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] truncate">{banner.internal_name}</p>
                  {(banner.starts_at || banner.ends_at) && (
                    <p className="text-xs text-[#626262] mt-1">
                      {banner.starts_at && `From: ${format(new Date(banner.starts_at), 'MMM d')}`}
                      {banner.ends_at && ` → ${format(new Date(banner.ends_at), 'MMM d, yyyy')}`}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => toggleActive(banner)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${banner.is_active ? 'bg-[#F5F5F5] text-[#626262] hover:bg-[#E5E5E5]' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                    {banner.is_active ? <EyeOff size={13} /> : <Eye size={13} />}
                    {banner.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => openEdit(banner)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] hover:text-[#A50026]">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteBanner(banner)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#626262] hover:text-red-600">
                    <Trash2 size={14} />
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
