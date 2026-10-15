'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard, Images, FileText, File, LayoutTemplate,
  UserCheck, MessageSquare, Globe, Library, Users, Settings,
  LogOut, ChevronLeft, Menu, X, Bell, Search, ChevronDown,
  Image as ImageIcon
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/hero-banners', label: 'Hero Banners', icon: ImageIcon },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/tc', label: 'TC Documents', icon: File },
  { href: '/admin/banners', label: 'Banners', icon: LayoutTemplate },
  { href: '/admin/admissions', label: 'Admission Enquiries', icon: UserCheck },
  { href: '/admin/contact-messages', label: 'Contact Messages', icon: MessageSquare },
  { href: '/admin/pages', label: 'Website Pages', icon: Globe },
  { href: '/admin/media', label: 'Media Library', icon: Library },
  { href: '/admin/users', label: 'Users & Roles', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface AdminShellProps {
  children: React.ReactNode
  title: string
}

export default function AdminShell({ children, title }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then((res: any) => {
      const user = res?.data?.user
      if (user) {
        setUserEmail(user.email ?? '')
        supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', user.id)
          .single()
          .then((pRes: any) => {
            if (pRes?.data) setUserRole(pRes.data.role)
          })
      }
    })
  }, [])

  const handleLogout = async () => {
    document.cookie = 'sps_demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    try {
      await supabase.auth.signOut()
    } catch {}
    router.push('/admin/login')
  }

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  const roleLabel: Record<string, string> = {
    super_admin: 'Super Admin',
    content_manager: 'Content Manager',
    admission_manager: 'Admission Manager',
    reception: 'Reception',
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-40 flex flex-col bg-[#1C0008] text-white
          ${sidebarOpen ? 'w-64' : 'w-16'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:flex`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 min-h-[64px]">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
              <Image
                src="/images/branding/sps-logo.png"
                alt="SPS Global School"
                width={36}
                height={36}
                className="rounded-lg shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">SPS Global School</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Admin Portal</p>
              </div>
            </Link>
          )}
          {!sidebarOpen && (
            <Link href="/admin" className="mx-auto">
              <Image
                src="/images/branding/sps-logo.png"
                alt="SPS"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 transition-colors shrink-0"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft
              size={14}
              className={`transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-nav-scroll flex-1 py-3 px-2" suppressHydrationWarning>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(item)
            return (
               <Link
                 key={item.href}
                 href={item.href}
                 onClick={() => setMobileOpen(false)}
                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all
                  ${active
                    ? 'bg-[#A50026] text-white shadow-sm'
                    : 'text-white/65 hover:text-white hover:bg-white/10'
                  }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 w-full transition-all"
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top navigation */}
        <header className="h-16 bg-white border-b border-[#E5E5E5] flex items-center gap-4 px-4 lg:px-6 shrink-0 z-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#F5F5F5] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Page title */}
          <h1 className="text-base font-bold text-[#242424] flex-1 truncate">{title}</h1>

          {/* Search (desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-[#F5F5F5] rounded-lg px-3 py-2 w-52">
            <Search size={14} className="text-[#626262] shrink-0" />
            <input
              type="text"
              placeholder="Quick search..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Notification bell */}
          <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#F5F5F5] transition-colors">
            <Bell size={18} className="text-[#626262]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#A50026] rounded-full" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#F5F5F5] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#A50026] flex items-center justify-center text-white text-sm font-bold shrink-0">
                {userEmail.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#242424] leading-tight max-w-[120px] truncate">
                  {userEmail}
                </p>
                <p className="text-[10px] text-[#626262]">{roleLabel[userRole] || 'Staff'}</p>
              </div>
              <ChevronDown size={14} className="text-[#626262] hidden sm:block" />
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-[#E5E5E5] z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#F5F5F5]">
                    <p className="text-xs font-semibold text-[#242424] truncate">{userEmail}</p>
                    <p className="text-[11px] text-[#626262]">{roleLabel[userRole] || 'Staff'}</p>
                  </div>
                  <Link
                    href="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#242424] hover:bg-[#F5F5F5] transition-colors"
                  >
                    <Settings size={14} className="text-[#626262]" /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
