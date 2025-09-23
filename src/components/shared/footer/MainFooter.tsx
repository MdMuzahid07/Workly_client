import { footerLinks, worklyJobSocials } from "../../../constants";

const MainFooter = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <div className="mb-6 flex items-center gap-2">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-lg font-bold text-white">W</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Workly_job</span>
          </div>
          <p className="mb-6 max-w-sm text-gray-600">
            The {`world's`} largest professional network. Connect, learn, and
            get hired.
          </p>

          <div className="flex items-center gap-4">
            {worklyJobSocials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="mb-4 font-bold text-gray-900">{section.title}</h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-green-600"
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
