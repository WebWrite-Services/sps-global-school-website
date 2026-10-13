'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Mail, Plus, Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id: string; name: string; email: string; phone: string
  subject: string; message: string; status: string; created_at: string
}
interface Note { id: string; note: string; created_at: string; profiles?: { full_name: string } | null }
interface Props { message: Message; notes: Note[]; currentUserId: string }

const STATUSES = ['unread', 'read', 'replied', 'closed', 'spam']

export default function MessageDetail({ message: initial, notes: initialNotes, currentUserId }: Props) {
  const [message, setMessage] = useState(initial)
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
  }

  const updateStatus = async (status: string) => {
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', message.id)
    if (error) { showToast('error', 'Failed'); return }
    setMessage(prev => ({ ...prev, status }))
    showToast('success', 'Updated')
  }

  const addNote = async () => {
    if (!newNote.trim()) return
    setAddingNote(true)
    const { data, error } = await supabase
      .from('contact_notes')
      .insert({ message_id: message.id, note: newNote.trim(), created_by: currentUserId })
      .select('*, profiles(full_name)').single()
    if (error) { showToast('error', 'Failed'); setAddingNote(false); return }
    setNotes(prev => [data, ...prev])
    setNewNote('')
    setAddingNote(false)
    showToast('success', 'Note added')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      <Link href="/admin/contact-messages" className="flex items-center gap-1.5 text-sm text-[#626262] hover:text-[#A50026] mb-5">
        <ArrowLeft size={15} /> Back
      </Link>

      {/* Message card */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#242424]">{message.subject}</h2>
            <p className="text-sm text-[#626262]">From {message.name} · {message.email}</p>
          </div>
          <select
            value={message.status}
            onChange={e => updateStatus(e.target.value)}
            className="text-sm border border-[#E5E5E5] rounded-xl px-3 py-2 bg-white outline-none focus:border-[#A50026]"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>

        <div className="bg-[#F5F5F5] rounded-xl p-4 mb-4">
          <p className="text-sm text-[#242424] whitespace-pre-wrap">{message.message}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
          <span>{format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}</span>
          {message.phone && <span>Phone: {message.phone}</span>}
        </div>

        <div className="flex gap-2 mt-4">
          <a
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#A50026] hover:bg-[#85001F] text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <Mail size={14} /> Reply via Email
          </a>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
        <h3 className="font-bold text-[#242424] mb-4">Internal Notes</h3>
        <div className="flex gap-3 mb-4">
          <textarea
            value={newNote} onChange={e => setNewNote(e.target.value)}
            rows={2} placeholder="Add a note..." className="admin-input resize-none flex-1 text-sm"
          />
          <button
            onClick={addNote} disabled={addingNote || !newNote.trim()}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white rounded-xl text-sm font-semibold self-end"
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
                <div className="flex justify-between mb-1">
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
  )
}
