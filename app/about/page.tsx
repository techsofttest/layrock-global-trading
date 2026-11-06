import type { Metadata } from "next";

import { ContactSection } from "@/components/home/contact-section";
import { PageHero } from "@/components/ui/page-hero";
import { AboutOverview } from "@/components/about/about-overview";
import { AboutEntities } from "@/components/about/about-entities";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { CATEGORIES } from "@/components/data/site-data";

import type { AboutContent } from "@/components/about/about-overview";
import type { IndustrialFootprint } from "@/components/about/about-entities";

import { getContact } from "@/lib/contact";

export const dynamic = "force-dynamic";

// --------------------------------------------------
// API Response Types
// --------------------------------------------------

interface AboutPageData {
  seo: {
    id: number;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
  bannerData: {
    id: number;
    subtitle: string;
    title: string;
    description: string;
    image: string | null;
  };
  about: AboutContent;
  industrialFootprint: IndustrialFootprint;
}

// --------------------------------------------------
// Fetch About Page
// --------------------------------------------------

async function getAbout(): Promise<AboutPageData | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`About API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.status || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch About page data:", error);
    return null;
  }
}

// --------------------------------------------------
// Dynamic SEO Metadata
// --------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getAbout();
  const seo = aboutData?.seo;

  return {
    title: seo?.meta_title || "About Us | Layrock Global Trading LTD",
    description:
      seo?.meta_description ||
      "Learn about Layrock Global Trading LTD — bridging continents through trusted international procurement, distribution, and cross-border trade.",
    keywords: seo?.meta_keywords || "",
  };
}

// --------------------------------------------------
// About Page
// --------------------------------------------------

export default async function AboutPage() {
  const [aboutData, contactData] = await Promise.all([
    getAbout(),
    getContact(),
  ]);

  const banner = aboutData?.bannerData;

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-[#171717]">
      {/* Dynamic Hero Banner */}
      <PageHero
        eyebrow={banner?.subtitle || "WHO WE ARE"}
        title={banner?.title || "About Us"}
        description={
          banner?.description ||
          "Layrock Global Trading LTD — Bridging continents through trusted international procurement, distribution, and cross-border trade."
        }
        image={banner?.image || "/banner/b10.png"}
        imageAlt="Layrock Global Trading - About Us"
      />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Dynamic About Overview */}
      {aboutData?.about && <AboutOverview about={aboutData.about} />}

      {/* Dynamic Industrial Footprint */}
      {aboutData?.industrialFootprint && (
        <AboutEntities industrialFootprint={aboutData.industrialFootprint} />
      )}

      {/* Contact Section */}
      <ContactSection
        categories={CATEGORIES}
        email={contactData?.contact?.email ?? ""}
      />
    </main>
  );
}
