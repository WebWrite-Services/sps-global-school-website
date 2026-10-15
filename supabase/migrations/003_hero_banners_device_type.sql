-- ============================================================
-- Hero Banners — device_type column
-- Lets admin manage separate images for mobile and desktop.
-- Existing rows default to 'both' (shown on every device).
-- ============================================================

ALTER TABLE hero_banners
  ADD COLUMN IF NOT EXISTS device_type TEXT NOT NULL DEFAULT 'both';

ALTER TABLE hero_banners
  DROP CONSTRAINT IF EXISTS hero_banners_device_type_check;

ALTER TABLE hero_banners
  ADD CONSTRAINT hero_banners_device_type_check
  CHECK (device_type IN ('both', 'mobile', 'desktop'));
