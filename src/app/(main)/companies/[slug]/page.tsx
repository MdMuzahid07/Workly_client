import { Metadata } from "next";
import CompanyDetailsView from "../../../../view/company/CompanyDetailsView";

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
  industry: {
    id: string;
    name: string;
    icon: string;
  };
  size: string;
  contactEmail: string;
  contactPhone: string;
  isVerified: boolean;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/company/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: revalidate },
      },
    );

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
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Company Details",
  };
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/company/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: revalidate },
      },
    );

    if (!res.ok) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">
              Failed to load company
            </h1>
            <p className="text-gray-600">Status: {res.status}</p>
          </div>
        </div>
      );
    }

    const company = await res.json();
    const companyDetails = company.data as CompanyDetails;

    return (
      <>
        <CompanyDetailsView companyDetails={companyDetails} />
      </>
    );
  } catch (error) {
    console.error("Error fetching company:", error);

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }
};

export default page;
