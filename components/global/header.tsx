"use client";

declare global {
  interface Window {
    __layrockLockScroll?: () => void;
    __layrockUnlockScroll?: () => void;
  }
}

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";

import type { Category } from "@/lib/category";
import type { ContactDetails } from "@/lib/contact";

import { SearchDropdown } from "@/components/global/search-dropdown";

export interface HeaderProps {
  categories?: Category[];
  contact?: ContactDetails | null;
  activeCategory?: string;
  query?: string;
  mobileMenuOpen?: boolean;
  onQueryChange?: (query: string) => void;
  onSearchSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onSelectCategory?: (category: string) => void;
  onToggleMobileMenu?: () => void;
  onCloseMobileMenu?: () => void;
}

export function Header({
  categories = [],
  contact = null,
  activeCategory: propActiveCategory,
  query: propQuery,
  mobileMenuOpen: propMobileMenuOpen,
  onQueryChange,
  onSearchSubmit,
  onSelectCategory,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: HeaderProps) {
  const router = useRouter();

  // Search and dropdown state
  const [internalQuery, setInternalQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isDropdownOpenRef = useRef(false);
  isDropdownOpenRef.current = isDropdownOpen;

  const isSearchFocusedRef = useRef(false);

  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const savedScrollYRef = useRef(0);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const query = propQuery !== undefined ? propQuery : internalQuery;

  const mobileMenuOpen =
    propMobileMenuOpen !== undefined
      ? propMobileMenuOpen
      : internalMobileMenuOpen;

  // Header scroll auto-hide
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Never auto-hide header while user is actively searching or typing
      if (isSearchFocusedRef.current || isDropdownOpenRef.current) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 6 && !mobileMenuOpen) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  // Close search dropdown on scroll or outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        (!desktopSearchRef.current ||
          !desktopSearchRef.current.contains(target)) &&
        (!mobileSearchRef.current || !mobileSearchRef.current.contains(target))
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleWindowScroll() {
      if (isSearchFocusedRef.current) return;

      setIsDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    window.addEventListener("scroll", handleWindowScroll, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  // Lock body scroll while mobile search input is focused
  useEffect(() => {
    function lockBodyScroll() {
      if (window.innerWidth >= 768) return;

      savedScrollYRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    }

    function unlockBodyScroll() {
      if (document.body.style.position !== "fixed") return;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      window.scrollTo(0, savedScrollYRef.current);
    }

    window.__layrockLockScroll = lockBodyScroll;
    window.__layrockUnlockScroll = unlockBodyScroll;

    return () => {
      unlockBodyScroll();

      delete window.__layrockLockScroll;
      delete window.__layrockUnlockScroll;
    };
  }, []);

  function handleClearQuery() {
    handleQueryChange("");
    setIsDropdownOpen(false);
  }

  function handleQueryChange(val: string) {
    if (onQueryChange) {
      onQueryChange(val);
    } else {
      setInternalQuery(val);
    }

    if (val.trim().length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }

  function handleSearch(event?: React.FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();

    setIsDropdownOpen(false);

    if (onSearchSubmit && event) {
      onSearchSubmit(event);
    } else {
      if (query.trim()) {
        router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      } else {
        router.push("/products");
      }
    }
  }

  function handleCategoryClick(categorySlug: string) {
    if (onSelectCategory) {
      onSelectCategory(categorySlug);
    } else {
      router.push(`/products?category=${encodeURIComponent(categorySlug)}`);
    }
  }

  function toggleMenu() {
    if (onToggleMobileMenu) {
      onToggleMobileMenu();
    } else {
      setInternalMobileMenuOpen((open) => !open);
    }
  }

  function closeMenu() {
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    } else {
      setInternalMobileMenuOpen(false);
    }
  }

  // Dynamic product search using Laravel API data
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return categories
      .flatMap((category) =>
        (category.products ?? []).map((product) => ({
          ...product,
          categoryName: category.name,
        })),
      )
      .filter(
        (product) =>
          product.name?.toLowerCase().includes(q) ||
          product.description?.toLowerCase().includes(q) ||
          product.categoryName?.toLowerCase().includes(q) ||
          product.specification?.spec?.toLowerCase().includes(q) ||
          product.specification?.origin?.toLowerCase().includes(q) ||
          product.specification?.packing?.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [categories, query]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-black/[0.08] bg-[#faf9f7] transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-4 lg:gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center transition hover:opacity-95"
            >
              <Image
                src="/logo/logo.svg"
                alt="Layrock Global Trading LTD"
                width={160}
                height={48}
                priority
                className="h-8.5 w-auto max-w-[130px] object-contain sm:h-12 sm:max-w-[160px]"
              />
            </Link>

            {/* Desktop & Tablet Search Bar */}
            <div
              ref={desktopSearchRef}
              className="relative hidden max-w-xl flex-1 md:block"
            >
              <form
                onSubmit={handleSearch}
                role="search"
                aria-label="Search all products"
              >
                <label className="relative flex h-10 items-center overflow-hidden rounded-xl border border-black/15 bg-white transition focus-within:border-[#ff0000] focus-within:ring-2 focus-within:ring-[#ff0000]/10 lg:h-11">
                  <Search
                    size={17}
                    className="ml-3.5 shrink-0 text-[#404040]"
                  />

                  <input
                    type="search"
                    value={query}
                    onChange={(event) => handleQueryChange(event.target.value)}
                    onFocus={() => {
                      isSearchFocusedRef.current = true;

                      if (query.trim()) {
                        setIsDropdownOpen(true);
                      }
                    }}
                    onBlur={() => {
                      isSearchFocusedRef.current = false;
                    }}
                    onClick={() => {
                      if (query.trim()) {
                        setIsDropdownOpen(true);
                      }
                    }}
                    placeholder="Search products, materials, polymers, spices..."
                    aria-label="Search products"
                    className="size-full bg-transparent px-3 text-[13.5px] text-[#171717] outline-none placeholder:text-[#595959] lg:text-[14px]"
                  />

                  {query.trim() && (
                    <button
                      type="button"
                      onClick={handleClearQuery}
                      aria-label="Clear search input"
                      className="mr-2 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#888] transition hover:bg-black/5 hover:text-[#171717]"
                    >
                      <X size={15} />
                    </button>
                  )}

                  <button
                    type="submit"
                    aria-label="Submit product search"
                    className="flex h-full cursor-pointer items-center justify-center rounded-r-xl bg-[#ff0000] px-3.5 text-white transition hover:bg-[#d90000] lg:px-4"
                  >
                    <ArrowRight size={16} />
                  </button>
                </label>
              </form>

              {/* Desktop Suggestions Dropdown */}
              <SearchDropdown
                isOpen={isDropdownOpen}
                query={query}
                results={searchResults}
                onSelectProduct={() => setIsDropdownOpen(false)}
                onViewAllResults={() => handleSearch()}
              />
            </div>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-5 lg:flex xl:gap-7"
            >
              {[
                ["About us", "/about"],
                ["Products & Services", "/products"],
                ["Testimonials", "/testimonials"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="whitespace-nowrap text-[13.5px] font-medium text-[#171717] transition hover:text-[#ff0000] xl:text-[14px]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Link
                href="/contact"
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#ff0000] px-3 text-[12px] font-semibold text-white shadow-xs transition hover:bg-[#d90000] sm:h-11 sm:gap-2 sm:px-4 sm:text-[13px]"
              >
                <span>Request quote</span>
                <ArrowUpRight size={15} />
              </Link>

              <button
                type="button"
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
                onClick={toggleMenu}
                className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white text-[#171717] transition hover:bg-[#f4f5f7] sm:size-11 lg:hidden"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile & Small Screen Search Bar */}
          <div
            ref={mobileSearchRef}
            className="relative pb-2.5 pt-0.5 md:hidden"
          >
            <form
              onSubmit={handleSearch}
              role="search"
              aria-label="Search all products mobile"
            >
              <label className="relative flex h-10 items-center overflow-hidden rounded-xl border border-black/15 bg-white focus-within:border-[#ff0000] focus-within:ring-2 focus-within:ring-[#ff0000]/10">
                <Search size={16} className="ml-3 shrink-0 text-[#404040]" />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => handleQueryChange(event.target.value)}
                  onFocus={() => {
                    isSearchFocusedRef.current = true;

                    if (query.trim()) {
                      setIsDropdownOpen(true);
                    }

                    window.__layrockLockScroll?.();
                  }}
                  onBlur={() => {
                    isSearchFocusedRef.current = false;
                    window.__layrockUnlockScroll?.();
                  }}
                  onClick={() => {
                    if (query.trim()) {
                      setIsDropdownOpen(true);
                    }
                  }}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="size-full bg-transparent px-3 text-[13px] text-[#171717] outline-none"
                />

                {query.trim() && (
                  <button
                    type="button"
                    onClick={handleClearQuery}
                    aria-label="Clear mobile search input"
                    className="mr-1.5 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#888] transition hover:bg-black/5 hover:text-[#171717]"
                  >
                    <X size={14} />
                  </button>
                )}

                <button
                  aria-label="Submit search"
                  type="submit"
                  className="flex h-full cursor-pointer items-center justify-center rounded-r-xl bg-[#ff0000] px-3.5 text-white"
                >
                  <ArrowRight size={16} />
                </button>
              </label>
            </form>

            {/* Mobile Suggestions Dropdown */}
            <SearchDropdown
              isOpen={isDropdownOpen}
              query={query}
              results={searchResults}
              onSelectProduct={() => setIsDropdownOpen(false)}
              onViewAllResults={() => handleSearch()}
            />
          </div>
        </div>

        {/* Dynamic Category Bar - Maximum 5 Categories */}
        <div className="border-t border-black/[0.06] bg-[#faf9f7]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 sm:px-6 lg:px-10">
            <nav
              aria-label="Product categories"
              className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <span className="mr-2 flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-[#404040] sm:text-xs">
                <Layers3 size={13} className="shrink-0" />
                Categories:
              </span>

              {categories.slice(0, 5).map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category.slug)}
                  className="shrink-0 cursor-pointer whitespace-nowrap px-2 py-0.5 text-left text-[11px] font-medium text-[#2d2d2d] transition hover:text-[#ff0000] sm:text-[11.5px]"
                >
                  {category.name}
                </button>
              ))}
            </nav>

            <Link
              href="/products"
              className="shrink-0 text-[11px] font-semibold text-[#ff0000] underline decoration-[#ff0000]/40 underline-offset-4 transition hover:text-[#d90000] hover:decoration-[#d90000] sm:text-[11.5px]"
            >
              View all
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Left Slide-in Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Dark Backdrop */}
        <div
          onClick={closeMenu}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          aria-hidden="true"
        />

        {/* Left Drawer Panel */}
        <div
          className={`absolute inset-y-0 left-0 flex w-[300px] max-w-[85vw] flex-col bg-[#faf9f7] shadow-2xl transition-transform duration-300 ease-out sm:w-[340px] ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/[0.08] px-5 sm:h-20 sm:px-6">
            <Link href="/" onClick={closeMenu} className="flex items-center">
              <Image
                src="/logo/logo.svg"
                alt="Layrock Global Trading LTD"
                width={130}
                height={40}
                className="h-8 w-auto object-contain sm:h-9"
              />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation drawer"
              className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white text-[#171717] transition hover:bg-[#f4f5f7]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Drawer Body */}
          <div className="flex-1 overflow-y-auto px-4 py-5 [scrollbar-width:thin]">
            {/* Navigation Links */}
            <nav
              aria-label="Mobile and tablet drawer navigation"
              className="space-y-1"
            >
              <span className="block px-3.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                Menu
              </span>

              {[
                ["About us", "/about"],
                ["Products & Services", "/products"],
                ["Testimonials", "/testimonials"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="flex items-center rounded-lg px-3.5 py-2.5 text-[14.5px] font-medium text-[#171717] transition hover:bg-black/5 hover:text-[#ff0000]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Dynamic Contact Details */}
            <div className="mt-6 border-t border-black/[0.08] pt-5">
              <span className="block px-3.5 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                Contact Layrock
              </span>

              <div className="space-y-3 px-3.5 text-[13px] text-[#404040]">
                {/* Office Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-[#ff0000]"
                  />

                  <p className="whitespace-pre-line leading-snug">
                    {contact?.address || "Address unavailable"}
                  </p>
                </div>

                {/* Email */}
                {contact?.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="shrink-0 text-[#ff0000]" />

                    <a
                      href={`mailto:${contact.email}`}
                      className="truncate font-medium text-[#171717] hover:text-[#ff0000]"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {/* Phone */}
                {contact?.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="shrink-0 text-[#ff0000]" />

                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="font-medium text-[#171717] hover:text-[#ff0000]"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Drawer Bottom Action */}
          <div className="shrink-0 border-t border-black/[0.08] p-4 sm:p-5">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#ff0000] px-4 text-[13px] font-semibold text-white shadow-xs transition hover:bg-[#d90000]"
            >
              <span>Request quote</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
