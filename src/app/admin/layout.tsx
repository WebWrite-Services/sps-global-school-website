import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import '../globals.css'
import './admin.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Admin Portal — SPS Global School',
    template: '%s | SPS Admin',
  },
  description: 'SPS Global School Admin Portal — Manage school content, enquiries, and settings.',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`admin-portal-wrapper fixed inset-0 z-[100] bg-[#F5F5F5] text-[#242424] antialiased overflow-y-auto ${manrope.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
