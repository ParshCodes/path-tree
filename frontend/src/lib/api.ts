import {
  getRefreshToken,
  setTokens,
  clearAuth,
  type TokenPair,
} from "./auth";

import type { Program, Stream, ProgramRequirement } from '@/types/program';
type MeResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
  email_verified: boolean;
  created_at: string;
};
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function refreshAccessToken(): Promise<TokenPair | null> {
  // Temporarily disable refresh-based re-login to avoid automatic login after logout
  clearAuth();
  return null;
}
async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };

  const makeRequest = () =>
    fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
      credentials: "include", // 👈 send cookies
    });

  let res = await makeRequest();

  // Do not auto-refresh for /auth/me; that endpoint is our "am I logged in?" check
  const shouldAttemptRefresh = !path.startsWith("/auth/me");

  if (res.status === 401 && shouldAttemptRefresh) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Cookie was refreshed on backend; just retry
      res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers,
        credentials: "include",
      });
    } else {
      clearAuth();
      throw new Error("Unauthorized");
    }
  }

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const data = await res.json();
  return data as T;
}
// Programs API - can work without authentication

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(endpoint, options);
}

export const api = {
  // Programs
  auth: {
    // GET /auth/me – uses apiFetch so Authorization header is included
    me(): Promise<MeResponse> {
      return apiFetch<MeResponse>("/auth/me");
    },
     logout(): Promise<void> {
      return apiFetch<void>("/auth/logout", {
        method: "POST",
      });
    },
    loginJson(payload: { email: string; password: string }) {
      return apiFetch<TokenPair>("/auth/login-json", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
  },
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
     audit: (planId: number) => {
    return apiFetch<any>(`/plans/${planId}/audit`);
  },
share(planId: number) {
  return apiFetch<{ share_url: string }>(`/plans/${planId}/share-links`, {
    method: "POST",
  });
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

  // Terms - academic terms
 // Terms - academic terms
terms: {
  list: () => {
    return apiFetch<any[]>('/terms');
  },

  get: (termId: number) => {
    return apiFetch<any>(`/terms/${termId}`);
  },
},
};