import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Truck,
  Mountain,
} from "lucide-react";

import type { Category } from "@/lib/category";
import type { ContactDetails } from "@/lib/contact";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface FooterProps {
  categories?: Category[];
  contact?: ContactDetails | null;
}

export function Footer({ categories = [], contact = null }: FooterProps) {
  return (
    <footer className="bg-[#141414] px-4 pb-8 pt-12 text-white sm:px-6 sm:pt-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 pb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr_1fr] lg:gap-8">
          {/* Brand Info */}
          <ScrollReveal
            variant="fade-up"
            delayMs={0}
            className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1"
          >
            <Link href="/" className="inline-block transition hover:opacity-90">
              <Image
                src="/logo/logo-white.svg"
                alt="Layrock Global Trading LTD"
                width={180}
                height={48}
                className="h-10 w-auto max-w-[160px] object-contain sm:h-12 sm:max-w-[180px]"
              />
            </Link>

            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/70 sm:mt-5 sm:text-[14px] sm:leading-7">
              Connecting sourcing opportunities with business requirements
              across product categories and international markets.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-[13px] font-semibold text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <span>Know about us</span>
                <ArrowUpRight size={14} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff0000] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#d90000] active:scale-95"
              >
                <span>Contact us</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal variant="fade-up" delayMs={60} className="col-span-1">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-white sm:text-[14px]">
              Explore
            </h3>

            <div className="mt-3.5 flex flex-col items-start gap-2.5 text-[13.5px] font-medium text-white/70 sm:mt-4 sm:gap-3 sm:text-[14px]">
              <Link href="/about" className="transition hover:text-[#ff0000]">
                About us
              </Link>

              <Link
                href="/#categories"
                className="transition hover:text-[#ff0000]"
              >
                Categories
              </Link>

              <Link
                href="/products"
                className="transition hover:text-[#ff0000]"
              >
                Products & Services
              </Link>

              <Link href="/contact" className="transition hover:text-[#ff0000]">
                Contact
              </Link>
            </div>
          </ScrollReveal>

          {/* Dynamic Categories */}
          <ScrollReveal variant="fade-up" delayMs={120} className="col-span-1">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-white sm:text-[14px]">
              Our categories
            </h3>

            <div className="mt-3.5 flex flex-col items-start gap-2.5 text-[13.5px] font-medium text-white/70 sm:mt-4 sm:gap-3 sm:text-[14px]">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="transition hover:text-[#ff0000]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </ScrollReveal>

          {/* Our Business in India */}
          <ScrollReveal variant="fade-up" delayMs={150} className="col-span-1">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-white sm:text-[14px]">
              Our Business in India
            </h3>

            <div className="mt-3.5 flex flex-col divide-y divide-white/10 text-white/80 sm:mt-4">
              <div className="flex items-center gap-2.5 py-2 sm:gap-3 sm:py-2.5">
                <Building2
                  size={17}
                  className="shrink-0 text-white/90 sm:size-5"
                />
                <span className="text-[12.5px] font-medium leading-snug sm:text-[13.5px]">
                  Layrock Developers Pvt Ltd
                </span>
              </div>

              <div className="flex items-center gap-2.5 py-2 sm:gap-3 sm:py-2.5">
                <Truck size={17} className="shrink-0 text-white/90 sm:size-5" />
                <span className="text-[12.5px] font-medium leading-snug sm:text-[13.5px]">
                  Supermix Concrete
                </span>
              </div>

              <div className="flex items-center gap-2.5 py-2 sm:gap-3 sm:py-2.5">
                <Mountain
                  size={17}
                  className="shrink-0 text-white/90 sm:size-5"
                />
                <span className="text-[12.5px] font-medium leading-snug sm:text-[13.5px]">
                  Kakkara Crushers Pvt Ltd
                </span>
              </div>

              <div className="flex items-center gap-2.5 py-2 sm:gap-3 sm:py-2.5">
                <svg
                  className="size-4 shrink-0 text-white/90 sm:size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>

                <span className="text-[12.5px] font-medium leading-snug sm:text-[13.5px]">
                  Layrock AAC Pvt Ltd
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Dynamic Contact Details */}
          <ScrollReveal variant="fade-up" delayMs={180} className="col-span-1">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-white sm:text-[14px]">
              Contact Us
            </h3>

            <div className="mt-3.5 space-y-3 text-[13px] text-white/70 sm:mt-4 sm:text-[14px]">
              {/* Address */}
              <div>
                <p className="font-semibold text-white">Head Office</p>

                <p className="mt-1 whitespace-pre-line text-[12.5px] leading-relaxed text-white/80 sm:text-[13px]">
                  {contact?.address || "Address unavailable"}
                </p>
              </div>

              {/* Email */}
              {contact?.email && (
                <div className="pt-1 sm:pt-2">
                  <p className="text-[11px] uppercase tracking-wider text-white/50 sm:text-xs">
                    Direct Email
                  </p>

                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-0.5 block break-all font-medium text-white transition hover:text-[#ff0000]"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {/* Phone */}
              {contact?.phone && (
                <div className="pt-0.5 sm:pt-1">
                  <p className="text-[11px] uppercase tracking-wider text-white/50 sm:text-xs">
                    Phone Number
                  </p>

                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="mt-0.5 block font-medium text-white transition hover:text-[#ff0000]"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center text-xs text-white/50 sm:flex-row sm:gap-4 sm:pt-8 sm:text-left">
          <p>
            © {new Date().getFullYear()} Layrock Global Trading LTD. All rights
            reserved.
          </p>

          <a
            href="https://www.techsoftweb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal transition-colors hover:text-white hover:underline underline-offset-4"
          >
            Web Design Company in Kochi Techsoft
          </a>
        </div>
      </div>
    </footer>
  );
}
