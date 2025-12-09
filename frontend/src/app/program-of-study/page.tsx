"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Clock } from "lucide-react";
import { api } from "@/lib/api";
import { getAccessToken, getUserFirstName } from "@/lib/auth";
import type { Program, Requirement, Course, SubRequirement } from "@/types/program";
import { useRouter } from "next/navigation";



// Status icon component
const StatusIcon = ({ status }: { status: "complete" | "incomplete" | "in-progress" }) => {
  if (status === "complete") {
    return <CheckCircle className="w-5 h-5 text-green-600" />;
  } else if (status === "in-progress") {
    return <Clock className="w-5 h-5 text-yellow-600" />;
  }
  return <XCircle className="w-5 h-5 text-red-600" />;
};

export default function ProgramOfStudyPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<Requirement[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const token = getAccessToken();
    const name = getUserFirstName();
    
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    
    setIsLoggedIn(true);
    setUserName(name);
    
    // Fetch programs for logged-in users
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const programList = await api.programs.list();
        setPrograms(programList);
        
        // Auto-select first program if available
        if (programList.length > 0) {
          setSelectedProgram(programList[0]);
        }
      } catch (err: any) {
        console.error('Failed to fetch programs:', err);
        setError(err.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Fetch program requirements when program changes
  useEffect(() => {
    if (!isLoggedIn || !selectedProgram) return;

    const fetchProgramData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user's course completions
        const completionsData = await api.completions.list();
        
        // Transform completions into audit structure by grouping
        const transformedAudit = transformCompletionsToAudit(completionsData);
        setAuditData(transformedAudit);
        
      } catch (err: any) {
        console.error('Failed to fetch program data:', err);
        setError(err.message || 'Failed to load program data');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, [isLoggedIn, selectedProgram]);

  // Helper function to transform completions into audit format
  const transformCompletionsToAudit = (completions: any[]): Requirement[] => {
    if (completions.length === 0) return [];

    // Group courses by category
    const categories: { [key: string]: any[] } = {
      'EE Core': [],
      'Mathematics': [],
      'Physics': [],
      'Computer Science': [],
      'General Education': [],
      'Other': [],
    };

    completions.forEach((completion: any) => {
      const courseData = {
        code: completion.course_code,
        title: '', // Would need to look up from courses table
        units: completion.units_earned || 3,
        grade: completion.grade || '',
        term: completion.term_code || '',
        status: completion.status,
      };

      if (completion.course_code.startsWith('EE')) {
        categories['EE Core'].push(courseData);
      } else if (completion.course_code.startsWith('MATH')) {
        categories['Mathematics'].push(courseData);
      } else if (completion.course_code.startsWith('PHYS')) {
        categories['Physics'].push(courseData);
      } else if (completion.course_code.startsWith('CS')) {
        categories['Computer Science'].push(courseData);
      } else if (['ENGL', 'COMM', 'HIST', 'PSYCH', 'SOC', 'ART', 'MUS', 'PHIL', 'ECON'].some(prefix => completion.course_code.startsWith(prefix))) {
        categories['General Education'].push(courseData);
      } else {
        categories['Other'].push(courseData);
      }
    });

    // Convert to Requirement structure
    const requirements: Requirement[] = [];
    Object.entries(categories).forEach(([categoryName, courses]) => {
      if (courses.length > 0) {
        const completedCount = courses.filter((c: any) => c.status === 'completed').length;
        const status = completedCount === courses.length ? 'complete' : completedCount > 0 ? 'in-progress' : 'incomplete';
        
        requirements.push({
          id: categoryName.toLowerCase().replace(/\s+/g, '-'),
          title: categoryName,
          status: status as 'complete' | 'incomplete' | 'in-progress',
          subRequirements: [{
            id: `${categoryName.toLowerCase().replace(/\s+/g, '-')}-courses`,
            title: `${categoryName} Courses`,
            status: status as 'complete' | 'incomplete' | 'in-progress',
            description: `${courses.length} courses`,
            courses: courses,
          }],
        });
      }
    });

    return requirements;
  };

  // Calculate GPA and units from all courses
  const calculateStats = () => {
    let totalUnits = 0;
    let completedUnits = 0;
    let gradePoints = 0;
    let gradedUnits = 0;

    const gradeToPoints: { [key: string]: number } = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D+": 1.3, "D": 1.0, "F": 0.0,
    };

    auditData.forEach((req: Requirement) => {
      req.subRequirements.forEach((subReq: SubRequirement) => {
        subReq.courses.forEach((course: Course) => {
          totalUnits += course.units;
          if (course.status === "completed") {
            completedUnits += course.units;
            if (course.grade && gradeToPoints[course.grade] !== undefined) {
              gradePoints += gradeToPoints[course.grade] * course.units;
              gradedUnits += course.units;
            }
          }
        });
      });
    });

    return {
      gpa: gradedUnits > 0 ? gradePoints / gradedUnits : 0,
      completedUnits,
      totalUnits,
    };
  };

  const stats = calculateStats();

  const [expandedRequirements, setExpandedRequirements] = useState<Set<string>>(
    new Set(auditData.map((r) => r.id))
  );
  const [expandedSubRequirements, setExpandedSubRequirements] = useState<Set<string>>(
    new Set(auditData.flatMap((r) => r.subRequirements.map((sr) => sr.id)))
  );

  const toggleRequirement = (id: string) => {
    setExpandedRequirements((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSubRequirement = (id: string) => {
    setExpandedSubRequirements((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedRequirements(new Set(auditData.map((r) => r.id)));
    setExpandedSubRequirements(new Set(auditData.flatMap((r) => r.subRequirements.map((sr) => sr.id))));
  };

  const collapseAll = () => {
    setExpandedRequirements(new Set());
    setExpandedSubRequirements(new Set());
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Program of Study - Audit Results</h1>
          {userName && (
            <p className="text-muted-foreground">Welcome, {userName}!</p>
          )}
        </div>

        {/* Not Logged In State */}
        {!isLoggedIn && !loading && (
          <div className="text-center py-16">
            <div className="mb-6">
              <XCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-6">
                Please log in to view your program of study and course audit.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoggedIn && loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading your program data...</p>
          </div>
        )}

        {/* Error State */}
        {isLoggedIn && error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-800 dark:text-red-200">Error: {error}</p>
          </div>
        )}

        {/* No Courses Yet */}
        {isLoggedIn && !loading && auditData.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="mb-6">
              <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Course Data Yet</h2>
              <p className="text-muted-foreground mb-6">
                You don't have any courses recorded in your program yet. Check back later or contact your advisor.
              </p>
            </div>
          </div>
        )}

        {/* Program Content - Only show if logged in and has data */}
        {isLoggedIn && !loading && auditData.length > 0 && (
          <>
            {/* Program Selector */}
            {programs.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Program:</label>
                <select
                  value={selectedProgram?.id || ''}
                  onChange={(e) => {
                    const program = programs.find(p => p.id === e.target.value);
                    setSelectedProgram(program || null);
                  }}
                  className="px-4 py-2 border rounded-md bg-background"
                >
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.title} ({program.id})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* SNAPSHOT - GPA and Units Charts */}
            <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">SNAPSHOT</h2>
          <div className="flex flex-wrap gap-12 items-start">
            {/* Units Chart */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg className="w-48 h-48" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                  />
                  {/* Completed units (green) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="20"
                    strokeDasharray={`${(stats.completedUnits / stats.totalUnits) * 502.65} 502.65`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                  {/* In-progress units (orange) - small segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="20"
                    strokeDasharray="25 502.65"
                    strokeDashoffset={-((stats.completedUnits / stats.totalUnits) * 502.65)}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Remaining units (blue) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray={`${((stats.totalUnits - stats.completedUnits) / stats.totalUnits) * 502.65 - 25} 502.65`}
                    strokeDashoffset={-((stats.completedUnits / stats.totalUnits) * 502.65) - 25}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Center text */}
                  <text x="100" y="100" textAnchor="middle" dy="0.3em" className="text-xl font-semibold fill-current">
                    {stats.completedUnits} Complete
                  </text>
                </svg>
              </div>
            </div>

            {/* GPA Chart */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg className="w-48 h-48" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                  />
                  {/* GPA progress (green) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="20"
                    strokeDasharray={`${(stats.gpa / 4.0) * 502.65} 502.65`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Center text */}
                  <text x="100" y="100" textAnchor="middle" dy="0.3em" className="text-3xl font-semibold fill-current">
                    {stats.gpa.toFixed(3)}
                  </text>
                  <text x="100" y="125" textAnchor="middle" className="text-sm fill-muted-foreground">
                    GPA
                  </text>
                </svg>
              </div>
              <div className="mt-4 text-base font-semibold">Maximum 4.0 GPA</div>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Controls */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={expandAll}
            className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-accent transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-accent transition-colors"
          >
            Collapse All
          </button>
        </div>

        {/* Audit Requirements */}
        <div className="space-y-4">
          {auditData.map((requirement) => (
            <div key={requirement.id} className="border rounded-lg bg-card">
              {/* Requirement Header */}
              <button
                onClick={() => toggleRequirement(requirement.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors"
              >
                {expandedRequirements.has(requirement.id) ? (
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 flex-shrink-0" />
                )}
                <StatusIcon status={requirement.status} />
                <span className="font-bold text-lg">{requirement.title}</span>
              </button>

              {/* Sub-Requirements */}
              {expandedRequirements.has(requirement.id) && (
                <div className="border-t">
                  {requirement.subRequirements.map((subReq) => (
                    <div key={subReq.id} className="border-b last:border-b-0">
                      {/* Sub-Requirement Header */}
                      <button
                        onClick={() => toggleSubRequirement(subReq.id)}
                        className="w-full flex items-center gap-3 p-4 pl-12 hover:bg-accent transition-colors"
                      >
                        {expandedSubRequirements.has(subReq.id) ? (
                          <ChevronDown className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        )}
                        <StatusIcon status={subReq.status} />
                        <div className="text-left flex-1">
                          <div className="font-semibold">{subReq.title}</div>
                          {subReq.description && (
                            <div className="text-sm text-muted-foreground">{subReq.description}</div>
                          )}
                        </div>
                      </button>

                      {/* Course Table */}
                      {expandedSubRequirements.has(subReq.id) && subReq.courses.length > 0 && (
                        <div className="px-4 pb-4 pl-20">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 font-semibold">Course</th>
                                <th className="text-left py-2 font-semibold">Title</th>
                                <th className="text-left py-2 font-semibold">Units</th>
                                <th className="text-left py-2 font-semibold">Grade</th>
                                <th className="text-left py-2 font-semibold">Term</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subReq.courses.map((course, idx) => (
                                <tr
                                  key={idx}
                                  className={cn(
                                    "border-b last:border-b-0",
                                    course.status === "completed" && "bg-green-50 dark:bg-green-950/20",
                                    course.status === "in-progress" && "bg-yellow-50 dark:bg-yellow-950/20",
                                    course.status === "not-taken" && "bg-gray-50 dark:bg-gray-900/20"
                                  )}
                                >
                                  <td className="py-2 font-mono">{course.code}</td>
                                  <td className="py-2">{course.title}</td>
                                  <td className="py-2">{course.units}</td>
                                  <td className="py-2">{course.grade || "-"}</td>
                                  <td className="py-2">{course.term || "Not scheduled"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 border rounded-lg bg-muted/50">
          <h3 className="font-semibold mb-3">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Requirement Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span>In Progress / Future Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Requirement Not Met</span>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
