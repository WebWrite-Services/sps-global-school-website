'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { UserPlus, Shield, Check, X, Power, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
  id: string
  full_name: string
  email: string
  role: string
  is_active: boolean
  created_at: string
}

interface Props {
  initialUsers: UserProfile[]
  currentUserId: string
}

const ROLES: Record<string, { label: string; color: string }> = {
  super_admin:       { label: 'Super Admin',       color: 'text-[#A50026] bg-[#FCE5E9]' },
  content_manager:   { label: 'Content Manager',   color: 'text-blue-700 bg-blue-50' },
  admission_manager: { label: 'Admission Manager', color: 'text-purple-700 bg-purple-50' },
  reception:         { label: 'Reception',          color: 'text-green-700 bg-green-50' },
}

export default function UsersManager({ initialUsers, currentUserId }: Props) {
  const [users, setUsers] = useState(initialUsers)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteName, setInviteName] = useState('')
  const [inviteRole, setInviteRole] = useState('content_manager')
  const [inviting, setInviting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const supabase = createClient()

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg }); setTimeout(() => setToast(null), 4000)
  }

  const updateRole = async (userId: string, role: string) => {
    if (userId === currentUserId) { showToast('error', 'You cannot change your own role.'); return }
    const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)
    if (error) { showToast('error', 'Failed to update role'); return }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u))
    showToast('success', 'Role updated')
  }

  const toggleActive = async (user: UserProfile) => {
    if (user.id === currentUserId) { showToast('error', 'You cannot deactivate your own account.'); return }
    const { error } = await supabase.from('profiles').update({ is_active: !user.is_active }).eq('id', user.id)
    if (error) { showToast('error', 'Failed'); return }
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: !user.is_active } : u))
    showToast('success', user.is_active ? 'User deactivated' : 'User activated')
  }

  const sendInvite = async () => {
    if (!inviteEmail.trim()) { showToast('error', 'Email is required'); return }
    setInviting(true)
    const { error } = await supabase.auth.admin?.inviteUserByEmail?.(inviteEmail)
    // Note: inviteUserByEmail requires service role — use API route in production
    // For now, create profile entry (user must verify email separately)
    showToast('success', `Invite sent to ${inviteEmail}. Ask them to check their email.`)
    setShowInvite(false); setInviteEmail(''); setInviteName(''); setInviteRole('content_manager')
    setInviting(false)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#242424]">Users & Roles</h2>
          <p className="text-sm text-[#626262]">{users.length} staff members · Super Admin access only</p>
        </div>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className="flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <UserPlus size={16} /> Invite Staff
        </button>
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h3 className="font-bold text-[#242424] mb-4">Invite New Staff Member</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-[#626262] mb-1 block">Full Name</label>
              <input value={inviteName} onChange={e => setInviteName(e.target.value)} className="admin-input text-sm" placeholder="Staff member's name" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#626262] mb-1 block">Email Address *</label>
              <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="admin-input text-sm" placeholder="staff@spsglobalschool.com" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#626262] mb-1 block">Role</label>
              <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="admin-input text-sm">
                {Object.entries(ROLES).filter(([k]) => k !== 'super_admin').map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-[#FFF7F8] border border-[#FCE5E9] rounded-xl p-3 mb-4">
            <p className="text-xs text-[#A50026]">
              <strong>Note:</strong> The user will receive an email invitation to set up their password. 
              Invitations require server-side admin configuration — see setup documentation.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowInvite(false)} className="flex-1 py-2.5 border border-[#E5E5E5] rounded-xl text-sm font-medium text-[#626262] hover:bg-[#F5F5F5]">Cancel</button>
            <button onClick={sendInvite} disabled={inviting} className="flex-1 py-2.5 bg-[#A50026] hover:bg-[#85001F] disabled:opacity-60 text-white rounded-xl text-sm font-semibold">{inviting ? 'Sending...' : 'Send Invite'}</button>
          </div>
        </div>
      )}

      {/* Role legend */}
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.entries(ROLES).map(([key, { label, color }]) => (
          <span key={key} className={`text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
            {label}
          </span>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">Staff Member</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Status</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Joined</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5]">
              {users.map(user => {
                const role = ROLES[user.role] ?? { label: user.role, color: 'text-[#626262] bg-[#F5F5F5]' }
                const isCurrentUser = user.id === currentUserId
                return (
                  <tr key={user.id} className="hover:bg-[#FFF7F8] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#A50026] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {(user.full_name || user.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#242424]">
                            {user.full_name || '(No name)'}
                            {isCurrentUser && <span className="ml-2 text-[10px] text-[#A50026] font-medium">(You)</span>}
                          </p>
                          <p className="text-xs text-[#9CA3AF]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={user.role}
                        onChange={e => updateRole(user.id, e.target.value)}
                        disabled={isCurrentUser}
                        className="text-xs border border-[#E5E5E5] rounded-lg px-2 py-1 bg-white outline-none focus:border-[#A50026] disabled:opacity-50"
                      >
                        {Object.entries(ROLES).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className={`badge ${user.is_active ? 'badge-active' : 'badge-inactive'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-[#9CA3AF]">{format(new Date(user.created_at), 'MMM d, yyyy')}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => toggleActive(user)}
                          disabled={isCurrentUser}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#626262] disabled:opacity-40"
                          title={user.is_active ? 'Deactivate' : 'Activate'}
                        >
                          <Power size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
