import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import SettingsManager from '@/components/admin/SettingsManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: settings } = await supabase
    .from('website_settings')
    .select('*')
    .order('key')

  return (
    <AdminShell title="Website Settings">
      <SettingsManager initialSettings={settings ?? []} />
    </AdminShell>
  )
}
