import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { EMAIL_ADDRESS } from "@/components/data/site-data";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductBreadcrumb } from "@/components/products/detailed/product-breadcrumb";
import { ProductGallery } from "@/components/products/detailed/product-gallery";
import { ProductSpecs } from "@/components/products/detailed/product-specs";
import { ProductFloatingCta } from "@/components/products/detailed/product-floating-cta";
import { RelatedProductsSection } from "@/components/products/detailed/related-products-section";
import type { ProductDetail, RelatedProduct } from "@/lib/product";

export interface ProductDetailViewProps {
  product: ProductDetail;
  relatedProducts: RelatedProduct[];
  whatsapp: string;
}

export function ProductDetailView({
  product,
  relatedProducts,
  whatsapp,
}: ProductDetailViewProps) {
  // ==========================================
  // DYNAMIC PRODUCT DATA
  // ==========================================

  const categoryName = product.category.name ?? "Product";

  const images = [
    ...(product.image ? [product.image] : []),
    ...product.images,
  ].filter((image, index, array) => array.indexOf(image) === index);

  const specs = {
    spec: product.specification.Spec,
    origin: product.specification.Origin,
    packing: product.specification.Packing,
  };

  // ==========================================
  // ENQUIRY DETAILS
  // ==========================================

  const mailtoSubject = encodeURIComponent(
    `Export Enquiry: ${product.name} (Ref: ${product.id})`,
  );

  const mailtoBody = encodeURIComponent(
    `Dear Layrock Global Trading Desk,

I would like to initiate an export enquiry for:

Product: ${product.name}
Category: ${categoryName}
Item Ref: ${product.id}

Required Quantity:
Destination Port / Country:
Preferred Incoterm (FOB/CIF/CFR):

Company Name:
Contact Person:
Phone Number:
`,
  );

  const exportEnquiryHref = `mailto:${EMAIL_ADDRESS}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const cleanPhone = whatsapp.replace(/\D/g, "");

  const whatsappText = encodeURIComponent(
    `Hello Layrock Global Trading LTD, I would like to chat regarding: ${product.name} (Ref: ${product.id}, Category: ${categoryName}).`,
  );

  const whatsappHref = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${whatsappText}`
    : "#";

  const enquiryPageHref = `/products/${product.category.slug}/${product.slug}/enquiry`;

  return (
    <div className="bg-white text-[#171717]">
      {/* 1. Breadcrumb Component */}
      <ProductBreadcrumb product={product} />

      {/* 2. Main Product Showcase */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* Left: Product Gallery */}
            <div className="lg:sticky lg:top-28 lg:col-span-6">
              <ProductGallery images={images} productName={product.name} />
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col lg:col-span-6">
              <Eyebrow>{categoryName}</Eyebrow>

              <h1 className="mt-2 text-[24px] font-bold leading-[1.15] tracking-[-0.035em] text-[#171717] sm:text-[28px] lg:text-[36px]">
                {product.name}
              </h1>

              {/* Product Description */}
              <div
                className="mt-4 text-[14.5px] leading-relaxed text-[#4a4a4a] sm:text-[15px]"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />

              {/* Primary Call to Action Buttons */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  as="a"
                  href={enquiryPageHref}
                  variant="primary"
                  size="lg"
                  fullWidth
                  rightIcon={<ArrowRight size={17} />}
                  className="rounded-xl shadow-md"
                >
                  Start Enquiry
                </Button>

                <Button
                  as="a"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  fullWidth
                  leftIcon={<FaWhatsapp className="text-[#25D366] text-xl" />}
                  className="rounded-xl font-bold tracking-wider hover:border-[#25D366] hover:bg-[#25D366]/5 hover:text-[#171717]"
                >
                  Chat on WhatsApp
                </Button>
              </div>

              {/* Technical Specifications */}
              <ProductSpecs
                spec={specs.spec}
                origin={specs.origin}
                packing={specs.packing}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Products */}
      <RelatedProductsSection
        category={categoryName}
        relatedProducts={relatedProducts}
      />

      {/* 4. Floating CTA */}
      <ProductFloatingCta
        name={product.name}
        category={categoryName}
        image={product.image ?? ""}
        enquiryHref={enquiryPageHref}
      />
    </div>
  );
}
