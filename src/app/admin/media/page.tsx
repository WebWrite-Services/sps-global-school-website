import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import MediaLibraryManager from '@/components/admin/MediaLibraryManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Media Library' }

export default async function MediaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: media } = await supabase
    .from('media_library')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Media Library">
      <MediaLibraryManager initialMedia={media ?? []} uploadedBy={user.id} />
    </AdminShell>
  )
}
