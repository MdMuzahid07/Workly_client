import { Metadata } from "next";
import CompanyView from "../../../view/company/CompanyView";

type CompanyListItem = {
  id: string | number;
  name: string;
  industry?: string;
  logo?: string;
  size?: string;
  location?: string;
  description?: string;
  openJobs?: number;
  website?: string;
  founded?: string;
  featured?: boolean;
};

// dynamic metadata based on search params
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q : undefined;
  const title = query ? `Companies – ${query}` : "Companies";
  return {
    title,
    openGraph: { title },
    twitter: { title },
  };
}

async function fetchCompanies(
  params: { q?: string | undefined } = {},
): Promise<CompanyListItem[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_URL
      : "http://localhost:5000";

  const url = new URL(`${baseUrl}/api/v1/company/companies`);

  if (params.q) url.searchParams.set("q", params.q);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
    credentials: "include",
  });

  if (!res.ok) {
    return [] as CompanyListItem[];
  }

  const json = await res.json();
  return (json?.data?.result ?? json?.data ?? []) as CompanyListItem[];
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const params = await searchParams;
  const q = typeof params?.q === "string" ? params.q : undefined;
  const companies = await fetchCompanies({ q });

  return (
    <>
      <CompanyView companies={companies} />
    </>
  );
};

export default page;
