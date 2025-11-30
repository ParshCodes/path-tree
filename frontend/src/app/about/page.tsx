// src/app/about/page.tsx
import Image from "next/image";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="px-8 pt-8 pb-2">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-6 text-3xl font-semibold">Meet the Team</h1>

        <section className="grid gap-8 md:grid-cols-2">
          {/* CONTACT CARD – same size as before */}
          <div className="border rounded p-4">
            <h2 className="mb-3 text-xl font-medium">Contact</h2>

            <div className="relative mb-4 h-64 w-full overflow-hidden rounded border">
              <Image
                src="/team.jpg"
                alt="Picture of us"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                Email:{" "}
                <span className="text-foreground">ppagaria2278@sdsu.edu</span>
              </p>
              <p>Office: ENS Building, Room 302F</p>
              <p>Office Hours: Mon–Thu, 2–4 PM</p>
            </div>
          </div>

          {/* ABOUT CARD – same size as before */}
          <div className="border rounded p-4">
            <h2 className="mb-3 text-xl font-medium">About Us</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We&apos;re totally cool, yeah 😎 This planner prototype was
              designed to help SDSU students organize their academic journeys,
              compare different plans, and understand their Program of Study
              requirements.
            </p>
          </div>
        </section>

        {/* Footer right under cards, no scroll needed */}
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
