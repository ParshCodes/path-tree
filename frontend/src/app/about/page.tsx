// src/app/about/page.tsx
import Image from "next/image";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="px-8 pt-8 pb-2">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-semibold">About</h1>

        <div className="border rounded p-6 space-y-3">
          <h2 className="text-xl font-medium">Welcome</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This planner helps SDSU students organize their academic journey and understand
            their Program of Study requirements.
          </p>
        </div>

        <div className="border rounded p-6 space-y-3">
          <h2 className="text-xl font-medium">Contact</h2>

          <div className="relative h-64 w-full overflow-hidden rounded border mb-4">
            <Image
              src="/team-updated.jpg"
              alt="Picture of us"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Email: <span className="text-foreground">ppagaria2278@sdsu.edu</span></p>
            <p>Office: ENS Building, Room 302F</p>
            <p>Office Hours: Mon–Thu, 2–4 PM</p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
