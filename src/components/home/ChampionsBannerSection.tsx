import React from "react";
import Image from "next/image";

export default function ChampionsBannerSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#A50026]">
      <Image
        src="/images/students/champions-banner.png"
        alt="Get to Know Our Champions - SPS Global School students"
        width={2000}
        height={750}
        priority
        sizes="100vw"
        className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-[440px] xl:h-auto xl:aspect-[8/3] object-cover object-center"
      />
    </section>
  );
}
