import type { Metadata } from "next";
import { Suspense } from "react";

import { getCategories } from "@/lib/category";
import { ProductsCatalogContainer } from "@/components/products/listing/products-catalog-container";

export const dynamic = "force-dynamic";

// Fetch Product API
async function getProductPage() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);

    if (!response.ok) {
      throw new Error(`Product API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.status || !result.data) {
      return {};
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return {};
  }
}

// Dynamic SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const productData = await getProductPage();
  const seo = productData?.seo ?? {};

  const description = (seo.meta_description || "")
    .replace(/<[^>]*>/g, "")
    .trim();

  return {
    title:
      seo.meta_title || "All Products & Catalog | Layrock Global Trading LTD",

    description:
      description ||
      "Explore our complete product catalog across aluminium extrusions, structural metals, polymers, Indian spices, and AAC building blocks.",

    keywords: seo.meta_keywords || "",

    openGraph: {
      title:
        seo.meta_title || "All Products & Catalog | Layrock Global Trading LTD",

      description:
        description ||
        "Explore our complete product catalog across aluminium extrusions, structural metals, polymers, Indian spices, and AAC building blocks.",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        seo.meta_title || "All Products & Catalog | Layrock Global Trading LTD",

      description:
        description ||
        "Explore our complete product catalog across aluminium extrusions, structural metals, polymers, Indian spices, and AAC building blocks.",
    },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;

  const initialCategory = resolvedParams?.category;

  const categories = await getCategories();

  // Filter out any virtual "All products" category
  const mainCategories =
    categories?.filter((category) => category.name !== "All products") ?? [];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f4f5f7] text-[#171717]">
      <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7]" />}>
        <ProductsCatalogContainer
          categories={mainCategories}
          initialCategory={initialCategory}
        />
      </Suspense>
    </main>
  );
}
