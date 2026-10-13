import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import BlogList from '@/components/admin/BlogList'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Blogs' }

export default async function BlogsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: blogs } = await supabase
    .from('blogs')
    .select('*, blog_categories(name), profiles(full_name)')
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name')

  return (
    <AdminShell title="Blog Management">
      <BlogList initialBlogs={blogs ?? []} categories={categories ?? []} />
    </AdminShell>
  )
}
