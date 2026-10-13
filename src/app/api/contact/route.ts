import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@supabase/ssr'

const ContactSchema = z.object({
  name:    z.string().min(2, 'Name is required').max(100),
  email:   z.string().email('Valid email required'),
  phone:   z.string().max(15).optional().or(z.literal('')),
  subject: z.string().min(2, 'Subject is required').max(200),
  message: z.string().min(10, 'Message is too short').max(2000),
})

const rateLimitMap = new Map<string, { count: number; reset: number }>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const result = ContactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    )

    const { error } = await supabase.from('contact_messages').insert({
      ...result.data,
      status: 'unread',
    })

    if (error) {
      console.error('Contact insert error:', error.message)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 201 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
