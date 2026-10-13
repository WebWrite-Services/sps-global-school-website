'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import {
  Images, FileText, LayoutTemplate, UserCheck,
  MessageSquare, File, TrendingUp, Clock, ExternalLink, Radio
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Stats {
  galleryCount: number
  publishedBlogs: number
  draftBlogs: number
  activeBanners: number
  newEnquiries: number
  totalEnquiries: number
  unreadMessages: number
  tcDocs: number
}

interface DashboardOverviewProps {
  stats: Stats
  recentEnquiries: Record<string, string | number>[]
  recentMessages: Record<string, string | number>[]
  recentActivity: Record<string, string | number>[]
}

const STATUS_COLORS: Record<string, string> = {
  new: 'badge-new',
  contacted: 'badge-contacted',
  follow_up: 'badge-follow-up',
  converted: 'badge-converted',
  closed: 'badge-closed',
  unread: 'badge-unread',
  read: 'badge-read',
  replied: 'badge-replied',
  spam: 'badge-spam',
}

function StatCard({
  label, value, sublabel, href, icon: Icon, accent = false, urgent = false
}: {
  label: string
  value: number
  sublabel?: string
  href: string
  icon: React.ElementType
  accent?: boolean
  urgent?: boolean
}) {
  return (
    <Link href={href}>
      <div className={`rounded-2xl p-5 border transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer
        ${accent ? 'bg-[#A50026] text-white border-[#A50026]' : 'bg-white border-[#E5E5E5]'}
        ${urgent ? 'ring-2 ring-[#FFC52E] ring-offset-1' : ''}
      `}>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center
            ${accent ? 'bg-white/15' : 'bg-[#FCE5E9]'}
          `}>
            <Icon size={20} className={accent ? 'text-white' : 'text-[#A50026]'} />
          </div>
          {urgent && value > 0 && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A50026] bg-[#FCE5E9] px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        <p className={`text-3xl font-bold mb-0.5 ${accent ? 'text-white' : 'text-[#242424]'}`}>
          {value.toLocaleString()}
        </p>
        <p className={`text-sm font-medium ${accent ? 'text-white/80' : 'text-[#626262]'}`}>{label}</p>
        {sublabel && (
          <p className={`text-xs mt-0.5 ${accent ? 'text-white/60' : 'text-[#9CA3AF]'}`}>{sublabel}</p>
        )}
      </div>
    </Link>
  )
}


export default function DashboardOverview({
  stats: initialStats, recentEnquiries: initialEnquiries, recentMessages: initialMessages, recentActivity: initialActivity
}: DashboardOverviewProps) {
  const [stats, setStats] = useState(initialStats)
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [messages, setMessages] = useState(initialMessages)
  const [activity, setActivity] = useState(initialActivity)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel('live-admin-dashboard')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'admission_enquiries' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setStats(prev => ({
              ...prev,
              newEnquiries: prev.newEnquiries + 1,
              totalEnquiries: prev.totalEnquiries + 1,
            }))
            setEnquiries(prev => [payload.new, ...prev.slice(0, 4)])
            setActivity(prev => [
              {
                id: `act-${Date.now()}`,
                action: `New Enquiry: ${payload.new?.student_name || 'Student'}`,
                entity_type: 'admission',
                created_at: new Date().toISOString(),
              },
              ...prev.slice(0, 7),
            ])
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_messages' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setStats(prev => ({
              ...prev,
              unreadMessages: prev.unreadMessages + 1,
            }))
            setMessages(prev => [payload.new, ...prev.slice(0, 4)])
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blogs' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            if (payload.new?.status === 'published') {
              setStats(prev => ({ ...prev, publishedBlogs: prev.publishedBlogs + 1 }))
            } else {
              setStats(prev => ({ ...prev, draftBlogs: prev.draftBlogs + 1 }))
            }
          } else if (payload.eventType === 'DELETE') {
            if (payload.old?.status === 'published') {
              setStats(prev => ({ ...prev, publishedBlogs: Math.max(0, prev.publishedBlogs - 1) }))
            } else {
              setStats(prev => ({ ...prev, draftBlogs: Math.max(0, prev.draftBlogs - 1) }))
            }
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'homepage_banners' },
        (payload: any) => {
          if (payload.eventType === 'INSERT' && payload.new?.is_active) {
            setStats(prev => ({ ...prev, activeBanners: prev.activeBanners + 1 }))
          } else if (payload.eventType === 'DELETE' && payload.old?.is_active) {
            setStats(prev => ({ ...prev, activeBanners: Math.max(0, prev.activeBanners - 1) }))
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'gallery_images' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setStats(prev => ({ ...prev, galleryCount: prev.galleryCount + 1 }))
          } else if (payload.eventType === 'DELETE') {
            setStats(prev => ({ ...prev, galleryCount: Math.max(0, prev.galleryCount - 1) }))
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tc_documents' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setStats(prev => ({ ...prev, tcDocs: prev.tcDocs + 1 }))
          } else if (payload.eventType === 'DELETE') {
            setStats(prev => ({ ...prev, tcDocs: Math.max(0, prev.tcDocs - 1) }))
          }
        }
      )
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          setIsLive(true)
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const timeAgo = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[#242424]">Good morning! 👋</h2>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isLive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
              {isLive ? 'Realtime Connected' : 'Live Sync'}
            </span>
          </div>
          <p className="text-[#626262] text-sm mt-0.5">Here's what's happening at SPS Global School.</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-2 text-sm text-[#626262] hover:text-[#A50026] border border-[#E5E5E5] rounded-lg px-3 py-2 bg-white transition-colors"
        >
          <ExternalLink size={14} />
          View Website
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Gallery Images"
          value={stats.galleryCount}
          sublabel="Published"
          href="/admin/gallery"
          icon={Images}
        />
        <StatCard
          label="Published Blogs"
          value={stats.publishedBlogs}
          sublabel={`${stats.draftBlogs} drafts pending`}
          href="/admin/blogs"
          icon={FileText}
        />
        <StatCard
          label="Active Banners"
          value={stats.activeBanners}
          href="/admin/banners"
          icon={LayoutTemplate}
        />
        <StatCard
          label="TC Documents"
          value={stats.tcDocs}
          href="/admin/tc"
          icon={File}
        />
        <StatCard
          label="New Enquiries"
          value={stats.newEnquiries}
          sublabel={`${stats.totalEnquiries} total`}
          href="/admin/admissions"
          icon={UserCheck}
          accent={stats.newEnquiries > 0}
          urgent={stats.newEnquiries > 0}
        />
        <StatCard
          label="Unread Messages"
          value={stats.unreadMessages}
          href="/admin/contact-messages"
          icon={MessageSquare}
          urgent={stats.unreadMessages > 0}
        />
        <StatCard
          label="Total Enquiries"
          value={stats.totalEnquiries}
          href="/admin/admissions"
          icon={TrendingUp}
        />
        <StatCard
          label="Draft Blogs"
          value={stats.draftBlogs}
          sublabel="Need publishing"
          href="/admin/blogs?status=draft"
          icon={FileText}
        />
      </div>

      {/* Recent tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5F5F5]">
            <h3 className="font-bold text-[#242424] text-sm">Recent Admission Enquiries</h3>
            <Link
              href="/admin/admissions"
              className="text-xs text-[#A50026] hover:text-[#85001F] font-semibold transition-colors"
            >
              View all →
            </Link>
          </div>
          {enquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-[#9CA3AF]">
              <UserCheck size={32} className="mb-3 opacity-30" />
              <p className="text-sm">No enquiries yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#F5F5F5]">
              {enquiries.map((enq) => (
                <Link
                  key={enq.id as string}
                  href={`/admin/admissions/${enq.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FFF7F8] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#FCE5E9] flex items-center justify-center text-[#A50026] font-bold text-sm shrink-0">
                    {(enq.student_name as string).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#242424] truncate">{enq.student_name as string}</p>
                    <p className="text-xs text-[#626262] truncate">Class {enq.class_applying_for as string} · {enq.phone as string}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`badge ${STATUS_COLORS[enq.status as string] ?? 'badge-new'}`}>
                      {(enq.status as string).replace('_', ' ')}
                    </span>
                    <p className="text-[10px] text-[#9CA3AF] mt-1">{timeAgo(enq.created_at as string)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5F5F5]">
            <h3 className="font-bold text-[#242424] text-sm">Recent Contact Messages</h3>
            <Link
              href="/admin/contact-messages"
              className="text-xs text-[#A50026] hover:text-[#85001F] font-semibold transition-colors"
            >
              View all →
            </Link>
          </div>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-[#9CA3AF]">
              <MessageSquare size={32} className="mb-3 opacity-30" />
              <p className="text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#F5F5F5]">
              {messages.map((msg) => (
                <Link
                  key={msg.id as string}
                  href={`/admin/contact-messages/${msg.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FFF7F8] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E4D7A5] flex items-center justify-center text-[#624E00] font-bold text-sm shrink-0">
                    {(msg.name as string).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#242424] truncate">{msg.name as string}</p>
                    <p className="text-xs text-[#626262] truncate">{msg.subject as string}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`badge ${STATUS_COLORS[msg.status as string] ?? 'badge-unread'}`}>
                      {msg.status as string}
                    </span>
                    <p className="text-[10px] text-[#9CA3AF] mt-1">{timeAgo(msg.created_at as string)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      {activity.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F5F5F5]">
            <h3 className="font-bold text-[#242424] text-sm">Recent Activity</h3>
          </div>
          <div className="divide-y divide-[#F5F5F5]">
            {activity.map((log) => (
              <div key={log.id as string} className="flex items-center gap-3 px-5 py-3">
                <div className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0">
                  <Clock size={13} className="text-[#626262]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#242424]">
                    <span className="font-medium capitalize">{log.action as string}</span>
                    {' '}
                    <span className="text-[#626262]">{log.entity_type as string}</span>
                  </p>
                </div>
                <p className="text-xs text-[#9CA3AF] shrink-0">{timeAgo(log.created_at as string)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
