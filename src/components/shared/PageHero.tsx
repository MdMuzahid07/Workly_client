"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
  /** Number of trailing words in the title to highlight with the brand primary color. Defaults to 2. */
  highlightWords?: number;
  className?: string;
}

const PageHero = ({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=40",
  highlightWords = 2,
  className = "",
}: PageHeroProps) => {
  const words = title.split(" ");
  const plainPart = words.slice(0, -highlightWords).join(" ");
  const highlightPart = words.slice(-highlightWords).join(" ");

  return (
    <div
      className={`relative h-[250px] w-full overflow-hidden border-b border-white/5 md:h-[300px] ${className}`}
      style={{ background: "hsl(0 0% 3.9%)" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={backgroundImage}
          alt={title}
          className="h-full w-full object-cover opacity-[0.15] grayscale"
          fill
          priority
        />
        {/* Dark gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 60%, hsl(0 0% 3.9%) 100%)",
          }}
        />

        {/* Brand-coloured ambient glow — uses primary from theme */}
        <div
          className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div
          className="absolute -right-40 -bottom-40 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(var(--primary))" }}
        />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] [background-size:3rem_3rem] opacity-30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <h1
          className="mb-3 text-3xl leading-none font-extrabold tracking-tight md:text-5xl"
          style={{ color: "hsl(0 0% 98%)" }}
        >
          {plainPart && <>{plainPart} </>}
          <span style={{ color: "hsl(var(--primary))" }}>{highlightPart}</span>
        </h1>

        {subtitle && (
          <p
            className="mb-5 max-w-xl text-xs leading-relaxed font-medium tracking-wide md:text-sm"
            style={{ color: "hsl(0 0% 75%)" }}
          >
            {subtitle}
          </p>
        )}

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold select-none">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <span key={idx} className="flex items-center gap-1.5">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-200"
                    style={{ color: "hsl(0 0% 65%)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "hsl(var(--primary))")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "hsl(0 0% 65%)")
                    }
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    style={{
                      color: isLast ? "hsl(0 0% 98%)" : "hsl(0 0% 65%)",
                      fontWeight: isLast ? 700 : 600,
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: "hsl(0 0% 40%)" }}
                  />
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default PageHero;
