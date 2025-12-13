"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Plus, X, Save } from "lucide-react";

type Course = {
  code: string;
  title: string;
  units: number;
};

type Term = {
  id: number;
  plan_id: number;
  term_code: string;
  courses: { id: number; course_code: string }[];
};

export default function AddPlanPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [planName, setPlanName] = useState("My Academic Plan");
  const [terms, setTerms] = useState<Term[]>([]);
  const [termOptions, setTermOptions] = useState<string[]>([]);
  const [newTermCode, setNewTermCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.auth.me();
        setIsLoggedIn(true);
        await fetchAvailableCourses();
        await fetchTermOptions();
      } catch {
        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const fetchAvailableCourses = async () => {
    try {
      setLoadingCourses(true);
      const courses = await api.courses.list("", 500);
      console.log("Courses fetched:", courses);
      setAvailableCourses(courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      alert("Failed to load courses. Please try again.");
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchTermOptions = async () => {
    try {
      const terms = await api.terms.list();
      console.log("Terms fetched:", terms);
      setTermOptions(terms.map((t: any) => t.code || t.term_code || t.name));
      if (terms.length > 0) {
        setNewTermCode(terms[0].code || terms[0].term_code || terms[0].name);
      }
    } catch (error) {
      console.error("Failed to fetch term options:", error);
      // Fallback to hardcoded options if backend fails
      const fallbackTerms = [
        'Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026',
        'Fall 2026', 'Spring 2027', 'Fall 2027', 'Spring 2028',
      ];
      setTermOptions(fallbackTerms);
      setNewTermCode(fallbackTerms[0]);
    }
  };

  const handleAddSemester = () => {
    if (!newTermCode.trim()) return;
    
    if (terms.some(t => t.term_code === newTermCode)) {
      alert("This semester has already been added!");
      return;
    }

    const newTerm: Term = {
      id: Date.now(),
      plan_id: 0,
      term_code: newTermCode,
      courses: [],
    };
    setTerms([...terms, newTerm]);
  };

  const handleRemoveSemester = (termId: number) => {
    setTerms(terms.filter(t => t.id !== termId));
    if (selectedTermId === termId) {
      setSelectedTermId(null);
    }
  };

  const handleAddCourseToTerm = (termId: number, courseCode: string) => {
    setTerms(terms.map(term => {
      if (term.id === termId) {
        if (term.courses.some(c => c.course_code === courseCode)) {
          alert("This course is already in this semester!");
          return term;
        }
        return {
          ...term,
          courses: [...term.courses, { id: Date.now(), course_code: courseCode }],
        };
      }
      return term;
    }));
  };

  const handleRemoveCourseFromTerm = (termId: number, courseCode: string) => {
    setTerms(terms.map(term => {
      if (term.id === termId) {
        return {
          ...term,
          courses: term.courses.filter(c => c.course_code !== courseCode),
        };
      }
      return term;
    }));
  };

  const handleSavePlan = async () => {
    console.log("Save plan clicked");
    
    if (!planName.trim()) {
      alert("Please enter a plan name");
      return;
    }

    if (terms.length === 0) {
      alert("Please add at least one semester to your plan");
      return;
    }

    try {
      setLoading(true);
      console.log("Creating plan...");
      
      const plan = await api.plans.create({
        name: planName,
        program_id: null,
      });
      console.log("Plan created:", plan);

      for (const term of terms) {
        console.log("Adding term:", term.term_code);
        const createdTerm = await api.plans.addTerm(plan.id, term.term_code);
        console.log("Term created:", createdTerm);
        
        console.log(`Term has ${term.courses.length} courses to add`);
        for (const course of term.courses) {
          console.log("Adding course:", course.course_code, "to term", createdTerm.id);
          try {
            await api.plans.addCourse(plan.id, createdTerm.id, course.course_code);
            console.log("Course added successfully");
          } catch (err) {
            console.error("Failed to add course:", course.course_code, err);
          }
        }
      }

      alert("Plan saved successfully!");
      console.log("Redirecting to profile...");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to save plan:", error);
      alert("Failed to save plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = availableCourses.filter(course => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return course.code.toLowerCase().includes(q) || course.title.toLowerCase().includes(q);
  });

  const getCourseDetails = (courseCode: string) => {
    return availableCourses.find(c => c.code === courseCode);
  };

  if (checkingAuth) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Please Log In</h1>
        <p className="text-muted-foreground mb-6">You need to be logged in to create a plan.</p>
        <Button onClick={() => router.push('/login')}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 justify-center px-8 py-10">
        <div className="w-full max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Add a Plan</h1>
            <Link
              href="/profile"
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              ← Back to Your Profile
            </Link>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Plan Name</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Spring 2025 - Fall 2028"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="space-y-4">
              <div className="border rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Semesters</h2>
                
                <div className="flex gap-2 mb-4">
                  <select
                    value={newTermCode}
                    onChange={(e) => setNewTermCode(e.target.value)}
                    className="flex-1 border rounded px-3 py-2 text-sm"
                  >
                    {termOptions.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                  <Button onClick={handleAddSemester} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="space-y-3">
                  {terms.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No semesters added yet
                    </p>
                  ) : (
                    terms.map(term => {
                      const totalUnits = term.courses.reduce((sum, c) => {
                        const course = getCourseDetails(c.course_code);
                        return sum + (course?.units || 0);
                      }, 0);

                      return (
                        <div
                          key={term.id}
                          className={`border rounded p-3 cursor-pointer transition-colors ${
                            selectedTermId === term.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                              : 'hover:border-gray-400'
                          }`}
                          onClick={() => setSelectedTermId(term.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{term.term_code}</h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveSemester(term.id);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {term.courses.length} course{term.courses.length !== 1 ? 's' : ''} • {totalUnits} units
                          </div>
                          
                          {term.courses.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {term.courses.map(course => {
                                const details = getCourseDetails(course.course_code);
                                return (
                                  <div
                                    key={course.id}
                                    className="flex items-center justify-between text-xs bg-white dark:bg-gray-800 rounded px-2 py-1"
                                  >
                                    <span>
                                      {course.course_code}
                                      {details && ` (${details.units}u)`}
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveCourseFromTerm(term.id, course.course_code);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>

            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Available Courses</h2>
                <span className="text-sm text-muted-foreground">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {loadingCourses ? (
                <p className="text-sm text-muted-foreground text-center py-8">Loading courses...</p>
              ) : filteredCourses.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No courses available</p>
              ) : selectedTermId ? (
                <>
                  <p className="text-sm text-muted-foreground mb-3">
                    Click a course to add it to{' '}
                    <strong>{terms.find(t => t.id === selectedTermId)?.term_code}</strong>
                  </p>

                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-3 text-sm"
                  />

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredCourses.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No courses found</p>
                    ) : (
                      filteredCourses.map(course => (
                        <div
                          key={course.code}
                          onClick={() => handleAddCourseToTerm(selectedTermId, course.code)}
                          className="border rounded p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-sm">{course.code}</div>
                              <div className="text-xs text-muted-foreground">{course.title}</div>
                            </div>
                            <div className="text-xs font-semibold text-blue-600">
                              {course.units}u
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Select a semester to add courses
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSavePlan}
              disabled={loading || terms.length === 0}
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Plan'}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}