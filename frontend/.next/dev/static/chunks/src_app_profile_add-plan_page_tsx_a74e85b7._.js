(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/profile/add-plan/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddPlanPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AddPlanPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "9045829ea83e3e4642951660670954e7e03c7d03b1c758b14a558f281bf44782") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9045829ea83e3e4642951660670954e7e03c7d03b1c758b14a558f281bf44782";
    }
    const [programId, setProgramId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [catalogYear, setCatalogYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t0;
    if ($[1] !== catalogYear || $[2] !== name || $[3] !== programId) {
        t0 = function onSubmit(e) {
            e.preventDefault();
            alert("(stub) would create plan:\n" + JSON.stringify({
                program_id: programId,
                catalog_year: catalogYear,
                name
            }, null, 2));
        };
        $[1] = catalogYear;
        $[2] = name;
        $[3] = programId;
        $[4] = t0;
    } else {
        t0 = $[4];
    }
    const onSubmit = t0;
    let t1;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            display: "block",
            fontSize: 14,
            marginBottom: 6,
            color: "#333"
        };
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    const label = t1;
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            width: "100%",
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            padding: "10px 12px"
        };
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const input = t2;
    let t3;
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            maxWidth: 560
        };
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            style: {
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: 16
            },
            children: "Create a New Plan"
        }, void 0, false, {
            fileName: "[project]/src/app/profile/add-plan/page.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t4;
    } else {
        t3 = $[7];
        t4 = $[8];
    }
    let t5;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: 16,
            background: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
        };
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "AddPlanPage[<input>.onChange]": (e_0)=>setProgramId(e_0.target.value)
        })["AddPlanPage[<input>.onChange]"];
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== programId) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            style: label,
            children: [
                "Program",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    placeholder: "e.g., CE-BS",
                    value: programId,
                    onChange: t6,
                    style: input
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/add-plan/page.tsx",
                    lineNumber: 101,
                    columnNumber: 38
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/add-plan/page.tsx",
            lineNumber: 101,
            columnNumber: 10
        }, this);
        $[11] = programId;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "AddPlanPage[<input>.onChange]": (e_1)=>setCatalogYear(e_1.target.value)
        })["AddPlanPage[<input>.onChange]"];
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== catalogYear) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            style: label,
            children: [
                "Catalog Year",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    placeholder: "e.g., 2025-2026",
                    value: catalogYear,
                    onChange: t8,
                    style: input
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/add-plan/page.tsx",
                    lineNumber: 118,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/add-plan/page.tsx",
            lineNumber: 118,
            columnNumber: 10
        }, this);
        $[14] = catalogYear;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "AddPlanPage[<input>.onChange]": (e_2)=>setName(e_2.target.value)
        })["AddPlanPage[<input>.onChange]"];
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== name) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            style: label,
            children: [
                "Plan Name (optional)",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    placeholder: "My Plan",
                    value: name,
                    onChange: t10,
                    style: input
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/add-plan/page.tsx",
                    lineNumber: 135,
                    columnNumber: 52
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/add-plan/page.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        $[17] = name;
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            style: {
                marginTop: 12,
                width: "100%",
                borderRadius: 8,
                padding: "10px 12px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                cursor: "pointer"
            },
            children: "Create Plan"
        }, void 0, false, {
            fileName: "[project]/src/app/profile/add-plan/page.tsx",
            lineNumber: 143,
            columnNumber: 11
        }, this);
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] !== onSubmit || $[21] !== t11 || $[22] !== t7 || $[23] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            style: t3,
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: onSubmit,
                    style: t5,
                    children: [
                        t7,
                        t9,
                        t11,
                        t12
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/profile/add-plan/page.tsx",
                    lineNumber: 159,
                    columnNumber: 35
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/profile/add-plan/page.tsx",
            lineNumber: 159,
            columnNumber: 11
        }, this);
        $[20] = onSubmit;
        $[21] = t11;
        $[22] = t7;
        $[23] = t9;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    return t13;
}
_s(AddPlanPage, "qz+nPICN7GJBLG/ke/pAUpbEVNo=");
_c = AddPlanPage;
var _c;
__turbopack_context__.k.register(_c, "AddPlanPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_profile_add-plan_page_tsx_a74e85b7._.js.map