'use client'

import { useState, useRef, useEffect } from 'react'
import { format } from 'date-fns'
import { Upload, Search, File, Trash2, Edit2, Plus, Check, X, ExternalLink } from 'lucide-react'
import { uploadFile, validatePdfFile } from '@/lib/firebase/storage'
import { createClient } from '@/lib/supabase/client'

interface TCDocument {
  id: string
  student_name: string
  admission_number: string
  guardian_name: string
  class_name: string
  academic_session: string
  tc_number: string
  issue_date: string | null
  storage_path: string
  internal_notes: string
  status: string
  created_at: string
}

interface Props {
  initialDocuments: TCDocument[]
  uploadedBy: string
}

export default function TCManager({ initialDocuments, uploadedBy }: Props) {
  const [documents, setDocuments] = useState(initialDocuments)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [editDoc, setEditDoc] = useState<TCDocument | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const emptyForm = { student_name: '', admission_number: '', guardian_name: '', class_name: '', academic_session: '', tc_number: '', issue_date: '', internal_notes: '' }
  const [form, setForm] = useState(emptyForm)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
  }

  // Realtime subscription for TC documents
  useEffect(() => {
    const channel = supabase
      .channel('tc-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'tc_documents',
      }, (payload: any) => {
        setDocuments(prev => {
          if (prev.some(d => d.id === payload.new.id)) return prev
          return [payload.new as TCDocument, ...prev]
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'tc_documents',
      }, (payload: any) => {
        setDocuments(prev =>
          prev.map(d => d.id === payload.new.id ? (payload.new as TCDocument) : d)
        )
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'tc_documents',
      }, (payload: any) => {
        setDocuments(prev => prev.filter(d => d.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleSubmit = async () => {
    if (!form.student_name.trim()) { showToast('error', 'Student name is required'); return }
    if (!selectedFile && !editDoc) { showToast('error', 'PDF file is required'); return }
    setUploading(true)

    let storagePath = editDoc?.storage_path ?? ''

    if (selectedFile) {
      const err = validatePdfFile(selectedFile)
      if (err) { showToast('error', err); setUploading(false); return }
      try {
        const result = await uploadFile(selectedFile, 'tc', p => setProgress(p))
        storagePath = result.storagePath
      } catch {
        showToast('error', 'PDF upload failed'); setUploading(false); return
      }
    }

    const payload = {
      ...form,
      storage_path: storagePath,
      created_by: uploadedBy,
      issue_date: form.issue_date || null,
    }

    if (editDoc) {
      const { data, error } = await supabase.from('tc_documents').update(payload).eq('id', editDoc.id).select().single()
      if (error) { showToast('error', error.message); setUploading(false); return }
      setDocuments(prev => prev.map(d => d.id === editDoc.id ? data : d))
      showToast('success', 'TC document updated')
    } else {
      const { data, error } = await supabase.from('tc_documents').insert(payload).select().single()
      if (error) { showToast('error', error.message); setUploading(false); return }
      setDocuments(prev => [data, ...prev])
      showToast('success', 'TC document added')
    }

    setForm(emptyForm); setSelectedFile(null); setShowForm(false); setEditDoc(null); setProgress(0)
    setUploading(false)
  }

  const deleteDoc = async (doc: TCDocument) => {
    if (!confirm(`Delete TC for "${doc.student_name}"?`)) return
    const { error } = await supabase.from('tc_documents').delete().eq('id', doc.id)
    if (error) { showToast('error', 'Failed'); return }
    setDocuments(prev => prev.filter(d => d.id !== doc.id))
    showToast('success', 'Deleted')
  }

  const openEdit = (doc: TCDocument) => {
    setEditDoc(doc)
    setForm({ student_name: doc.student_name, admission_number: doc.admission_number ?? '', guardian_name: doc.guardian_name ?? '', class_name: doc.class_name, academic_session: doc.academic_session, tc_number: doc.tc_number ?? '', issue_date: doc.issue_date ?? '', internal_notes: doc.internal_notes ?? '' })
    setShowForm(true)
  }

  const filtered = documents.filter(d => {
    const q = search.toLowerCase()
    return !search || d.student_name.toLowerCase().includes(q) || (d.tc_number ?? '').toLowerCase().includes(q) || (d.admission_number ?? '').toLowerCase().includes(q)
  })

  const Field = ({ label, field, type = 'text' }: { label: string; field: keyof typeof emptyForm; type?: string }) => (
    <div>
      <label className="text-xs font-semibold text-[#626262] mb-1 block">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
        className="admin-input text-sm"
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

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Transfer Certificates</h2>
          <p className="text-sm text-[#626262]">{documents.length} documents · Private access only</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditDoc(null); setForm(emptyForm) }}
          className="flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Add TC Document
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h3 className="font-bold text-[#242424] mb-4">{editDoc ? 'Edit TC Document' : 'New TC Document'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Student Name *" field="student_name" />
            <Field label="Admission Number" field="admission_number" />
            <Field label="Guardian Name" field="guardian_name" />
            <Field label="Class" field="class_name" />
            <Field label="Academic Session" field="academic_session" />
            <Field label="TC Number" field="tc_number" />
            <Field label="Date of Issue" field="issue_date" type="date" />
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-[#626262] mb-1 block">Internal Notes</label>
            <textarea
              value={form.internal_notes}
              onChange={e => setForm(f => ({ ...f, internal_notes: e.target.value }))}
              rows={2} className="admin-input text-sm resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-[#626262] mb-2 block">PDF Document {editDoc ? '(leave blank to keep existing)' : '*'}</label>
            <label className="dropzone flex items-center gap-3 p-4 cursor-pointer">
              <Upload size={18} className="text-[#A50026] shrink-0" />
              <div>
                <p className="text-sm text-[#242424] font-medium">{selectedFile ? selectedFile.name : 'Click to select PDF'}</p>
                <p className="text-xs text-[#9CA3AF]">PDF only · Max 20MB</p>
              </div>
              <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] ?? null)} />
            </label>
            {uploading && progress > 0 && (
              <div className="progress-bar mt-2">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setShowForm(false); setEditDoc(null) }} className="flex-1 py-2.5 border border-[#E5E5E5] rounded-xl text-sm font-medium text-[#626262] hover:bg-[#F5F5F5]">Cancel</button>
            <button onClick={handleSubmit} disabled={uploading} className="flex-1 py-2.5 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white rounded-xl text-sm font-semibold">{uploading ? 'Saving...' : 'Save Document'}</button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 mb-5 max-w-sm">
        <Search size={14} className="text-[#9CA3AF]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, TC no., admission no..." className="bg-transparent text-sm outline-none flex-1" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
            <File size={36} className="mb-3 opacity-30" />
            <p className="font-medium">No documents found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Class</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Session</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">TC No.</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Issue Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5]">
                {filtered.map(doc => (
                  <tr key={doc.id} className="hover:bg-[#FFF7F8] transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-[#242424]">{doc.student_name}</p>
                      <p className="text-xs text-[#9CA3AF]">{doc.guardian_name ? `Ward of ${doc.guardian_name}` : ''}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell"><span className="text-sm text-[#626262]">{doc.class_name}</span></td>
                    <td className="px-4 py-3.5 hidden lg:table-cell"><span className="text-sm text-[#626262]">{doc.academic_session}</span></td>
                    <td className="px-4 py-3.5 hidden lg:table-cell"><span className="text-sm text-[#626262]">{doc.tc_number || '—'}</span></td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-[#9CA3AF]">{doc.issue_date ? format(new Date(doc.issue_date), 'dd MMM yyyy') : '—'}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => openEdit(doc)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] hover:text-[#A50026]">
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => deleteDoc(doc)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#626262] hover:text-red-600">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
