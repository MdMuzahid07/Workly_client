export interface FollowedCompany {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  followedSince: string;
  openPositions: number;
}

export const mockFollowedCompanies: FollowedCompany[] = [
  {
    id: "c1",
    name: "TechFlow Solutions",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TF\u0026backgroundColor=00a3ff",
    industry: "Software Development",
    location: "San Francisco, CA",
    description:
      "Leading the way in cloud-native infrastructure and AI-driven automation.",
    followedSince: new Date(Date.now() - 30 * 86400000).toISOString(),
    openPositions: 12,
  },
  {
    id: "c2",
    name: "GreenGrid Labs",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GG\u0026backgroundColor=00d43b",
    industry: "Renewable Energy",
    location: "Austin, TX",
    description:
      "Building sustainable energy solutions for a greener, more efficient planet.",
    followedSince: new Date(Date.now() - 15 * 86400000).toISOString(),
    openPositions: 5,
  },
  {
    id: "c3",
    name: "Nexus Design Studio",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=ND\u0026backgroundColor=ff00ea",
    industry: "Creative Services",
    location: "New York, NY",
    description:
      "Award-winning design agency specializing in digital product transformation.",
    followedSince: new Date(Date.now() - 60 * 86400000).toISOString(),
    openPositions: 3,
  },
  {
    id: "c4",
    name: "Quantum Analytics",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=QA\u0026backgroundColor=7e3dff",
    industry: "Data Science",
    location: "Boston, MA",
    description:
      "Pioneering the future of predictive modeling and quantum computing insights.",
    followedSince: new Date(Date.now() - 5 * 86400000).toISOString(),
    openPositions: 8,
  },
  {
    id: "c5",
    name: "CyberSecurity Hub",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=CH\u0026backgroundColor=ff4b4b",
    industry: "Cybersecurity",
    location: "Seattle, WA",
    description:
      "Defending digital frontiers with advanced threat intelligence and zero-trust architecture.",
    followedSince: new Date(Date.now() - 10 * 86400000).toISOString(),
    openPositions: 4,
  },
  {
    id: "c6",
    name: "Global Finance Corp",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GF\u0026backgroundColor=fbbf24",
    industry: "Finance",
    location: "Chicago, IL",
    description:
      "Redefining modern banking with decentralized finance and fintech innovation.",
    followedSince: new Date(Date.now() - 45 * 86400000).toISOString(),
    openPositions: 15,
  },
];
