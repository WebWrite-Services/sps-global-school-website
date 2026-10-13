import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import MessageDetail from '@/components/admin/MessageDetail'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Message Detail' }

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [{ data: message }, { data: notes }] = await Promise.all([
    supabase.from('contact_messages').select('*').eq('id', id).single(),
    supabase
      .from('contact_notes')
      .select('*, profiles(full_name)')
      .eq('message_id', id)
      .order('created_at', { ascending: false }),
  ])

  if (!message) notFound()

  return (
    <AdminShell title="Message Detail">
      <MessageDetail message={message} notes={notes ?? []} currentUserId={user.id} />
    </AdminShell>
  )
}
