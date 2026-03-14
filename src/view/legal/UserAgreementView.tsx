"use client";

import LegalPageView from "./LegalPageView";

const UserAgreementView = () => {
  return (
    <LegalPageView title="User Agreement" lastUpdated="March 14, 2026">
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Workly_job (the {`"Service"`}), you agree to be
          bound by these terms. If you do not agree to any part of the terms,
          then you may not access the Service.
        </p>
      </section>

      <section>
        <h2>2. Use of the Service</h2>
        <p>
          You agree to use the Service only for lawful purposes and in a way
          that does not infringe the rights of, restrict or inhibit anyone{" "}
          {`else's`} use and enjoyment of the Service.
        </p>
        <ul>
          <li>
            <strong>Registration:</strong> You must provide accurate and
            complete information when creating an account.
          </li>
          <li>
            <strong>Job Applications:</strong> When applying for a job, you
            represent that the information provided is truthful and accurate.
          </li>
          <li>
            <strong>Hiring:</strong> Employers are responsible for their own
            hiring decisions and compliance with local labor laws.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of Workly_job Corporation and
          its licensors.
        </p>
      </section>

      <section>
        <h2>4. Limitation of Liability</h2>
        <p>
          In no event shall Workly_job Corporation, nor its directors,
          employees, partners, agents, suppliers, or affiliates, be liable for
          any indirect, incidental, special, consequential or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from your access to or use of or
          inability to access or use the Service.
        </p>
      </section>

      <section>
        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend access to our Service immediately, without
          prior notice or liability, for any reason whatsoever, including
          without limitation if you breach the Terms.
        </p>
      </section>

      <section>
        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. We will provide notice of any significant
          changes.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{" "}
          <a href="mailto:legal@workly-job.com">legal@workly-job.com</a>.
        </p>
      </section>
    </LegalPageView>
  );
};

export default UserAgreementView;
