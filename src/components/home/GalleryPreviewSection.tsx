"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Lightbox from "@/components/ui/Lightbox";
import { GALLERY_IMAGES } from "@/data/gallery";

export default function GalleryPreviewSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const previewImages = GALLERY_IMAGES.slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            badge="Visual Journey"
            title="Life &amp; Moments at"
            highlightedText="SPS Global School"
            subtitle="Glimpses of daily school assemblies, science explorations, sports meets, and vibrant celebrations."
          />
          <div className="shrink-0 mb-6">
            <Button href="/gallery" variant="primary" size="md">
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 text-[#FFC52E]" />
            </Button>
          </div>
        </div>

        {/* 6-Photo Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(index)}
              className="relative h-64 rounded-3xl overflow-hidden border-2 border-transparent hover:border-[#A50026] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
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

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <Lightbox
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageSrc={previewImages[selectedImage].src}
          imageTitle={previewImages[selectedImage].title}
          imageCategory={previewImages[selectedImage].category}
          onPrev={() =>
            setSelectedImage((prev) =>
              prev !== null && prev > 0 ? prev - 1 : previewImages.length - 1
            )
          }
          onNext={() =>
            setSelectedImage((prev) =>
              prev !== null && prev < previewImages.length - 1 ? prev + 1 : 0
            )
          }
        />
      )}
    </section>
  );
}
