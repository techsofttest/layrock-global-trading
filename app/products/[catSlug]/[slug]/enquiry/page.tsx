import { notFound } from "next/navigation";
import { getProductEnquiry } from "@/lib/product";
import { EnquiryBreadcrumb } from "@/components/products/enquiry/enquiry-breadcrumb";
import { EnquiryProductCard } from "@/components/products/enquiry/enquiry-product-card";
import { EnquiryFormSection } from "@/components/products/enquiry/enquiry-form-section";

type PageProps = {
  params: Promise<{
    catSlug: string;
    slug: string;
  }>;
};

// ==========================================
// DYNAMIC SEO METADATA
// ==========================================

export async function generateMetadata({ params }: PageProps) {
  const { catSlug, slug } = await params;

  const product = await getProductEnquiry(catSlug, slug);

  if (!product) {
    return {
      title: "Product Enquiry | Layrock Global Trading LTD",
    };
  }

  return {
    title:
      product.seo?.meta_title ||
      `Export Enquiry: ${product.name} | Layrock Global Trading LTD`,

    description: product.seo?.meta_description || product.description,

    keywords: product.seo?.meta_key,

    openGraph: {
      title: product.seo?.meta_title || `Export Enquiry: ${product.name}`,

      description: product.seo?.meta_description || product.description,

      images: product.image ? [product.image] : [],
    },
  };
}

// ==========================================
// PRODUCT ENQUIRY PAGE
// ==========================================

export default async function ProductEnquiryPage({ params }: PageProps) {
  const { catSlug, slug } = await params;

  const product = await getProductEnquiry(catSlug, slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fcfcfc] text-[#171717]">
      {/* Breadcrumb */}
      <EnquiryBreadcrumb product={product} />

      {/* Main Enquiry Layout */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-8">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            {/* Left Column: Product Summary Card */}
            <div className="lg:sticky lg:top-28 lg:col-span-4">
              <EnquiryProductCard product={product} />
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="lg:col-span-8">
              <EnquiryFormSection product={product} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
