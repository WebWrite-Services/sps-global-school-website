import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import GalleryManager from '@/components/admin/GalleryManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Gallery' }

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [{ data: images }, { data: categories }] = await Promise.all([
    supabase
      .from('gallery_images')
      .select('*, gallery_categories(name)')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase
      .from('gallery_categories')
      .select('*')
      .order('display_order'),
  ])

  return (
    <AdminShell title="Gallery Management">
      <GalleryManager
        initialImages={images ?? []}
        categories={categories ?? []}
      />
    </AdminShell>
  )
}
