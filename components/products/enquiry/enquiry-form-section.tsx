"use client";

import { useMemo, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  type Country,
} from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";

import type { ProductEnquiry } from "@/lib/product";
import {
  EnquiryForm,
  type EnquiryFormData,
} from "@/components/products/enquiry/enquiry-form";
import { EnquirySuccessModal } from "@/components/products/enquiry/enquiry-success-modal";
import type { CountryItem } from "@/components/products/enquiry/destination-country-selector";

export interface EnquiryFormSectionProps {
  product: ProductEnquiry;
}

const PRIORITY_CODES: Country[] = [
  "AE",
  "SA",
  "US",
  "GB",
  "DE",
  "NL",
  "SG",
  "QA",
  "OM",
  "KW",
  "IN",
];

export function EnquiryFormSection({ product }: EnquiryFormSectionProps) {
  // Build unified country data
  const { allCountries, priorityCountries } = useMemo(() => {
    const rawCountries = getCountries();

    const mapped: CountryItem[] = rawCountries.map((code) => {
      const countryName = (en as Record<string, string>)[code] || code;

      let callingCode = "";

      try {
        callingCode = getCountryCallingCode(code);
      } catch {
        callingCode = "";
      }

      return {
        code,
        name: countryName,
        callingCode: callingCode ? `+${callingCode}` : "",
      };
    });

    const priority: CountryItem[] = PRIORITY_CODES.map((code) => {
      const item = mapped.find((c) => c.code === code);

      return (
        item || {
          code,
          name: (en as Record<string, string>)[code] || code,
          callingCode: `+${getCountryCallingCode(code)}`,
        }
      );
    });

    const sortedAll = [...mapped].sort((a, b) => a.name.localeCompare(b.name));

    return {
      allCountries: sortedAll,
      priorityCountries: priority,
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<EnquiryFormData | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFormSubmit = (data: EnquiryFormData) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(data);
      setIsModalOpen(true);
    }, 700);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm sm:p-9 lg:p-10">
      <div className="border-b border-black/[0.08] pb-5">
        <h1 className="text-[24px] font-bold tracking-tight text-[#171717] sm:text-[28px]">
          Request Quotation & Spec Sheet
        </h1>

        <p className="mt-1 text-[13.5px] text-[#666]">
          Fill in your shipment requirements below to receive a formal
          commercial proforma offer.
        </p>
      </div>

      {/* Enquiry Form */}
      <EnquiryForm
        priorityCountries={priorityCountries}
        allCountries={allCountries}
        productName={product.name}
        categoryName={product.category?.name ?? null}
        onSuccess={handleFormSubmit}
      />

      {/* Success Modal */}
      {submittedData && (
        <EnquirySuccessModal
          isOpen={isModalOpen}
          fullName={submittedData.fullName}
          productName={product.name}
          quantity={submittedData.quantity}
          shippingUnit={submittedData.shippingUnit}
          workEmail={submittedData.workEmail}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
