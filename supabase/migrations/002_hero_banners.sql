-- ============================================================
-- SPS Global School — Hero Banners Module
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- HERO BANNERS
-- ============================================================
CREATE TABLE IF NOT EXISTS hero_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internal_name TEXT NOT NULL DEFAULT '',
  heading TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  alt_text TEXT DEFAULT '',
  image_path TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS hero_banners_active_idx ON hero_banners(is_active, display_order);

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'hero_banners'
      AND policyname = 'Public can read active hero banners'
  ) THEN
    CREATE POLICY "Public can read active hero banners"
      ON hero_banners FOR SELECT
      USING (is_active = true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'hero_banners'
      AND policyname = 'Admins can read all hero banners'
  ) THEN
    CREATE POLICY "Admins can read all hero banners"
      ON hero_banners FOR SELECT USING (is_admin());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'hero_banners'
      AND policyname = 'Content managers can manage hero banners'
  ) THEN
    CREATE POLICY "Content managers can manage hero banners"
      ON hero_banners FOR ALL
      USING (get_user_role() IN ('super_admin', 'content_manager'));
  END IF;
END $$;

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
DROP TRIGGER IF EXISTS update_hero_banners_updated_at ON hero_banners;
CREATE TRIGGER update_hero_banners_updated_at
  BEFORE UPDATE ON hero_banners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- REALTIME REPLICATION (For live admin updates)
-- ============================================================
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE hero_banners;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;

-- ============================================================
-- STORAGE BUCKET (public read)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-banners', 'hero-banners', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ============================================================
-- STORAGE RLS POLICIES (scoped to the hero-banners bucket)
-- Public read, authenticated insert/update/delete (upsert needs UPDATE)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Public Read Hero Banner Objects'
  ) THEN
    CREATE POLICY "Public Read Hero Banner Objects"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'hero-banners');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Authenticated Upload Hero Banner Objects'
  ) THEN
    CREATE POLICY "Authenticated Upload Hero Banner Objects"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'hero-banners');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Authenticated Update Hero Banner Objects'
  ) THEN
    CREATE POLICY "Authenticated Update Hero Banner Objects"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (bucket_id = 'hero-banners')
      WITH CHECK (bucket_id = 'hero-banners');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Authenticated Delete Hero Banner Objects'
  ) THEN
    CREATE POLICY "Authenticated Delete Hero Banner Objects"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (bucket_id = 'hero-banners');
  END IF;
END $$;
