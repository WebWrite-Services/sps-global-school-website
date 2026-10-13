"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Lightbox from "@/components/ui/Lightbox";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { GALLERY_IMAGES, GALLERY_CATEGORIES, GalleryImage } from "@/data/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <>
      <PageHero
        badge="Photo Gallery"
        title="Campus Life in Pictures"
        subtitle="Explore our vibrant campus, interactive smart classrooms, scientific laboratories, and cultural celebrations."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#A50026] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-[#FCE5E9] hover:text-[#A50026]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setSelectedImageIndex(index)}
                className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border-2 border-transparent hover:border-[#A50026] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#A50026] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {img.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-[#FFC52E]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-sm sm:text-base font-bold leading-snug">
                      {img.title}
                    </h3>
                    {img.description && (
                      <p className="text-gray-300 text-xs line-clamp-1 mt-1">
                        {img.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <Lightbox
          isOpen={true}
          onClose={() => setSelectedImageIndex(null)}
          imageSrc={filteredImages[selectedImageIndex].src}
          imageTitle={filteredImages[selectedImageIndex].title}
          imageCategory={filteredImages[selectedImageIndex].category}
          onPrev={() =>
            setSelectedImageIndex((prev) =>
              prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1
            )
          }
          onNext={() =>
            setSelectedImageIndex((prev) =>
              prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0
            )
          }
        />
      )}

      <AdmissionCTASection />
    </>
  );
}
