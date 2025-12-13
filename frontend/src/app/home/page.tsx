"use client"; // required for client-side navigation in Next.js App Router

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌳 Path‑Tree</h1>
        <p>Plan your classes. Visualize your path. Graduate with confidence.</p>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <h2>Welcome to Course Planner</h2>
          <p>
            Course Planner helps you choose your courses and see the graduation paths available to you.
          </p>
          <button style={styles.cta} onClick={() => router.push("/signup")}>
            Start Planning
          </button>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Path‑Tree</p>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "900px", margin: "0 auto" },
  header: { textAlign: "center", marginBottom: "30px" },
  main: { lineHeight: "1.6" },
  hero: { textAlign: "center", marginBottom: "40px" },
  cta: {
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footer: { textAlign: "center", marginTop: "40px", fontSize: "0.9em", color: "#555" },
};
