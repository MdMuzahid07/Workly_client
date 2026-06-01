"use client";

import LegalPageView from "@/view/legal/legal-page/LegalPageView";
import { useGetLegalDocumentQuery } from "@/redux/feature/legal/legalApi";

const UserAgreementView = () => {
  const { data, isLoading } = useGetLegalDocumentQuery("user-agreements");
  const legalDoc = data?.data;

  return (
    <LegalPageView
      title={legalDoc?.title || "User Agreement"}
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

export default UserAgreementView;
