"use client";

import { useState, type FormEvent } from "react";
import { Send, Minus, Plus, ChevronDown } from "lucide-react";
import type { Country } from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import {
  DestinationCountrySelector,
  type CountryItem,
} from "@/components/products/enquiry/destination-country-selector";
import { PhoneCountryInput } from "@/components/products/enquiry/phone-country-input";

export interface EnquiryFormData {
  quantity: number;
  shippingUnit: string;
  fullName: string;
  workEmail: string;
  phoneCountry: Country;
  phoneNumber: string;
  companyName: string;
  destinationCountry: Country;
  incoterm: string;
  deliveryAddress: string;
  specialRequirements: string;
}

export interface EnquiryFormProps {
  priorityCountries: CountryItem[];
  allCountries: CountryItem[];
  productName: string;
  categoryName: string | null;
  onSuccess: (data: EnquiryFormData) => void;
}

const SHIPPING_UNITS = [
  "Metric Tons (MT)",
  "Full Container Load (20ft FCL)",
  "Full Container Load (40ft FCL)",
  "Kilograms (KG)",
  "Pieces / Bundles",
  "Pallets",
];

const INCOTERMS = [
  "FOB (Free On Board - Indian Port)",
  "CIF (Cost, Insurance & Freight)",
  "CFR (Cost & Freight)",
  "EXW (Ex Works - Manufacturer Facility)",
  "DAP (Delivered at Place)",
];

export function EnquiryForm({
  priorityCountries,
  allCountries,
  productName,
  categoryName,
  onSuccess,
}: EnquiryFormProps) {
  const [quantity, setQuantity] = useState<number>(10);
  const [shippingUnit, setShippingUnit] = useState<string>(SHIPPING_UNITS[0]);
  const [fullName, setFullName] = useState<string>("");
  const [workEmail, setWorkEmail] = useState<string>("");

  const [phoneCountry, setPhoneCountry] = useState<Country>("AE");
  const [phoneNumber, setPhoneNumber] = useState<string>("50 123 4567");
  const [destinationCountry, setDestinationCountry] = useState<Country>("AE");

  const [companyName, setCompanyName] = useState<string>("");
  const [incoterm, setIncoterm] = useState<string>(INCOTERMS[0]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [specialRequirements, setSpecialRequirements] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const phoneCallingCode =
    allCountries.find((c) => c.code === phoneCountry)?.callingCode || "+971";

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName?.trim()) {
      setSuccess(false);
      setMessage(
        "Product information is unavailable. Please refresh the page and try again.",
      );
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const formData: EnquiryFormData = {
      quantity,
      shippingUnit,
      fullName,
      workEmail,
      phoneCountry,
      phoneNumber,
      companyName,
      destinationCountry,
      incoterm,
      deliveryAddress,
      specialRequirements,
    };

    const apiData = {
      product_name: productName,
      category_name: categoryName,

      quantity,
      shipping_unit: shippingUnit,

      name: fullName,
      email: workEmail,
      phone_country: phoneCountry,
      phone_calling_code: phoneCallingCode,
      phone_number: phoneNumber,
      company: companyName,

      destination_country: destinationCountry,
      incoterm,
      delivery_address: deliveryAddress,
      special_requirements: specialRequirements,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enquiry-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(apiData),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        const validationErrors = result.errors
          ? Object.values(result.errors).flat().join("\n")
          : "";

        throw new Error(
          validationErrors ||
            result.message ||
            "Unable to submit your enquiry. Please try again.",
        );
      }

      setSuccess(true);
      setMessage(result.message);

      onSuccess(formData);

      // Reset form fields
      setQuantity(10);
      setShippingUnit(SHIPPING_UNITS[0]);
      setFullName("");
      setWorkEmail("");
      setPhoneCountry("AE");
      setPhoneNumber("");
      setDestinationCountry("AE");
      setCompanyName("");
      setIncoterm(INCOTERMS[0]);
      setDeliveryAddress("");
      setSpecialRequirements("");
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your enquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 sm:mt-6 sm:space-y-5 lg:space-y-6"
    >
      {/* Row 1: Target Quantity & Shipping Unit */}
      <div>
        <label className="block text-[11.5px] font-bold text-[#171717] sm:text-[12.5px]">
          Target Quantity & Shipping Unit{" "}
          <span className="text-[#ff0000]">*</span>
        </label>

        <div className="mt-1.5 grid grid-cols-1 gap-2.5 sm:mt-2 sm:grid-cols-2 sm:gap-3">
          <div className="flex h-11 items-center rounded-xl border border-black/15 bg-white px-2 shadow-xs focus-within:border-[#ff0000] focus-within:ring-2 focus-within:ring-[#ff0000]/10 sm:h-12">
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
              className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[#555] transition hover:bg-black/5 hover:text-[#171717] sm:size-8"
            >
              <Minus size={15} />
            </button>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full text-center text-[14px] font-bold text-[#171717] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:text-[15px]"
              required
            />

            <button
              type="button"
              onClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
              className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[#555] transition hover:bg-black/5 hover:text-[#171717] sm:size-8"
            >
              <Plus size={15} />
            </button>
          </div>

          <div className="relative">
            <select
              value={shippingUnit}
              onChange={(e) => setShippingUnit(e.target.value)}
              className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-black/15 bg-white px-3.5 pr-10 text-[13px] font-medium text-[#171717] shadow-xs outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/10 sm:h-12 sm:px-4 sm:text-[14px]"
            >
              {SHIPPING_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[#737373]">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Full Name & Work Email */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
        <div>
          <label className="block text-[11.5px] font-bold text-[#171717] sm:text-[12.5px]">
            Full Name <span className="text-[#ff0000]">*</span>
          </label>

          <input
            type="text"
            required
            placeholder="e.g. Robert Vance"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-black/15 bg-white px-3.5 text-[13px] text-[#171717] placeholder-[#a3a3a3] shadow-xs outline-none transition focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/10 sm:mt-2 sm:h-12 sm:px-4 sm:text-[14px]"
          />
        </div>

        <div>
          <label className="block text-[11.5px] font-bold text-[#171717] sm:text-[12.5px]">
            Work Email <span className="text-[#ff0000]">*</span>
          </label>

          <input
            type="email"
            required
            placeholder="name@company.com"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-black/15 bg-white px-3.5 text-[13px] text-[#171717] placeholder-[#a3a3a3] shadow-xs outline-none transition focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/10 sm:mt-2 sm:h-12 sm:px-4 sm:text-[14px]"
          />
        </div>
      </div>

      {/* Row 3: Phone / WhatsApp & Company Name */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
        <PhoneCountryInput
          selectedCountry={phoneCountry}
          callingCode={phoneCallingCode}
          phoneNumber={phoneNumber}
          priorityCountries={priorityCountries}
          allCountries={allCountries}
          onSelectCountry={setPhoneCountry}
          onPhoneChange={setPhoneNumber}
        />

        <div>
          <label className="block text-[11.5px] font-bold text-[#171717] sm:text-[12.5px]">
            Company Name
          </label>

          <input
            type="text"
            placeholder="Company / Import Business"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-black/15 bg-white px-3.5 text-[13px] text-[#171717] placeholder-[#a3a3a3] shadow-xs outline-none transition focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/10 sm:mt-2 sm:h-12 sm:px-4 sm:text-[14px]"
          />
        </div>
      </div>

      {/* Row 4: Destination Country & Incoterm */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
        <DestinationCountrySelector
          destinationCountry={destinationCountry}
          priorityCountries={priorityCountries}
          allCountries={allCountries}
          onSelectCountry={setDestinationCountry}
        />

        <div>
          <label className="block text-[11.5px] font-bold text-[#171717] sm:text-[12.5px]">
            Incoterm & Delivery Terms
          </label>

          <div className="relative mt-1.5 sm:mt-2">
            <select
              value={incoterm}
              onChange={(e) => setIncoterm(e.target.value)}
              className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-black/15 bg-white px-3.5 pr-10 text-[13px] font-medium text-[#171717] shadow-xs outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/10 sm:h-12 sm:px-4 sm:text-[14px]"
            >
              {INCOTERMS.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[#737373]">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Delivery Address */}
      <div>
        <label className="block text-[11.5px] font-bold text-[#171717] sm:text-[12.5px]">
          Full Delivery Address / Import Facility Location
        </label>

        <textarea
          rows={2}
          placeholder="Street address, city, state/province, postal code, warehouse port details..."
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-black/15 bg-white p-3 text-[13px] text-[#171717] placeholder-[#a3a3a3] shadow-xs outline-none transition focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/10 sm:mt-2 sm:p-3.5 sm:text-[14px]"
        />
      </div>

      {/* Row 6: Special Requirements */}
      <div>
        <label className="block text-[11.5px] font-bold text-[#171717] sm:text-[12.5px]">
          Special Requirements / Packing Notes
        </label>

        <textarea
          rows={2}
          placeholder="Specify grain moisture %, custom branding/packaging, target delivery date..."
          value={specialRequirements}
          onChange={(e) => setSpecialRequirements(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-black/15 bg-white p-3 text-[13px] text-[#171717] placeholder-[#a3a3a3] shadow-xs outline-none transition focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/10 sm:mt-2 sm:p-3.5 sm:text-[14px]"
        />
      </div>

      {/* Success / Error Message */}
      {message && (
        <div
          role="alert"
          className={`rounded-xl p-3 text-[13px] ${
            success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-1 sm:pt-2">
        <Button
          as="button"
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={loading}
          isLoading={loading}
          rightIcon={!loading ? <Send size={16} /> : undefined}
          className="rounded-xl text-[13px] uppercase tracking-wider shadow-md sm:text-[14px]"
        >
          {loading ? "Submitting..." : "Submit Export Enquiry"}
        </Button>
      </div>
    </form>
  );
}
