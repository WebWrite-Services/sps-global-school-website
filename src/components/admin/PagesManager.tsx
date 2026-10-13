'use client'

import { useState } from 'react'
import { Check, X, Save, Globe } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Page {
  id: string
  title: string
  slug: string
  heading: string
  introduction: string
  content: string
  seo_title: string
  seo_description: string
  status: string
}

interface Props {
  initialPages: Page[]
  updatedBy: string
}

export default function PagesManager({ initialPages, updatedBy }: Props) {
  const [pages, setPages] = useState(initialPages)
  const [selected, setSelected] = useState<Page | null>(null)
  const [form, setForm] = useState<Partial<Page>>({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 3500)
  }

  const openPage = (page: Page) => {
    setSelected(page)
    setForm({
      heading: page.heading ?? '',
      introduction: page.introduction ?? '',
      content: page.content ?? '',
      seo_title: page.seo_title ?? '',
      seo_description: page.seo_description ?? '',
      status: page.status,
    })
  }

  const savePage = async () => {
    if (!selected) return
    setSaving(true)
    const { data, error } = await supabase
      .from('school_pages')
      .update({ ...form, updated_by: updatedBy, updated_at: new Date().toISOString() })
      .eq('id', selected.id)
      .select()
      .single()
    if (error) { showToast('error', 'Failed to save'); setSaving(false); return }
    setPages(prev => prev.map(p => p.id === selected.id ? data : p))
    setSelected(data)
    showToast('success', 'Page saved successfully')
    setSaving(false)
  }

  const Field = ({ label, field, type = 'text' }: { label: string; field: keyof Page; type?: string }) => (
    <div>
      <label className="text-xs font-semibold text-[#626262] mb-1 block">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={(form[field] as string) ?? ''}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          rows={5}
          className="admin-input resize-none text-sm"
        />
      ) : (
        <input
          type={type}
          value={(form[field] as string) ?? ''}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          className="admin-input text-sm"
        />
      )}
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

      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#242424]">Website Pages</h2>
        <p className="text-sm text-[#626262]">Edit page content without touching code</p>
      </div>

      <div className="flex gap-6">
        {/* Page list */}
        <div className="w-56 shrink-0 space-y-1">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => openPage(page)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-colors
                ${selected?.id === page.id
                  ? 'bg-[#FCE5E9] text-[#A50026] font-semibold'
                  : 'text-[#626262] hover:bg-[#F5F5F5] hover:text-[#242424]'}`}
            >
              <Globe size={14} className="shrink-0" />
              <span className="truncate">{page.title}</span>
            </button>
          ))}
        </div>

        {/* Editor */}
        {selected ? (
          <div className="flex-1 bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-[#242424]">{selected.title}</h3>
                <p className="text-xs text-[#9CA3AF]">/{selected.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={(form.status as string) ?? 'draft'}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="admin-input text-sm w-32"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <button
                  onClick={savePage}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="Page Heading" field="heading" />
              <Field label="Introduction" field="introduction" type="textarea" />
              <Field label="Main Content" field="content" type="textarea" />
              <div className="border-t border-[#F5F5F5] pt-4">
                <p className="text-xs font-bold text-[#626262] uppercase tracking-wider mb-3">SEO Settings</p>
                <div className="grid grid-cols-1 gap-3">
                  <Field label={`SEO Title (${((form.seo_title as string) ?? '').length}/60)`} field="seo_title" />
                  <Field label={`Meta Description (${((form.seo_description as string) ?? '').length}/160)`} field="seo_description" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl border border-[#E5E5E5] flex items-center justify-center text-[#9CA3AF] py-20">
            <div className="text-center">
              <Globe size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Select a page to edit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
