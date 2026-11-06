import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Category } from "@/components/data/site-data";

export interface ContactSectionProps {
  categories?: Category[];
  email?: string;
}

export function ContactSection({ email }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="scroll-mt-36 px-3.5 py-6 sm:px-6 sm:py-12 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="overflow-hidden rounded-2xl bg-[#171717] text-white sm:relative sm:min-h-[380px] sm:rounded-3xl sm:px-12 sm:py-16 lg:min-h-[420px] lg:px-20 lg:py-20 sm:flex sm:flex-col sm:justify-center">
          <div className="relative aspect-[1916/821] w-full shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto">
            <Image
              src="/banner/b2.png"
              alt="International shipping, ports and global logistics"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1440px) 100vw, 1440px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent sm:bg-gradient-to-r sm:from-black/90 sm:via-black/55 sm:to-transparent" />
          </div>

          <ScrollReveal
            variant="fade-up"
            className="relative z-10 max-w-2xl px-5 pb-7 pt-4 sm:px-0 sm:pb-0 sm:pt-0"
          >
            <Eyebrow
              textClassName="text-white/90 text-[10.5px] sm:text-xs"
              slashClassName="text-[#ff0000]"
            >
              LET&apos;S TALK BUSINESS
            </Eyebrow>

            <h2 className="mt-2 text-[22px] font-bold leading-[1.15] tracking-[-0.04em] text-white sm:mt-4 sm:text-[36px] md:text-[42px] lg:text-[48px]">
              Have a requirement?
              <br />
              Let&apos;s make it happen.
            </h2>

            <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-white/80 sm:mt-4 sm:text-[15px] sm:leading-7">
              Tell us what you&apos;re looking for, your destination port and
              quantity requirements. Our global trade specialists are ready to
              assist you.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff0000] px-5 py-2.5 text-[13px] font-bold text-white shadow-md transition hover:bg-[#d60000] active:scale-95 sm:px-7 sm:py-3.5 sm:text-[14px]"
              >
                <span>Contact our team</span>
                <ArrowRight size={16} />
              </Link>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 break-all rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[12px] font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#171717] sm:px-5 sm:py-3.5 sm:text-[14px]"
                >
                  <Mail size={15} />
                  <span>{email}</span>
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
