import { Eyebrow } from "@/components/ui/eyebrow";

export interface AboutContent {
  id: number;
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

interface AboutOverviewProps {
  about: AboutContent;
}

export function AboutOverview({ about }: AboutOverviewProps) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex justify-center">
          {/* Main Editorial Content Column */}
          <article className="prose prose-neutral max-w-4xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </div>

            <h2 className="mx-auto mt-3 max-w-3xl text-[22px] font-bold leading-[1.2] tracking-[-0.03em] text-[#171717] sm:text-[28px] lg:text-[36px]">
              {about.title}
            </h2>

            <div className="mx-auto mt-5 max-w-3xl space-y-4 text-left text-[14px] leading-[1.75] text-[#3f3f3f] sm:mt-8 sm:space-y-5 sm:text-[15px] lg:text-[16px] lg:leading-[1.8] [&_strong]:font-bold [&_b]:font-bold">
              {about.paragraphs.map((paragraph, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
