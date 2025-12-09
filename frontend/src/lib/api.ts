import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearAuth,
  type TokenPair,
} from "./auth";

import type { Program, Stream, ProgramRequirement } from '@/types/program';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function refreshAccessToken(): Promise<TokenPair | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });

  if (!res.ok) {
    clearAuth();
    return null;
  }

  const data = (await res.json()) as TokenPair;
  setTokens(data);
  return data;
}

/**
 * Authenticated fetch:
 *  - Attaches access token
 *  - If 401, tries /auth/refresh once and retries the request
 */
export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const makeRequest = () =>
    fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
    });

  let res = await makeRequest();

  if (res.status === 401) {
    // Try refreshing the token once
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers = {
        ...headers,
        Authorization: `${refreshed.token_type} ${refreshed.access_token}`,
      };
      res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers,
      });
    } else {
      throw new Error("Unauthorized");
    }
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg = data?.detail ?? data?.message ?? `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return data as T;
}

// Programs API - can work without authentication
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.detail || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

export const api = {
  // Programs
  programs: {
    list: (params?: { faculty?: string; level?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.faculty) searchParams.append('faculty', params.faculty);
      if (params?.level) searchParams.append('level', params.level);
      const query = searchParams.toString();
      return fetchApi<Program[]>(`/programs${query ? `?${query}` : ''}`);
    },
    
    get: (programId: string) => {
      return fetchApi<Program>(`/programs/${programId}`);
    },
    
    getStreams: (programId: string) => {
      return fetchApi<Stream[]>(`/programs/${programId}/streams`);
    },
    
    getRequirements: (programId: string, streamId?: string) => {
      const query = streamId ? `?stream_id=${streamId}` : '';
      return fetchApi<ProgramRequirement[]>(`/programs/${programId}/requirements${query}`);
    },
  },

  // Completions - user's course completion records
  completions: {
    list: () => {
      return apiFetch<any[]>('/completions');
    },

    create: (data: {
      course_code: string;
      status: 'completed' | 'in-progress' | 'planned';
      grade?: string | null;
      term_code?: string | null;
      units_earned?: number | null;
    }) => {
      return apiFetch('/completions', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: (completionId: number, data: {
      status?: 'completed' | 'in-progress' | 'planned';
      grade?: string | null;
      term_code?: string | null;
      units_earned?: number | null;
    }) => {
      return apiFetch(`/completions/${completionId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: (completionId: number) => {
      return apiFetch(`/completions/${completionId}`, {
        method: 'DELETE',
      });
    },
  },

  // Plans - academic plans
  plans: {
    list: () => {
      return apiFetch<any[]>('/plans');
    },

    create: (data: { name: string; program_id?: string | null }) => {
      return apiFetch<any>('/plans', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    get: (planId: number) => {
      return apiFetch<any>(`/plans/${planId}`);
    },

    update: (planId: number, data: { name?: string }) => {
      return apiFetch<any>(`/plans/${planId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },

    delete: (planId: number) => {
      return apiFetch(`/plans/${planId}`, {
        method: 'DELETE',
      });
    },

    // Terms
    listTerms: (planId: number) => {
      return apiFetch<any[]>(`/plans/${planId}/terms`);
    },

    addTerm: (planId: number, termCode: string) => {
      return apiFetch<any>(`/plans/${planId}/terms`, {
        method: 'POST',
        body: JSON.stringify({ term_code: termCode }),
      });
    },

    deleteTerm: (planId: number, termId: number) => {
      return apiFetch(`/plans/${planId}/terms/${termId}`, {
        method: 'DELETE',
      });
    },

    // Courses
    addCourse: (planId: number, termId: number, courseCode: string) => {
      return apiFetch<any>(`/plans/${planId}/terms/${termId}/courses`, {
        method: 'POST',
        body: JSON.stringify({ course_code: courseCode }),
      });
    },

    removeCourse: (planId: number, termId: number, courseCode: string) => {
      return apiFetch(`/plans/${planId}/terms/${termId}/courses/${courseCode}`, {
        method: 'DELETE',
      });
    },
  },

  // Courses - course catalog
  courses: {
    list: (search?: string, limit?: number) => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (limit) params.append('limit', limit.toString());
      const query = params.toString();
      return apiFetch<any[]>(`/courses${query ? `?${query}` : ''}`);
    },

    get: (courseCode: string) => {
      return apiFetch<any>(`/courses/${courseCode}`);
    },
  },
};

export { ApiError };
