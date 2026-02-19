import { Sidebar } from "@/components/sidebar";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <main className="flex h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar />
      <Dashboard />
    </main>
  );
}
