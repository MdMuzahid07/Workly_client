'use client';

import LegalPageView from '@/view/legal/legal-page/LegalPageView';
import { useGetLegalDocumentQuery } from '@/redux/feature/legal/legalApi';

const PrivacyPolicyView = () => {
  const { data, isLoading } = useGetLegalDocumentQuery('privacy-policy');
  const legalDoc = data?.data;

  return (
    <LegalPageView
      title={legalDoc?.title || 'Privacy Policy'}
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

export default PrivacyPolicyView;
