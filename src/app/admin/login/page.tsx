'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'


function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const emailTrimmed = email.trim().toLowerCase()
    const isDemoCredentials = emailTrimmed === 'admin@spsglobalschool.com' && password === 'admin123'

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (authError) {
        // Fallback demo session only when real Supabase auth is unavailable
        if (isDemoCredentials && authError.message !== 'Invalid login credentials') {
          document.cookie = 'sps_demo_session=super_admin; path=/; max-age=86400; SameSite=Lax'
          router.push(redirectTo)
          router.refresh()
          return
        }
        setError(
          authError.message === 'Invalid login credentials'
            ? 'Incorrect email or password. Please try again.'
            : authError.message
        )
        setLoading(false)
        return
      }

      router.push(redirectTo)
      router.refresh()
    } catch (err: any) {
      if (isDemoCredentials) {
        document.cookie = 'sps_demo_session=super_admin; path=/; max-age=86400; SameSite=Lax'
        router.push(redirectTo)
        router.refresh()
        return
      }
      setError(err?.message || 'Login failed. Please try demo credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C0008] via-[#A50026] to-[#85001F] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#A50026] to-[#85001F] px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Image
                  src="/images/branding/sps-logo.png"
                  alt="SPS Global School"
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
              </div>
            </div>
            <p className="text-white text-xl font-medium">SPS Global School</p>
            <p className="text-white/70 text-sm mt-1">Admin Portal</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <h2 className="text-lg font-bold text-[#242424] mb-1">Welcome back</h2>
            <p className="text-sm text-[#626262] mb-4">Sign in with your staff credentials</p>

            {/* Demo Login Banner */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 mb-5 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-900 tracking-wide uppercase">⚡ Demo Admin Login</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@spsglobalschool.com')
                    setPassword('admin123')
                  }}
                  className="text-xs bg-[#A50026] hover:bg-[#85001F] text-white px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Quick Fill
                </button>
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                <strong>ID:</strong> <code className="bg-white/70 px-1 py-0.5 rounded">admin@spsglobalschool.com</code><br />
                <strong>Pass:</strong> <code className="bg-white/70 px-1 py-0.5 rounded">admin123</code>
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#242424] mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="admin-input"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-[#242424]">
                    Password
                  </label>
                  <a
                    href="/admin/forgot-password"
                    className="text-xs text-[#A50026] hover:text-[#85001F] font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="admin-input pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626262] hover:text-[#242424] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-[#9CA3AF]">
              Access is restricted to authorized SPS Global School staff only.
            </p>
          </div>
        </div>

        <p className="text-white/40 text-center text-xs mt-6">
          © {new Date().getFullYear()} SPS Global School, Jaswantnagar, Etawah
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#1C0008] via-[#A50026] to-[#85001F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
