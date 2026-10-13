'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    if (authError) { setError(authError.message); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C0008] via-[#A50026] to-[#85001F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#A50026] to-[#85001F] px-8 py-6 text-center">
            <h1 className="text-lg font-bold text-white">Reset Password</h1>
            <p className="text-white/70 text-sm">SPS Global School Admin Portal</p>
          </div>
          <div className="px-8 py-8">
            {sent ? (
              <div className="text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-[#242424] mb-2">Check your email</h2>
                <p className="text-sm text-[#626262] mb-6">
                  We sent a password reset link to <strong>{email}</strong>. 
                  Check your inbox and follow the instructions.
                </p>
                <Link href="/admin/login" className="text-sm text-[#A50026] hover:underline">
                  ← Back to login
                </Link>
              </div>
            ) : (
              <>
                <p className="text-sm text-[#626262] mb-6">
                  Enter your staff email and we'll send you a reset link.
                </p>
                {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-[#242424] mb-1.5 block">Email Address</label>
                    <input
                      type="email" required value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="admin-input" placeholder="your@email.com"
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm"
                  >
                    <Mail size={15} /> {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <Link href="/admin/login" className="flex items-center justify-center gap-1.5 text-sm text-[#626262] hover:text-[#A50026]">
                    <ArrowLeft size={14} /> Back to login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
