export type CategoryStatus = "active" | "inactive";

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: CategoryStatus;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  jobCount: number;
  icon: string;
  activeJobs: number;
  applications: number;
  description: string;
  status: CategoryStatus;
  subcategories: Subcategory[];
}

export interface CategoryFormValues {
  name: string;
  slug: string;
  description: string;
  /**
   * Comma-separated list of subcategory names.
   */
  subcategories: string;
}
