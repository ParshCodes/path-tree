const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

import type { Program, Stream, ProgramRequirement } from '@/types/program';

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
  const url = `${API_URL}${endpoint}`;
  
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
};

export { ApiError };
