import { notFound } from "next/navigation";
import { getProduct } from "@/lib/product";
import { getContact } from "@/lib/contact";
import { ProductDetailView } from "@/components/products/detailed/product-detail-view";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// ==========================================
// DYNAMIC SEO METADATA
// ==========================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catSlug: string; slug: string }>;
}) {
  const { catSlug, slug } = await params;
  const product = await getProduct(catSlug, slug);

  if (!product) {
    return {
      title: "Product Not Found | Layrock Global Trading LTD",
    };
  }

  return {
    title:
      product.seo.meta_title || `${product.name} | Layrock Global Trading LTD`,

    description: product.seo.meta_description || product.description,

    keywords: product.seo.meta_key,

    openGraph: {
      title: product.seo.meta_title || product.name,
      description: product.seo.meta_description || product.description,
      images: product.image ? [product.image] : [],
    },
  };
}

// ==========================================
// PRODUCT DETAIL PAGE
// ==========================================

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ catSlug: string; slug: string }>;
}) {
  const { catSlug, slug } = await params;

  const [product, contactData] = await Promise.all([
    getProduct(catSlug, slug),
    getContact(),
  ]);

  if (!product) {
    notFound();
  }

  // Related products from Laravel API
  const relatedProducts = product.related_products;

  // WhatsApp number from Contact API
  const whatsapp = contactData?.contact?.whatsapp ?? "";

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-[#171717]">
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
        whatsapp={whatsapp}
      />
    </main>
  );
}
