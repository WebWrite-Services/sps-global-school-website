-- ============================================================
-- SPS Global School Admin Portal — Supabase SQL Migration
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase Auth users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'content_manager'
    CHECK (role IN ('super_admin', 'content_manager', 'admission_manager', 'reception')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile when a new auth user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- ============================================================
-- GALLERY CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO gallery_categories (name, slug, display_order) VALUES
  ('Campus', 'campus', 1),
  ('Classrooms', 'classrooms', 2),
  ('Events', 'events', 3),
  ('Sports', 'sports', 4),
  ('Cultural Activities', 'cultural-activities', 5),
  ('Celebrations', 'celebrations', 6),
  ('Academic Activities', 'academic-activities', 7),
  ('Infrastructure', 'infrastructure', 8)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  alt_text TEXT NOT NULL DEFAULT '',
  category_id UUID REFERENCES gallery_categories(id) ON DELETE SET NULL,
  storage_path TEXT NOT NULL,
  download_url TEXT NOT NULL DEFAULT '',
  mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
  file_size BIGINT NOT NULL DEFAULT 0,
  display_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gallery_images_status_idx ON gallery_images(status);
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images(category_id);
CREATE INDEX IF NOT EXISTS gallery_images_order_idx ON gallery_images(display_order);

-- ============================================================
-- BLOG CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO blog_categories (name, slug) VALUES
  ('School News', 'school-news'),
  ('Academic Updates', 'academic-updates'),
  ('Events & Celebrations', 'events-celebrations'),
  ('Sports', 'sports'),
  ('Achievements', 'achievements'),
  ('Admissions', 'admissions'),
  ('General', 'general')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- BLOG TAGS
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

-- ============================================================
-- BLOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  featured_image_path TEXT DEFAULT '',
  featured_image_url TEXT DEFAULT '',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  canonical_url TEXT DEFAULT '',
  og_image_path TEXT DEFAULT '',
  og_image_url TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_status_idx ON blogs(status);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx ON blogs(published_at DESC);

-- ============================================================
-- BLOG POST TAGS (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_post_tags (
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_id, tag_id)
);

-- ============================================================
-- TC DOCUMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS tc_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  admission_number TEXT DEFAULT '',
  guardian_name TEXT DEFAULT '',
  class_name TEXT NOT NULL DEFAULT '',
  academic_session TEXT NOT NULL DEFAULT '',
  tc_number TEXT DEFAULT '',
  issue_date DATE,
  storage_path TEXT NOT NULL,
  internal_notes TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tc_student_name_idx ON tc_documents(student_name);
CREATE INDEX IF NOT EXISTS tc_admission_number_idx ON tc_documents(admission_number);
CREATE INDEX IF NOT EXISTS tc_session_idx ON tc_documents(academic_session);

-- ============================================================
-- HOMEPAGE BANNERS
-- ============================================================
CREATE TABLE IF NOT EXISTS homepage_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internal_name TEXT NOT NULL DEFAULT '',
  heading TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  desktop_image_path TEXT NOT NULL DEFAULT '',
  desktop_image_url TEXT NOT NULL DEFAULT '',
  mobile_image_path TEXT DEFAULT '',
  mobile_image_url TEXT DEFAULT '',
  desktop_alt_text TEXT DEFAULT '',
  mobile_alt_text TEXT DEFAULT '',
  primary_button_text TEXT DEFAULT '',
  primary_button_url TEXT DEFAULT '',
  secondary_button_text TEXT DEFAULT '',
  secondary_button_url TEXT DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT false,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS banners_active_idx ON homepage_banners(is_active, display_order);

-- ============================================================
-- ADMISSION ENQUIRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS admission_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_name TEXT NOT NULL DEFAULT '',
  student_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT DEFAULT '',
  city TEXT DEFAULT '',
  class_applying_for TEXT NOT NULL DEFAULT '',
  academic_session TEXT NOT NULL DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'follow_up', 'visit_scheduled', 'in_progress', 'converted', 'closed')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  follow_up_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_status_idx ON admission_enquiries(status);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON admission_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_student_name_idx ON admission_enquiries(student_name);

-- ============================================================
-- ADMISSION NOTES
-- ============================================================
CREATE TABLE IF NOT EXISTS admission_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id UUID NOT NULL REFERENCES admission_enquiries(id) ON DELETE CASCADE,
  note TEXT NOT NULL DEFAULT '',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'unread'
    CHECK (status IN ('unread', 'read', 'replied', 'closed', 'spam')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_status_idx ON contact_messages(status);
CREATE INDEX IF NOT EXISTS contact_created_idx ON contact_messages(created_at DESC);

-- ============================================================
-- CONTACT NOTES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES contact_messages(id) ON DELETE CASCADE,
  note TEXT NOT NULL DEFAULT '',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- SCHOOL PAGES (CMS)
-- ============================================================
CREATE TABLE IF NOT EXISTS school_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  heading TEXT DEFAULT '',
  introduction TEXT DEFAULT '',
  content TEXT DEFAULT '',
  image_path TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  cta_text TEXT DEFAULT '',
  cta_link TEXT DEFAULT '',
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO school_pages (title, slug, status) VALUES
  ('About Us', 'about-us', 'published'),
  ('Vision & Mission', 'vision-mission', 'published'),
  ('Our Campus', 'our-campus', 'published'),
  ('Our Classroom', 'our-classroom', 'published'),
  ('Library', 'library', 'published'),
  ('Labs', 'labs', 'published'),
  ('Co-curricular Activities', 'co-curricular-activities', 'published'),
  ('Contact Us', 'contact-us', 'published')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- WEBSITE SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS website_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO website_settings (key, value) VALUES
  ('school_name', 'SPS Global School'),
  ('school_email', 'sps.globalschool@gmail.com'),
  ('school_phone', '+91 7618307200'),
  ('school_address', 'NH-19, Agra Road, Kaist, Jaswantnagar, Etawah, UP 206245'),
  ('facebook_url', 'https://facebook.com'),
  ('instagram_url', 'https://instagram.com'),
  ('youtube_url', 'https://youtube.com'),
  ('linkedin_url', 'https://linkedin.com'),
  ('admission_email', 'admissions@spsglobalschool.com'),
  ('default_seo_title', 'SPS Global School, Jaswantnagar, Etawah'),
  ('default_seo_description', 'Explore SPS Global School, Jaswantnagar. CBSE curriculum, smart classrooms, labs, and admission enquiries.')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- AUDIT LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL DEFAULT '',
  entity_type TEXT NOT NULL DEFAULT '',
  entity_id TEXT DEFAULT '',
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_user_idx ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS audit_created_idx ON audit_logs(created_at DESC);

-- ============================================================
-- MEDIA LIBRARY (unified view of all uploaded assets)
-- ============================================================
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL DEFAULT '',
  storage_path TEXT NOT NULL UNIQUE,
  download_url TEXT NOT NULL DEFAULT '',
  mime_type TEXT NOT NULL DEFAULT '',
  file_size BIGINT NOT NULL DEFAULT 0,
  width INT,
  height INT,
  folder TEXT NOT NULL DEFAULT 'media',
  used_in JSONB DEFAULT '[]',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS media_folder_idx ON media_library(folder);
CREATE INDEX IF NOT EXISTS media_created_idx ON media_library(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Helper function: get current user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Helper function: is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_active = true
    AND role IN ('super_admin', 'content_manager', 'admission_manager', 'reception')
  );
$$;

-- ---- PROFILES ----
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (is_admin());

CREATE POLICY "Super admin can manage profiles"
  ON profiles FOR ALL USING (get_user_role() = 'super_admin');

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (id = auth.uid());

-- ---- GALLERY CATEGORIES ----
CREATE POLICY "Public can read gallery categories"
  ON gallery_categories FOR SELECT USING (true);

CREATE POLICY "Content managers can manage gallery categories"
  ON gallery_categories FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- GALLERY IMAGES ----
CREATE POLICY "Public can read published gallery images"
  ON gallery_images FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can read all gallery images"
  ON gallery_images FOR SELECT USING (is_admin());

CREATE POLICY "Content managers can manage gallery images"
  ON gallery_images FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- BLOG CATEGORIES & TAGS ----
CREATE POLICY "Public can read blog categories"
  ON blog_categories FOR SELECT USING (true);

CREATE POLICY "Content managers can manage blog categories"
  ON blog_categories FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

CREATE POLICY "Public can read blog tags"
  ON blog_tags FOR SELECT USING (true);

CREATE POLICY "Content managers can manage blog tags"
  ON blog_tags FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- BLOGS ----
CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));

CREATE POLICY "Admins can read all blogs"
  ON blogs FOR SELECT USING (is_admin());

CREATE POLICY "Content managers can manage blogs"
  ON blogs FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- BLOG POST TAGS ----
CREATE POLICY "Public can read blog post tags"
  ON blog_post_tags FOR SELECT USING (true);

CREATE POLICY "Content managers can manage blog post tags"
  ON blog_post_tags FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- TC DOCUMENTS (private) ----
CREATE POLICY "Only authorized staff can access TC documents"
  ON tc_documents FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- HOMEPAGE BANNERS ----
CREATE POLICY "Public can read active banners"
  ON homepage_banners FOR SELECT
  USING (
    is_active = true
    AND (starts_at IS NULL OR starts_at <= now())
    AND (ends_at IS NULL OR ends_at > now())
  );

CREATE POLICY "Admins can read all banners"
  ON homepage_banners FOR SELECT USING (is_admin());

CREATE POLICY "Content managers can manage banners"
  ON homepage_banners FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- ADMISSION ENQUIRIES ----
CREATE POLICY "Public can insert enquiries"
  ON admission_enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authorized staff can view enquiries"
  ON admission_enquiries FOR SELECT
  USING (get_user_role() IN ('super_admin', 'admission_manager'));

CREATE POLICY "Authorized staff can update enquiry status"
  ON admission_enquiries FOR UPDATE
  USING (get_user_role() IN ('super_admin', 'admission_manager'));

-- ---- ADMISSION NOTES ----
CREATE POLICY "Authorized staff can manage admission notes"
  ON admission_notes FOR ALL
  USING (get_user_role() IN ('super_admin', 'admission_manager'));

-- ---- CONTACT MESSAGES ----
CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Reception staff can view contact messages"
  ON contact_messages FOR SELECT
  USING (get_user_role() IN ('super_admin', 'reception'));

CREATE POLICY "Reception staff can update contact messages"
  ON contact_messages FOR UPDATE
  USING (get_user_role() IN ('super_admin', 'reception'));

-- ---- CONTACT NOTES ----
CREATE POLICY "Reception staff can manage contact notes"
  ON contact_notes FOR ALL
  USING (get_user_role() IN ('super_admin', 'reception'));

-- ---- SCHOOL PAGES ----
CREATE POLICY "Public can read published school pages"
  ON school_pages FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can read all school pages"
  ON school_pages FOR SELECT USING (is_admin());

CREATE POLICY "Content managers can manage school pages"
  ON school_pages FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ---- WEBSITE SETTINGS ----
CREATE POLICY "Admins can read settings"
  ON website_settings FOR SELECT USING (is_admin());

CREATE POLICY "Super admin can manage settings"
  ON website_settings FOR ALL
  USING (get_user_role() = 'super_admin');

-- ---- AUDIT LOGS ----
CREATE POLICY "Admins can read audit logs"
  ON audit_logs FOR SELECT USING (is_admin());

CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT WITH CHECK (true);

-- ---- MEDIA LIBRARY ----
CREATE POLICY "Admins can read media library"
  ON media_library FOR SELECT USING (is_admin());

CREATE POLICY "Content managers can manage media library"
  ON media_library FOR ALL
  USING (get_user_role() IN ('super_admin', 'content_manager'));

-- ============================================================
-- UPDATED_AT triggers
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tc_documents_updated_at BEFORE UPDATE ON tc_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_homepage_banners_updated_at BEFORE UPDATE ON homepage_banners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admission_enquiries_updated_at BEFORE UPDATE ON admission_enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_school_pages_updated_at BEFORE UPDATE ON school_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- REALTIME REPLICATION (For live dashboard updates)
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE admission_enquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE blogs;
ALTER PUBLICATION supabase_realtime ADD TABLE gallery_images;
ALTER PUBLICATION supabase_realtime ADD TABLE homepage_banners;

-- ============================================================
-- SUPER ADMIN SEED
-- ============================================================
INSERT INTO public.profiles (id, email, full_name, role, is_active)
VALUES ('86344944-cdb8-4ca8-a93f-eba9de6aa697', 'admin@spsglobalschool.com', 'SPS Super Admin', 'super_admin', true)
ON CONFLICT (id) DO UPDATE SET role = 'super_admin', is_active = true;

-- ============================================================
-- STORAGE RLS POLICIES (Public read & Authenticated upload)
-- ============================================================
CREATE POLICY "Public Read All Buckets" ON storage.objects
  FOR SELECT USING (bucket_id IN ('gallery', 'blogs', 'banners', 'media', 'tc'));

CREATE POLICY "Authenticated Users Upload Objects" ON storage.objects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Delete Objects" ON storage.objects
  FOR DELETE USING (auth.role() = 'authenticated');


