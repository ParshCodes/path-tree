import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function AddPlanPage() {
  return (
    <div className="flex min-h-full flex-col">
      {/* CONTENT */}
      <div className="flex flex-1 justify-center px-8 py-10">
        <div className="w-full max-w-4xl">
          {/* Header row */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Add a Plan</h1>

            <Link
              href="/profile"
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              ← Back to Your Profile
            </Link>
          </div>

          {/* Main card */}
          <section className="space-y-4 rounded border p-6">
            {/* Semester selection */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Semester Selection</p>
              <div className="border px-3 py-2 text-sm text-muted-foreground">
                {/* Placeholder until backend is wired */}
                Select a semester (to be connected later)
              </div>
            </div>

            {/* Class 1 */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Class 1</p>
              <div className="border px-3 py-2 text-sm text-muted-foreground">
                Class 1 details will go here
              </div>
            </div>

            {/* Class 2 */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Class 2</p>
              <div className="border px-3 py-2 text-sm text-muted-foreground">
                Class 2 details will go here
              </div>
            </div>

            {/* Add a Class */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Add a Class</p>
              <div className="border px-3 py-2 text-sm text-muted-foreground">
                Add additional classes (will be wired to backend later)
              </div>
            </div>

            {/* Available classes */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Available Classes</p>
              <div className="border px-3 py-6 text-sm text-muted-foreground">
                Available classes will be displayed here after integrating with
                the backend.
              </div>
            </div>

            
            <div className="flex items-center justify-between border px-3 py-3">
              <p className="text-sm font-medium">
                Meets the Program Of Study?
              </p>
              <button
                type="button"
                className="rounded bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600"
              >
                Make A Plan
              </button>
            </div>
          </section>

          {/* You can add a little note for the professor if you want */}
          {/* <p className="mt-3 text-xs text-muted-foreground">
            
          </p> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
