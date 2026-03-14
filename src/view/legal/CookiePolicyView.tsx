"use client";

import LegalPageView from "./LegalPageView";

const CookiePolicyView = () => {
  return (
    <LegalPageView title="Cookie Policy" lastUpdated="March 14, 2026">
      <section>
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer by
          websites that you visit. They are widely used in order to make
          websites work, or work more efficiently, as well as to provide
          information to the owners of the site.
        </p>
      </section>

      <section>
        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies for several reasons. Some cookies are required for
          technical reasons in order for our Service to operate, and we refer to
          these as {`"essential" or "strictly necessary"`} cookies. Other
          cookies also enable us to track and target the interests of our users
          to enhance the experience on our Service.
        </p>
        <ul>
          <li>
            <strong>Strictly Necessary Cookies:</strong> These are essential for
            you to browse the website and use its features, such as accessing
            secure areas.
          </li>
          <li>
            <strong>Performance Cookies:</strong> These collect information
            about how you use our website, like which pages you visit most
            often.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These allow our website to
            remember choices you make (such as your username or the region you
            are in) and provide enhanced, more personal features.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Managing Cookies</h2>
        <p>
          Most web browsers allow some control of most cookies through the
          browser settings. To find out more about cookies, including how to see
          what cookies have been set, visit{" "}
          <a
            href="https://www.aboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aboutcookies.org
          </a>{" "}
          or{" "}
          <a
            href="https://www.allaboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.allaboutcookies.org
          </a>
          .
        </p>
      </section>

      <section>
        <h2>4. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect, for
          example, changes to the cookies we use or for other operational, legal
          or regulatory reasons.
        </p>
      </section>

      <section>
        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or other
          technologies, please email us at:{" "}
          <a href="mailto:privacy@workly-job.com">privacy@workly-job.com</a>.
        </p>
      </section>
    </LegalPageView>
  );
};

export default CookiePolicyView;
