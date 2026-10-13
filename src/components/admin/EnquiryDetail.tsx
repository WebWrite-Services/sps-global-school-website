'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Phone, Mail, Copy, Plus, Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Enquiry {
  id: string
  student_name: string
  parent_name: string
  phone: string
  email: string
  city: string
  class_applying_for: string
  academic_session: string
  message: string
  status: string
  follow_up_at: string | null
  created_at: string
}

interface Note {
  id: string
  note: string
  created_at: string
  profiles?: { full_name: string } | null
}

interface Props {
  enquiry: Enquiry
  notes: Note[]
  currentUserId: string
}

const STATUSES = ['new', 'contacted', 'follow_up', 'visit_scheduled', 'in_progress', 'converted', 'closed']
const STATUS_LABELS: Record<string, string> = {
  new: 'New', contacted: 'Contacted', follow_up: 'Follow Up',
  visit_scheduled: 'Visit Scheduled', in_progress: 'In Progress',
  converted: 'Converted', closed: 'Closed',
}

export default function EnquiryDetail({ enquiry: initial, notes: initialNotes, currentUserId }: Props) {
  const [enquiry, setEnquiry] = useState(initial)
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const updateStatus = async (status: string) => {
    const { error } = await supabase.from('admission_enquiries').update({ status }).eq('id', enquiry.id)
    if (error) { showToast('error', 'Failed'); return }
    setEnquiry(prev => ({ ...prev, status }))
    showToast('success', 'Status updated')
  }

  const addNote = async () => {
    if (!newNote.trim()) return
    setAddingNote(true)
    const { data, error } = await supabase
      .from('admission_notes')
      .insert({ enquiry_id: enquiry.id, note: newNote.trim(), created_by: currentUserId })
      .select('*, profiles(full_name)')
      .single()
    if (error) { showToast('error', 'Failed to add note'); setAddingNote(false); return }
    setNotes(prev => [data, ...prev])
    setNewNote('')
    setAddingNote(false)
    showToast('success', 'Note added')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Back */}
      <Link href="/admin/admissions" className="flex items-center gap-1.5 text-sm text-[#626262] hover:text-[#A50026] mb-5 transition-colors">
        <ArrowLeft size={15} /> Back to Enquiries
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Student card */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FCE5E9] flex items-center justify-center text-[#A50026] text-xl font-bold">
                  {enquiry.student_name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#242424]">{enquiry.student_name}</h2>
                  <p className="text-sm text-[#626262]">Applying for Class {enquiry.class_applying_for} · {enquiry.academic_session}</p>
                </div>
              </div>
              <select
                value={enquiry.status}
                onChange={e => updateStatus(e.target.value)}
                className="text-sm border border-[#E5E5E5] rounded-xl px-3 py-2 bg-white outline-none focus:border-[#A50026]"
              >
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Parent/Guardian', value: enquiry.parent_name },
                { label: 'City', value: enquiry.city || '—' },
                { label: 'Academic Session', value: enquiry.academic_session },
                { label: 'Submitted', value: format(new Date(enquiry.created_at), 'MMM d, yyyy h:mm a') },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-0.5">{f.label}</p>
                  <p className="text-sm text-[#242424] font-medium">{f.value}</p>
                </div>
              ))}
            </div>

            {enquiry.message && (
              <div className="mt-4 p-4 bg-[#F5F5F5] rounded-xl">
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">Message</p>
                <p className="text-sm text-[#242424]">{enquiry.message}</p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#242424] mb-4">Internal Notes</h3>
            <div className="flex gap-3 mb-5">
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                rows={2}
                placeholder="Add a note..."
                className="admin-input resize-none flex-1 text-sm"
              />
              <button
                onClick={addNote}
                disabled={addingNote || !newNote.trim()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white rounded-xl text-sm font-semibold self-end transition-colors"
              >
                <Plus size={14} /> Add
              </button>
            </div>
            {notes.length === 0 ? (
              <p className="text-sm text-[#9CA3AF] text-center py-4">No notes yet</p>
            ) : (
              <div className="space-y-3">
                {notes.map(note => (
                  <div key={note.id} className="bg-[#F5F5F5] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-semibold text-[#242424]">{note.profiles?.full_name ?? 'Staff'}</p>
                      <p className="text-xs text-[#9CA3AF]">{format(new Date(note.created_at), 'MMM d, h:mm a')}</p>
                    </div>
                    <p className="text-sm text-[#626262]">{note.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <h3 className="font-bold text-[#242424] text-sm mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              <a
                href={`tel:${enquiry.phone}`}
                className="flex items-center gap-3 w-full px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-sm font-medium transition-colors"
              >
                <Phone size={15} /> Call {enquiry.phone}
              </a>
              {enquiry.email && (
                <a
                  href={`mailto:${enquiry.email}`}
                  className="flex items-center gap-3 w-full px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-medium transition-colors"
                >
                  <Mail size={15} /> Email Parent
                </a>
              )}
              <button
                onClick={() => { navigator.clipboard.writeText(enquiry.phone); showToast('success', 'Copied!') }}
                className="flex items-center gap-3 w-full px-4 py-2.5 bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#626262] rounded-xl text-sm font-medium transition-colors"
              >
                <Copy size={15} /> Copy Phone Number
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <h3 className="font-bold text-[#242424] text-sm mb-3">Details</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Phone', value: enquiry.phone },
                { label: 'Email', value: enquiry.email || '—' },
                { label: 'City', value: enquiry.city || '—' },
                { label: 'Status', value: STATUS_LABELS[enquiry.status] },
              ].map(f => (
                <div key={f.label} className="flex justify-between items-center">
                  <span className="text-xs text-[#9CA3AF]">{f.label}</span>
                  <span className="text-xs font-medium text-[#242424]">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
