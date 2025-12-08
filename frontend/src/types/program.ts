// Backend schema types
export interface Program {
  id: string;
  title: string;
  faculty: string | null;
  level: string | null;
}

export interface Stream {
  id: string;
  program_id: string;
  name: string;
}

export interface ProgramRequirement {
  id: number;
  program_id: string;
  stream_id: string | null;
  rule: string;
}

// Frontend display types for audit view
export interface Course {
  code: string;
  title: string;
  units: number;
  grade?: string;
  term?: string;
  status: "completed" | "in-progress" | "not-taken";
}

export interface SubRequirement {
  id: string;
  title: string;
  status: "complete" | "incomplete" | "in-progress";
  description?: string;
  courses: Course[];
}

export interface Requirement {
  id: string;
  title: string;
  status: "complete" | "incomplete" | "in-progress";
  subRequirements: SubRequirement[];
}
