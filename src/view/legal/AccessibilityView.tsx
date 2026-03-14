"use client";

import LegalPageView from "./LegalPageView";

const AccessibilityView = () => {
  return (
    <LegalPageView title="Accessibility" lastUpdated="March 14, 2026">
      <section>
        <h2>1. Our Commitment</h2>
        <p>
          Workly_job is committed to providing a platform that is accessible to
          the widest possible audience, regardless of technology or ability. We
          are actively working to increase the accessibility and usability of
          our website and in doing so adhere to many of the available standards
          and guidelines.
        </p>
      </section>

      <section>
        <h2>2. Standards and Guidelines</h2>
        <p>
          This website endeavors to conform to level AA of the World Wide Web
          Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1.
          These guidelines explain how to make web content more accessible for
          people with disabilities. Conformance with these guidelines will help
          make the web more user friendly for all people.
        </p>
      </section>

      <section>
        <h2>3. Accessibility Features</h2>
        <p>We have implemented several features to improve accessibility:</p>
        <ul>
          <li>
            <strong>Keyboard Navigation:</strong> The website is navigable using
            only a keyboard.
          </li>
          <li>
            <strong>Alt Text:</strong> Meaningful alternative text is provided
            for all images.
          </li>
          <li>
            <strong>Color Contrast:</strong> We maintain high color contrast
            ratios for text to ensure readability.
          </li>
          <li>
            <strong>Semantic HTML:</strong> We use proper HTML structure to
            assist screen reading technologies.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Continuous Improvement</h2>
        <p>
          Workly_job will continue to develop and improve our {`platform's`}{" "}
          accessibility features. We view accessibility as an ongoing effort and
          are committed to regular reviews and updates.
        </p>
      </section>

      <section>
        <h2>5. Feedback</h2>
        <p>
          If you have any specific questions or concerns about the accessibility
          of any particular page on our website, please contact us at{" "}
          <a href="mailto:accessibility@workly-job.com">
            accessibility@workly-job.com
          </a>
          . If you do encounter an accessibility issue, please specify the web
          page and we will make all reasonable efforts to make that page
          accessible.
        </p>
      </section>
    </LegalPageView>
  );
};

export default AccessibilityView;
