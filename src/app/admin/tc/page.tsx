import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import TCManager from '@/components/admin/TCManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'TC Documents' }

export default async function TCPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: documents } = await supabase
    .from('tc_documents')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Transfer Certificate Documents">
      <TCManager initialDocuments={documents ?? []} uploadedBy={user.id} />
    </AdminShell>
  )
}
