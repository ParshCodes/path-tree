(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/program-of-study/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProgramOfStudyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Mock audit data - Complete structure from PDF
const MOCK_AUDIT = [
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
                    {
                        code: "HIST 108",
                        title: "United States History",
                        units: 3,
                        grade: "B+",
                        term: "Fall 2021",
                        status: "completed"
                    }
                ]
            },
            {
                id: "ai-constitution",
                title: "U.S. Constitution",
                status: "complete",
                description: "Complete one course",
                courses: [
                    {
                        code: "POLS 103",
                        title: "American Political System",
                        units: 3,
                        grade: "A-",
                        term: "Fall 2021",
                        status: "completed"
                    }
                ]
            }
        ]
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
                    {
                        code: "ENGL 101",
                        title: "Composition",
                        units: 3,
                        grade: "A",
                        term: "Fall 2021",
                        status: "completed"
                    },
                    {
                        code: "COMM 103",
                        title: "Oral Communication",
                        units: 3,
                        grade: "B+",
                        term: "Fall 2021",
                        status: "completed"
                    },
                    {
                        code: "PHIL 101",
                        title: "Critical Thinking",
                        units: 3,
                        grade: "A-",
                        term: "Spring 2022",
                        status: "completed"
                    },
                    {
                        code: "MATH 150",
                        title: "Calculus I",
                        units: 4,
                        grade: "B+",
                        term: "Fall 2021",
                        status: "completed"
                    }
                ]
            },
            {
                id: "ge-explorations",
                title: "Explorations of Creativity and Culture",
                status: "complete",
                description: "Complete 9 units from at least two areas (Arts, Humanities, Languages)",
                courses: [
                    {
                        code: "ART 157",
                        title: "Visual Culture",
                        units: 3,
                        grade: "B",
                        term: "Spring 2022",
                        status: "completed"
                    },
                    {
                        code: "MUS 102",
                        title: "Music Appreciation",
                        units: 3,
                        grade: "A",
                        term: "Fall 2022",
                        status: "completed"
                    },
                    {
                        code: "LIT 201",
                        title: "World Literature",
                        units: 3,
                        grade: "B+",
                        term: "Fall 2022",
                        status: "completed"
                    }
                ]
            },
            {
                id: "ge-social-sciences",
                title: "Social and Behavioral Sciences",
                status: "complete",
                description: "Complete 9 units from at least two disciplines",
                courses: [
                    {
                        code: "PSYCH 101",
                        title: "Introduction to Psychology",
                        units: 3,
                        grade: "A",
                        term: "Spring 2022",
                        status: "completed"
                    },
                    {
                        code: "SOC 101",
                        title: "Principles of Sociology",
                        units: 3,
                        grade: "B+",
                        term: "Fall 2022",
                        status: "completed"
                    },
                    {
                        code: "ECON 102",
                        title: "Principles of Microeconomics",
                        units: 3,
                        grade: "A-",
                        term: "Spring 2023",
                        status: "completed"
                    }
                ]
            },
            {
                id: "ge-life-sciences",
                title: "Life Sciences",
                status: "complete",
                description: "Complete one course with lab",
                courses: [
                    {
                        code: "BIOL 100",
                        title: "Biology and Society",
                        units: 3,
                        grade: "B",
                        term: "Fall 2022",
                        status: "completed"
                    },
                    {
                        code: "BIOL 100L",
                        title: "Biology Lab",
                        units: 1,
                        grade: "B",
                        term: "Fall 2022",
                        status: "completed"
                    }
                ]
            },
            {
                id: "ge-physical-sciences",
                title: "Physical Sciences",
                status: "in-progress",
                description: "Complete one course with lab",
                courses: [
                    {
                        code: "PHYS 195",
                        title: "Physics for Scientists I",
                        units: 3,
                        grade: "IP",
                        term: "Spring 2024",
                        status: "in-progress"
                    },
                    {
                        code: "PHYS 195L",
                        title: "Physics Lab I",
                        units: 1,
                        term: "Spring 2024",
                        status: "not-taken"
                    }
                ]
            },
            {
                id: "ge-integration",
                title: "Integration",
                status: "incomplete",
                description: "Complete upper-division GE integration course",
                courses: [
                    {
                        code: "GEN 300",
                        title: "Global Perspectives",
                        units: 3,
                        term: "Fall 2024",
                        status: "not-taken"
                    }
                ]
            }
        ]
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
                    {
                        code: "MATH 150",
                        title: "Calculus I",
                        units: 4,
                        grade: "B+",
                        term: "Fall 2021",
                        status: "completed"
                    },
                    {
                        code: "MATH 151",
                        title: "Calculus II",
                        units: 4,
                        grade: "A-",
                        term: "Spring 2022",
                        status: "completed"
                    },
                    {
                        code: "MATH 245",
                        title: "Discrete Mathematics",
                        units: 3,
                        grade: "A",
                        term: "Fall 2022",
                        status: "completed"
                    }
                ]
            },
            {
                id: "prep-cs-lower",
                title: "Lower Division Computer Science",
                status: "complete",
                description: "Complete foundational CS courses",
                courses: [
                    {
                        code: "CS 107",
                        title: "Intro to Computer Science",
                        units: 3,
                        grade: "A",
                        term: "Fall 2021",
                        status: "completed"
                    },
                    {
                        code: "CS 108",
                        title: "Object-Oriented Programming",
                        units: 3,
                        grade: "A-",
                        term: "Spring 2022",
                        status: "completed"
                    },
                    {
                        code: "CS 210",
                        title: "Data Structures",
                        units: 3,
                        grade: "B+",
                        term: "Fall 2022",
                        status: "completed"
                    },
                    {
                        code: "CS 237",
                        title: "Computer Organization",
                        units: 3,
                        grade: "A",
                        term: "Spring 2023",
                        status: "completed"
                    }
                ]
            }
        ]
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
                    {
                        code: "CS 310",
                        title: "Data Structures & Algorithms",
                        units: 3,
                        grade: "A",
                        term: "Fall 2023",
                        status: "completed"
                    },
                    {
                        code: "CS 320",
                        title: "Programming Languages",
                        units: 3,
                        grade: "B+",
                        term: "Spring 2023",
                        status: "completed"
                    },
                    {
                        code: "CS 330",
                        title: "Computer Architecture",
                        units: 3,
                        grade: "IP",
                        term: "Spring 2024",
                        status: "in-progress"
                    },
                    {
                        code: "CS 340",
                        title: "Operating Systems",
                        units: 3,
                        term: "Fall 2024",
                        status: "not-taken"
                    },
                    {
                        code: "CS 350",
                        title: "Software Engineering",
                        units: 3,
                        term: "Fall 2024",
                        status: "not-taken"
                    },
                    {
                        code: "CS 370",
                        title: "Theory of Computation",
                        units: 3,
                        term: "Spring 2025",
                        status: "not-taken"
                    }
                ]
            },
            {
                id: "core-lab",
                title: "Laboratory Requirement",
                status: "in-progress",
                description: "Complete one advanced lab course",
                courses: [
                    {
                        code: "CS 460L",
                        title: "Database Systems Lab",
                        units: 1,
                        grade: "IP",
                        term: "Spring 2024",
                        status: "in-progress"
                    }
                ]
            }
        ]
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
                    {
                        code: "CS 460",
                        title: "Database Systems",
                        units: 3,
                        grade: "A",
                        term: "Fall 2023",
                        status: "completed"
                    },
                    {
                        code: "CS 465",
                        title: "Computer Networks",
                        units: 3,
                        grade: "B+",
                        term: "Spring 2023",
                        status: "completed"
                    },
                    {
                        code: "CS 470",
                        title: "Artificial Intelligence",
                        units: 3,
                        term: "Fall 2024",
                        status: "not-taken"
                    },
                    {
                        code: "CS 480",
                        title: "Machine Learning",
                        units: 3,
                        term: "Spring 2025",
                        status: "not-taken"
                    },
                    {
                        code: "CS 496",
                        title: "Senior Project",
                        units: 3,
                        term: "Spring 2025",
                        status: "not-taken"
                    }
                ]
            }
        ]
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
                    {
                        code: "CS 499W",
                        title: "Technical Writing for CS",
                        units: 3,
                        term: "Fall 2024",
                        status: "not-taken"
                    }
                ]
            }
        ]
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
                    {
                        code: "AFRAM 200",
                        title: "African American Studies",
                        units: 3,
                        grade: "A-",
                        term: "Spring 2022",
                        status: "completed"
                    }
                ]
            }
        ]
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
                    {
                        code: "N/A",
                        title: "Progress: 84 of 120 units completed at SDSU",
                        units: 84,
                        grade: "IP",
                        term: "Current",
                        status: "in-progress"
                    }
                ]
            },
            {
                id: "gpa",
                title: "GPA Requirements",
                status: "in-progress",
                description: "Maintain minimum 2.0 overall GPA and 2.5 major GPA",
                courses: [
                    {
                        code: "N/A",
                        title: "Overall GPA: 3.45 | Major GPA: 3.62",
                        units: 0,
                        grade: "PASS",
                        term: "Current",
                        status: "completed"
                    }
                ]
            },
            {
                id: "units",
                title: "Unit Requirements",
                status: "in-progress",
                description: "Complete minimum 120 units for degree",
                courses: [
                    {
                        code: "N/A",
                        title: "Progress: 84 of 120 units completed",
                        units: 84,
                        grade: "IP",
                        term: "Current",
                        status: "in-progress"
                    }
                ]
            }
        ]
    }
];
// Status icon component
const StatusIcon = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "abbbcea536087709f3c13e27bf4a71b9e444e0595536633b160622c5cb9f11b7") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "abbbcea536087709f3c13e27bf4a71b9e444e0595536633b160622c5cb9f11b7";
    }
    const { status } = t0;
    if (status === "complete") {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "w-5 h-5 text-green-600"
            }, void 0, false, {
                fileName: "[project]/src/app/program-of-study/page.tsx",
                lineNumber: 475,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0));
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    } else {
        if (status === "in-progress") {
            let t1;
            if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
                t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "w-5 h-5 text-yellow-600"
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 485,
                    columnNumber: 14
                }, ("TURBOPACK compile-time value", void 0));
                $[2] = t1;
            } else {
                t1 = $[2];
            }
            return t1;
        }
    }
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "w-5 h-5 text-red-600"
        }, void 0, false, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 495,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
};
_c = StatusIcon;
function ProgramOfStudyPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "abbbcea536087709f3c13e27bf4a71b9e444e0595536633b160622c5cb9f11b7") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "abbbcea536087709f3c13e27bf4a71b9e444e0595536633b160622c5cb9f11b7";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = new Set(MOCK_AUDIT.map(_ProgramOfStudyPageMOCK_AUDITMap));
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [expandedRequirements, setExpandedRequirements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = new Set(MOCK_AUDIT.flatMap(_ProgramOfStudyPageMOCK_AUDITFlatMap));
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [expandedSubRequirements, setExpandedSubRequirements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "ProgramOfStudyPage[toggleRequirement]": (id)=>{
                setExpandedRequirements({
                    "ProgramOfStudyPage[toggleRequirement > setExpandedRequirements()]": (prev)=>{
                        const newSet = new Set(prev);
                        if (newSet.has(id)) {
                            newSet.delete(id);
                        } else {
                            newSet.add(id);
                        }
                        return newSet;
                    }
                }["ProgramOfStudyPage[toggleRequirement > setExpandedRequirements()]"]);
            }
        })["ProgramOfStudyPage[toggleRequirement]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const toggleRequirement = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "ProgramOfStudyPage[toggleSubRequirement]": (id_0)=>{
                setExpandedSubRequirements({
                    "ProgramOfStudyPage[toggleSubRequirement > setExpandedSubRequirements()]": (prev_0)=>{
                        const newSet_0 = new Set(prev_0);
                        if (newSet_0.has(id_0)) {
                            newSet_0.delete(id_0);
                        } else {
                            newSet_0.add(id_0);
                        }
                        return newSet_0;
                    }
                }["ProgramOfStudyPage[toggleSubRequirement > setExpandedSubRequirements()]"]);
            }
        })["ProgramOfStudyPage[toggleSubRequirement]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const toggleSubRequirement = t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold mb-2",
                    children: "Program of Study - Audit Results"
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 572,
                    columnNumber: 32
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground",
                    children: "Computer Science, B.S."
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 572,
                    columnNumber: 109
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Student ID: 123456789 | Catalog Year: 2021-2022"
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 572,
                    columnNumber: 172
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 572,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== expandedRequirements || $[7] !== expandedSubRequirements) {
        t5 = MOCK_AUDIT.map({
            "ProgramOfStudyPage[MOCK_AUDIT.map()]": (requirement)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border rounded-lg bg-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "ProgramOfStudyPage[MOCK_AUDIT.map() > <button>.onClick]": ()=>toggleRequirement(requirement.id)
                            }["ProgramOfStudyPage[MOCK_AUDIT.map() > <button>.onClick]"],
                            className: "w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors",
                            children: [
                                expandedRequirements.has(requirement.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-5 h-5 flex-shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/program-of-study/page.tsx",
                                    lineNumber: 582,
                                    columnNumber: 196
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "w-5 h-5 flex-shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/program-of-study/page.tsx",
                                    lineNumber: 582,
                                    columnNumber: 248
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusIcon, {
                                    status: requirement.status
                                }, void 0, false, {
                                    fileName: "[project]/src/app/program-of-study/page.tsx",
                                    lineNumber: 582,
                                    columnNumber: 299
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-lg",
                                    children: requirement.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/program-of-study/page.tsx",
                                    lineNumber: 582,
                                    columnNumber: 341
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/program-of-study/page.tsx",
                            lineNumber: 580,
                            columnNumber: 126
                        }, this),
                        expandedRequirements.has(requirement.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t",
                            children: requirement.subRequirements.map({
                                "ProgramOfStudyPage[MOCK_AUDIT.map() > requirement.subRequirements.map()]": (subReq)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-b last:border-b-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: {
                                                    "ProgramOfStudyPage[MOCK_AUDIT.map() > requirement.subRequirements.map() > <button>.onClick]": ()=>toggleSubRequirement(subReq.id)
                                                }["ProgramOfStudyPage[MOCK_AUDIT.map() > requirement.subRequirements.map() > <button>.onClick]"],
                                                className: "w-full flex items-center gap-3 p-4 pl-12 hover:bg-accent transition-colors",
                                                children: [
                                                    expandedSubRequirements.has(subReq.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "w-4 h-4 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 242
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        className: "w-4 h-4 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 294
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusIcon, {
                                                        status: subReq.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 345
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: subReq.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 416
                                                            }, this),
                                                            subReq.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-muted-foreground",
                                                                children: subReq.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 490
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 382
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/program-of-study/page.tsx",
                                                lineNumber: 583,
                                                columnNumber: 157
                                            }, this),
                                            expandedSubRequirements.has(subReq.id) && subReq.courses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 pb-4 pl-20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "w-full text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-b",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left py-2 font-semibold",
                                                                        children: "Course"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 750
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left py-2 font-semibold",
                                                                        children: "Title"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 806
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left py-2 font-semibold",
                                                                        children: "Units"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 861
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left py-2 font-semibold",
                                                                        children: "Grade"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 916
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left py-2 font-semibold",
                                                                        children: "Term"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 971
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/program-of-study/page.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 725
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/program-of-study/page.tsx",
                                                            lineNumber: 585,
                                                            columnNumber: 718
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            children: subReq.courses.map(_ProgramOfStudyPageMOCK_AUDITMapRequirementSubRequirementsMapSubReqCoursesMap)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/program-of-study/page.tsx",
                                                            lineNumber: 585,
                                                            columnNumber: 1038
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/program-of-study/page.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 684
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/program-of-study/page.tsx",
                                                lineNumber: 585,
                                                columnNumber: 651
                                            }, this)
                                        ]
                                    }, subReq.id, true, {
                                        fileName: "[project]/src/app/program-of-study/page.tsx",
                                        lineNumber: 583,
                                        columnNumber: 99
                                    }, this)
                            }["ProgramOfStudyPage[MOCK_AUDIT.map() > requirement.subRequirements.map()]"])
                        }, void 0, false, {
                            fileName: "[project]/src/app/program-of-study/page.tsx",
                            lineNumber: 582,
                            columnNumber: 457
                        }, this)
                    ]
                }, requirement.id, true, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 580,
                    columnNumber: 62
                }, this)
        }["ProgramOfStudyPage[MOCK_AUDIT.map()]"]);
        $[6] = expandedRequirements;
        $[7] = expandedSubRequirements;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 596,
            columnNumber: 10
        }, this);
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-semibold mb-3",
            children: "Legend"
        }, void 0, false, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 604,
            columnNumber: 10
        }, this);
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                    className: "w-4 h-4 text-green-600"
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 611,
                    columnNumber: 51
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Requirement Complete"
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 611,
                    columnNumber: 101
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 611,
            columnNumber: 10
        }, this);
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "w-4 h-4 text-yellow-600"
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 618,
                    columnNumber: 51
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "In Progress / Future Planned"
                }, void 0, false, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 618,
                    columnNumber: 96
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 618,
            columnNumber: 10
        }, this);
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 p-4 border rounded-lg bg-muted/50",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-3 text-sm",
                    children: [
                        t8,
                        t9,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                    className: "w-4 h-4 text-red-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/program-of-study/page.tsx",
                                    lineNumber: 625,
                                    columnNumber: 183
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Requirement Not Met"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/program-of-study/page.tsx",
                                    lineNumber: 625,
                                    columnNumber: 227
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/program-of-study/page.tsx",
                            lineNumber: 625,
                            columnNumber: 142
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/program-of-study/page.tsx",
                    lineNumber: 625,
                    columnNumber: 71
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 625,
            columnNumber: 11
        }, this);
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] !== t6) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: [
                    t4,
                    t6,
                    t10
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/program-of-study/page.tsx",
                lineNumber: 632,
                columnNumber: 59
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/program-of-study/page.tsx",
            lineNumber: 632,
            columnNumber: 11
        }, this);
        $[15] = t6;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    return t11;
}
_s(ProgramOfStudyPage, "7gtTnI6nq2hqhriO2VZnV6p3ONY=");
_c1 = ProgramOfStudyPage;
function _ProgramOfStudyPageMOCK_AUDITMapRequirementSubRequirementsMapSubReqCoursesMap(course, idx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b last:border-b-0", course.status === "completed" && "bg-green-50 dark:bg-green-950/20", course.status === "in-progress" && "bg-yellow-50 dark:bg-yellow-950/20", course.status === "not-taken" && "bg-gray-50 dark:bg-gray-900/20"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-2 font-mono",
                children: course.code
            }, void 0, false, {
                fileName: "[project]/src/app/program-of-study/page.tsx",
                lineNumber: 641,
                columnNumber: 276
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-2",
                children: course.title
            }, void 0, false, {
                fileName: "[project]/src/app/program-of-study/page.tsx",
                lineNumber: 641,
                columnNumber: 325
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-2",
                children: course.units
            }, void 0, false, {
                fileName: "[project]/src/app/program-of-study/page.tsx",
                lineNumber: 641,
                columnNumber: 365
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-2",
                children: course.grade || "-"
            }, void 0, false, {
                fileName: "[project]/src/app/program-of-study/page.tsx",
                lineNumber: 641,
                columnNumber: 405
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-2",
                children: course.term || "Not scheduled"
            }, void 0, false, {
                fileName: "[project]/src/app/program-of-study/page.tsx",
                lineNumber: 641,
                columnNumber: 452
            }, this)
        ]
    }, idx, true, {
        fileName: "[project]/src/app/program-of-study/page.tsx",
        lineNumber: 641,
        columnNumber: 10
    }, this);
}
function _ProgramOfStudyPageMOCK_AUDITFlatMap(r_0) {
    return r_0.subRequirements.map(_ProgramOfStudyPageMOCK_AUDITFlatMapR_0SubRequirementsMap);
}
function _ProgramOfStudyPageMOCK_AUDITFlatMapR_0SubRequirementsMap(sr) {
    return sr.id;
}
function _ProgramOfStudyPageMOCK_AUDITMap(r) {
    return r.id;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "StatusIcon");
__turbopack_context__.k.register(_c1, "ProgramOfStudyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheckBig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleX
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
];
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-x", __iconNode);
;
 //# sourceMappingURL=circle-x.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ]
];
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("clock", __iconNode);
;
 //# sourceMappingURL=clock.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_eb9017c2._.js.map