import { createClient } from './client'
import { v4 as uuidv4 } from 'uuid'

export type UploadFolder = 'gallery' | 'blogs' | 'banners' | 'hero-banners' | 'pages' | 'tc' | 'media'

export interface UploadResult {
  storagePath: string
  downloadUrl: string
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const ALLOWED_PDF_TYPES = ['application/pdf']
const MAX_IMAGE_SIZE = 10 * 1024 * 1024  // 10MB
const MAX_PDF_SIZE = 20 * 1024 * 1024    // 20MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Only JPEG, PNG, WebP, GIF, and AVIF images are allowed.'
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return 'Image must be smaller than 10MB.'
  }
  return null
}

export function validatePdfFile(file: File): string | null {
  if (!ALLOWED_PDF_TYPES.includes(file.type)) {
    return 'Only PDF files are allowed.'
  }
  if (file.size > MAX_PDF_SIZE) {
    return 'PDF must be smaller than 20MB.'
  }
  return null
}

export async function uploadFile(
  file: File,
  folder: UploadFolder,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  const supabase = createClient()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
  const uniqueName = `${uuidv4()}.${ext}`
  const bucketName = folder === 'pages' ? 'media' : folder
  const filePath = `${uniqueName}`

  onProgress?.(30)

  // Supabase storage upload
  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    })

  if (error) {
    // If in demo mode or network mock
    if (typeof window !== 'undefined' && document.cookie.includes('sps_demo_session=super_admin')) {
      const demoUrl = URL.createObjectURL(file)
      onProgress?.(100)
      return {
        storagePath: `${bucketName}/${filePath}`,
        downloadUrl: demoUrl,
      }
    }
    throw new Error(`Upload failed: ${error.message}`)
  }

  onProgress?.(100)
  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath)

  return {
    storagePath: `${bucketName}/${filePath}`,
    downloadUrl: publicUrlData.publicUrl,
  }
}

export async function deleteFile(storagePath: string): Promise<void> {
  const supabase = createClient()
  const parts = storagePath.split('/')
  const bucket = parts[0]
  const path = parts.slice(1).join('/')
  await supabase.storage.from(bucket).remove([path])
}

export async function getFileUrl(storagePath: string): Promise<string> {
  const supabase = createClient()
  const parts = storagePath.split('/')
  const bucket = parts[0]
  const path = parts.slice(1).join('/')
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
