"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { ArrowLeft, Trash2, Edit2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Course {
  code: string;
  title: string;
  units: number;
}

interface PlanCourse {
  id: number;
  course_code: string;
}

interface Term {
  id: number;
  plan_id: number;
  term_code: string;
  courses: PlanCourse[];
}

interface Plan {
  id: number;
  name: string;
  owner_email: string;
  program_id: string | null;
  created_at: string;
  updated_at: string;
  terms: Term[];
}

export default function ViewPlanPage() {
  const router = useRouter();
  const params = useParams();
  const planId = params?.id as string;
  
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [addingCourseToTerm, setAddingCourseToTerm] = useState<number | null>(null);
  const [courseSearch, setCourseSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [courseCache, setCourseCache] = useState<{ [key: string]: Course }>({});
  const [isAddingSemester, setIsAddingSemester] = useState(false);
  const [newSemesterName, setNewSemesterName] = useState("");

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        await api.auth.me();
        setIsLoggedIn(true);
        await fetchPlan();
      } catch {
        setIsLoggedIn(false);
        setLoading(false);
        router.push("/login");
      }
    };

    checkAuthAndLoad();
  }, [planId]);

  const fetchCourseDetails = async (courseCode: string): Promise<Course> => {
    if (courseCache[courseCode]) {
      return courseCache[courseCode];
    }
    try {
      const course = await api.courses.get(courseCode);
      setCourseCache(prev => ({ ...prev, [courseCode]: course }));
      return course;
    } catch (error) {
      console.error('Failed to fetch course:', error);
      return { code: courseCode, title: courseCode, units: 3 };
    }
  };

  const fetchPlan = async () => {
    try {
      const planData = await api.plans.get(parseInt(planId));
      const termsData = await api.plans.listTerms(parseInt(planId));
      // Initialize courses array for each term if not present
      const termsWithCourses = termsData.map(term => ({
        ...term,
        courses: term.courses || []
      }));
      setPlan({ ...planData, terms: termsWithCourses });
      setEditedName(planData.name);
      
      // Fetch course details for all courses in the plan
      const allCourseCodes = termsWithCourses.flatMap(t => t.courses.map((c: PlanCourse) => c.course_code));
      const uniqueCodes = [...new Set(allCourseCodes)];
      uniqueCodes.forEach(code => fetchCourseDetails(code));
    } catch (error) {
      console.error('Failed to fetch plan:', error);
      alert('Failed to load plan');
      router.push('/profile');
    } finally {
      setLoading(false);
    }
  };

  const searchCourses = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await api.courses.list(query, 20);
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to search courses:', error);
      setSearchResults([]);
    }
  };

  const handleUpdateName = async () => {
    if (!editedName.trim() || !plan) return;
    
    try {
      await api.plans.update(plan.id, { name: editedName });
      setPlan({ ...plan, name: editedName });
      setIsEditingName(false);
    } catch (error) {
      console.error('Failed to update plan name:', error);
      alert('Failed to update plan name');
    }
  };

  const handleDeletePlan = async () => {
    if (!plan) return;
    
    if (!confirm(`Are you sure you want to delete "${plan.name}"?`)) {
      return;
    }

    try {
      await api.plans.delete(plan.id);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to delete plan:', error);
      alert('Failed to delete plan');
    }
  };

  const handleRemoveCourse = async (termId: number, courseCode: string) => {
    if (!plan) return;
    
    try {
      await api.plans.removeCourse(plan.id, termId, courseCode);
      // Update local state
      setPlan({
        ...plan,
        terms: plan.terms.map(term => 
          term.id === termId
            ? { ...term, courses: term.courses.filter(c => c.course_code !== courseCode) }
            : term
        ),
      });
    } catch (error) {
      console.error('Failed to remove course:', error);
      alert('Failed to remove course');
    }
  };

  const handleAddCourse = async (termId: number, courseCode: string) => {
    if (!plan) return;
    
    try {
      const newCourse = await api.plans.addCourse(plan.id, termId, courseCode);
      // Update local state
      setPlan({
        ...plan,
        terms: plan.terms.map(term => 
          term.id === termId
            ? { ...term, courses: [...term.courses, { id: newCourse.id, course_code: courseCode }] }
            : term
        ),
      });
      setAddingCourseToTerm(null);
      setCourseSearch("");
      setSearchResults([]);
    } catch (error) {
      console.error('Failed to add course:', error);
      alert('Failed to add course');
    }
  };

  const handleAddSemester = async () => {
    if (!plan || !newSemesterName.trim()) return;
    
    try {
      const newTerm = await api.plans.addTerm(plan.id, newSemesterName);
      setPlan({
        ...plan,
        terms: [...plan.terms, { ...newTerm, courses: [] }],
      });
      setIsAddingSemester(false);
      setNewSemesterName("");
    } catch (error) {
      console.error('Failed to add semester:', error);
      alert('Failed to add semester');
    }
  };

  const handleRemoveSemester = async (termId: number) => {
    if (!plan) return;
    
    const term = plan.terms.find(t => t.id === termId);
    if (!term) return;
    
    if (term.courses.length > 0) {
      if (!confirm(`"${term.term_code}" has ${term.courses.length} course(s). Are you sure you want to delete it?`)) {
        return;
      }
    }
    
    try {
      await api.plans.deleteTerm(plan.id, termId);
      setPlan({
        ...plan,
        terms: plan.terms.filter(t => t.id !== termId),
      });
    } catch (error) {
      console.error('Failed to remove semester:', error);
      alert('Failed to remove semester');
    }
  };

  const getCourseDetails = (courseCode: string): Course => {
    return courseCache[courseCode] || {
      code: courseCode,
      title: courseCode,
      units: 3,
    };
  };

  const calculateTermUnits = (term: Term): number => {
    if (!term.courses || term.courses.length === 0) return 0;
    return term.courses.reduce((sum, c) => {
      const course = getCourseDetails(c.course_code);
      return sum + course.units;
    }, 0);
  };

  const calculateTotalUnits = (): number => {
    if (!plan) return 0;
    return plan.terms.reduce((sum, term) => sum + calculateTermUnits(term), 0);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading plan...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Plan not found</p>
          <Link href="/profile" className="mt-4 inline-block text-blue-600 hover:underline">
            Return to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/profile"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Profile
            </Link>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-3xl font-semibold border rounded px-3 py-1"
                      autoFocus
                    />
                    <Button onClick={handleUpdateName} size="sm">
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setEditedName(plan.name);
                        setIsEditingName(false);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-semibold">{plan.name}</h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-muted-foreground hover:text-foreground"
                      title="Edit name"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.created_at && (
                    <>Created {new Date(plan.created_at).toLocaleDateString()} • </>
                  )}
                  {plan.updated_at && (
                    <>Last updated {new Date(plan.updated_at).toLocaleDateString()}</>
                  )}
                </p>
              </div>

              <button
                onClick={handleDeletePlan}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950 transition"
              >
                <Trash2 className="w-4 h-4 inline mr-1" />
                Delete Plan
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Semesters</p>
              <p className="text-2xl font-semibold">{plan.terms.length}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-semibold">
                {plan.terms.reduce((sum, t) => sum + t.courses.length, 0)}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Units</p>
              <p className="text-2xl font-semibold">{calculateTotalUnits()}</p>
            </div>
          </div>

          {/* Semesters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Semesters</h2>
              <Button
                onClick={() => setIsAddingSemester(true)}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Semester
              </Button>
            </div>

            {/* Add Semester Form */}
            {isAddingSemester && (
              <div className="border rounded-lg p-4 mb-4 bg-green-50 dark:bg-green-950">
                <h3 className="font-semibold mb-2">Add New Semester</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSemesterName}
                    onChange={(e) => setNewSemesterName(e.target.value)}
                    placeholder="e.g., Fall 2025, Spring 2026"
                    className="flex-1 px-3 py-2 border rounded"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSemester();
                      } else if (e.key === 'Escape') {
                        setIsAddingSemester(false);
                        setNewSemesterName("");
                      }
                    }}
                  />
                  <Button onClick={handleAddSemester} disabled={!newSemesterName.trim()}>
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingSemester(false);
                      setNewSemesterName("");
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            {plan.terms.length === 0 ? (
              <div className="border border-dashed rounded-lg p-8 text-center">
                <p className="text-sm text-muted-foreground">No semesters in this plan yet</p>
                <p className="text-xs text-muted-foreground mt-1">Click "Add Semester" to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {plan.terms.map((term) => (
                  <div key={term.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{term.term_code}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {term.courses.length} course{term.courses.length !== 1 ? 's' : ''} • {calculateTermUnits(term)} units
                        </span>
                        <Button
                          onClick={() => {
                            setAddingCourseToTerm(term.id);
                            setCourseSearch("");
                            setSearchResults([]);
                          }}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Course
                        </Button>
                        <button
                          onClick={() => handleRemoveSemester(term.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete semester"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add Course Interface */}
                    {addingCourseToTerm === term.id && (
                      <div className="mb-4 border rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={courseSearch}
                            onChange={(e) => {
                              setCourseSearch(e.target.value);
                              searchCourses(e.target.value);
                            }}
                            placeholder="Search courses (e.g., 'EE 101' or 'Calculus')"
                            className="flex-1 px-3 py-2 border rounded"
                            autoFocus
                          />
                          <Button
                            onClick={() => {
                              setAddingCourseToTerm(null);
                              setCourseSearch("");
                              setSearchResults([]);
                            }}
                            variant="outline"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>

                        {searchResults.length > 0 && (
                          <div className="max-h-60 overflow-y-auto space-y-1">
                            {searchResults.map((course) => (
                              <button
                                key={course.code}
                                onClick={() => handleAddCourse(term.id, course.code)}
                                className="w-full text-left px-3 py-2 border rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                                disabled={term.courses.some(c => c.course_code === course.code)}
                              >
                                <div className="font-medium text-sm">{course.code}</div>
                                <div className="text-xs text-muted-foreground">{course.title} ({course.units}u)</div>
                              </button>
                            ))}
                          </div>
                        )}

                        {courseSearch && searchResults.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-2">
                            No courses found
                          </p>
                        )}
                      </div>
                    )}

                    {term.courses.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No courses in this semester
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {term.courses.map((course) => {
                          const details = getCourseDetails(course.course_code);
                          return (
                            <div
                              key={course.id}
                              className="flex items-center justify-between border rounded p-3 bg-gray-50 dark:bg-gray-900"
                            >
                              <div className="flex-1">
                                <div className="font-medium text-sm">{details.code}</div>
                                <div className="text-xs text-muted-foreground">{details.title}</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-blue-600">
                                  {details.units}u
                                </span>
                                <button
                                  onClick={() => handleRemoveCourse(term.id, course.course_code)}
                                  className="text-red-500 hover:text-red-700"
                                  title="Remove course"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
