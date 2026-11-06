import type { Metadata } from "next";

import { PageHero } from "@/components/ui/page-hero";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactFormSection } from "@/components/contact/contact-form-section";

import { getContact } from "@/lib/contact";
import { getCategories } from "@/lib/category";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const contactData = await getContact();

  const title =
    contactData?.seo?.meta_title || "Contact Us | Layrock Global Trading LTD";

  const description =
    contactData?.seo?.meta_description ||
    "Get in touch with Layrock Global Trading LTD for sourcing inquiries, shipping quotes, and international trade assistance.";

  return {
    title,
    description,
    keywords: contactData?.seo?.meta_keywords || undefined,

    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Layrock Global Trading LTD",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ContactPage() {
  const [contactData, categories] = await Promise.all([
    getContact(),
    getCategories(),
  ]);

  const banner = contactData?.bannerData;
  const contact = contactData?.contact;

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-[#171717]">
      <PageHero
        eyebrow={banner?.subtitle || "GET IN TOUCH"}
        title={banner?.title || "Contact Us"}
        description={
          banner?.description ||
          "Let's discuss your sourcing needs. Reach out to our global trade desk."
        }
        image={banner?.image || "/banner/b8.png"}
        imageAlt="Layrock Global Trading - Contact Us"
      />

      <ContactDetails contact={contact} />

      <ContactFormSection categories={categories || []} />
    </main>
  );
}
