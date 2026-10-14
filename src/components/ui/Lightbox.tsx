"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageTitle: string;
  imageCategory?: string;
  currentIndex?: number;
  totalCount?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const SWIPE_THRESHOLD = 48;

export default function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  imageTitle,
  imageCategory,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
}: LightboxProps) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

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

  // Lock background scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx < 0) onNext?.();
    else onPrev?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={imageTitle}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-3 sm:px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xs animate-in fade-in duration-200 overscroll-contain"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
        aria-label="Close image modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      {typeof currentIndex === "number" && typeof totalCount === "number" && totalCount > 0 && (
        <div className="absolute top-[max(0.85rem,env(safe-area-inset-top))] left-3 z-50 text-xs font-semibold text-white/70 tabular-nums">
          {currentIndex + 1} / {totalCount}
        </div>
      )}

      {/* Prev button */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Next button */}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Modal Content */}
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-full h-[46dvh] sm:h-[68vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black">
          <Image
            src={imageSrc}
            alt={imageTitle}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
            priority
          />
        </div>
        <div className="mt-3 sm:mt-4 text-center text-white max-w-full">
          {imageCategory && (
            <span className="inline-block bg-[#A50026] text-[#FFC52E] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
              {imageCategory}
            </span>
          )}
          <h3 className="text-sm sm:text-lg font-bold line-clamp-2">{imageTitle}</h3>
          <p className="hidden sm:block text-xs text-white/50 mt-1">
            Use ← → keys or swipe to navigate · Esc to close
          </p>
        </div>
      </div>
    </div>
  );
}
