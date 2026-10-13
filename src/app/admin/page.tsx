import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import DashboardOverview from '@/components/admin/DashboardOverview'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  // Fetch dashboard stats in parallel
  const [
    { count: galleryCount },
    { count: publishedBlogs },
    { count: draftBlogs },
    { count: activeBanners },
    { count: newEnquiries },
    { count: totalEnquiries },
    { count: unreadMessages },
    { count: tcDocs },
    { data: recentEnquiries },
    { data: recentMessages },
    { data: recentActivity },
  ] = await Promise.all([
    supabase.from('gallery_images').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('homepage_banners').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('admission_enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('admission_enquiries').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
    supabase.from('tc_documents').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase
      .from('admission_enquiries')
      .select('id, student_name, parent_name, phone, class_applying_for, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('contact_messages')
      .select('id, name, email, subject, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('audit_logs')
      .select('id, action, entity_type, created_at')
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const stats = {
    galleryCount: galleryCount ?? 0,
    publishedBlogs: publishedBlogs ?? 0,
    draftBlogs: draftBlogs ?? 0,
    activeBanners: activeBanners ?? 0,
    newEnquiries: newEnquiries ?? 0,
    totalEnquiries: totalEnquiries ?? 0,
    unreadMessages: unreadMessages ?? 0,
    tcDocs: tcDocs ?? 0,
  }

  return (
    <AdminShell title="Dashboard">
      <DashboardOverview
        stats={stats}
        recentEnquiries={recentEnquiries ?? []}
        recentMessages={recentMessages ?? []}
        recentActivity={recentActivity ?? []}
      />
    </AdminShell>
  )
}
