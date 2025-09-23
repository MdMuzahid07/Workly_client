const FooterBottom = () => {
  const date = new Date().getFullYear();

  return (
    <div className="bg-primary/2 border-t border-gray-200 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">
            © {date} Workly_job Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-green-600"
            >
              Accessibility
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-green-600"
            >
              User Agreement
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-green-600"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-green-600"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
