export interface ContactSEO {
  id: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export interface ContactBanner {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: string;
}

export interface ContactDetails {
  id: number;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  opening_hours: string;
}

export interface ContactPageData {
  status: boolean;
  data: {
    seo: ContactSEO;
    bannerData: ContactBanner;
    contact: ContactDetails;
  };
}

export async function getContact(): Promise<ContactPageData["data"] | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`);

    if (!response.ok) {
      throw new Error(`Contact API error: ${response.status}`);
    }

    const result: ContactPageData = await response.json();

    if (!result.status || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch contact data:", error);
    return null;
  }
}
