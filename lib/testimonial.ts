// --------------------------------------------------
// SEO
// --------------------------------------------------

export interface TestimonialSEO {
  id: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

// --------------------------------------------------
// Banner
// --------------------------------------------------

export interface TestimonialBanner {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: string;
}

// --------------------------------------------------
// Testimonial
// --------------------------------------------------

export interface Testimonial {
  id: number;
  name: string;
  description: string;
  designation: string;
}

// --------------------------------------------------
// API Response
// --------------------------------------------------

export interface TestimonialsPageData {
  status: boolean;
  data: {
    seo: TestimonialSEO;
    bannerData: TestimonialBanner;
    testimonials: Testimonial[];
  };
}

// --------------------------------------------------
// Fetch Testimonials
// --------------------------------------------------

export async function getTestimonials(): Promise<
  TestimonialsPageData["data"] | null
> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonial`,
    );

    if (!response.ok) {
      throw new Error(`Testimonials API error: ${response.status}`);
    }

    const result: TestimonialsPageData = await response.json();

    if (!result.status || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch testimonials data:", error);
    return null;
  }
}
