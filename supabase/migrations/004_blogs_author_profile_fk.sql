-- ============================================================
-- SPS Global School - blogs.author_id -> public.profiles relationship
-- ============================================================
-- The admin blog list and the public blog detail page embed
-- `profiles(full_name)` through blogs.author_id. Without a foreign key
-- to public.profiles PostgREST cannot resolve the embed (PGRST200) and
-- the whole query fails, which made /blogs/[slug] return 404 and the
-- admin blogs list come back empty.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.blogs'::regclass
      AND confrelid = 'public.profiles'::regclass
      AND contype = 'f'
  ) THEN
    ALTER TABLE public.blogs
      ADD CONSTRAINT blogs_author_profile_fkey
      FOREIGN KEY (author_id) REFERENCES public.profiles (id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- Postgres does not index FK columns automatically; keeps author joins and
-- profile deletes from scanning blogs.
CREATE INDEX IF NOT EXISTS blogs_author_id_idx ON public.blogs (author_id);
