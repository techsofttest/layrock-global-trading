import type { Metadata } from "next";

import { CATEGORIES } from "@/components/data/site-data";

import { AboutSection } from "@/components/home/about-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { ShippingBanner } from "@/components/home/shipping-banner";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { ProductListing } from "@/components/home/product-listing";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TrustIndicators } from "@/components/home/trust-indicators";

import { getCategories } from "@/lib/category";
import { getContact } from "@/lib/contact";
import { getTestimonials } from "@/lib/testimonial";

export const dynamic = "force-dynamic";

// Fetch Home API
async function getHomePage() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`);

    if (!response.ok) {
      throw new Error(`Home API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.status || !result.data) {
      return {};
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return {};
  }
}

// Dynamic SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomePage();
  const seo = homeData?.seo ?? {};

  const description = (seo.meta_description || "")
    .replace(/<[^>]*>/g, "")
    .trim();

  return {
    title: seo.meta_title || "Layrock Global Trading LTD",
    description:
      description ||
      "Global sourcing and export solutions from Layrock Global Trading LTD.",
    keywords: seo.meta_keywords || "",

    openGraph: {
      title: seo.meta_title || "Layrock Global Trading LTD",
      description:
        description ||
        "Global sourcing and export solutions from Layrock Global Trading LTD.",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seo.meta_title || "Layrock Global Trading LTD",
      description:
        description ||
        "Global sourcing and export solutions from Layrock Global Trading LTD.",
    },
  };
}

export default async function HomePage() {
  const [categories, contactData, testimonialData] = await Promise.all([
    getCategories(),
    getContact(),
    getTestimonials(),
  ]);

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-[#171717]">
      <Hero slides={categories ?? []} />
      <TrustIndicators />
      <CategoriesSection categories={categories ?? []} />
      <ShippingBanner />
      <CategoryShowcase categories={categories ?? []} />
      <ProductListing categories={categories ?? []} />
      <AboutSection />

      <TestimonialsSection testimonials={testimonialData?.testimonials ?? []} />

      <ContactSection
        categories={CATEGORIES}
        email={contactData?.contact?.email ?? ""}
      />
    </main>
  );
}
