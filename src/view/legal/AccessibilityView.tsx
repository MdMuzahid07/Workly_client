"use client";

import LegalPageView from "./LegalPageView";
import { useGetLegalDocumentQuery } from "@/redux/feature/legal/legalApi";

const AccessibilityView = () => {
  const { data, isLoading } = useGetLegalDocumentQuery(
    "accessibility-statement",
  );
  const legalDoc = data?.data;

  return (
    <LegalPageView
      title={legalDoc?.title || "Accessibility Statement"}
      lastUpdated={legalDoc?.lastUpdated}
      intro={legalDoc?.intro}
      isLoading={isLoading}
    >
      {!isLoading && legalDoc?.content && (
        <div dangerouslySetInnerHTML={{ __html: legalDoc.content }} />
      )}
    </LegalPageView>
  );
};

export default AccessibilityView;
