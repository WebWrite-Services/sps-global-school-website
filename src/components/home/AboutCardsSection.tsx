import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutCardsSection() {
  const cards = [
    {
      icon: <BookOpen className="w-6 h-6 text-[#A50026]" />,
      image: "/images/classrooms/classroom-learning.png",
      title: "Academic Excellence",
      subtitle: "Inquiry-Led CBSE Pedagogy",
      desc: "Our curriculum emphasizes deep conceptual understanding, practical experimentation, and scientific inquiry over rote memorization.",
      link: "/our-classroom",
      linkLabel: "Explore Classrooms"
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#A50026]" />,
      image: "/images/activities/school-assembly.jpeg",
      title: "Values and Character",
      subtitle: "Moral Integrity & Discipline",
      desc: "Daily school assemblies, ethical discourse, and community engagement shape students with humility, empathy, and strong civic responsibility.",
      link: "/student-responsibility",
      linkLabel: "Student Responsibility"
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#A50026]" />,
      image: "/images/activities/sports-day.jpg",
      title: "Beyond the Classroom",
      subtitle: "Sports, Arts & Innovation",
      desc: "From inter-school athletics and taekwondo to robotics and cultural drama, our learners discover diverse talents and passions.",
      link: "/co-curricular-activities",
      linkLabel: "View Activities"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FFF7F8] border-b border-[#FCE5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Core Pillars"
          title="The SPS Approach to"
          highlightedText="Holistic Education"
          subtitle="Three interconnected foundations that ensure every learner excels intellectually, morally, and socially."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Card Header Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-2.5 rounded-2xl shadow-sm border border-[#A50026]/10">
                  {card.icon}
                </div>
                <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-[#FFC52E] to-transparent rounded-bl-3xl opacity-80" />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#A50026] uppercase tracking-wider block mb-1">
                    {card.subtitle}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#242424] mb-3 group-hover:text-[#A50026] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6">
                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] group-hover:text-[#85001F] transition-colors"
                  >
                    <span>{card.linkLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
