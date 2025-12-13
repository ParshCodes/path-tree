"use client";

import React, { useState, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Clock } from "lucide-react";
import { api } from "@/lib/api";
import { getUserFirstName } from "@/lib/auth";
import type { Program, Requirement, Course, SubRequirement } from "@/types/program";
import { useRouter , useSearchParams} from "next/navigation";
import { Button } from "@/components/ui/button";
import type { BackendPlanAudit } from "@/types/program";


// Status icon component
const StatusIcon = ({ status }: { status: "complete" | "incomplete" | "in-progress" }) => {
  if (status === "complete") {
    return <CheckCircle className="w-5 h-5 text-green-600" />;
  } else if (status === "in-progress") {
    return <Clock className="w-5 h-5 text-yellow-600" />;
  }
  return <XCircle className="w-5 h-5 text-red-600" />;
};

function ProgramOfStudyPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<Requirement[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  
  const generateShareLink = async () => {
  try {
    setError(null);
    setShareLink(null);

    // Get all plans
    const plans = await api.plans.list();
    if (!plans || plans.length === 0) {
      setError("No plan found to generate a share link.");
      return;
    }

    // Prefer a plan whose program_id matches the selected program, otherwise first plan
    const planForProgram =
      plans.find((p: any) => p.program_id === selectedProgram?.id) ?? plans[0];

    // Build a URL that points back to this page, with ?planId=...
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "";

    const url = `${baseUrl}/program-of-study?planId=${planForProgram.id}`;
    setShareLink(url);
  } catch (err: any) {
    console.error("Failed to generate share link:", err);
    setError(err.message || "Failed to generate share link.");
  }
};
  // Check authentication on mount
  // Check authentication on mount
useEffect(() => {
  const init = async () => {
    try {
      setLoading(true);
      setError(null);

      let me;
      try {
        // This will call GET /auth/me with Authorization header via apiFetch
        me = await api.auth.me();
      } catch (err) {
        // Not logged in (401 or other) -> show "Please Log In" UI
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      // If we reach here, /auth/me worked
      setIsLoggedIn(true);

      // Prefer backend name, fall back to local stored first name
      const storedName = getUserFirstName();
      const backendFirstName =
        (me.name && me.name.split(" ")[0]) || storedName || null;

      setUserName(backendFirstName);

      // Fetch programs
      const programList = await api.programs.list();
      setPrograms(programList);
      if (programList.length > 0) {
        setSelectedProgram(programList[0]);
      }
    } catch (err: any) {
      console.error("Failed to init program of study:", err);
      setError(err.message || "Failed to load programs");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  init();
}, []);
  // Fetch program requirements when program changes
 // Fetch program requirements when program changes
// Fetch program requirements when program changes
useEffect(() => {
  if (!isLoggedIn || !selectedProgram) return;

  const fetchProgramData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1) Fetch user's course completions AND their plans at the same time
      const [completionsData, plans] = await Promise.all([
        api.completions.list(),
        api.plans.list(), // you should already have this
      ]);

      // If there are no plans, fall back to completions-only view
      if (!plans || plans.length === 0) {
        const transformedAudit = transformCompletionsToAudit(null, completionsData);
        setAuditData(transformedAudit);
        return;
      }

      // 2) Choose a plan for this program (or just use the first plan)
     const planIdParam = searchParams.get("planId");
let planForProgram: any | undefined = undefined;

if (planIdParam) {
  const numericId = Number(planIdParam);
  if (!Number.isNaN(numericId)) {
    planForProgram = plans.find((p: any) => p.id === numericId);
  }
}

// If not found by URL, fall back to program-based matching or first plan
if (!planForProgram) {
  planForProgram =
    plans.find((p: any) => p.program_id === selectedProgram.id) ?? plans[0];
}
      // 3) Get backend audit for that plan
      const audit: BackendPlanAudit = await api.plans.audit(planForProgram.id);

      // 4) Convert audit + completions into your Requirement[] structure
      const transformedAudit = transformCompletionsToAudit(audit, completionsData);
      setAuditData(transformedAudit);
    } catch (err: any) {
      console.error("Failed to fetch program data:", err);
      setError(err.message || "Failed to load program data");
    } finally {
      setLoading(false);
    }
  };

  fetchProgramData();
}, [isLoggedIn, selectedProgram]);
  // Helper function to transform completions into audit format
 // Helper function to transform backend audit + completions into Requirement[]
// Convert backend audit + completions → UI Requirement[]
// Fallback: your original grouping by course prefixes (used if audit is empty)
const buildCategoryBasedRequirements = (completions: any[]): Requirement[] => {
  if (!completions || completions.length === 0) return [];

  const categories: { [key: string]: Course[] } = {
    "EE Core": [],
    Mathematics: [],
    Physics: [],
    "Computer Science": [],
    "General Education": [],
    Other: [],
  };

  completions.forEach((completion: any) => {
    const courseData: Course = {
      code: completion.course_code,
      title: "",
      units: completion.units_earned || 3,
      grade: completion.grade || "",
      term: completion.term_code || "",
      status: completion.status,
    };

    if (completion.course_code.startsWith("EE")) {
      categories["EE Core"].push(courseData);
    } else if (completion.course_code.startsWith("MATH")) {
      categories["Mathematics"].push(courseData);
    } else if (completion.course_code.startsWith("PHYS")) {
      categories["Physics"].push(courseData);
    } else if (completion.course_code.startsWith("CS")) {
      categories["Computer Science"].push(courseData);
    } else if (
      ["ENGL", "COMM", "HIST", "PSYCH", "SOC", "ART", "MUS", "PHIL", "ECON"].some(
        (prefix) => completion.course_code.startsWith(prefix)
      )
    ) {
      categories["General Education"].push(courseData);
    } else {
      categories["Other"].push(courseData);
    }
  });

  const requirements: Requirement[] = [];
  Object.entries(categories).forEach(([categoryName, courses]) => {
    if (courses.length > 0) {
      const completedCount = courses.filter((c) => c.status === "completed")
        .length;
      const status: "complete" | "incomplete" | "in-progress" =
        completedCount === courses.length
          ? "complete"
          : completedCount > 0
          ? "in-progress"
          : "incomplete";

      requirements.push({
        id: categoryName.toLowerCase().replace(/\s+/g, "-"),
        title: categoryName,
        status,
        subRequirements: [
          {
            id: `${categoryName.toLowerCase().replace(/\s+/g, "-")}-courses`,
            title: `${categoryName} Courses`,
            status,
            description: `${courses.length} courses`,
            courses,
          },
        ],
      });
    }
  });

  return requirements;
};

// MAIN: use backend audit if available; otherwise fallback to category grouping
const transformCompletionsToAudit = (
  audit: BackendPlanAudit | null,
  completions: any[]
): Requirement[] => {
  // If there is no audit or no audit requirements, use your old grouping
  if (!audit || !audit.requirements || audit.requirements.length === 0) {
    return buildCategoryBasedRequirements(completions);
  }

  // Map completions by course code for extra info
  const completionByCode: Record<string, any> = {};
  completions.forEach((c: any) => {
    completionByCode[c.course_code] = c;
  });

  return audit.requirements.map((req) => {
    const courses: Course[] = [];

    // Courses marked completed in audit
    req.completed_courses.forEach((code) => {
      const comp = completionByCode[code] || {};
      courses.push({
        code,
        title: "",
        units: comp.units_earned ?? 0,
        grade: comp.grade ?? "",
        term: comp.term_code ?? "",
        status: comp.status === "in-progress" ? "in-progress" : "completed",
      });
    });

    // Courses still missing in audit
    req.missing_courses.forEach((code) => {
      const comp = completionByCode[code] || {};
      courses.push({
        code,
        title: "",
        units: comp.units_earned ?? 0,
        grade: comp.grade ?? "",
        term: comp.term_code ?? "",
        status: "not-taken",
      });
    });

    const completed = courses.filter((c) => c.status === "completed").length;
    const inProgress = courses.filter((c) => c.status === "in-progress").length;

    let status: "complete" | "incomplete" | "in-progress" = "incomplete";
    if (completed === courses.length && courses.length > 0) {
      status = "complete";
    } else if (completed > 0 || inProgress > 0) {
      status = "in-progress";
    }

    const title =
      req.rule && req.rule.trim().length > 0
        ? req.rule
        : `Requirement ${req.requirement_id}`;

    return {
      id: String(req.requirement_id),
      title,
      status,
      subRequirements: [
        {
          id: `${req.requirement_id}-sub`,
          title,
          status,
          courses,
        },
      ],
    };
  });
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
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold mb-4">Please Log In</h1>
      <p className="text-muted-foreground mb-6">You need to be logged in to manage your courses.</p>
      <Button onClick={() => router.push('/login')}>Go to Login</Button>
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
        {/* SHARE AUDIT LINK BUTTON */}
{/* Share audit link */}
<div className="mb-6">
  <button
    onClick={generateShareLink}
    className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-accent transition-colors"
  >
    Generate Shareable Audit Link
  </button>

  {shareLink && (
    <div className="mt-3 p-3 border rounded bg-muted/50 text-sm break-all">
      <div className="font-semibold mb-1">Share this link:</div>
      <div>{shareLink}</div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          alert("Copied to clipboard!");
        }}
        className="mt-2 px-3 py-1 border rounded hover:bg-accent"
      >
        Copy to clipboard
      </button>
    </div>
  )}
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

export default function ProgramOfStudyPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading audit...</div>}>
      <ProgramOfStudyPageInner />
    </Suspense>
  );
}
