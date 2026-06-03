"use client";

import LegalPageView from "@/view/legal/legal-page/LegalPageView";
import { useGetLegalDocumentQuery } from "@/redux/feature/legal/legalApi";

const CookiePolicyView = () => {
  const { data, isLoading } = useGetLegalDocumentQuery("cookie-policy");
  const legalDoc = data?.data;

  return (
    <LegalPageView
      title={legalDoc?.title || "Cookie Policy"}
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

export default CookiePolicyView;
