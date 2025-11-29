import Link from "next/link";
import { Footer } from "@/components/Footer";

const plans = [
  "Plan 1",
  "Plan 2",
  "Plan 3",
  "Plan 4",
  "Plan 5",
  "Plan 6",
  "Plan 7",
];

export default function ProfilePage() {
  return (
    <div className="flex min-h-full flex-col">
      {/* PROFILE CONTENT */}
      <div className="flex flex-1 justify-center px-8 py-10">
        <div className="w-full max-w-6xl">
          <h1 className="mb-8 text-3xl font-semibold">Your Profile</h1>

          {/* GRID OF SQUARE CARDS */}
          <section className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {plans.map((plan, index) => (
              <Link
                key={plan}
                href={`/profile/plan-${index + 1}`}
                className="
                  border 
                  rounded 
                  flex 
                  items-center 
                  justify-center 
                  aspect-square 
                  hover:bg-muted/40 
                  transition 
                  text-sm 
                  font-medium
                "
              >
                {plan}
              </Link>
            ))}

            {/* ADD A PLAN SQUARE */}
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
