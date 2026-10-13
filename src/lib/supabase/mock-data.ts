export const DEMO_USER = {
  id: 'demo-admin-id',
  email: 'admin@spsglobalschool.com',
  user_metadata: {
    full_name: 'SPS Super Admin',
    role: 'super_admin',
  },
  app_metadata: {
    role: 'super_admin',
  },
}

export const MOCK_PROFILES = [
  {
    id: 'demo-admin-id',
    email: 'admin@spsglobalschool.com',
    full_name: 'SPS Super Admin',
    role: 'super_admin',
    is_active: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'staff-01',
    email: 'admissions@spsglobalschool.com',
    full_name: 'Rohit Sharma (Admissions)',
    role: 'admission_manager',
    is_active: true,
    created_at: '2026-01-10T00:00:00.000Z',
    updated_at: '2026-01-10T00:00:00.000Z',
  },
  {
    id: 'staff-02',
    email: 'editor@spsglobalschool.com',
    full_name: 'Neha Gupta (Editor)',
    role: 'content_manager',
    is_active: true,
    created_at: '2026-01-15T00:00:00.000Z',
    updated_at: '2026-01-15T00:00:00.000Z',
  },
]

export const MOCK_GALLERY_CATEGORIES = [
  { id: 'cat-1', name: 'Campus & Infrastructure', slug: 'campus', display_order: 1 },
  { id: 'cat-2', name: 'Sports & Athletics', slug: 'sports', display_order: 2 },
  { id: 'cat-3', name: 'Cultural Activities', slug: 'cultural', display_order: 3 },
  { id: 'cat-4', name: 'Labs & Facilities', slug: 'facilities', display_order: 4 },
]

export const MOCK_GALLERY_IMAGES = [
  {
    id: 'gal-1',
    title: 'Main Campus Building',
    alt_text: 'SPS Global School main campus architecture',
    image_url: '/images/campus/main-building.jpg',
    category_id: 'cat-1',
    status: 'published',
    display_order: 1,
    created_at: '2026-02-01T10:00:00Z',
    gallery_categories: { name: 'Campus & Infrastructure' },
  },
  {
    id: 'gal-2',
    title: 'Annual Sports Day 2026',
    alt_text: 'Students participating in sports event',
    image_url: '/images/activities/sports-day.jpg',
    category_id: 'cat-2',
    status: 'published',
    display_order: 2,
    created_at: '2026-02-15T11:30:00Z',
    gallery_categories: { name: 'Sports & Athletics' },
  },
  {
    id: 'gal-3',
    title: 'Hi-Tech Computer Laboratory',
    alt_text: 'Modern computers in lab',
    image_url: '/images/facilities/computer-lab.jpg',
    category_id: 'cat-4',
    status: 'published',
    display_order: 3,
    created_at: '2026-02-20T14:00:00Z',
    gallery_categories: { name: 'Labs & Facilities' },
  },
  {
    id: 'gal-4',
    title: 'Cultural Fest Celebrations',
    alt_text: 'Students performing traditional dance',
    image_url: '/images/activities/cultural-fest.jpg',
    category_id: 'cat-3',
    status: 'published',
    display_order: 4,
    created_at: '2026-03-01T09:00:00Z',
    gallery_categories: { name: 'Cultural Activities' },
  },
]

export const MOCK_BLOG_CATEGORIES = [
  { id: 'bcat-1', name: 'Academic Excellence', slug: 'academic-excellence' },
  { id: 'bcat-2', name: 'School Life', slug: 'school-life' },
  { id: 'bcat-3', name: 'Admissions & Events', slug: 'admissions-events' },
]

export const MOCK_BLOGS = [
  {
    id: 'blog-1',
    title: 'Admissions Open for Session 2026-27: Key Details & Process',
    slug: 'admissions-open-session-2026-27',
    excerpt: 'Everything parents need to know about criteria, dates, and documentation.',
    content: '<p>Admissions are now open for Nursery to Class 12 for the academic session 2026-27.</p>',
    cover_image_url: '/images/students/sps-students-hero.png',
    status: 'published',
    views_count: 1420,
    category_id: 'bcat-3',
    created_at: '2026-01-05T09:00:00Z',
    blog_categories: { name: 'Admissions & Events' },
    profiles: { full_name: 'SPS Super Admin' },
  },
  {
    id: 'blog-2',
    title: 'Experiential Learning & Modern Laboratories',
    slug: 'experiential-learning-and-modern-laboratories',
    excerpt: 'How hands-on science and computer labs prepare students for future tech.',
    content: '<p>Hands-on education is at the core of SPS pedagogy.</p>',
    cover_image_url: '/images/facilities/science-lab-1.webp',
    status: 'published',
    views_count: 890,
    category_id: 'bcat-1',
    created_at: '2026-02-10T11:00:00Z',
    blog_categories: { name: 'Academic Excellence' },
    profiles: { full_name: 'SPS Super Admin' },
  },
  {
    id: 'blog-3',
    title: 'Role of Morning Assemblies in Character Building',
    slug: 'role-of-morning-assemblies-in-character-building',
    excerpt: 'Fostering public speaking, unity, and morning mindfulness.',
    content: '<p>Every morning starts with inspiration and disciplined assembly.</p>',
    cover_image_url: '/images/activities/school-assembly.jpeg',
    status: 'published',
    views_count: 650,
    category_id: 'bcat-2',
    created_at: '2026-03-02T08:30:00Z',
    blog_categories: { name: 'School Life' },
    profiles: { full_name: 'SPS Super Admin' },
  },
]

export const MOCK_BANNERS = [
  {
    id: 'ban-1',
    title: 'Admissions Open 2026-27',
    subtitle: 'Nurturing Global Minds with Indian Values',
    cta_text: 'Apply Online',
    cta_url: '/admission-form-2026-27',
    background_image_url: '/images/students/sps-students-hero.png',
    is_active: true,
    display_order: 1,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'ban-2',
    title: 'State-of-the-Art STEM & Robotics Labs',
    subtitle: 'Igniting curiosity from an early age',
    cta_text: 'Explore Labs',
    cta_url: '/labs',
    background_image_url: '/images/facilities/computer-lab.jpg',
    is_active: true,
    display_order: 2,
    created_at: '2026-01-02T00:00:00Z',
  },
]

export const MOCK_ADMISSION_ENQUIRIES = [
  {
    id: 'enq-1',
    student_name: 'Aarav Sharma',
    parent_name: 'Rajesh Sharma',
    email: 'rajesh.sharma@gmail.com',
    phone: '+91 98765 43210',
    class_applying_for: 'Class 5',
    date_of_birth: '2016-04-12',
    address: 'Civil Lines, Aligarh',
    status: 'new',
    notes: 'Parent asked about transport facility.',
    created_at: '2026-04-10T14:30:00Z',
  },
  {
    id: 'enq-2',
    student_name: 'Ananya Verma',
    parent_name: 'Dr. Vivek Verma',
    email: 'dr.verma@hotmail.com',
    phone: '+91 98112 23344',
    class_applying_for: 'Class 9',
    date_of_birth: '2012-08-19',
    address: 'Ramghat Road, Aligarh',
    status: 'contacted',
    notes: 'Interested in Science stream for higher secondary.',
    created_at: '2026-04-09T10:15:00Z',
  },
  {
    id: 'enq-3',
    student_name: 'Kabir Singh',
    parent_name: 'Manish Singh',
    email: 'manish.singh@gmail.com',
    phone: '+91 97554 12345',
    class_applying_for: 'Nursery',
    date_of_birth: '2022-01-15',
    address: 'Medical Road, Aligarh',
    status: 'enrolled',
    notes: 'Document verification completed.',
    created_at: '2026-04-08T16:45:00Z',
  },
]

export const MOCK_CONTACT_MESSAGES = [
  {
    id: 'msg-1',
    name: 'Pooja Agarwal',
    email: 'pooja.agarwal@gmail.com',
    phone: '+91 94567 89012',
    subject: 'Inquiry regarding school bus routes',
    message: 'Hello, could you please confirm if school bus service covers Sasni Gate area?',
    status: 'unread',
    created_at: '2026-04-10T12:00:00Z',
  },
  {
    id: 'msg-2',
    name: 'Sunil Mathur',
    email: 'smathur@yahoo.com',
    phone: '+91 99270 54321',
    subject: 'Fee installment structure query',
    message: 'Kindly share details about quarterly payment options for Class 8.',
    status: 'read',
    created_at: '2026-04-09T18:20:00Z',
  },
]

export const MOCK_TC_DOCUMENTS = [
  {
    id: 'tc-1',
    student_name: 'Rohan Mehra',
    admission_number: 'SPS/2021/0452',
    tc_number: 'TC-2026-089',
    issue_date: '2026-03-20',
    document_url: '#',
    status: 'active',
    created_at: '2026-03-20T10:00:00Z',
  },
  {
    id: 'tc-2',
    student_name: 'Sneha Kumari',
    admission_number: 'SPS/2020/0318',
    tc_number: 'TC-2026-090',
    issue_date: '2026-03-25',
    document_url: '#',
    status: 'active',
    created_at: '2026-03-25T11:00:00Z',
  },
]

export const MOCK_PAGES = [
  {
    id: 'p-1',
    title: 'About Us',
    slug: 'about-us',
    heading: 'About SPS Global School',
    introduction: 'A premier educational institution dedicated to excellence in education.',
    meta_title: 'About Us | SPS Global School',
    meta_description: 'Discover the legacy, values, and leadership of SPS Global School.',
    is_published: true,
    updated_at: '2026-03-15T00:00:00Z',
  },
  {
    id: 'p-2',
    title: 'Fee Structure',
    slug: 'fee-structure',
    heading: 'Transparent Fee Schedule 2026-27',
    introduction: 'Affordable quality education with clear, honest fee structures.',
    meta_title: 'Fee Structure | SPS Global School',
    meta_description: 'Detailed fee structure for all classes at SPS Global School.',
    is_published: true,
    updated_at: '2026-03-10T00:00:00Z',
  },
  {
    id: 'p-3',
    title: 'Vision & Mission',
    slug: 'vision-mission',
    heading: 'Our Vision & Core Mission',
    introduction: 'Empowering future leaders with knowledge, integrity, and values.',
    meta_title: 'Vision & Mission | SPS Global School',
    meta_description: 'Read the foundational vision and guiding mission of our institution.',
    is_published: true,
    updated_at: '2026-03-01T00:00:00Z',
  },
]

export const MOCK_SETTINGS = [
  { id: 's-1', key: 'school_name', value: 'SPS Global School' },
  { id: 's-2', key: 'school_phone', value: '+91 94123 45678' },
  { id: 's-3', key: 'school_email', value: 'info@spsglobalschool.com' },
  { id: 's-4', key: 'school_address', value: 'Aligarh Road, Hathras / Aligarh, UP' },
  { id: 's-5', key: 'admission_open', value: 'true' },
]

export const MOCK_MEDIA = [
  {
    id: 'm-1',
    file_name: 'main-building.jpg',
    file_type: 'image/jpeg',
    file_size: 245000,
    file_url: '/images/campus/main-building.jpg',
    created_at: '2026-02-01T10:00:00Z',
  },
  {
    id: 'm-2',
    file_name: 'sports-day.jpg',
    file_type: 'image/jpeg',
    file_size: 312000,
    file_url: '/images/activities/sports-day.jpg',
    created_at: '2026-02-15T11:30:00Z',
  },
]

export const MOCK_AUDIT_LOGS = [
  { id: 'a-1', action: 'Admin Logged In', entity_type: 'auth', created_at: '2026-04-10T14:30:00Z' },
  { id: 'a-2', action: 'Blog Published: Admissions Open 2026-27', entity_type: 'blog', created_at: '2026-04-09T11:00:00Z' },
  { id: 'a-3', action: 'Gallery Updated: Main Campus Photo', entity_type: 'gallery', created_at: '2026-04-08T09:30:00Z' },
  { id: 'a-4', action: 'New Admission Enquiry: Aarav Sharma', entity_type: 'admission', created_at: '2026-04-07T16:20:00Z' },
]
