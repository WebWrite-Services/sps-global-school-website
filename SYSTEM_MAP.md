# SPS Global School — Master System Map & File Directory

This master document provides instant access to **every file, route, component, schema, and configuration** in the SPS Global School platform. Click on any file path link to open and inspect that file immediately.

---

## ⚡ Quick Navigation

- [1. Configuration & Environment](#1-configuration--environment)
- [2. Database, Auth & Backend (Supabase)](#2-database-auth--backend-supabase)
- [3. Public Website Routes](#3-public-website-routes)
- [4. Admin Portal Routes (`/admin`)](#4-admin-portal-routes-admin)
- [5. Admin Portal Components](#5-admin-portal-components)
- [6. Public Website Components](#6-public-website-components)
- [7. Core Libraries & SEO](#7-core-libraries--seo)
- [8. Static Data & School Info](#8-static-data--school-info)
- [9. Assets & Documents](#9-assets--documents)

---

## 1. Configuration & Environment

| File | Purpose |
|---|---|
| [.env](file:///Users/webwriteservices/Desktop/SPS_School_Website/.env) | Active environment variables (Supabase URL, Anon Key, Service Role Key). *Never commit to Git.* |
| [.env.example](file:///Users/webwriteservices/Desktop/SPS_School_Website/.env.example) | Template of environment variables for new developers / deployments. |
| [next.config.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/next.config.ts) | Next.js 16 configuration (Turbopack, cache components, CSS loaders). |
| [package.json](file:///Users/webwriteservices/Desktop/SPS_School_Website/package.json) | NPM scripts (`dev`, `build`, `start`, `preview`) and project dependencies. |
| [tsconfig.json](file:///Users/webwriteservices/Desktop/SPS_School_Website/tsconfig.json) | TypeScript compiler options and `@/*` path alias configuration. |
| [.gitignore](file:///Users/webwriteservices/Desktop/SPS_School_Website/.gitignore) | Files and folders excluded from Git version control. |
| [README.md](file:///Users/webwriteservices/Desktop/SPS_School_Website/README.md) | Official project documentation, setup guide, and architectural overview. |

---

## 2. Database, Auth & Backend (Supabase)

| File | Purpose |
|---|---|
| [supabase/migrations/001_admin_portal.sql](file:///Users/webwriteservices/Desktop/SPS_School_Website/supabase/migrations/001_admin_portal.sql) | **Complete PostgreSQL Schema**: tables (`blogs`, `gallery_images`, `gallery_categories`, `homepage_banners`, `tc_documents`, `admission_enquiries`, `contact_messages`, `profiles`, `media_library`), RLS policies, indexes, and triggers. |
| [src/lib/supabase/client.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/supabase/client.ts) | Browser Supabase client (Client Components & Realtime subscriptions). |
| [src/lib/supabase/server.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/supabase/server.ts) | Server Supabase client using `@supabase/ssr` cookies and `await connection()`. |
| [src/lib/supabase/storage.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/supabase/storage.ts) | Storage bucket upload, delete, public URL resolver, and file size/type validators. |
| [src/lib/supabase/middleware.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/supabase/middleware.ts) | Middleware helper to refresh user auth sessions across protected `/admin` routes. |
| [src/lib/supabase/demo.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/supabase/demo.ts) | Offline/Demo Supabase client with in-memory CRUD for testing without active DB. |
| [src/lib/supabase/mock-data.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/supabase/mock-data.ts) | Mock datasets for demo mode fallback. |
| [src/proxy.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/proxy.ts) | Next.js request proxy / rewrite middleware handler. |
| [src/app/api/admissions/route.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/api/admissions/route.ts) | Public API endpoint for admission enquiry submissions with rate limiting. |
| [src/app/api/contact/route.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/api/contact/route.ts) | Public API endpoint for contact message form submissions with rate limiting. |

---

## 3. Public Website Routes

| Route | File Link | Description |
|---|---|---|
| `/` | [src/app/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/page.tsx) | Homepage with live Supabase hero slider, admission steps, fee glance, and enquiry form. |
| `/transfer-certificate` | [src/app/transfer-certificate/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/transfer-certificate/page.tsx) | **TC Online Lookup**: Live search by Admission / TC number with official PDF download. |
| `/blogs` | [src/app/blogs/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/blogs/page.tsx) | **Blogs Index**: Displays published school articles from Supabase. |
| `/blogs/[slug]` | [src/app/blogs/[slug]/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/blogs/%5Bslug%5D/page.tsx) | **Blog Post Detail**: Renders TipTap HTML, author, category, date, and related articles. |
| `/gallery` | [src/app/gallery/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/gallery/page.tsx) | **Photo Gallery**: Fetches live photos & categories from Supabase with interactive lightbox. |
| `/about-us` | [src/app/about-us/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/about-us/page.tsx) | About SPS Global School, history, mission, leadership, and affiliations. |
| `/admission-form-2026-27` | [src/app/admission-form-2026-27/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admission-form-2026-27/page.tsx) | Dedicated admission application form page. |
| `/contact-us` | [src/app/contact-us/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/contact-us/page.tsx) | Contact details, Google Map, phone, email, and enquiry form. |
| `/fee-structure` | [src/app/fee-structure/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/fee-structure/page.tsx) | Detailed fee charts and fee policies for Session 2026–27. |
| `/vision-mission` | [src/app/vision-mission/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/vision-mission/page.tsx) | School vision, core values, and pedagogical mission. |
| `/principals-message` | [src/app/principals-message/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/principals-message/page.tsx) | Message from Principal Mr. Bhaskar Sharma. |
| `/managers-message` | [src/app/managers-message/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/managers-message/page.tsx) | Message from Manager Mr. Ashutosh Yadav. |
| `/directors-message` | [src/app/directors-message/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/directors-message/page.tsx) | Message from Director Mr. Sonu Yadav & Mr. Vishwanath Pratap Singh. |
| `/our-inspiration` | [src/app/our-inspiration/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/our-inspiration/page.tsx) | Founders and guiding inspiration page. |
| `/administrators` | [src/app/administrators/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/administrators/page.tsx) | School administrative leadership and governance. |
| `/our-campus` | [src/app/our-campus/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/our-campus/page.tsx) | Campus overview, infrastructure, green grounds, and safety. |
| `/our-classroom` | [src/app/our-classroom/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/our-classroom/page.tsx) | Smart classrooms, audio-visual interactive panels. |
| `/labs` | [src/app/labs/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/labs/page.tsx) | Science, Computer, and Mathematics laboratories. |
| `/library` | [src/app/library/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/library/page.tsx) | School library, book collections, and reading halls. |
| `/co-curricular-activities` | [src/app/co-curricular-activities/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/co-curricular-activities/page.tsx) | Sports, arts, drama, yoga, music, and debates. |
| `/school-assembly` | [src/app/school-assembly/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/school-assembly/page.tsx) | Morning assembly routines, moral education, and news. |
| `/school-timing` | [src/app/school-timing/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/school-timing/page.tsx) | Summer & winter school timings and office hours. |
| `/student-responsibility` | [src/app/student-responsibility/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/student-responsibility/page.tsx) | Student code of conduct and ethics. |
| `/parent-guideline` | [src/app/parent-guideline/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/parent-guideline/page.tsx) | Guidelines for parents and PTM schedules. |
| `/general-rule` | [src/app/general-rule/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/general-rule/page.tsx) | General school regulations and discipline guidelines. |
| `/public-disclosure` | [src/app/public-disclosure/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/public-disclosure/page.tsx) | Mandatory CBSE Public Disclosure documents (NOC, Trust, Fire, Building safety). |
| `/career` | [src/app/career/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/career/page.tsx) | Career opportunities, teacher openings, and CV submission. |
| `/sitemap.xml` | [src/app/sitemap.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/sitemap.ts) | Dynamic XML sitemap generator for Google indexing. |
| `/robots.txt` | [src/app/robots.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/robots.ts) | Search engine crawler rules. |
| Global Layout | [src/app/layout.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/layout.tsx) | Root layout with fonts, metadata, header, footer, and schema.org JSON-LD. |
| Global CSS | [src/app/globals.css](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/globals.css) | Core styles, design tokens, burgundy/gold palette, and animations. |

---

## 4. Admin Portal Routes (`/admin`)

| Route | File Link | Functionality |
|---|---|---|
| `/admin` | [src/app/admin/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/page.tsx) | **Dashboard Overview**: Live stats for Enquiries, Messages, Blogs, Banners, Gallery & TCs. |
| `/admin/login` | [src/app/admin/login/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/login/page.tsx) | Admin login with Supabase Auth or Instant Demo Super-Admin mode. |
| `/admin/forgot-password` | [src/app/admin/forgot-password/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/forgot-password/page.tsx) | Password reset email trigger. |
| `/admin/tc` | [src/app/admin/tc/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/tc/page.tsx) | **Transfer Certificate Manager**: Upload TC PDFs, student details, real-time sync. |
| `/admin/blogs` | [src/app/admin/blogs/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/blogs/page.tsx) | **Blog List**: Real-time list of draft and published blogs. |
| `/admin/blogs/create` | [src/app/admin/blogs/create/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/blogs/create/page.tsx) | Blog post creator with TipTap rich text editor. |
| `/admin/blogs/[id]/edit` | [src/app/admin/blogs/[id]/edit/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/blogs/%5Bid%5D/edit/page.tsx) | Blog post editor for updating existing blogs. |
| `/admin/gallery` | [src/app/admin/gallery/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/gallery/page.tsx) | **Gallery Manager**: Drag-and-drop photo upload to Supabase Storage, categorization. |
| `/admin/banners` | [src/app/admin/banners/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/banners/page.tsx) | **Homepage Banners Manager**: Manage, reorder, and activate homepage hero slides. |
| `/admin/media` | [src/app/admin/media/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/media/page.tsx) | **Media Library**: View, upload, copy URLs, and delete storage files. |
| `/admin/admissions` | [src/app/admin/admissions/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/admissions/page.tsx) | **Admissions CRM**: Status tracking (`new`, `contacted`, `converted`) & CSV export. |
| `/admin/admissions/[id]` | [src/app/admin/admissions/[id]/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/admissions/%5Bid%5D/page.tsx) | Detailed view of a single admission enquiry. |
| `/admin/contact-messages` | [src/app/admin/contact-messages/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/contact-messages/page.tsx) | **Messages Inbox**: View parent messages, mark read/unread. |
| `/admin/contact-messages/[id]` | [src/app/admin/contact-messages/[id]/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/contact-messages/%5Bid%5D/page.tsx) | Detailed view of an enquiry message. |
| `/admin/pages` | [src/app/admin/pages/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/pages/page.tsx) | School static pages manager. |
| `/admin/users` | [src/app/admin/users/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/users/page.tsx) | Admin user roles & account management. |
| `/admin/settings` | [src/app/admin/settings/page.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/settings/page.tsx) | School contact settings, academic session, email settings. |
| Admin Layout | [src/app/admin/layout.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/layout.tsx) | Admin wrapper with isolated styling. |
| Admin CSS | [src/app/admin/admin.css](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/app/admin/admin.css) | Custom styling for admin tables, badges, sidebar, and forms. |

---

## 5. Admin Portal Components

| Component | File Link | Purpose |
|---|---|---|
| `AdminShell` | [src/components/admin/AdminShell.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/AdminShell.tsx) | Main administrative navigation shell, sidebar, user profile header, and logout. |
| `DashboardOverview` | [src/components/admin/DashboardOverview.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/DashboardOverview.tsx) | Real-time overview metrics and recent activity feeds. |
| `TCManager` | [src/components/admin/TCManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/TCManager.tsx) | Realtime TC upload, student details form, PDF storage handler, delete, edit. |
| `BlogList` | [src/components/admin/BlogList.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/BlogList.tsx) | Real-time blog table with publish toggles, filters, and edit links. |
| `BlogEditor` | [src/components/admin/BlogEditor.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/BlogEditor.tsx) | TipTap WYSIWYG editor with formatting, image upload, categories, tags, and drafts. |
| `GalleryManager` | [src/components/admin/GalleryManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/GalleryManager.tsx) | Multi-photo drag-and-drop upload, category assignment, delete, and real-time sync. |
| `BannersManager` | [src/components/admin/BannersManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/BannersManager.tsx) | Hero banner manager with desktop/mobile images, CTA buttons, and real-time sync. |
| `MediaLibraryManager` | [src/components/admin/MediaLibraryManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/MediaLibraryManager.tsx) | Storage browser, image preview, copy URL, and delete file functions. |
| `AdmissionsManager` | [src/components/admin/AdmissionsManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/AdmissionsManager.tsx) | Enquiries table, status dropdowns, search, filter, and CSV exporter. |
| `EnquiryDetail` | [src/components/admin/EnquiryDetail.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/EnquiryDetail.tsx) | Detail view and internal notes for student admission applicants. |
| `ContactMessagesManager` | [src/components/admin/ContactMessagesManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/ContactMessagesManager.tsx) | Messages manager with real-time incoming submissions. |
| `MessageDetail` | [src/components/admin/MessageDetail.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/MessageDetail.tsx) | Single message viewer with reply actions. |
| `PagesManager` | [src/components/admin/PagesManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/PagesManager.tsx) | Public page metadata and status manager. |
| `SettingsManager` | [src/components/admin/SettingsManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/SettingsManager.tsx) | School contact information, social links, and academic session settings. |
| `UsersManager` | [src/components/admin/UsersManager.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/admin/UsersManager.tsx) | Administrator team management and permissions. |

---

## 6. Public Website Components

| Component | File Link | Purpose |
|---|---|---|
| `HeroBanner` | [src/components/home/HeroBanner.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/home/HeroBanner.tsx) | Responsive homepage hero slider with quick admission enquiry form. |
| `GalleryGrid` | [src/components/ui/GalleryGrid.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/ui/GalleryGrid.tsx) | Interactive gallery with category tabs and lightbox triggers. |
| `Lightbox` | [src/components/ui/Lightbox.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/ui/Lightbox.tsx) | Full-screen image preview lightbox with zoom and keyboard navigation. |
| `AdmissionEnquiryForm` | [src/components/forms/AdmissionEnquiryForm.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/forms/AdmissionEnquiryForm.tsx) | Admission form submitting directly to Supabase with real-time feedback. |
| `ContactForm` | [src/components/forms/ContactForm.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/forms/ContactForm.tsx) | Contact form submitting to Supabase with validation and confirmation. |
| `SiteHeader` | [src/components/layout/SiteHeader.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/layout/SiteHeader.tsx) | Main navigation bar with logo, dropdown menus, and CTA buttons. |
| `SiteFooter` | [src/components/layout/SiteFooter.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/layout/SiteFooter.tsx) | Global footer with quick links, contact info, CBSE disclosure link, and credit. |
| `AnnouncementBar` | [src/components/layout/AnnouncementBar.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/layout/AnnouncementBar.tsx) | Top ticker for admissions announcements, phone, email, and social links. |
| `MobileNavigation` | [src/components/layout/MobileNavigation.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/layout/MobileNavigation.tsx) | Mobile slide-out drawer menu. |
| `PageHero` | [src/components/ui/PageHero.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/ui/PageHero.tsx) | Reusable page hero with breadcrumb navigation. |
| `FAQAccordion` | [src/components/ui/FAQAccordion.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/ui/FAQAccordion.tsx) | Single-open FAQ accordion for fees and admissions. |
| `AdmissionCTASection` | [src/components/home/AdmissionCTASection.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/home/AdmissionCTASection.tsx) | Burgundy banner promoting admissions with call & apply links. |
| `SchoolHighlights` | [src/components/home/SchoolHighlights.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/home/SchoolHighlights.tsx) | Key counters: 100% CBSE pass rate, smart campus, student-teacher ratio. |
| `AdmissionStepsSection` | [src/components/home/AdmissionStepsSection.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/home/AdmissionStepsSection.tsx) | 4-step admission guide: Enquiry, Campus Visit, Documents, Fee & Welcome. |
| `InfrastructureGrid` | [src/components/home/InfrastructureGrid.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/home/InfrastructureGrid.tsx) | Visual showcase of campus labs, library, classrooms, and grounds. |
| `ContactMapSection` | [src/components/home/ContactMapSection.tsx](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/components/home/ContactMapSection.tsx) | Embedded Google Map with school coordinates and contact form. |

---

## 7. Core Libraries & SEO

| File | Purpose |
|---|---|
| [src/lib/seo.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/seo.ts) | SEO metadata generator and schema.org JSON-LD Structured Data builder. |
| [src/lib/firebase/client.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/firebase/client.ts) | Firebase compatibility shim. |
| [src/lib/firebase/storage.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/lib/firebase/storage.ts) | Storage proxy forwarding to Supabase storage. |

---

## 8. Static Data & School Info

| File | Purpose |
|---|---|
| [src/data/school.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/data/school.ts) | School address, phone numbers, email, CBSE affiliation code, and leadership details. |
| [src/data/navigation.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/data/navigation.ts) | Navigation structure and dropdown menu links. |
| [src/data/publicDisclosure.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/data/publicDisclosure.ts) | CBSE mandatory disclosure table entries and certificates. |
| [src/data/facilities.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/data/facilities.ts) | Descriptions of campus infrastructure, labs, and amenities. |
| [src/data/blogs.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/data/blogs.ts) | Default offline blog data. |
| [src/data/gallery.ts](file:///Users/webwriteservices/Desktop/SPS_School_Website/src/data/gallery.ts) | Default offline gallery images and categories. |

---

## 9. Assets & Documents

### Leadership Photos
- [Mr. Ashutosh Yadav (Manager)](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/images/leadership/manager-ashutosh-yadav.png)
- [Mr. Bhaskar Sharma (Principal)](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/images/leadership/principal.png)
- [Mr. Sonu Yadav (Director)](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/images/leadership/director-sonu-yadav.jpg)
- [Mr. Vishwanath Pratap Singh (Director)](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/images/leadership/director-vishwanath-pratap-singh.png)

### Branding & Logos
- [SPS School Logo](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/images/branding/sps-logo.png)
- [SPS School Header Logo](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/images/branding/sps-logo-header.png)
- [SPS Logo Mark](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/images/branding/sps-logo-mark.png)

### Official Documents (`public/documents/`)
- [academic-calendar.pdf](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/documents/academic-calendar.pdf)
- [affiliation-letter.pdf](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/documents/affiliation-letter.pdf)
- [building-safety-certificate.pdf](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/documents/building-safety-certificate.pdf)
- [fee-structure-2026-27.pdf](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/documents/fee-structure-2026-27.pdf)
- [fire-safety-certificate.pdf](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/documents/fire-safety-certificate.pdf)
- [recognition-letter.pdf](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/documents/recognition-letter.pdf)
- [trust-certificate.pdf](file:///Users/webwriteservices/Desktop/SPS_School_Website/public/documents/trust-certificate.pdf)

---

## 💻 Common Commands Reference

```bash
# Start development server accessible on local network:
npm run dev

# Build production bundle (optimized 52 routes):
npm run build

# Start production server accessible on LAN / 0.0.0.0:
npm run start
# OR
npm run preview
```
