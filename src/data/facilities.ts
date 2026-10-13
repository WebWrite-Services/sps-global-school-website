export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string[];
  features: string[];
  image: string;
  alt: string;
  href: string;
}

export const FACILITIES: FacilityItem[] = [
  {
    id: "campus",
    title: "Eco-Friendly Sprawling Campus",
    category: "Campus & Grounds",
    shortDesc: "A safe, secure, 20+ acre green learning haven situated directly on NH-19, Jaswantnagar, Etawah.",
    fullDesc: [
      "SPS Global School is situated in a pollution-free, spacious, and serene environment on NH-19, Kaist, Jaswantnagar, Etawah.",
      "The campus is architecturally planned to foster both focused academic concentration and energetic outdoor sports and recreation.",
      "With 24/7 CCTV surveillance, boundary walls, security personnel, and green landscaped lawns, the campus provides absolute safety and peace of mind for parents."
    ],
    features: [
      "24x7 CCTV Surveillance & Fire Safety Certified",
      "Spacious playfields for Cricket, Football, & Athletics",
      "Lush landscaped greenery with shaded seating zones",
      "Clean RO drinking water points throughout campus"
    ],
    image: "/images/campus/main-building.jpg",
    alt: "SPS Global School main campus building and grounds",
    href: "/our-campus"
  },
  {
    id: "classrooms",
    title: "Smart Digitally-Enabled Classrooms",
    category: "Academic Infrastructure",
    shortDesc: "Naturally lit, ergonomically furnished, and equipped with modern audiovisual interactive display units.",
    fullDesc: [
      "Every classroom at SPS Global School is thoughtfully designed to promote participatory learning and deep engagement.",
      "With high ceilings, large windows, and proper ventilation, students enjoy a comfortable and refreshing atmosphere throughout the school day.",
      "Interactive smart boards enable teachers to illustrate complex concepts through 3D models, educational simulations, and multimedia resources."
    ],
    features: [
      "Ergonomic child-safe furniture suited to each age group",
      "Interactive Digital Smart Boards with audio visual aids",
      "Optimal student-teacher ratio for individualized attention",
      "Display boards celebrating student projects and artworks"
    ],
    image: "/images/classrooms/smart-classroom.png",
    alt: "Smart digital classroom in SPS Global School",
    href: "/our-classroom"
  },
  {
    id: "computer-lab",
    title: "High-Tech Computer & ICT Lab",
    category: "Technology",
    shortDesc: "Equipped with high-speed internet, modern workstations, coding platforms, and digital literacy tools.",
    fullDesc: [
      "In the modern digital era, computer fluency is essential. Our state-of-the-art computer laboratory introduces students to IT fundamentals, programming, and digital creativity.",
      "Every student gets individual access to a workstation during practical sessions under the guidance of specialized ICT mentors.",
      "Curriculum covers foundational computing, Scratch programming, Python, web basics, and responsible cyber citizenship."
    ],
    features: [
      "Individual workstation per student with high-speed connectivity",
      "Curriculum aligned with CBSE IT and Artificial Intelligence codes",
      "Safeguarded browsing with enterprise firewall and content filters",
      "Hands-on practice in logic building, coding, and productivity tools"
    ],
    image: "/images/facilities/computer-lab.jpg",
    alt: "High-tech computer lab at SPS Global School",
    href: "/labs"
  },
  {
    id: "science-labs",
    title: "Composite & Advanced Science Labs",
    category: "Practical Learning",
    shortDesc: "Well-equipped Physics, Chemistry, and Biology laboratories adhering strictly to CBSE safety norms.",
    fullDesc: [
      "Science comes alive when theoretical hypotheses are verified through hands-on experimentation.",
      "SPS Global School houses comprehensive laboratories stocked with high-grade optical microscopes, chemical apparatus, electrical circuit sets, and biological specimens.",
      "Trained laboratory assistants ensure strict compliance with safety guidelines while encouraging students to investigate scientific phenomena freely."
    ],
    features: [
      "Individual testing stations for Physics, Chemistry, and Biology",
      "Full complement of CBSE prescribed experimental apparatus",
      "Safety showers, eye-wash stations, and fire extinguishers installed",
      "Interactive demonstration tables for teacher-led scientific experiments"
    ],
    image: "/images/facilities/composite-science-lab.jpg",
    alt: "Composite science laboratory at SPS Global School",
    href: "/labs"
  },
  {
    id: "maths-lab",
    title: "Mathematics Activity Lab",
    category: "Conceptual Learning",
    shortDesc: "Interactive manipulatives, geometric models, and puzzle kits making abstract math tangible and fun.",
    fullDesc: [
      "Our Mathematics Lab turns abstract numbers and theorems into tactile, engaging explorations.",
      "Students utilize 3D shapes, abacuses, coordinate boards, and calculation puzzles to visualize formulas and develop quick arithmetic intuition.",
      "The lab removes the fear of math, transforming it into an exciting problem-solving adventure."
    ],
    features: [
      "Tactile geometric solids and trigonometry verification kits",
      "Mathematical puzzles, logic board games, and algebraic tiles",
      "Regular lab-based assessments to build quantitative confidence",
      "Special coaching for Mathematics Olympiad contenders"
    ],
    image: "/images/facilities/maths-lab.jpg",
    alt: "Mathematics activity laboratory at SPS Global School",
    href: "/labs"
  },
  {
    id: "library",
    title: "Knowledge Hub & Rich Library",
    category: "Reading & Research",
    shortDesc: "A treasure trove of fiction, non-fiction, encyclopedias, reference texts, and periodicals.",
    fullDesc: [
      "The library at SPS Global School is a quiet sanctuary dedicated to fostering a lifelong love of literature and self-directed inquiry.",
      "Our curated collection ranges from early reader picture books and timeless classics to curriculum reference volumes and science periodicals.",
      "Regular library periods and storytelling sessions help broaden children's vocabulary, imagination, and world outlook."
    ],
    features: [
      "Thousands of cataloged titles across literature, science, and history",
      "Dedicated quiet reading zones with comfortable furnishings",
      "Subscriptions to leading national dailies, children's digests, and magazines",
      "Librarian-guided research assistance for school projects"
    ],
    image: "/images/facilities/library.jpg",
    alt: "Spacious school library at SPS Global School",
    href: "/library"
  }
];
