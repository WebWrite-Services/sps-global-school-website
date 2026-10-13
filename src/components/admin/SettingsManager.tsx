'use client'

import { useState } from 'react'
import { Check, X, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Setting { id: string; key: string; value: string }
interface Props { initialSettings: Setting[] }

const SETTING_GROUPS = [
  {
    title: 'School Information',
    fields: [
      { key: 'school_name', label: 'School Name', type: 'text' },
      { key: 'school_email', label: 'Official Email', type: 'email' },
      { key: 'school_phone', label: 'Phone Number', type: 'tel' },
      { key: 'school_address', label: 'School Address', type: 'textarea' },
    ],
  },
  {
    title: 'Social Media Links',
    fields: [
      { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
      { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
      { key: 'youtube_url', label: 'YouTube URL', type: 'url' },
      { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
    ],
  },
  {
    title: 'Default SEO',
    fields: [
      { key: 'default_seo_title', label: 'Default Page Title', type: 'text' },
      { key: 'default_seo_description', label: 'Default Meta Description', type: 'textarea' },
    ],
  },
  {
    title: 'Notifications',
    fields: [
      { key: 'admission_email', label: 'Admission Enquiry Email', type: 'email' },
    ],
  },
]

export default function SettingsManager({ initialSettings }: Props) {
  const [settings, setSettings] = useState<Record<string, string>>(
    Object.fromEntries(initialSettings.map(s => [s.key, s.value]))
  )
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 3000)
  }

  const saveSetting = async (key: string) => {
    setSaving(prev => ({ ...prev, [key]: true }))
    const { error } = await supabase
      .from('website_settings')
      .upsert({ key, value: settings[key] ?? '', updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (error) { showToast('error', `Failed to save ${key}`); setSaving(prev => ({ ...prev, [key]: false })); return }
    setSaved(prev => ({ ...prev, [key]: true }))
    setSaving(prev => ({ ...prev, [key]: false }))
    setTimeout(() => setSaved(prev => ({ ...prev, [key]: false })), 2000)
  }

  const saveGroup = async (keys: string[]) => {
    setSaving(prev => Object.fromEntries(keys.map(k => [k, true])))
    for (const key of keys) {
      await supabase.from('website_settings').upsert(
        { key, value: settings[key] ?? '', updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )
    }
    setSaving(prev => Object.fromEntries(keys.map(k => [k, false])))
    showToast('success', 'Settings saved!')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#242424]">Website Settings</h2>
        <p className="text-sm text-[#626262]">Update school information and global site settings</p>
      </div>

      <div className="space-y-6">
        {SETTING_GROUPS.map(group => {
          const groupKeys = group.fields.map(f => f.key)
          return (
            <div key={group.title} className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#242424]">{group.title}</h3>
                <button
                  onClick={() => saveGroup(groupKeys)}
                  disabled={groupKeys.some(k => saving[k])}
                  className="flex items-center gap-2 px-4 py-2 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <Save size={13} /> Save
                </button>
              </div>
              <div className="space-y-4">
                {group.fields.map(field => (
                  <div key={field.key}>
                    <label className="text-xs font-semibold text-[#626262] mb-1.5 block">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={settings[field.key] ?? ''}
                        onChange={e => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))}
                        rows={3}
                        className="admin-input resize-none text-sm"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={settings[field.key] ?? ''}
                        onChange={e => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="admin-input text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Warning */}
      <div className="mt-5 bg-[#FFF7F8] border border-[#FCE5E9] rounded-xl p-4">
        <p className="text-sm text-[#A50026]">
          <strong>Important:</strong> API keys, database credentials, and Firebase service account details should never be stored here. 
          Keep all secrets in environment variables only.
        </p>
      </div>
    </div>
  )
}
