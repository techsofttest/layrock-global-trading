"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/category";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

interface ContactFormSectionProps {
  categories: Category[];
}

export function ContactFormSection({ categories }: ContactFormSectionProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      category: formData.get("category"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSuccess(true);
      setMessage(result.message);

      form.reset();
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
    <section className="relative w-full overflow-hidden bg-[#171717] py-16 sm:py-20 lg:py-24">
      {/* Background image */}
      <Image
        src="/contact-page/b2.png"
        alt="International Shipping & Trade Logistics"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex justify-end">
          {/* Form Card */}
          <div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl sm:p-10 lg:p-12">
            <Eyebrow>SEND AN ENQUIRY</Eyebrow>

            <h2 className="mt-2 text-[26px] font-bold tracking-tight text-[#171717] sm:text-[32px]">
              Direct trade quotation
            </h2>

            <p className="mt-1.5 text-[14px] leading-relaxed text-[#555555]">
              Complete the form below and our international trade desk will
              reply with pricing, specs and shipment schedules.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              {/* Name and Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[13px] font-semibold text-[#171717]"
                  >
                    Full name *
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    className="mt-1.5 h-11 w-full rounded-lg border border-black/15 bg-white px-3.5 text-[14px] text-[#171717] outline-none transition focus:border-[#ff0000]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[13px] font-semibold text-[#171717]"
                  >
                    Business email *
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. john@company.com"
                    className="mt-1.5 h-11 w-full rounded-lg border border-black/15 bg-white px-3.5 text-[14px] text-[#171717] outline-none transition focus:border-[#ff0000]"
                  />
                </div>
              </div>

              {/* Company and Category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-[13px] font-semibold text-[#171717]"
                  >
                    Company name
                  </label>

                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="e.g. Global Supplies Ltd"
                    className="mt-1.5 h-11 w-full rounded-lg border border-black/15 bg-white px-3.5 text-[14px] text-[#171717] outline-none transition focus:border-[#ff0000]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-[13px] font-semibold text-[#171717]"
                  >
                    Product category *
                  </label>

                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue=""
                    className="mt-1.5 h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-[14px] text-[#171717] outline-none transition focus:border-[#ff0000]"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}

                    <option value="Other">Other sourcing requirement</option>
                  </select>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[13px] font-semibold text-[#171717]"
                >
                  Order details / specification *
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Include material grade, estimated quantity, preferred incoterm (FOB/CIF) and destination port..."
                  className="mt-1.5 w-full rounded-lg border border-black/15 bg-white p-3.5 text-[14px] text-[#171717] outline-none transition focus:border-[#ff0000]"
                />
              </div>

              {/* Success / Error Message */}
              {message && (
                <div
                  role="alert"
                  className={`rounded-lg p-3 text-[13px] ${
                    success
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full gap-2 text-[14px] font-semibold"
              >
                {loading ? "Submitting..." : "Submit trade enquiry"}

                {!loading && <ArrowRight size={16} />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
