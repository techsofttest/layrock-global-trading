export interface CategoryProductSpecification {
  spec: string;
  origin: string;
  packing: string;
}

export interface CategoryProduct {
  id: number;
  cat_id: number;
  name: string;
  description: string;
  specification: CategoryProductSpecification;
  image: string;
  cat_slug: string;
  slug: string;
  imgs: string[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  banner_image: string;
  slug: string;
  products: CategoryProduct[];
}

export interface CategoryPageData {
  status: boolean;
  data: Category[];
}

// ==========================================
// GET CATEGORY DATA WITH PRODUCTS
// ==========================================

export async function getCategories(): Promise<
  CategoryPageData["data"] | null
> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);

    if (!response.ok) {
      throw new Error(`Category API error: ${response.status}`);
    }

    const result: CategoryPageData = await response.json();

    if (!result.status || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch category data:", error);
    return null;
  }
}
