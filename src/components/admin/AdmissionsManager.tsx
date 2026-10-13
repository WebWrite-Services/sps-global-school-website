'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Search, Filter, Download, Phone, Mail, Eye, Check, X } from 'lucide-react'
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
  status: string
  created_at: string
}

interface Props { initialEnquiries: Enquiry[] }

const STATUSES = ['new', 'contacted', 'follow_up', 'visit_scheduled', 'in_progress', 'converted', 'closed']
const STATUS_DISPLAY: Record<string, { label: string; cls: string }> = {
  new:             { label: 'New',              cls: 'badge-new' },
  contacted:       { label: 'Contacted',        cls: 'badge-contacted' },
  follow_up:       { label: 'Follow Up',        cls: 'badge-follow-up' },
  visit_scheduled: { label: 'Visit Scheduled',  cls: 'badge-scheduled' },
  in_progress:     { label: 'In Progress',      cls: 'badge-follow-up' },
  converted:       { label: 'Converted',        cls: 'badge-converted' },
  closed:          { label: 'Closed',           cls: 'badge-closed' },
}

export default function AdmissionsManager({ initialEnquiries }: Props) {
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  // Realtime subscription for admission enquiries
  useEffect(() => {
    const channel = supabase
      .channel('admissions-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'admission_enquiries',
      }, (payload: any) => {
        setEnquiries(prev => {
          if (prev.some(e => e.id === payload.new.id)) return prev
          return [payload.new as Enquiry, ...prev]
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'admission_enquiries',
      }, (payload: any) => {
        setEnquiries(prev => prev.map(e => e.id === payload.new.id ? (payload.new as Enquiry) : e))
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'admission_enquiries',
      }, (payload: any) => {
        setEnquiries(prev => prev.filter(e => e.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('admission_enquiries').update({ status }).eq('id', id)
    if (error) { showToast('error', 'Failed to update'); return }
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e))
    showToast('success', 'Status updated')
  }

  const exportCSV = () => {
    const headers = ['Student Name', 'Parent Name', 'Phone', 'Email', 'City', 'Class', 'Session', 'Status', 'Date']
    const rows = filtered.map(e => [
      e.student_name, e.parent_name, e.phone, e.email || '', e.city || '',
      e.class_applying_for, e.academic_session, e.status,
      format(new Date(e.created_at), 'dd/MM/yyyy')
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admissions-${format(new Date(), 'yyyyMMdd')}.csv`
    a.click()
  }

  const uniqueClasses = Array.from(new Set(enquiries.map(e => e.class_applying_for).filter(Boolean))).sort()

  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase()
    const matchSearch = !search ||
      e.student_name.toLowerCase().includes(q) ||
      e.parent_name.toLowerCase().includes(q) ||
      e.phone.includes(q)
    return matchSearch && (!filterStatus || e.status === filterStatus) && (!filterClass || e.class_applying_for === filterClass)
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

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Admission Enquiries</h2>
          <p className="text-sm text-[#626262]">
            {filtered.length} enquiries · {enquiries.filter(e => e.status === 'new').length} new
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] px-4 py-2.5 rounded-xl text-sm font-medium text-[#626262] transition-colors"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#9CA3AF]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-input w-40 text-sm">
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_DISPLAY[s]?.label ?? s}</option>)}
        </select>
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="admin-input w-36 text-sm">
          <option value="">All Classes</option>
          {uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
            <p className="font-medium">No enquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Parent</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Class</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5]">
                {filtered.map(enq => {
                  const s = STATUS_DISPLAY[enq.status]
                  return (
                    <tr key={enq.id} className="hover:bg-[#FFF7F8] transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#FCE5E9] flex items-center justify-center text-[#A50026] text-xs font-bold shrink-0">
                            {enq.student_name.charAt(0)}
                          </div>
                          <p className="text-sm font-semibold text-[#242424]">{enq.student_name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <p className="text-sm text-[#626262]">{enq.parent_name}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <a href={`tel:${enq.phone}`} className="flex items-center gap-1 text-sm text-[#A50026] hover:underline">
                            <Phone size={12} /> {enq.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <p className="text-sm text-[#626262]">{enq.class_applying_for}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={enq.status}
                          onChange={e => updateStatus(enq.id, e.target.value)}
                          className="text-xs border border-[#E5E5E5] rounded-lg px-2 py-1 bg-white outline-none focus:border-[#A50026]"
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{STATUS_DISPLAY[s]?.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-xs text-[#9CA3AF]">{format(new Date(enq.created_at), 'MMM d, yyyy')}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-1.5">
                          {enq.email && (
                            <a
                              href={`mailto:${enq.email}`}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] transition-colors"
                            >
                              <Mail size={13} />
                            </a>
                          )}
                          <Link
                            href={`/admin/admissions/${enq.id}`}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] transition-colors"
                          >
                            <Eye size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
