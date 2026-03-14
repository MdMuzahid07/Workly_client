"use client";

import LegalPageView from "./LegalPageView";

const PrivacyPolicyView = () => {
  return (
    <LegalPageView title="Privacy Policy" lastUpdated="March 14, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          At Workly_job Corporation ({`"Workly", "we", "us", or "our"`}), we
          respect your privacy and are committed to protecting your personal
          data. This Privacy Policy will inform you as to how we look after your
          personal data when you visit our website (regardless of where you
          visit it from) and tell you about your privacy rights and how the law
          protects you.
        </p>
      </section>

      <section>
        <h2>2. The Data We Collect About You</h2>
        <p>
          Personal data, or personal information, means any information about an
          individual from which that person can be identified. We may collect,
          use, store and transfer different kinds of personal data about you
          which we have grouped together as follows:
        </p>
        <ul>
          <li>
            <strong>Identity Data</strong> includes first name, last name,
            username or similar identifier.
          </li>
          <li>
            <strong>Contact Data</strong> includes email address and telephone
            numbers.
          </li>
          <li>
            <strong>Professional Data</strong> includes your resume/CV,
            employment history, skills, and education.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP)
            address, your login data, browser type and version, time zone
            setting and location, browser plug-in types and versions, operating
            system and platform, and other technology on the devices you use to
            access this website.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How Your Personal Data Is Collected</h2>
        <p>
          We use different methods to collect data from and about you including
          through:
        </p>
        <ul>
          <li>
            <strong>Direct interactions.</strong> You may give us your Identity,
            Contact and Professional Data by filling in forms or by
            corresponding with us by post, phone, email or otherwise. This
            includes personal data you provide when you:
            <ul>
              <li>create an account on our website;</li>
              <li>apply for jobs;</li>
              <li>subscribe to our service or publications;</li>
              <li>request marketing to be sent to you;</li>
              <li>give us feedback or contact us.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2>4. How We Use Your Personal Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most
          commonly, we will use your personal data in the following
          circumstances:
        </p>
        <ul>
          <li>
            Where we need to perform the contract we are about to enter into or
            have entered into with you.
          </li>
          <li>
            Where it is necessary for our legitimate interests (or those of a
            third party) and your interests and fundamental rights do not
            override those interests.
          </li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
      </section>

      <section>
        <h2>5. Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection
          laws in relation to your personal data, including the right to receive
          a copy of the personal data we hold about you and the right to make a
          complaint at any time to the relevant data protection authority.
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our privacy
          practices, please contact us at:{" "}
          <a href="mailto:privacy@workly-job.com">privacy@workly-job.com</a>.
        </p>
      </section>
    </LegalPageView>
  );
};

export default PrivacyPolicyView;
