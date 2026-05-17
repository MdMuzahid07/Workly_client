import { setCredentials } from "@/redux/feature/auth/authSlice";
import { store } from "@/redux/store";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
  : "http://localhost:5000/api/v1";

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const fromRedux = store.getState().auth?.accessToken as string | null;
  if (fromRedux) return fromRedux;

  const fromStorage = window.localStorage.getItem("accessToken");
  if (fromStorage) return fromStorage;

  try {
    const persisted = window.localStorage.getItem("persist:auth");
    if (persisted) {
      const parsed = JSON.parse(persisted) as { accessToken?: string };
      if (parsed.accessToken) {
        return JSON.parse(parsed.accessToken) as string;
      }
    }
  } catch {
    // ignore parse errors
  }

  return null;
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAccessToken();
  if (!token) return {};
  return { authorization: token };
};

const normalizeCloudinaryPdfUrl = (url: string) => {
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("/raw/upload/")) return url;
  return url.replace("/image/upload/", "/raw/upload/");
};

export const resolvePdfFetchUrl = (options: {
  pdfUrl: string;
  applicationId?: string;
  resumeId?: string;
}): { url: string; requiresAuth: boolean } => {
  if (options.applicationId) {
    return {
      url: `${API_BASE}/application/${options.applicationId}/resume`,
      requiresAuth: true,
    };
  }

  if (options.resumeId) {
    return {
      url: `${API_BASE}/resume/resumes/${options.resumeId}/file`,
      requiresAuth: true,
    };
  }

  return {
    url: normalizeCloudinaryPdfUrl(options.pdfUrl),
    requiresAuth: false,
  };
};

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return false;

    const data = await res.json();
    const newToken = data?.data?.accessToken as string | undefined;
    if (!newToken) return false;

    const user = store.getState().auth?.user;
    store.dispatch(setCredentials({ user, accessToken: newToken }));
    window.localStorage.setItem("accessToken", newToken);
    return true;
  } catch {
    return false;
  }
};

const fetchWithAuth = async (url: string): Promise<Response> => {
  const headers = getAuthHeaders();
  if (!headers.authorization) {
    throw new Error("You must be signed in to view this resume.");
  }

  let response = await fetch(url, {
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
    }
  }

  return response;
};

/** Fetch PDF bytes (authenticated proxy or public Cloudinary URL). */
export const fetchPdfData = async (options: {
  pdfUrl: string;
  applicationId?: string;
  resumeId?: string;
}): Promise<ArrayBuffer> => {
  const { url, requiresAuth } = resolvePdfFetchUrl(options);

  let response: Response;

  if (requiresAuth) {
    response = await fetchWithAuth(url);
  } else {
    response = await fetch(url, { credentials: "include" });
  }

  if (!response.ok) {
    throw new Error(`Failed to load PDF (${response.status})`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    throw new Error("Server returned an error instead of a PDF file.");
  }

  return response.arrayBuffer();
};
