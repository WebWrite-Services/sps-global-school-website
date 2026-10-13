export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featuredImage: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "admissions-open-session-2026-27",
    title: "Admissions Open for Session 2026-27: Nurturing Academic Rigor & Character at SPS Global School",
    excerpt: "SPS Global School announces commencement of admissions from Play Group to Classes IX & XI for the upcoming academic session 2026-27.",
    category: "Admissions & Notices",
    date: "February 15, 2026",
    readTime: "4 min read",
    featuredImage: "/images/campus/main-building.jpg",
    content: [
      "SPS Global School, Jaswantnagar, Etawah, is pleased to invite applications for admissions for the academic session 2026-27 across classes ranging from Play Group / Nursery up to Class IX and Class XI.",
      "As a CBSE-affiliated institution, our focus extends beyond textbook mastery. We are committed to developing analytical problem-solving skills, ethical values, and holistic personality development in each student.",
      "Parents are invited to visit our campus on NH-19 to interact with academic counselors, explore our smart classrooms and specialized laboratories, and review the detailed curriculum outline.",
      "Special fee concessions, including sibling discounts and annual upfront fee waivers, are available as outlined in our published Fee Structure."
    ]
  },
  {
    slug: "experiential-learning-and-modern-laboratories",
    title: "Why Hands-On Science and Digital Laboratories Matter in School Education",
    excerpt: "How practical experimentation in Physics, Chemistry, Biology, and ICT shapes deep conceptual understanding and scientific curiosity.",
    category: "Academic Insights",
    date: "January 20, 2026",
    readTime: "5 min read",
    featuredImage: "/images/facilities/composite-science-lab.jpg",
    content: [
      "In the modern educational landscape, rote memorization is rapidly being replaced by inquiry-driven and experiential pedagogy. When students observe scientific phenomena in laboratory conditions, theoretical concepts turn into lasting understanding.",
      "At SPS Global School, our composite science laboratory, mathematics activity room, and computer center provide students with regular access to tactile materials and experimental setups.",
      "Guided by certified educators, students learn to formulate hypotheses, observe reactions, record systematic data, and draw logical conclusions—skills essential for 21st-century problem solvers."
    ]
  },
  {
    slug: "role-of-morning-assemblies-in-character-building",
    title: "The Transformative Role of Morning Assemblies in Student Character Building",
    excerpt: "Exploring how morning prayers, thoughts for the day, and public news recitation build oratory confidence and positive daily momentum.",
    category: "School Life",
    date: "December 10, 2025",
    readTime: "3 min read",
    featuredImage: "/images/activities/school-assembly.jpeg",
    content: [
      "Every morning at SPS Global School begins with a structured assembly that sets a solemn, focused, and positive tone for the entire school day.",
      "The assembly is entirely student-led on rotation, giving children across age brackets the opportunity to speak in front of hundreds of peers. From delivering the 'Thought of the Day' and reciting national headlines to singing patriotic anthems, students overcome stage fright early in life.",
      "Assemblies also serve as an invaluable forum for moral discourse, celebration of student achievements, and community bonding between faculty and students."
    ]
  }
];
