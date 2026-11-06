import type { Metadata } from "next";

import { PageHero } from "@/components/ui/page-hero";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { getTestimonials } from "@/lib/testimonial";

// Dynamic SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const testimonialData = await getTestimonials();
  const seo = testimonialData?.seo;

  return {
    title:
      seo?.meta_title || "Client Testimonials | Layrock Global Trading LTD",
    description:
      seo?.meta_description ||
      "Read real feedback and trade experiences from our global partners, wholesale importers, and industrial buyers worldwide.",
    keywords: seo?.meta_keywords || "",
  };
}

export default async function TestimonialsPage() {
  const testimonialData = await getTestimonials();

  const banner = testimonialData?.bannerData;

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-[#171717]">
      {/* Dynamic Page Hero */}
      <PageHero
        eyebrow={banner?.subtitle || "CLIENT VOICES"}
        title={banner?.title || "Testimonials"}
        description={
          banner?.description ||
          "Built on clear communication, verified supply lines, and dependable follow-through across international borders."
        }
        image={banner?.image || "/banner/b7.png"}
        imageAlt="Layrock Global Trading - Client Testimonials"
      />

      {/* Dynamic Testimonials */}
      <TestimonialsSection testimonials={testimonialData?.testimonials ?? []} />
    </main>
  );
}
