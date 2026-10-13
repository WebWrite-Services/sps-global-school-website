import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import AdmissionsManager from '@/components/admin/AdmissionsManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Admission Enquiries' }

export default async function AdmissionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: enquiries } = await supabase
    .from('admission_enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Admission Enquiries">
      <AdmissionsManager initialEnquiries={enquiries ?? []} />
    </AdminShell>
  )
}
