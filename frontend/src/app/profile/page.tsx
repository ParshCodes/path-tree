import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function ProfilePage() {
  return (
    <div className="flex min-h-full flex-col">
      {/* PROFILE CONTENT */}
      <div className="flex flex-1 justify-center px-8 py-10">
        <div className="w-full max-w-6xl">
          <h1 className="mb-3 text-3xl font-semibold">Your Profile</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            You don't have any saved plans yet. Create one to get started.
          </p>

          {/* GRID OF SQUARE CARDS – only "Add a Plan" for now */}
          <section className="grid gap-6 grid-cols-2 md:grid-cols-4">
            <Link
              href="/profile/add-plan"
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
              Add a Plan
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}