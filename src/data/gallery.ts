export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: "Campus" | "Classrooms" | "Laboratories" | "Activities & Sports" | "Assembly & Culture";
  aspectRatio?: string;
  description?: string;
}

export const GALLERY_CATEGORIES = [
  "All",
  "Campus",
  "Classrooms",
  "Laboratories",
  "Activities & Sports",
  "Assembly & Culture"
] as const;

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    src: "/images/campus/main-building.jpg",
    title: "SPS Global School Main Campus Building",
    category: "Campus",
    description: "Front elevation of SPS Global School on NH-19, Jaswantnagar."
  },
  {
    id: "g2",
    src: "/images/students/sps-students-hero.png",
    title: "Proud Students in SPS School Uniform",
    category: "Assembly & Culture",
    description: "Our young learners embodying discipline, confidence, and warmth."
  },
  {
    id: "g3",
    src: "/images/facilities/composite-science-lab.jpg",
    title: "Composite Science Laboratory",
    category: "Laboratories",
    description: "Students conducting experiments under faculty guidance."
  },
  {
    id: "g4",
    src: "/images/classrooms/smart-classroom.png",
    title: "Interactive Smart Classroom",
    category: "Classrooms",
    description: "High-tech audiovisual learning environment with smart screens."
  },
  {
    id: "g5",
    src: "/images/facilities/computer-lab.jpg",
    title: "Advanced Computer & IT Laboratory",
    category: "Laboratories",
    description: "Individual workstations dedicated to coding and digital exploration."
  },
  {
    id: "g6",
    src: "/images/activities/sports-day.jpg",
    title: "Annual Sports Day & Athletics",
    category: "Activities & Sports",
    description: "Students participating in track and field events on the school grounds."
  },
  {
    id: "g7",
    src: "/images/facilities/library.jpg",
    title: "School Resource & Reading Library",
    category: "Campus",
    description: "Well-stocked book stacks promoting independent reading and research."
  },
  {
    id: "g8",
    src: "/images/activities/school-assembly.jpeg",
    title: "Morning School Assembly Gathering",
    category: "Assembly & Culture",
    description: "Students and teachers gathered for daily prayer, thought, and news."
  },
  {
    id: "g9",
    src: "/images/facilities/maths-lab.jpg",
    title: "Hands-on Mathematics Lab",
    category: "Laboratories",
    description: "Tactile geometric shapes and models making math engaging."
  },
  {
    id: "g10",
    src: "/images/activities/co-curricular.webp",
    title: "Co-curricular Workshop & Art Expression",
    category: "Activities & Sports",
    description: "Students collaborating on creative arts and science projects."
  },
  {
    id: "g11",
    src: "/images/activities/cultural-fest.jpg",
    title: "Annual Cultural Fest & Performances",
    category: "Assembly & Culture",
    description: "Celebration of dance, music, and stage drama showcasing student talents."
  },
  {
    id: "g12",
    src: "/images/campus/campus-event.jpg",
    title: "Campus Ground Celebration",
    category: "Campus",
    description: "Outdoor celebration and student assembly in lush campus grounds."
  }
];
