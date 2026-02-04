import { footerLinks, worklyJobSocials } from "../../../constants";
import WJLogo from "../WJLogo";

const MainFooter = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <div className="mb-8 flex items-center gap-3">
            <WJLogo />
          </div>

          <p className="text-muted-foreground mb-8 max-w-sm text-base leading-relaxed">
            The {`world's`} largest professional network. Connect with industry
            leaders, learn essential skills, and get hired by top companies
            worldwide.
          </p>

          <div className="flex items-center gap-3">
            {worklyJobSocials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="hover:border-primary hover:text-primary border-border/50 text-muted-foreground hover:bg-primary/5 flex h-10 w-10 items-center justify-center rounded-lg border transition-all hover:-translate-y-1 active:scale-95"
                aria-label={`Link to ${idx}`}
              >
                <div className="h-5 w-5">{social.icon}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        {footerLinks.map((section) => (
          <div key={section.title} className="flex flex-col">
            <h4 className="text-foreground mb-6 text-sm font-bold tracking-wider uppercase">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary relative text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFooter;
