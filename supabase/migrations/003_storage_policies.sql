-- ============================================================
-- SPS Global School — Storage Buckets & Policies
-- Buckets: tc, gallery, blogs, banners, media
-- (hero-banners already handled in 002_hero_banners.sql)
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- ============================================================
-- STORAGE BUCKETS (public read — URLs used by public pages)
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('tc', 'tc', true, 20971520, ARRAY['application/pdf']::text[]),
  ('gallery', 'gallery', true, 10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']::text[]),
  ('blogs', 'blogs', true, 10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']::text[]),
  ('banners', 'banners', true, 10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']::text[]),
  ('media', 'media', true, 20971520,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']::text[])
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================================
-- STORAGE RLS POLICIES
-- Public read, admin-staff insert/update/delete
-- (upsert needs INSERT + SELECT + UPDATE)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Public Read App Objects'
  ) THEN
    CREATE POLICY "Public Read App Objects"
      ON storage.objects FOR SELECT
      USING (bucket_id IN ('tc', 'gallery', 'blogs', 'banners', 'media'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Staff Upload App Objects'
  ) THEN
    CREATE POLICY "Staff Upload App Objects"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id IN ('tc', 'gallery', 'blogs', 'banners', 'media')
        AND public.is_admin()
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Staff Update App Objects'
  ) THEN
    CREATE POLICY "Staff Update App Objects"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (
        bucket_id IN ('tc', 'gallery', 'blogs', 'banners', 'media')
        AND public.is_admin()
      )
      WITH CHECK (
        bucket_id IN ('tc', 'gallery', 'blogs', 'banners', 'media')
        AND public.is_admin()
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Staff Delete App Objects'
  ) THEN
    CREATE POLICY "Staff Delete App Objects"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (
        bucket_id IN ('tc', 'gallery', 'blogs', 'banners', 'media')
        AND public.is_admin()
      );
  END IF;
END $$;
