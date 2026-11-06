export interface ProductSpecification {
  Spec: string;
  Origin: string;
  Packing: string;
}

export interface ProductCategory {
  id: number | null;
  name: string | null;
  slug: string;
}

export interface RelatedProduct {
  name: string;
  slug: string;
  cat_slug: string;
  description: string;
  image: string | null;
  category_name: string | null;
}

export interface ProductSEO {
  meta_title: string;
  meta_description: string;
  meta_key: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  category: ProductCategory;
  specification: ProductSpecification;
  images: string[];
  related_products: RelatedProduct[];
  seo: ProductSEO;
}

export interface ProductDetailResponse {
  success: boolean;
  data: ProductDetail;
  message?: string;
}

// ==========================================
// PRODUCT ENQUIRY INTERFACES
// ==========================================

export interface ProductEnquiry {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  category: ProductCategory;
  specification: ProductSpecification;
  seo: ProductSEO;
}

export interface ProductEnquiryResponse {
  success: boolean;
  data: ProductEnquiry;
  message?: string;
}

// ==========================================
// GET PRODUCT DETAIL DATA
// ==========================================

export async function getProduct(
  catSlug: string,
  slug: string,
): Promise<ProductDetail | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${encodeURIComponent(catSlug)}/${encodeURIComponent(slug)}`,
    );

    if (!response.ok) {
      throw new Error(`Product API error: ${response.status}`);
    }

    const result: ProductDetailResponse = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch product detail data:", error);
    return null;
  }
}

// ==========================================
// GET PRODUCT ENQUIRY DATA
// ==========================================

export async function getProductEnquiry(
  catSlug: string,
  slug: string,
): Promise<ProductEnquiry | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${encodeURIComponent(catSlug)}/${encodeURIComponent(slug)}/enquiry`,
    );

    if (!response.ok) {
      throw new Error(`Product Enquiry API error: ${response.status}`);
    }

    const result: ProductEnquiryResponse = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch product enquiry data:", error);
    return null;
  }
}
