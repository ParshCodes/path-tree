"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Clock } from "lucide-react";

// Types for audit structure
type Course = {
  code: string;
  title: string;
  units: number;
  grade?: string;
  term?: string;
  status: "completed" | "in-progress" | "not-taken";
};

type SubRequirement = {
  id: string;
  title: string;
  status: "complete" | "incomplete" | "in-progress";
  description?: string;
  courses: Course[];
};

type Requirement = {
  id: string;
  title: string;
  status: "complete" | "incomplete" | "in-progress";
  subRequirements: SubRequirement[];
};

// Mock audit data - Complete structure from PDF
const MOCK_AUDIT: Requirement[] = [
  {
    id: "american-institutions",
    title: "American Institutions",
    status: "complete",
    subRequirements: [
      {
        id: "ai-us-history",
        title: "U.S. History",
        status: "complete",
        description: "Complete one course",
        courses: [
          { code: "HIST 108", title: "United States History", units: 3, grade: "B+", term: "Fall 2021", status: "completed" },
        ],
      },
      {
        id: "ai-constitution",
        title: "U.S. Constitution",
        status: "complete",
        description: "Complete one course",
        courses: [
          { code: "POLS 103", title: "American Political System", units: 3, grade: "A-", term: "Fall 2021", status: "completed" },
        ],
      },
    ],
  },
  {
    id: "gen-ed",
    title: "General Education Requirements",
    status: "in-progress",
    subRequirements: [
      {
        id: "ge-foundation",
        title: "Foundations of Learning",
        status: "complete",
        description: "Complete all foundation courses (Oral Communication, Written Communication, Critical Thinking, Quantitative Reasoning)",
        courses: [
          { code: "ENGL 101", title: "Composition", units: 3, grade: "A", term: "Fall 2021", status: "completed" },
          { code: "COMM 103", title: "Oral Communication", units: 3, grade: "B+", term: "Fall 2021", status: "completed" },
          { code: "PHIL 101", title: "Critical Thinking", units: 3, grade: "A-", term: "Spring 2022", status: "completed" },
          { code: "MATH 150", title: "Calculus I", units: 4, grade: "B+", term: "Fall 2021", status: "completed" },
        ],
      },
      {
        id: "ge-explorations",
        title: "Explorations of Creativity and Culture",
        status: "complete",
        description: "Complete 9 units from at least two areas (Arts, Humanities, Languages)",
        courses: [
          { code: "ART 157", title: "Visual Culture", units: 3, grade: "B", term: "Spring 2022", status: "completed" },
          { code: "MUS 102", title: "Music Appreciation", units: 3, grade: "A", term: "Fall 2022", status: "completed" },
          { code: "LIT 201", title: "World Literature", units: 3, grade: "B+", term: "Fall 2022", status: "completed" },
        ],
      },
      {
        id: "ge-social-sciences",
        title: "Social and Behavioral Sciences",
        status: "complete",
        description: "Complete 9 units from at least two disciplines",
        courses: [
          { code: "PSYCH 101", title: "Introduction to Psychology", units: 3, grade: "A", term: "Spring 2022", status: "completed" },
          { code: "SOC 101", title: "Principles of Sociology", units: 3, grade: "B+", term: "Fall 2022", status: "completed" },
          { code: "ECON 102", title: "Principles of Microeconomics", units: 3, grade: "A-", term: "Spring 2023", status: "completed" },
        ],
      },
      {
        id: "ge-life-sciences",
        title: "Life Sciences",
        status: "complete",
        description: "Complete one course with lab",
        courses: [
          { code: "BIOL 100", title: "Biology and Society", units: 3, grade: "B", term: "Fall 2022", status: "completed" },
          { code: "BIOL 100L", title: "Biology Lab", units: 1, grade: "B", term: "Fall 2022", status: "completed" },
        ],
      },
      {
        id: "ge-physical-sciences",
        title: "Physical Sciences",
        status: "in-progress",
        description: "Complete one course with lab",
        courses: [
          { code: "PHYS 195", title: "Physics for Scientists I", units: 3, grade: "IP", term: "Spring 2024", status: "in-progress" },
          { code: "PHYS 195L", title: "Physics Lab I", units: 1, term: "Spring 2024", status: "not-taken" },
        ],
      },
      {
        id: "ge-integration",
        title: "Integration",
        status: "incomplete",
        description: "Complete upper-division GE integration course",
        courses: [
          { code: "GEN 300", title: "Global Perspectives", units: 3, term: "Fall 2024", status: "not-taken" },
        ],
      },
    ],
  },
  {
    id: "major-prep",
    title: "Major Preparation Courses",
    status: "complete",
    subRequirements: [
      {
        id: "prep-math",
        title: "Mathematics Preparation",
        status: "complete",
        description: "Complete required mathematics sequence",
        courses: [
          { code: "MATH 150", title: "Calculus I", units: 4, grade: "B+", term: "Fall 2021", status: "completed" },
          { code: "MATH 151", title: "Calculus II", units: 4, grade: "A-", term: "Spring 2022", status: "completed" },
          { code: "MATH 245", title: "Discrete Mathematics", units: 3, grade: "A", term: "Fall 2022", status: "completed" },
        ],
      },
      {
        id: "prep-cs-lower",
        title: "Lower Division Computer Science",
        status: "complete",
        description: "Complete foundational CS courses",
        courses: [
          { code: "CS 107", title: "Intro to Computer Science", units: 3, grade: "A", term: "Fall 2021", status: "completed" },
          { code: "CS 108", title: "Object-Oriented Programming", units: 3, grade: "A-", term: "Spring 2022", status: "completed" },
          { code: "CS 210", title: "Data Structures", units: 3, grade: "B+", term: "Fall 2022", status: "completed" },
          { code: "CS 237", title: "Computer Organization", units: 3, grade: "A", term: "Spring 2023", status: "completed" },
        ],
      },
    ],
  },
  {
    id: "major-core",
    title: "Major Core Requirements",
    status: "in-progress",
    subRequirements: [
      {
        id: "core-required",
        title: "Required Core Courses",
        status: "in-progress",
        description: "Complete all core courses with C or better",
        courses: [
          { code: "CS 310", title: "Data Structures & Algorithms", units: 3, grade: "A", term: "Fall 2023", status: "completed" },
          { code: "CS 320", title: "Programming Languages", units: 3, grade: "B+", term: "Spring 2023", status: "completed" },
          { code: "CS 330", title: "Computer Architecture", units: 3, grade: "IP", term: "Spring 2024", status: "in-progress" },
          { code: "CS 340", title: "Operating Systems", units: 3, term: "Fall 2024", status: "not-taken" },
          { code: "CS 350", title: "Software Engineering", units: 3, term: "Fall 2024", status: "not-taken" },
          { code: "CS 370", title: "Theory of Computation", units: 3, term: "Spring 2025", status: "not-taken" },
        ],
      },
      {
        id: "core-lab",
        title: "Laboratory Requirement",
        status: "in-progress",
        description: "Complete one advanced lab course",
        courses: [
          { code: "CS 460L", title: "Database Systems Lab", units: 1, grade: "IP", term: "Spring 2024", status: "in-progress" },
        ],
      },
    ],
  },
  {
    id: "major-electives",
    title: "Major Electives",
    status: "incomplete",
    subRequirements: [
      {
        id: "electives-upper",
        title: "Upper Division Electives",
        status: "incomplete",
        description: "Complete 15 units from approved upper-division CS electives",
        courses: [
          { code: "CS 460", title: "Database Systems", units: 3, grade: "A", term: "Fall 2023", status: "completed" },
          { code: "CS 465", title: "Computer Networks", units: 3, grade: "B+", term: "Spring 2023", status: "completed" },
          { code: "CS 470", title: "Artificial Intelligence", units: 3, term: "Fall 2024", status: "not-taken" },
          { code: "CS 480", title: "Machine Learning", units: 3, term: "Spring 2025", status: "not-taken" },
          { code: "CS 496", title: "Senior Project", units: 3, term: "Spring 2025", status: "not-taken" },
        ],
      },
    ],
  },
  {
    id: "upper-division-writing",
    title: "Upper Division Writing Requirement",
    status: "incomplete",
    subRequirements: [
      {
        id: "udwr-course",
        title: "Writing Intensive Course",
        status: "incomplete",
        description: "Complete one upper-division writing intensive course",
        courses: [
          { code: "CS 499W", title: "Technical Writing for CS", units: 3, term: "Fall 2024", status: "not-taken" },
        ],
      },
    ],
  },
  {
    id: "multicultural",
    title: "Multicultural Requirement",
    status: "complete",
    subRequirements: [
      {
        id: "multicultural-course",
        title: "Multicultural/International Course",
        status: "complete",
        description: "Complete one approved multicultural or international course",
        courses: [
          { code: "AFRAM 200", title: "African American Studies", units: 3, grade: "A-", term: "Spring 2022", status: "completed" },
        ],
      },
    ],
  },
  {
    id: "additional-requirements",
    title: "Additional Graduation Requirements",
    status: "in-progress",
    subRequirements: [
      {
        id: "residency",
        title: "Residency Requirement",
        status: "in-progress",
        description: "Complete at least 30 units at SDSU",
        courses: [
          { code: "N/A", title: "Progress: 84 of 120 units completed at SDSU", units: 84, grade: "IP", term: "Current", status: "in-progress" },
        ],
      },
      {
        id: "gpa",
        title: "GPA Requirements",
        status: "in-progress",
        description: "Maintain minimum 2.0 overall GPA and 2.5 major GPA",
        courses: [
          { code: "N/A", title: "Overall GPA: 3.45 | Major GPA: 3.62", units: 0, grade: "PASS", term: "Current", status: "completed" },
        ],
      },
      {
        id: "units",
        title: "Unit Requirements",
        status: "in-progress",
        description: "Complete minimum 120 units for degree",
        courses: [
          { code: "N/A", title: "Progress: 84 of 120 units completed", units: 84, grade: "IP", term: "Current", status: "in-progress" },
        ],
      },
    ],
  },
];

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

    MOCK_AUDIT.forEach(req => {
      req.subRequirements.forEach(subReq => {
        subReq.courses.forEach(course => {
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
    new Set(MOCK_AUDIT.map((r) => r.id))
  );
  const [expandedSubRequirements, setExpandedSubRequirements] = useState<Set<string>>(
    new Set(MOCK_AUDIT.flatMap((r) => r.subRequirements.map((sr) => sr.id)))
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
    setExpandedRequirements(new Set(MOCK_AUDIT.map((r) => r.id)));
    setExpandedSubRequirements(new Set(MOCK_AUDIT.flatMap((r) => r.subRequirements.map((sr) => sr.id))));
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
          <p className="text-muted-foreground">Computer Science, B.S.</p>
          <p className="text-sm text-muted-foreground">Student ID: 123456789 | Catalog Year: 2021-2022</p>
        </div>

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
          {MOCK_AUDIT.map((requirement) => (
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
      </div>
    </div>
  );
}
