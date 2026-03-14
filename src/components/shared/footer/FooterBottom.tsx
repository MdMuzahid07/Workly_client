import Link from "next/link";

const FooterBottom = () => {
  const year = new Date().getFullYear();

  return (
    <div className="border-border/40 border-t pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-muted-foreground text-sm font-medium">
              © {year} Workly<span className="text-primary italic">_job</span>{" "}
              Corporation
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Built with precision for the next generation of professionals.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {[
              { label: "Accessibility", path: "/legal/accessibility" },
              { label: "User Agreement", path: "/legal/user-agreement" },
              { label: "Privacy Policy", path: "/legal/privacy-policy" },
              { label: "Cookie Policy", path: "/legal/cookie-policy" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
