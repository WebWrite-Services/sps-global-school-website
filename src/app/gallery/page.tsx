import React from "react";
import { ImageIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { createClient } from "@/lib/supabase/server";
import GalleryGrid from "@/components/ui/GalleryGrid";


export default async function GalleryPage() {
  const supabase = await createClient();

  const [{ data: images }, { data: categories }] = await Promise.all([
    supabase
      .from("gallery_images")
      .select("id, title, description, alt_text, download_url, gallery_categories(name)")
      .eq("status", "published")
      .order("created_at", { ascending: false }),
    supabase
      .from("gallery_categories")
      .select("id, name")
      .order("display_order", { ascending: true }),
  ]);

  const galleryImages = (images ?? []).map((img: any) => ({
    id: img.id,
    src: img.download_url || "",
    title: img.title || "Untitled",
    description: img.description || "",
    alt: img.alt_text || img.title || "Gallery Image",
    category: Array.isArray(img.gallery_categories)
      ? img.gallery_categories[0]?.name || "General"
      : (img.gallery_categories as { name: string } | null)?.name || "General",
  })).filter((img: any) => img.src);

  const categoryNames = ["All", ...(categories ?? []).map((c: any) => c.name)];

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
          {galleryImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#9CA3AF]">
              <ImageIcon className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-xl font-semibold text-[#626262]">No gallery images yet</p>
              <p className="text-sm mt-2">Check back soon for photos from campus life.</p>
            </div>
          ) : (
            <GalleryGrid images={galleryImages} categories={categoryNames} />
          )}
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}
