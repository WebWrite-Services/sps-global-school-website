export interface LeadershipProfile {
  name: string;
  role: string;
  image: string;
  alt: string;
  shortQuote: string;
  fullMessage: string[];
  designationSubtitle?: string;
}

export interface FeeRow {
  srNo: number;
  classGroup: string;
  registrationFee: number;
  admissionFee: number;
  activityFee: number;
  annualFee: number;
  examFee: number;
  tuitionFeePerMonth: number;
  tuitionFeeQuarterly: number;
  installment1: number;
  installment2: number;
  installment3: number;
  installment4: number;
  yearlyTotal: number;
}

export const SCHOOL_INFO = {
  name: "SPS Global School",
  fullName: "SPS Global School, Jaswantnagar, Etawah",
  tagline: "Building Bright Minds. Shaping a Better Tomorrow.",
  subTagline: "An English Medium Co-Educational Senior Secondary Institution Affiliated to CBSE, New Delhi",
  affiliation: "Affiliated to C.B.S.E., New Delhi",
  affiliationNumber: "2134255",
  schoolCode: "72221",
  address: "NH-19, Agra Road, Kaist, Jaswantnagar, Etawah, Uttar Pradesh - 206245",
  shortAddress: "NH-19, Kaist, Jaswantnagar, Etawah (U.P.)",
  phoneNumbers: ["+91 7618307200", "+91 7618407200"],
  primaryPhone: "+91 7618307200",
  secondaryPhone: "+91 7618407200",
  alternatePhones: ["+91 7895207777", "+91 7500720914"],
  email: "sps.globalschool@gmail.com",
  alternateEmail: "spsdcinfo@gmail.com",
  currentSession: "2026-27",
  admissionClasses: "Play Group / Nursery to Classes IX & XI",
  establishedYear: 2012,
  parentTrust: "Shivpal Singh Mahavidyalaya & SPS Educational Group",
  mapCoordinates: {
    lat: 26.8833,
    lng: 78.9667,
    googleMapsUrl: "https://maps.google.com/?q=SPS+Global+School+Jaswantnagar+Etawah"
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com"
  }
};

export const SCHOOL_HIGHLIGHTS = [
  {
    icon: "GraduationCap",
    title: "CBSE Curriculum",
    description: "Affiliated to CBSE, New Delhi (Affiliation No. 2134255) with focus on experiential learning and analytical thinking."
  },
  {
    icon: "ShieldCheck",
    title: "Holistic Development",
    description: "Balanced emphasis on academics, sports, cultural arts, ethics, and leadership qualities."
  },
  {
    icon: "Building2",
    title: "Modern Infrastructure",
    description: "Smart classrooms, composite science labs, dedicated computer and mathematics labs, and a rich library."
  },
  {
    icon: "Users2",
    title: "Dedicated Faculty",
    description: "Experienced, passionate educators committed to personalized mentoring and student success."
  }
];

export const SCHOOL_STATS = [
  { value: "CBSE", label: "Affiliation No. 2134255" },
  { value: "Play-XII", label: "Classes Offered" },
  { value: "100%", label: "CBSE Board Success" },
  { value: "20+ Acres", label: "Sprawling Green Campus" }
];

export const LEADERSHIP: Record<string, LeadershipProfile> = {
  director: {
    name: "Vishwanath Pratap Singh Yadav (Sonu Yadav)",
    role: "Director",
    designationSubtitle: "Director – SPS Global School",
    image: "/images/leadership/director-sonu-yadav.jpg",
    alt: "Vishwanath Pratap Singh Yadav, Director SPS Global School",
    shortQuote: "Our school is dedicated to providing a holistic education that fosters academic excellence, creativity, and character development.",
    fullMessage: [
      "Dear Parents and Students,",
      "As Director, I am delighted to introduce you to our vibrant community of learners. SPS Global School is dedicated to providing a holistic education that fosters academic excellence, creativity, and character development.",
      "In the fast-evolving modern world, children need more than rote learning; they need critical thinking, moral grounding, and the confidence to explore their unique talents. Our state-of-the-art facilities, qualified teachers, and student-first culture ensure that every child thrives.",
      "Thank you for considering SPS Global School as your partner in education. Together, we are shaping the leaders of tomorrow."
    ]
  },
  manager: {
    name: "Ashutosh Yadav (Tonu Yadav)",
    role: "Manager",
    designationSubtitle: "Manager – SPS Global School",
    image: "/images/leadership/manager-ashutosh-yadav.png",
    alt: "Ashutosh Yadav, Manager SPS Global School",
    shortQuote: "Our vision is to create a community of learners who are curious, creative, and confident in an inclusive environment.",
    fullMessage: [
      "Dear Parents and Well-wishers,",
      "As we embark on this educational journey together, I am delighted to introduce you to SPS Global School, an institution dedicated to providing a world-class education that combines academic rigor with extracurricular enrichment.",
      "Our vision at SPS Global School is to create a community of learners who are curious, creative, and confident. We strive to provide a safe, supportive, and inclusive environment that allows each child to thrive and reach their full potential.",
      "We believe that education is a sacred partnership between home and school, and we look forward to working closely with you to provide your child with the best possible educational foundation."
    ]
  },
  principal: {
    name: "Mrs. Divya Yadav / Mr. Bhaskar Sharma",
    role: "Principal",
    designationSubtitle: "Principal – SPS Global School",
    image: "/images/leadership/principal.png",
    alt: "Principal SPS Global School",
    shortQuote: "Every child is unique and has the potential to achieve greatness through dedicated mentoring and a love of learning.",
    fullMessage: [
      "Dear Parents and Students,",
      "It is my pleasure to welcome you to SPS Global School, where we strive to provide a nurturing and inclusive environment that fosters academic excellence, creativity, and character development.",
      "At SPS Global School, we believe that every child is unique and has the potential to achieve greatness. Our dedicated team of educators is committed to providing a well-rounded education that prepares students for success in an ever-changing world.",
      "As the Principal of SPS Global School, I am committed to ensuring that our school remains a vibrant and dynamic community that values diversity, promotes critical thinking, and encourages a lifelong love of learning.",
      "I invite you to explore our school and discover the many exciting opportunities that SPS Global School has to offer."
    ]
  }
};

export const INSPIRATION = [
  {
    name: "Late Shri Mahaveer Singh Yadav",
    role: "Founder & Eternal Inspiration",
    image: "/images/leadership/inspiration-mahaveer-singh.png",
    description: "A visionary whose dedication to rural and regional educational empowerment laid the foundation stone of SPS Educational Institutions."
  },
  {
    name: "Late Shri Shivpal Singh Yadav",
    role: "Guiding Light & Patron",
    image: "/images/leadership/inspiration-shivpal-singh.png",
    description: "Whose values of selfless public service, integrity, and educational access continue to guide SPS Global School every single day."
  }
];

export const TIMINGS = {
  season: "Winter Timings (Current)",
  schedule: "Monday to Saturday: 8:30 AM to 2:00 PM",
  summerSchedule: "Monday to Saturday: 7:30 AM to 1:30 PM",
  importantNotes: [
    "Students must arrive 10 minutes before the scheduled time.",
    "Latecomers will not be allowed to attend classes without a valid reason verified by parents.",
    "Seasonal uniform must be strictly worn as per the school's dress code.",
    "School remains closed on Sundays and all Gazetted Holidays declared by the administration."
  ]
};

export const FEE_STRUCTURE_DATA: FeeRow[] = [
  {
    srNo: 1,
    classGroup: "NURSERY - UKG",
    registrationFee: 500,
    admissionFee: 2000,
    activityFee: 1000,
    annualFee: 1000,
    examFee: 500,
    tuitionFeePerMonth: 1000,
    tuitionFeeQuarterly: 3000,
    installment1: 8000,
    installment2: 3000,
    installment3: 3000,
    installment4: 3000,
    yearlyTotal: 17000
  },
  {
    srNo: 2,
    classGroup: "CLASS 1ST - 4TH",
    registrationFee: 500,
    admissionFee: 2000,
    activityFee: 1000,
    annualFee: 1000,
    examFee: 500,
    tuitionFeePerMonth: 1100,
    tuitionFeeQuarterly: 3300,
    installment1: 8300,
    installment2: 3300,
    installment3: 3300,
    installment4: 3300,
    yearlyTotal: 18200
  },
  {
    srNo: 3,
    classGroup: "CLASS 5TH - 8TH",
    registrationFee: 500,
    admissionFee: 2000,
    activityFee: 1000,
    annualFee: 1000,
    examFee: 500,
    tuitionFeePerMonth: 1200,
    tuitionFeeQuarterly: 3600,
    installment1: 8600,
    installment2: 3600,
    installment3: 3600,
    installment4: 3600,
    yearlyTotal: 19400
  },
  {
    srNo: 4,
    classGroup: "CLASS 9TH - 10TH",
    registrationFee: 500,
    admissionFee: 2000,
    activityFee: 1000,
    annualFee: 1000,
    examFee: 1000,
    tuitionFeePerMonth: 1500,
    tuitionFeeQuarterly: 4500,
    installment1: 10000,
    installment2: 4500,
    installment3: 4500,
    installment4: 4500,
    yearlyTotal: 23500
  },
  {
    srNo: 5,
    classGroup: "CLASS 11TH - 12TH",
    registrationFee: 500,
    admissionFee: 2000,
    activityFee: 1000,
    annualFee: 1000,
    examFee: 1000,
    tuitionFeePerMonth: 1800,
    tuitionFeeQuarterly: 5400,
    installment1: 10900,
    installment2: 5400,
    installment3: 5400,
    installment4: 5400,
    yearlyTotal: 27100
  }
];

export const FEE_NOTES = [
  "If the total fee of whole session is deposited at the time of admission, a 10% concession will be given on tuition fee.",
  "Transport fee will be charged for 11 months only.",
  "If any student is being admitted in the month of July, four months fee (April to July) must be deposited at the time of admission.",
  "If 3 children (siblings of the same parents) take admission, the youngest sibling will be given 100% discount on tuition fee.",
  "Fee once paid will not be refunded or transferred under any condition."
];

export const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Submit Application",
    desc: "Start with a quick online registration or visit the campus admission desk."
  },
  {
    step: "02",
    title: "Counselling Interaction",
    desc: "Our academic counselor connects with parents to understand the child's learning needs."
  },
  {
    step: "03",
    title: "Campus Walk-Through",
    desc: "Experience our labs, smart classrooms, sports ground, and meet the faculty."
  },
  {
    step: "04",
    title: "Document Verification",
    desc: "Provide birth certificate, Aadhaar, previous report cards, and transfer certificate."
  },
  {
    step: "05",
    title: "Fee Payment",
    desc: "Complete the first installment through bank transfer, UPI, or office counter."
  },
  {
    step: "06",
    title: "Admission Confirmed",
    desc: "Welcome to the SPS Global School family! Receive your student ID, syllabus, and kit."
  }
];

export const REQUIRED_DOCUMENTS = [
  "Birth Certificate (Original & Copy issued by Municipal Authority)",
  "Aadhaar Card (Student & Parents)",
  "Recent Passport Size Photographs (6 copies)",
  "Transfer Certificate (TC counter-signed for Class 2 onwards)",
  "Previous Academic Year Marksheet / Report Card",
  "Medical Fitness Certificate & Blood Group proof"
];

export const TESTIMONIALS = [
  {
    name: "Anshul Jain",
    role: "Parent of Grade 6 Student",
    text: "I am grateful for the opportunity to be a part of this school. The administration is supportive, and the school provides a positive and collaborative environment for both teaching and learning.",
    rating: 5
  },
  {
    name: "Amit Yadav",
    role: "Parent of Grade 9 Student",
    text: "The school focuses deeply on academic concepts. The teachers are well-qualified and explain topics clearly. Regular tests and separate physics, chemistry, biology, and computer labs keep students ahead.",
    rating: 5
  },
  {
    name: "Hemant Dubey",
    role: "Local Education Enthusiast & Parent",
    text: "This is one of the best institutions in Jaswantnagar. Activity-based learning, co-curricular engagement, strong discipline, dependable transport, and great infrastructure make it exceptional.",
    rating: 5
  },
  {
    name: "Anshul Pal",
    role: "Faculty Member & Mentor",
    text: "As a teacher here, I am proud to be part of a community that truly values education, collaboration, and student growth. Innovation in teaching is encouraged every day.",
    rating: 5
  }
];

export const STUDENT_ACHIEVEMENTS = [
  {
    name: "Aarav Sharma",
    category: "CBSE Board Topper",
    score: "96.4%",
    class: "Class X (2025)",
    tag: "District Merit",
    image: "/images/students/sps-students-hero.png"
  },
  {
    name: "Ananya Yadav",
    category: "National Science Olympiad",
    score: "Gold Medal",
    class: "Class VIII",
    tag: "State Rank 1",
    image: "/images/students/students-group.png"
  },
  {
    name: "Rohan Verma",
    category: "Inter-School Chess Championship",
    score: "1st Place",
    class: "Class VII",
    tag: "Regional Champion",
    image: "/images/students/students-in-uniform.jpg"
  },
  {
    name: "Priya Singh",
    category: "CBSE Regional Athletics Meet",
    score: "Silver Medal (400m)",
    class: "Class IX",
    tag: "Sports Excellence",
    image: "/images/activities/sports-day.jpg"
  }
];

export const FAQS = [
  {
    question: "What is the admission procedure at SPS Global School?",
    answer: "Admissions begin with the submission of the online registration form or an in-person visit to our school campus. Following application submission, parents and students attend an informal interaction, document verification, and complete the enrollment fee formalities."
  },
  {
    question: "Which curriculum does SPS Global School follow?",
    answer: "SPS Global School follows the Central Board of Secondary Education (CBSE) curriculum, New Delhi (Affiliation No. 2134255), integrated with practical lab sessions, experiential learning, and co-curricular development."
  },
  {
    question: "What are the school timings for students?",
    answer: "During winter, the school operates from 8:30 AM to 2:00 PM (Monday to Saturday). During summer, timings are 7:30 AM to 1:30 PM. Students are required to arrive at least 10 minutes prior to the morning bell."
  },
  {
    question: "Is school transport facility available in Jaswantnagar and surrounding areas?",
    answer: "Yes, SPS Global School operates safe, GPS-monitored school buses and vans covering Jaswantnagar, Etawah, and neighboring villages on NH-19 and adjoining routes. Transport fee is charged for 11 months only."
  },
  {
    question: "Are there any fee concessions or sibling discounts available?",
    answer: "Yes! A 10% concession on tuition fee is provided if the complete annual fee is paid at admission. Additionally, if three siblings from the same parents are enrolled, the youngest sibling receives a 100% discount on tuition fee."
  },
  {
    question: "How can parents communicate with the teachers and school leadership?",
    answer: "Parents can communicate via the official school diary, regular Parent-Teacher Meetings (PTMs), or by booking a prior appointment with the Principal and class teachers during school visiting hours."
  }
];
