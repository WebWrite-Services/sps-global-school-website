import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import ContactMessagesManager from '@/components/admin/ContactMessagesManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Contact Messages' }

export default async function ContactMessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Contact Messages">
      <ContactMessagesManager initialMessages={messages ?? []} />
    </AdminShell>
  )
}
