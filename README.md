# SPS Global School Website & Admin Portal

Official web portal and administrative management system for **SPS Global School**, Jaswantnagar, Etawah (Affiliated to CBSE, New Delhi).

## 🚀 Features

- **School Website**:
  - Fully responsive, modern school website with dynamic hero banner, fee structures, management message, and CBSE info.
  - Transfer Certificate (TC) online lookup & PDF download connected to Supabase.
  - Dynamic Blogs & Articles with TipTap rich text rendering.
  - Interactive Photo Gallery with category filtering and full-screen lightbox.
  - Online Admission Enquiry & Contact forms with instant submission handling.

- **Admin Management Portal (`/admin`)**:
  - Secure role-based authentication powered by Supabase.
  - Realtime Live Dashboard overview tracking admissions, messages, blogs, gallery, banners, and TC records.
  - Admissions Manager with status tracking (new, contacted, scheduled, converted) and CSV export.
  - Contact Messages Manager with read/unread status.
  - Blog CMS with TipTap WYSIWYG editor, categories, tags, and featured images.
  - Gallery Manager with drag-and-drop file upload to Supabase Storage.
  - Homepage Banners Manager with drag-and-drop reordering.
  - Transfer Certificate (TC) Manager with PDF upload and automated student record linking.
  - Media Library for managing assets.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Backend & Database**: Supabase (PostgreSQL, Realtime, Storage, Auth)
- **Editor**: TipTap Rich Text Editor
- **Icons**: Lucide React

## 📦 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/WebWrite-Services/sps-global-school-website.git
   cd sps-global-school-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```

4. **Run Database Migrations**:
   Run the SQL schema in `supabase/migrations/001_admin_portal.sql` in your Supabase SQL Editor.

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📄 License
Private & Proprietary — Developed for SPS Global School by WebWrite Services.
