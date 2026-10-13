import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import BlogEditor from '@/components/admin/BlogEditor'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Create Blog' }

export default async function CreateBlogPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: categories } = await supabase
    .from('blog_categories').select('*').order('name')

  return (
    <AdminShell title="Create New Blog Post">
      <BlogEditor categories={categories ?? []} authorId={user.id} />
    </AdminShell>
  )
}
