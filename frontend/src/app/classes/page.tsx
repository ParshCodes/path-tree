"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, Calendar } from "lucide-react";

type Course = {
  code: string;
  title: string;
  units: number;
};

type Completion = {
  id: number;
  course_code: string;
  status: "completed" | "in-progress" | "planned";
  grade?: string | null;
  term_code?: string | null;
  units_earned?: number | null;
};

const GRADE_OPTIONS = [
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D",
  "F",
  "P",
  "NP",
  "W",
  "IP",
];

export default function ClassesPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [termOptions, setTermOptions] = useState<string[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Modal form state
  const [modalStatus, setModalStatus] =
    useState<"completed" | "in-progress" | "planned">("completed");
  const [modalGrade, setModalGrade] = useState<string>("");
  const [modalTerm, setModalTerm] = useState<string>("");

  // ✅ Cookie-based auth check using /auth/me
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        try {
          // If this throws, user is not logged in
          await api.auth.me();
        } catch (err) {
          console.error("auth.me failed", err);
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        setIsLoggedIn(true);
        await fetchData();
      } catch (err) {
        console.error("Failed to init classes page:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch courses from backend
      const coursesData = await api.courses.list("", 500);
      console.log("Courses fetched:", coursesData);
      setAllCourses(coursesData);

      // Fetch term options from backend
      const termsData = await api.terms.list();
      console.log("Terms fetched:", termsData);
      const termCodes = termsData.map(
        (t: any) => t.code || t.term_code || t.name
      );
      setTermOptions(termCodes);
      if (termCodes.length > 0) {
        setModalTerm(termCodes[0]);
      }

      // Fetch user's completions
      const completionsData = await api.completions.list();
      console.log("Completions fetched:", completionsData);
      setCompletions(completionsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Failed to load data from server. Please try again.");
    }
  };

  const filteredCourses = allCourses.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
    );
  });

  const getCompletionForCourse = (courseCode: string) => {
    return completions.find((c) => c.course_code === courseCode);
  };

  const handleAddCourse = (course: Course) => {
    setSelectedCourse(course);
    setModalStatus("completed");
    setModalGrade("");
    setModalTerm(termOptions[0] || "");
    setShowModal(true);
  };

  const handleSaveCompletion = async () => {
    if (!selectedCourse) return;

    try {
      await api.completions.create({
        course_code: selectedCourse.code,
        status: modalStatus,
        grade: modalGrade || null,
        term_code: modalTerm || null,
        units_earned: selectedCourse.units,
      });

      setShowModal(false);
      setSelectedCourse(null);
      await fetchData();
    } catch (error) {
      console.error("Failed to save completion:", error);
      alert("Failed to save course. Please try again.");
    }
  };

  const handleRemoveCompletion = async (completionId: number) => {
    if (!confirm("Remove this course from your records?")) return;

    try {
      await api.completions.delete(completionId);
      await fetchData();
    } catch (error) {
      console.error("Failed to remove completion:", error);
      alert("Failed to remove course. Please try again.");
    }
  };

  // ⏳ First show loading while auth/data is being resolved
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading courses...</p>
      </div>
    );
  }

  // 🔒 Not logged in state
  if (!isLoggedIn) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Please Log In</h1>
        <p className="text-muted-foreground mb-6">
          You need to be logged in to manage your courses.
        </p>
        <Button onClick={() => router.push("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Course Management</h1>
        <p className="text-sm text-muted-foreground">
          Search for courses and mark which ones you've taken, are taking, or
          plan to take.
        </p>
      </header>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Search Courses</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Course code or title (e.g. CS101, Calculus)"
          className="w-full rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">
            Available Courses ({filteredCourses.length})
          </h2>
        </div>

        <ul className="space-y-3">
          {filteredCourses.length === 0 ? (
            <li className="text-center py-8 text-muted-foreground">
              No courses found. Try adjusting your search.
            </li>
          ) : (
            filteredCourses.map((course) => {
              const completion = getCompletionForCourse(course.code);

              return (
                <li
                  key={course.code}
                  className="flex items-center justify-between rounded-md border p-4 bg-background"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-medium">{course.code}</span>
                      <span className="text-sm text-muted-foreground">
                        {course.title}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {course.units} units
                      {completion && (
                        <span className="ml-3 inline-flex items-center gap-1">
                          {completion.status === "completed" && (
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          )}
                          {completion.status === "in-progress" && (
                            <Clock className="w-3 h-3 text-yellow-600" />
                          )}
                          {completion.status === "planned" && (
                            <Calendar className="w-3 h-3 text-blue-600" />
                          )}
                          <span className="capitalize">
                            {completion.status.replace("-", " ")}
                          </span>
                          {completion.grade && ` • Grade: ${completion.grade}`}
                          {completion.term_code &&
                            ` • ${completion.term_code}`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {completion ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleRemoveCompletion(completion.id)
                        }
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAddCourse(course)}
                      >
                        Add Course
                      </Button>
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>

      {/* Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full border shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Add {selectedCourse.code}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) =>
                    setModalStatus(e.target.value as any)
                  }
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              {modalStatus === "completed" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Grade
                  </label>
                  <select
                    value={modalGrade}
                    onChange={(e) => setModalGrade(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select grade...</option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Term
                </label>
                <select
                  value={modalTerm}
                  onChange={(e) => setModalTerm(e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                >
                  {termOptions.length === 0 ? (
                    <option value="">No terms available</option>
                  ) : (
                    termOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleSaveCompletion} className="flex-1">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedCourse(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}