"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { usePathname } from "next/navigation";

interface WhatsAppIslandProps {
  whatsapp?: string;
}

export function WhatsAppIsland({ whatsapp = "" }: WhatsAppIslandProps) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Check if current route is a product detail page
  const isProductDetailPage =
    pathname?.startsWith("/products/") && !pathname?.endsWith("/enquiry");

  useEffect(() => {
    function handleScroll() {
      // 1. Hide in hero section on home page
      const heroElement = document.getElementById("home");
      const heroBottom = heroElement
        ? heroElement.offsetTop + heroElement.offsetHeight
        : 350;

      const currentScrollY = window.scrollY;

      if (pathname === "/" && currentScrollY < heroBottom - 80) {
        setIsVisible(false);
        return;
      }

      // 2. Hide when reaching the footer
      const footerElement = document.querySelector("footer");

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();

        if (footerRect.top <= window.innerHeight - 30) {
          setIsVisible(false);
          return;
        }
      }

      setIsVisible(true);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  // Get WhatsApp number dynamically from Laravel API
  const cleanPhone = whatsapp.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello Layrock Global Trading LTD, I would like to make an enquiry regarding products and sourcing.",
  )}`;

  // Don't display the WhatsApp button if no number is available
  if (!cleanPhone) {
    return null;
  }

  return (
    <div
      className={`fixed right-4 z-50 transition-all duration-300 ease-out sm:right-8 sm:bottom-8 ${
        isProductDetailPage ? "bottom-24 sm:bottom-8" : "bottom-6 sm:bottom-8"
      } ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Layrock Global Trading on WhatsApp"
        className="group flex size-12 items-center justify-center rounded-full border border-black/15 bg-[#128C7E] text-white shadow-[0_12px_36px_rgba(0,0,0,0.32)] transition-all duration-200 hover:bg-[#075E54] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 sm:size-14"
      >
        <FaWhatsapp className="size-6 text-white drop-shadow-sm transition-transform duration-200 group-hover:scale-105 sm:size-7" />
      </a>
    </div>
  );
}
