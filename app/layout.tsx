import type { Metadata } from "next";
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
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
