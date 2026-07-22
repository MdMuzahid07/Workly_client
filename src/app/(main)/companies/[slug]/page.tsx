import { Metadata } from 'next';
import CompanyDetailsView from '../../../../view/company/details/CompanyDetailsView';

export const revalidate = 3600;

export type CompanyDetails = {
  id: string;
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  coverUrl: string;
  location: string;
  mission: string;
  values: string[];
  industry: {
    id: string;
    name: string;
    icon: string;
  };
  size: string;
  contactEmail: string;
  contactPhone: string;
  isVerified: boolean;
  founded: string;
  socialLinks: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  benefits: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    icon: string;
  }>;
  jobs: Array<{
    id: string;
    title: string;
    slug: string;
    jobType: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    currency: string;
    experienceLevel: string;
    isRemote: boolean;
    createdAt: string;
  }>;
  _count: {
    employees: number;
    jobs: number;
  };
  createdAt: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/company/company/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: revalidate },
    });

    if (res.ok) {
      const data = await res.json();
      const company = data.data;

      return {
        title: `${company.name} - Company Details`,
        description: company.description,
        openGraph: {
          title: `${company.name} - Company Details`,
          description: company.description,
          images: [company.logoUrl],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Company Details',
  };
}

const page = () => {
  return (
    <>
      <CompanyDetailsView />
    </>
  );
};

export default page;
