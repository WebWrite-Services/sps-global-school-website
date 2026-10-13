import type { Metadata } from "next";
import { SCHOOL_INFO } from "@/data/school";

const SITE_URL = "https://spsglobalschool.com";

export function generateSchoolMetadata({
  title,
  description,
  path = "",
  keywords = []
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | SPS Global School Jaswantnagar`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "SPS Global School",
      "Best School in Jaswantnagar",
      "CBSE School Etawah",
      "Top School Jaswantnagar Etawah",
      "SPS Global School admission 2026-27",
      "English medium school Jaswantnagar",
      ...keywords
    ],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "SPS Global School",
      images: [
        {
          url: "/images/campus/main-building.jpg",
          width: 1200,
          height: 630,
          alt: "SPS Global School Campus, Jaswantnagar, Etawah"
        }
      ],
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/images/campus/main-building.jpg"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

export function generateSchoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": SCHOOL_INFO.name,
    "legalName": "SPS Global School, Jaswantnagar",
    "alternateName": "SPS Global School Etawah",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/branding/sps-logo.png`,
    "image": `${SITE_URL}/images/campus/main-building.jpg`,
    "description": "SPS Global School is a premier CBSE-affiliated English medium co-educational senior secondary school in Jaswantnagar, Etawah, UP.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH-19, Agra Road, Kaist",
      "addressLocality": "Jaswantnagar",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "206245",
      "addressCountry": "IN"
    },
    "telephone": SCHOOL_INFO.phoneNumbers,
    "email": SCHOOL_INFO.email,
    "sameAs": [
      SCHOOL_INFO.socialLinks.facebook,
      SCHOOL_INFO.socialLinks.instagram
    ]
  };
}
