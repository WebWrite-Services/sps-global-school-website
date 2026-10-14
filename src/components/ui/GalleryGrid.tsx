"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Maximize2, ImageIcon } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";

interface GalleryImageItem {
  id: string;
  src: string;
  title: string;
  description?: string;
  alt: string;
  category: string;
}

interface Props {
  images: GalleryImageItem[];
  categories: string[];
}

const PAGE_SIZE = 12;

export default function GalleryGrid({ images, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((img) => img.category === activeCategory),
    [images, activeCategory]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Release the page scroll if the grid unmounts while a lightbox is open
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, []);

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setSelectedIndex(null);
  };

  const openAt = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      {/* Category Filter Pills — horizontally scrollable on mobile */}
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-center gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#A50026] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-[#FCE5E9] hover:text-[#A50026]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
          <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
          <p className="font-semibold text-[#626262]">No photos in this category yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {visible.map((img, index) => (
            <div
              key={img.id}
              role="button"
              tabIndex={0}
              aria-label={`Open ${img.title}`}
              onClick={() => openAt(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openAt(index);
                }
              }}
              className="relative aspect-[4/3] sm:aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-transparent hover:border-[#A50026] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A50026]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <span className="bg-[#A50026] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider truncate max-w-[70%]">
                    {img.category}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC52E]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-xs sm:text-base font-bold leading-snug line-clamp-2">
                    {img.title}
                  </h3>
                  {img.description && (
                    <p className="hidden sm:block text-gray-300 text-xs line-clamp-1 mt-1">
                      {img.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="px-6 py-3 rounded-full bg-white border border-[#E5E5E5] text-sm font-bold text-[#242424] hover:border-[#A50026] hover:text-[#A50026] transition-colors"
          >
            Load more ({filtered.length - visible.length} remaining)
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <Lightbox
          isOpen={true}
          onClose={closeLightbox}
          imageSrc={filtered[selectedIndex].src}
          imageTitle={filtered[selectedIndex].title}
          imageCategory={filtered[selectedIndex].category}
          currentIndex={selectedIndex}
          totalCount={filtered.length}
          onPrev={() =>
            setSelectedIndex((prev) =>
              prev !== null && prev > 0 ? prev - 1 : filtered.length - 1
            )
          }
          onNext={() =>
            setSelectedIndex((prev) =>
              prev !== null && prev < filtered.length - 1 ? prev + 1 : 0
            )
          }
        />
      )}
    </>
  );
}
