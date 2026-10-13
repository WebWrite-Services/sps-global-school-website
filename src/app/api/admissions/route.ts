import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@supabase/ssr'

const AdmissionSchema = z.object({
  parent_name:        z.string().min(2, 'Parent name is required').max(100),
  student_name:       z.string().min(2, 'Student name is required').max(100),
  phone:              z.string().min(10, 'Valid phone number is required').max(15).regex(/^\+?[\d\s-]+$/),
  email:              z.string().email().optional().or(z.literal('')),
  city:               z.string().max(100).optional(),
  class_applying_for: z.string().min(1, 'Class is required').max(20),
  academic_session:   z.string().min(1, 'Session is required').max(20),
  message:            z.string().max(500).optional(),
})

// Simple in-memory rate limiter (use Redis/Upstash in production)
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
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const result = AdmissionSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Create Supabase client with service role for server inserts
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    )

    const { error } = await supabase.from('admission_enquiries').insert({
      ...result.data,
      status: 'new',
    })

    if (error) {
      console.error('Admission insert error:', error.message)
      return NextResponse.json({ error: 'Failed to submit enquiry. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully!' }, { status: 201 })
  } catch (err) {
    console.error('Admission API error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
