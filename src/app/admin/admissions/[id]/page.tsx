import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import EnquiryDetail from '@/components/admin/EnquiryDetail'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Enquiry Detail' }

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [{ data: enquiry }, { data: notes }] = await Promise.all([
    supabase.from('admission_enquiries').select('*').eq('id', id).single(),
    supabase
      .from('admission_notes')
      .select('*, profiles(full_name)')
      .eq('enquiry_id', id)
      .order('created_at', { ascending: false }),
  ])

  if (!enquiry) notFound()

  return (
    <AdminShell title="Enquiry Detail">
      <EnquiryDetail enquiry={enquiry} notes={notes ?? []} currentUserId={user.id} />
    </AdminShell>
  )
}
