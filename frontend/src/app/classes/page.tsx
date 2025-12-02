"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Course = {
	id: string;
	code: string;
	title: string;
	units: number;
	open: boolean;
};

const MOCK_COURSES: Course[] = [
	{ id: "1", code: "CS-101", title: "Intro to Computer Science", units: 3, open: true },
	{ id: "2", code: "MATH-201", title: "Calculus I", units: 4, open: false },
	{ id: "3", code: "EE-250", title: "Circuits", units: 3, open: true },
	{ id: "4", code: "CS-210", title: "Data Structures", units: 3, open: true },
	{ id: "5", code: "HIST-101", title: "World History", units: 3, open: true },
];

export default function ClassesPage() {
	const [query, setQuery] = useState("");
	const [semester, setSemester] = useState("Fall 2025");

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		return MOCK_COURSES.filter((c) => {
			if (!q) return true;
			return (
				c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
			);
		});
	}, [query]);

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<header className="mb-6">
				<h1 className="text-2xl font-semibold">Class Search</h1>
				<p className="text-sm text-muted-foreground">Search for classes and add them to your plan.</p>
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
				<div className="col-span-2">
					<label className="block text-sm font-medium mb-1">Search</label>
								<input
									value={query}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
						placeholder="Course code or title (e.g. CS-101, Data Structures)"
						className={cn(
							"w-full rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary/40",
						)}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Semester</label>
								<select
									value={semester}
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSemester(e.target.value)}
						className="w-full rounded-md border px-3 py-2"
					>
						<option>Fall 2025</option>
						<option>Spring 2026</option>
						<option>Summer 2026</option>
					</select>
				</div>
			</div>

			<section className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-medium">Results ({results.length})</h2>
					<div className="text-sm text-muted-foreground">Showing available classes for {semester}</div>
				</div>

				<ul className="space-y-3">
					{results.map((c) => (
						<li
							key={c.id}
							className="flex items-center justify-between rounded-md border p-4 bg-background"
						>
							<div>
								<div className="flex items-baseline gap-3">
									<span className="font-medium">{c.code}</span>
									<span className="text-sm text-muted-foreground">{c.title}</span>
								</div>
								<div className="text-xs text-muted-foreground mt-1">{c.units} units • {c.open ? 'Open' : 'Closed'}</div>
							</div>

							<div className="flex items-center gap-2">
								<Button variant={c.open ? 'default' : 'outline'} size="sm" disabled={!c.open}>
									{c.open ? 'Add to Plan' : 'Waitlist'}
								</Button>
							</div>
						</li>
					))}
				</ul>
			</section>

			<footer className="text-sm text-muted-foreground">
				This page uses mock data — wiring to the backend API can be added next.
			</footer>
		</div>
	);
}
