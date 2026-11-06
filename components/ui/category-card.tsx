import Link from "next/link";
import type { Category } from "@/lib/category";

export interface CategoryCardProps {
  category: Category;
  href?: string;
  onSelectCategory?: (categoryName: string) => void;
  className?: string;
}

export function CategoryCard({
  category,
  href,
  onSelectCategory,
  className = "",
}: CategoryCardProps) {
  const innerContent = (
    <>
      {/* Circular category thumbnail */}
      <div className="mx-auto size-[110px] min-[390px]:size-[126px] sm:size-[140px] lg:size-[160px] overflow-hidden rounded-full bg-[#efeeeb] p-1.5 sm:p-2 transition-transform duration-300 group-hover:scale-[1.03]">
        <div className="relative size-full overflow-hidden rounded-full">
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="mt-2.5 sm:mt-3 max-w-[180px] text-center px-1">
        <h3 className="text-[12px] min-[390px]:text-[13px] font-semibold leading-snug text-[#171717] transition group-hover:text-[#ff0000] sm:text-[14px]">
          {category.name}
        </h3>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group flex w-full flex-col items-center text-center cursor-pointer ${className}`}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelectCategory?.(category.name)}
      className={`group flex w-full flex-col items-center text-center cursor-pointer ${className}`}
    >
      {innerContent}
    </button>
  );
}
