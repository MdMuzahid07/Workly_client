import { Metadata } from "next";
import CompanyView from "../../../view/company/CompanyView";

export const revalidate = 3600;

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
  searchParams: { q?: string };
}): Promise<Metadata> {
  const query =
    typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const title = query ? `Companies – ${query}` : "Companies";
  return {
    title,
    openGraph: { title },
    twitter: { title },
  };
}

async function fetchCompanies(
  params: { q?: string } = {},
): Promise<CompanyListItem[]> {
  const url = new URL("http://localhost:5000/api/v1/company/companies");
  if (params.q) url.searchParams.set("q", params.q);

  const res = await fetch(url.toString(), {
    next: { revalidate },
    credentials: "include",
  });

  if (!res.ok) {
    return [] as CompanyListItem[];
  }

  const json = await res.json();
  return (json?.data?.result ?? json?.data ?? []) as CompanyListItem[];
}

const page = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const q = typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const companies = await fetchCompanies({ q });
  console.log(companies, "companies");

  return (
    <>
      <CompanyView companies={companies} />
    </>
  );
};

export default page;
