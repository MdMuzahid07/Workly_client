export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
    [key: string]: unknown;
  };
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface ApiError {
  data?: {
    success?: boolean;
    message?: string;
  };
  status?: number;
  error?: string;
}

export const getErrorMessage = (
  error: unknown,
  fallback = 'An unexpected error occurred',
): string => {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    const err = error as ApiError;
    if (err.data && err.data.message) {
      return err.data.message;
    }
    if (err.error) {
      return err.error;
    }
    if ((error as Error).message) {
      return (error as Error).message;
    }
  }
  return fallback;
};
