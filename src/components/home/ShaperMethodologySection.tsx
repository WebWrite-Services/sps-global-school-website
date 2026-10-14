import React from "react";
import Image from "next/image";

export default function ShaperMethodologySection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Mobile: horizontally scrollable so SHAPER cards stay readable; Desktop: full-width fit */}
      <div className="overflow-x-auto sm:overflow-visible">
        <Image
          src="/images/shaper-methodology.png"
          alt="Our Methodology for Exceptional Growth — SHAPER: Self-Discipline, Hard Work, Applied Science, Research, Physical Fitness, Exposure, Reflective & Independent"
          width={2167}
          height={725}
          sizes="100vw"
          priority
          className="w-full min-w-[720px] h-auto object-contain"
        />
      </div>
    </section>
  );
}
