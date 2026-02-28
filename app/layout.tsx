import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScholarNexus",
  description: "AI-driven Productivity & Knowledge OS for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans flex h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white dark:bg-slate-950">
          {children}
        </main>
      </body>
    </html>
  );
}
