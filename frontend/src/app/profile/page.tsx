"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { CheckCircle, Clock, Calendar, BookOpen, FileText, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const [completions, setCompletions] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [completionsData, plansData] = await Promise.all([
        api.completions.list(),
        api.plans.list(),
      ]);
      setCompletions(completionsData);
      setPlans(plansData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletions = async () => {
    try {
      const data = await api.completions.list();
      setCompletions(data);
    } catch (error) {
      console.error('Failed to fetch completions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId: number, planName: string) => {
    if (!confirm(`Are you sure you want to delete "${planName}"?`)) {
      return;
    }

    try {
      await api.plans.delete(planId);
      setPlans(plans.filter(p => p.id !== planId));
    } catch (error) {
      console.error('Failed to delete plan:', error);
      alert('Failed to delete plan. Please try again.');
    }
  };

  const calculateStats = () => {
    const completed = completions.filter(c => c.status === 'completed');
    const inProgress = completions.filter(c => c.status === 'in-progress');
    const planned = completions.filter(c => c.status === 'planned');
    
    const totalUnits = completed.reduce((sum, c) => sum + (c.units_earned || 0), 0);
    
    // Calculate GPA
    const gradeToPoints: { [key: string]: number } = {
      "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0,
    };
    
    let gradePoints = 0;
    let gradedUnits = 0;
    
    completed.forEach(c => {
      if (c.grade && gradeToPoints[c.grade] !== undefined) {
        gradePoints += gradeToPoints[c.grade] * (c.units_earned || 0);
        gradedUnits += c.units_earned || 0;
      }
    });
    
    const gpa = gradedUnits > 0 ? gradePoints / gradedUnits : 0;
    
    return {
      completed: completed.length,
      inProgress: inProgress.length,
      planned: planned.length,
      totalUnits,
      gpa,
    };
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-full flex-col">
        <div className="flex flex-1 justify-center px-8 py-10">
          <div className="w-full max-w-6xl">
            <h1 className="mb-3 text-3xl font-semibold">Your Profile</h1>
            <p className="mb-8 text-sm text-muted-foreground">
              Please log in to view your profile.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-full flex-col">
        <div className="flex flex-1 justify-center px-8 py-10">
          <div className="w-full max-w-6xl">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 justify-center px-8 py-10">
        <div className="w-full max-w-6xl">
          <h1 className="mb-3 text-3xl font-semibold">Your Profile</h1>
          
          {/* Academic Stats */}
          {completions.length > 0 && (
            <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <div className="text-2xl font-bold">{stats.completed}</div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-muted-foreground">In Progress</span>
                </div>
                <div className="text-2xl font-bold">{stats.inProgress}</div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Planned</span>
                </div>
                <div className="text-2xl font-bold">{stats.planned}</div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">Total Units</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalUnits}</div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">GPA</div>
                <div className="text-2xl font-bold">{stats.gpa.toFixed(2)}</div>
              </div>
            </div>
          )}
          
          <p className="mb-8 text-sm text-muted-foreground">
            {completions.length === 0 
              ? "You don't have any completed courses yet."
              : "Manage your courses and degree plans below."
            }
          </p>

          {/* Saved Plans Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Academic Plans</h2>
              <Link
                href="/profile/add-plan"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
              >
                Create New Plan
              </Link>
            </div>
            
            {plans.length === 0 ? (
              <div className="border border-dashed rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  No academic plans created yet
                </p>
                <Link
                  href="/profile/add-plan"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                >
                  Create Your First Plan
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(plan.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePlan(plan.id, plan.name)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/profile/plan/${plan.id}`}
                        className="block w-full text-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm font-medium"
                      >
                        View Plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="grid gap-6 grid-cols-2 md:grid-cols-3">
            <Link
              href="/classes"
              className="
                border 
                border-dashed 
                rounded 
                flex 
                items-center 
                justify-center 
                aspect-square 
                bg-muted/20 
                hover:bg-muted/40 
                transition 
                text-sm 
                font-medium
              "
            >
              Manage Courses
            </Link>
            
            <Link
              href="/program-of-study"
              className="
                border 
                border-dashed 
                rounded 
                flex 
                items-center 
                justify-center 
                aspect-square 
                bg-muted/20 
                hover:bg-muted/40 
                transition 
                text-sm 
                font-medium
              "
            >
              View Audit
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}