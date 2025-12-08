"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
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
	status: 'completed' | 'in-progress' | 'planned';
	grade?: string | null;
	term_code?: string | null;
	units_earned?: number | null;
};

const GRADE_OPTIONS = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'P', 'NP', 'W', 'IP'];
const TERM_OPTIONS = [
	'Fall 2021', 'Spring 2022', 'Fall 2022', 'Spring 2023', 
	'Fall 2023', 'Spring 2024', 'Fall 2024', 'Spring 2025',
	'Fall 2025', 'Spring 2026', 'Fall 2026', 'Spring 2027'
];

export default function ClassesPage() {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [query, setQuery] = useState("");
	const [allCourses, setAllCourses] = useState<Course[]>([]);
	const [completions, setCompletions] = useState<Completion[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [showModal, setShowModal] = useState(false);
	
	// Modal form state
	const [modalStatus, setModalStatus] = useState<'completed' | 'in-progress' | 'planned'>('completed');
	const [modalGrade, setModalGrade] = useState<string>('');
	const [modalTerm, setModalTerm] = useState<string>('Fall 2024');

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
			setLoading(true);
			// For now, we'll create a static list of courses since backend doesn't have courses endpoint yet
			// In production, this would be: const courses = await api.courses.list();
			const coursesData: Course[] = [
				// EE Core
				{ code: "EE 101", title: "Electrical Engineering Orientation", units: 1 },
				{ code: "EE 210", title: "Digital Design", units: 3 },
				{ code: "EE 230", title: "Electric Circuits I", units: 3 },
				{ code: "EE 240", title: "Introduction to Signals and Systems", units: 3 },
				{ code: "EE 300", title: "Linear Systems", units: 3 },
				{ code: "EE 310", title: "Embedded System Design", units: 4 },
				{ code: "EE 330", title: "Electric Circuits II", units: 3 },
				{ code: "EE 340", title: "Electromagnetic Field Theory", units: 3 },
				{ code: "EE 350", title: "Electronics I", units: 4 },
				{ code: "EE 380", title: "Probability and Statistics for EE", units: 3 },
				{ code: "EE 488", title: "Senior Design Project I", units: 2 },
				{ code: "EE 489", title: "Senior Design Project II", units: 2 },
				// EE Electives
				{ code: "EE 400", title: "Power Systems", units: 3 },
				{ code: "EE 410", title: "Signals and Systems", units: 3 },
				{ code: "EE 420", title: "Feedback Control Systems", units: 3 },
				{ code: "EE 420L", title: "Control Systems Laboratory", units: 1 },
				{ code: "EE 430", title: "Analysis and Design of Electronic Circuits", units: 3 },
				{ code: "EE 430L", title: "Electronic Circuits Laboratory", units: 2 },
				{ code: "EE 439", title: "Instrumentation Circuits", units: 3 },
				{ code: "EE 440", title: "Electromagnetic Waves", units: 3 },
				{ code: "EE 450", title: "Digital Signal Processing", units: 3 },
				{ code: "EE 458", title: "Analog and Pulse Communication Systems", units: 3 },
				{ code: "EE 458L", title: "Communications and Digital Signal Processing Laboratory", units: 1 },
				{ code: "EE 480", title: "Power System Analysis", units: 3 },
				{ code: "EE 483", title: "Power Distribution Systems", units: 3 },
				{ code: "EE 491W", title: "Senior Design A", units: 1 },
				{ code: "EE 492", title: "Senior Design B", units: 3 },
				{ code: "EE 495", title: "Internship", units: 1 },
				{ code: "EE 499", title: "Special Study", units: 1 },
				{ code: "EE 503", title: "Biomedical Instrumentation", units: 3 },
				{ code: "EE 522", title: "Digital Control Systems", units: 3 },
				{ code: "EE 530", title: "Analog Integrated Circuit Design", units: 3 },
				{ code: "EE 540", title: "Microwave Devices and Systems", units: 3 },
				{ code: "EE 581", title: "Power System Dynamics", units: 3 },
				{ code: "EE 584", title: "Power Electronics", units: 3 },
				{ code: "EE 584L", title: "Power Electronics Laboratory", units: 1 },
				// Math
				{ code: "MATH 150", title: "Calculus I", units: 4 },
				{ code: "MATH 151", title: "Calculus II", units: 4 },
				{ code: "MATH 252", title: "Calculus III", units: 4 },
				{ code: "MATH 254", title: "Introduction to Linear Algebra", units: 3 },
				{ code: "MATH 245", title: "Discrete Mathematics", units: 3 },
				{ code: "MATH 350", title: "Differential Equations", units: 3 },
				// Physics
				{ code: "PHYS 195", title: "Mechanics", units: 4 },
				{ code: "PHYS 196", title: "Electricity and Magnetism", units: 4 },
				{ code: "PHYS 197", title: "Waves, Optics, and Modern Physics", units: 4 },
				// CS
				{ code: "CS 107", title: "Introduction to Computer Science", units: 3 },
				{ code: "CS 108", title: "Introduction to Computer Science Laboratory", units: 1 },
				{ code: "CS 210", title: "Data Structures", units: 3 },
				{ code: "CS 211", title: "Object-Oriented Programming", units: 3 },
				// Chemistry
				{ code: "CHEM 200", title: "General Chemistry I", units: 3 },
				{ code: "CHEM 201", title: "General Chemistry Laboratory I", units: 1 },
				// Engineering
				{ code: "ENGR 101", title: "Introduction to Engineering", units: 2 },
				// General Education - Written Communication
				{ code: "ENGL 101", title: "Composition", units: 3 },
				{ code: "ENGL 105", title: "Composition and Critical Thinking", units: 3 },
				{ code: "RWS 100", title: "Freshman Composition", units: 3 },
				// General Education - Oral Communication
				{ code: "COMM 103", title: "Oral Communication", units: 3 },
				{ code: "COMM 160", title: "Introduction to Public Speaking", units: 3 },
				// General Education - Critical Thinking
				{ code: "PHIL 101", title: "Introduction to Philosophy", units: 3 },
				{ code: "PHIL 102", title: "Introduction to Logic", units: 3 },
				{ code: "ENGL 280", title: "Writing for Engineers", units: 3 },
				// General Education - Mathematics/Quantitative Reasoning
				{ code: "MATH 101", title: "Intermediate Algebra", units: 3 },
				{ code: "MATH 141", title: "Precalculus", units: 4 },
				{ code: "STAT 119", title: "Elementary Statistics", units: 3 },
				// General Education - Physical Sciences
				{ code: "ASTR 101", title: "The Solar System", units: 3 },
				{ code: "ASTR 102", title: "Stars and Galaxies", units: 3 },
				{ code: "GEOL 101", title: "Dynamic Earth", units: 3 },
				{ code: "PHYS 180A", title: "Physics for Life Sciences I", units: 3 },
				// General Education - Life Sciences
				{ code: "BIOL 100", title: "Biology as a Natural Science", units: 3 },
				{ code: "BIOL 101", title: "Principles of Biology I", units: 3 },
				{ code: "ENVS 101", title: "Environmental Science", units: 3 },
				// General Education - Laboratory Science
				{ code: "BIOL 100L", title: "Biology as a Natural Science Lab", units: 1 },
				{ code: "CHEM 100L", title: "Chemistry in Everyday Life Lab", units: 1 },
				{ code: "PHYS 180AL", title: "Physics for Life Sciences Lab I", units: 1 },
				// General Education - Arts
				{ code: "ART 101", title: "Art Appreciation", units: 3 },
				{ code: "ART 157", title: "Introduction to Visual Culture", units: 3 },
				{ code: "MUS 101", title: "Music Appreciation", units: 3 },
				{ code: "MUS 109", title: "History of Rock and Roll", units: 3 },
				{ code: "THEA 101", title: "Introduction to Theatre", units: 3 },
				{ code: "DANC 120", title: "Dance Appreciation", units: 3 },
				// General Education - Humanities
				{ code: "HIST 100", title: "World History to 1500", units: 3 },
				{ code: "HIST 101", title: "World History Since 1500", units: 3 },
				{ code: "HUM 101", title: "Introduction to Humanities", units: 3 },
				{ code: "LING 100", title: "Introduction to Language and Linguistics", units: 3 },
				{ code: "RELS 100", title: "Religions of the World", units: 3 },
				{ code: "CLAS 170", title: "Classical Mythology", units: 3 },
				// General Education - Social Sciences
				{ code: "ANTH 102", title: "Introduction to Cultural Anthropology", units: 3 },
				{ code: "ECON 101", title: "Principles of Microeconomics", units: 3 },
				{ code: "ECON 102", title: "Principles of Macroeconomics", units: 3 },
				{ code: "GEOG 101", title: "World Regional Geography", units: 3 },
				{ code: "HIST 108", title: "History of the United States I", units: 3 },
				{ code: "HIST 109", title: "History of the United States II", units: 3 },
				{ code: "POLS 101", title: "Introduction to Political Science", units: 3 },
				{ code: "POLS 103", title: "American Politics", units: 3 },
				{ code: "PSYCH 101", title: "General Psychology", units: 3 },
				{ code: "SOC 101", title: "Principles of Sociology", units: 3 },
				{ code: "WS 101", title: "Introduction to Women's Studies", units: 3 },
				// General Education - Ethnic Studies
				{ code: "AIS 101", title: "Introduction to American Indian Studies", units: 3 },
				{ code: "AFRA 100", title: "Introduction to Africana Studies", units: 3 },
				{ code: "CHS 100", title: "Introduction to Chicana and Chicano Studies", units: 3 },
				{ code: "ETHS 101", title: "Introduction to Ethnic Studies", units: 3 },
				// General Education - Upper Division
				{ code: "COMM 302", title: "Communication and Culture", units: 3 },
				{ code: "ENGL 330", title: "Literature and Film", units: 3 },
				{ code: "HIST 300", title: "Historical Thinking", units: 3 },
				{ code: "PHIL 320", title: "Ethics", units: 3 },
				{ code: "PSYCH 320", title: "Social Psychology", units: 3 },
				{ code: "SOC 350", title: "Social Problems", units: 3 },
			];
			setAllCourses(coursesData);
			
			const completionsData = await api.completions.list();
			setCompletions(completionsData);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		} finally {
			setLoading(false);
		}
	};

	const filteredCourses = allCourses.filter((c) => {
		const q = query.trim().toLowerCase();
		if (!q) return true;
		return c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
	});

	const getCompletionForCourse = (courseCode: string) => {
		return completions.find(c => c.course_code === courseCode);
	};

	const handleAddCourse = (course: Course) => {
		setSelectedCourse(course);
		setModalStatus('completed');
		setModalGrade('');
		setModalTerm('Fall 2024');
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
			await fetchData(); // Refresh
		} catch (error) {
			console.error('Failed to save completion:', error);
			alert('Failed to save course. Please try again.');
		}
	};

	const handleRemoveCompletion = async (completionId: number) => {
		if (!confirm('Remove this course from your records?')) return;
		
		try {
			await api.completions.delete(completionId);
			await fetchData(); // Refresh
		} catch (error) {
			console.error('Failed to remove completion:', error);
			alert('Failed to remove course. Please try again.');
		}
	};

	if (!isLoggedIn) {
		return (
			<div className="max-w-5xl mx-auto px-4 py-16 text-center">
				<h1 className="text-2xl font-semibold mb-4">Please Log In</h1>
				<p className="text-muted-foreground mb-6">You need to be logged in to manage your courses.</p>
				<Button onClick={() => router.push('/sign-in')}>Go to Login</Button>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="max-w-5xl mx-auto px-4 py-16 text-center">
				<p className="text-muted-foreground">Loading courses...</p>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<header className="mb-6">
				<h1 className="text-2xl font-semibold">Course Management</h1>
				<p className="text-sm text-muted-foreground">
					Search for courses and mark which ones you've taken, are taking, or plan to take.
				</p>
			</header>

			<div className="mb-6">
				<label className="block text-sm font-medium mb-1">Search Courses</label>
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Course code or title (e.g. EE 230, Calculus)"
					className="w-full rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary/40"
				/>
			</div>

			<section className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-medium">Available Courses ({filteredCourses.length})</h2>
				</div>

				<ul className="space-y-3">
					{filteredCourses.map((course) => {
						const completion = getCompletionForCourse(course.code);
						
						return (
							<li
								key={course.code}
								className="flex items-center justify-between rounded-md border p-4 bg-background"
							>
								<div className="flex-1">
									<div className="flex items-baseline gap-3">
										<span className="font-medium">{course.code}</span>
										<span className="text-sm text-muted-foreground">{course.title}</span>
									</div>
									<div className="text-xs text-muted-foreground mt-1">
										{course.units} units
										{completion && (
											<span className="ml-3 inline-flex items-center gap-1">
												{completion.status === 'completed' && <CheckCircle className="w-3 h-3 text-green-600" />}
												{completion.status === 'in-progress' && <Clock className="w-3 h-3 text-yellow-600" />}
												{completion.status === 'planned' && <Calendar className="w-3 h-3 text-blue-600" />}
												<span className="capitalize">{completion.status.replace('-', ' ')}</span>
												{completion.grade && ` • Grade: ${completion.grade}`}
												{completion.term_code && ` • ${completion.term_code}`}
											</span>
										)}
									</div>
								</div>

								<div className="flex items-center gap-2">
									{completion ? (
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleRemoveCompletion(completion.id)}
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
					})}
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
								<label className="block text-sm font-medium mb-1">Status</label>
								<select
									value={modalStatus}
									onChange={(e) => setModalStatus(e.target.value as any)}
									className="w-full rounded-md border px-3 py-2"
								>
									<option value="completed">Completed</option>
									<option value="in-progress">In Progress</option>
									<option value="planned">Planned</option>
								</select>
							</div>

							{modalStatus === 'completed' && (
								<div>
									<label className="block text-sm font-medium mb-1">Grade</label>
									<select
										value={modalGrade}
										onChange={(e) => setModalGrade(e.target.value)}
										className="w-full rounded-md border px-3 py-2"
									>
										<option value="">Select grade...</option>
										{GRADE_OPTIONS.map(g => (
											<option key={g} value={g}>{g}</option>
										))}
									</select>
								</div>
							)}

							<div>
								<label className="block text-sm font-medium mb-1">Term</label>
								<select
									value={modalTerm}
									onChange={(e) => setModalTerm(e.target.value)}
									className="w-full rounded-md border px-3 py-2"
								>
									{TERM_OPTIONS.map(t => (
										<option key={t} value={t}>{t}</option>
									))}
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

