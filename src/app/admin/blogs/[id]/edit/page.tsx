import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import BlogEditor from '@/components/admin/BlogEditor'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Edit Blog' }

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [{ data: blog }, { data: categories }] = await Promise.all([
    supabase.from('blogs').select('*').eq('id', id).single(),
    supabase.from('blog_categories').select('*').order('name'),
  ])

  if (!blog) notFound()

  return (
    <AdminShell title="Edit Blog Post">
      <BlogEditor categories={categories ?? []} authorId={user.id} blog={blog} />
    </AdminShell>
  )
}
