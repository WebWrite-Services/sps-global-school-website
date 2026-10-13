export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "About Us", href: "/about-us", description: "Learn about our heritage, philosophy, and learning ethos" },
      { label: "Vision & Mission", href: "/vision-mission", description: "Our roadmap for value-based futuristic education" },
      { label: "Administrators", href: "/administrators", description: "Leadership steering our institutional vision" },
      { label: "Director's Message", href: "/directors-message", description: "Address by Shri Vishwanath Pratap Singh Yadav" },
      { label: "Manager's Message", href: "/managers-message", description: "Guidance from Shri Ashutosh Yadav" },
      { label: "Principal's Message", href: "/principals-message", description: "Welcome address on academic rigor and values" }
    ]
  },
  {
    label: "Information",
    href: "/fee-structure",
    children: [
      { label: "Fee Structure", href: "/fee-structure", description: "Session 2026-27 class-wise fee schedules & concessions" },
      { label: "Student Responsibility", href: "/student-responsibility", description: "Code of conduct, discipline, and student ethics" },
      { label: "School Timing", href: "/school-timing", description: "Daily bell schedules for winter & summer sessions" },
      { label: "School Assembly", href: "/school-assembly", description: "Morning prayer, thought, news & moral discourse" },
      { label: "Parent Guideline", href: "/parent-guideline", description: "Parent-school partnership for student growth" },
      { label: "General Rules", href: "/general-rule", description: "Attendance, health, PTM, and leave procedures" },
      { label: "Co-curricular Activities", href: "/co-curricular-activities", description: "Sports, performing arts, fests, and Olympiads" },
      { label: "Transfer Certificate (TC)", href: "/transfer-certificate", description: "TC issuance procedures & application guidelines" }
    ]
  },
  { label: "Our Inspiration", href: "/our-inspiration" },
  {
    label: "Infrastructure",
    href: "/our-campus",
    children: [
      { label: "Our Campus", href: "/our-campus", description: "Lush green campus on NH-19 with advanced amenities" },
      { label: "Our Classrooms", href: "/our-classroom", description: "Digitally-equipped, naturally lit smart learning spaces" },
      { label: "Library", href: "/library", description: "Vast collection of encyclopedias, literature & journals" },
      { label: "Laboratories", href: "/labs", description: "Advanced Science, Computer, and Mathematics labs" }
    ]
  },
  { label: "Public Disclosure", href: "/public-disclosure" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact-us" }
];

export const FOOTER_COLUMNS = [
  {
    title: "About Us",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Administrators", href: "/administrators" },
      { label: "Director's Message", href: "/directors-message" },
      { label: "Manager's Message", href: "/managers-message" },
      { label: "Principal's Message", href: "/principals-message" },
      { label: "Our Inspiration", href: "/our-inspiration" }
    ]
  },
  {
    title: "Information",
    links: [
      { label: "Fee Structure", href: "/fee-structure" },
      { label: "School Timing", href: "/school-timing" },
      { label: "School Assembly", href: "/school-assembly" },
      { label: "Parent Guideline", href: "/parent-guideline" },
      { label: "General Rules", href: "/general-rule" },
      { label: "Student Responsibility", href: "/student-responsibility" },
      { label: "Transfer Certificate (TC)", href: "/transfer-certificate" }
    ]
  },
  {
    title: "Explore Campus",
    links: [
      { label: "Our Campus", href: "/our-campus" },
      { label: "Our Classrooms", href: "/our-classroom" },
      { label: "Science & Computer Labs", href: "/labs" },
      { label: "Rich Library", href: "/library" },
      { label: "Co-curricular Activities", href: "/co-curricular-activities" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Mandatory Public Disclosure", href: "/public-disclosure" }
    ]
  },
  {
    title: "Admissions & Support",
    links: [
      { label: "Admission Form 2026-27", href: "/admission-form-2026-27" },
      { label: "Admission Enquiry", href: "/contact-us" },
      { label: "Academic Calendar", href: "/documents/academic-calendar.pdf" },
      { label: "Career Opportunities", href: "/career" },
      { label: "Latest Blogs & News", href: "/blogs" },
      { label: "Help Center", href: "/contact-us" }
    ]
  }
];
