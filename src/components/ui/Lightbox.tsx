"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageTitle: string;
  imageCategory?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  imageTitle,
  imageCategory,
  onPrev,
  onNext
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close image modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Content */}
      <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={imageSrc}
            alt={imageTitle}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="mt-4 text-center text-white">
          {imageCategory && (
            <span className="inline-block bg-[#A50026] text-[#FFC52E] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
              {imageCategory}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-bold">{imageTitle}</h3>
        </div>
      </div>
    </div>
  );
}
