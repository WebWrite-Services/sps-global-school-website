'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Search, Eye, Check, X, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  created_at: string
}

interface Props { initialMessages: Message[] }

const STATUS_DISPLAY: Record<string, string> = {
  unread: 'badge-unread', read: 'badge-read',
  replied: 'badge-replied', closed: 'badge-closed', spam: 'badge-spam',
}

export default function ContactMessagesManager({ initialMessages }: Props) {
  const [messages, setMessages] = useState(initialMessages)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  // Realtime subscription for contact messages
  useEffect(() => {
    const channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'contact_messages',
      }, (payload: any) => {
        setMessages(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          return [payload.new as Message, ...prev]
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'contact_messages',
      }, (payload: any) => {
        setMessages(prev => prev.map(m => m.id === payload.new.id ? (payload.new as Message) : m))
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'contact_messages',
      }, (payload: any) => {
        setMessages(prev => prev.filter(m => m.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id)
    if (error) { showToast('error', 'Failed'); return }
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m))
  }

  const filtered = messages.filter(m => {
    const q = search.toLowerCase()
    return (!search || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q))
      && (!filterStatus || m.status === filterStatus)
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Contact Messages</h2>
          <p className="text-sm text-[#626262]">{messages.filter(m => m.status === 'unread').length} unread · {messages.length} total</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="bg-transparent text-sm outline-none flex-1" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-input w-36 text-sm">
          <option value="">All Status</option>
          {Object.keys(STATUS_DISPLAY).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
            <p className="font-medium">No messages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Sender</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Subject</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5]">
                {filtered.map(msg => (
                  <tr key={msg.id} className={`hover:bg-[#FFF7F8] transition-colors ${msg.status === 'unread' ? 'font-medium' : ''}`}>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-[#242424]">{msg.name}</p>
                      <p className="text-xs text-[#9CA3AF]">{msg.email}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <p className="text-sm text-[#626262] truncate max-w-[200px]">{msg.subject}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={msg.status}
                        onChange={e => updateStatus(msg.id, e.target.value)}
                        className="text-xs border border-[#E5E5E5] rounded-lg px-2 py-1 bg-white outline-none focus:border-[#A50026]"
                      >
                        {Object.keys(STATUS_DISPLAY).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-[#9CA3AF]">{format(new Date(msg.created_at), 'MMM d, yyyy')}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <a href={`mailto:${msg.email}`} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] transition-colors">
                          <Mail size={13} />
                        </a>
                        <Link href={`/admin/contact-messages/${msg.id}`} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] transition-colors">
                          <Eye size={13} />
                        </Link>
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
