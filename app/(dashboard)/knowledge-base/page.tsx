import Notes from "@/components/Notes";

export default function KnowledgeBase() {
  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>
      <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-2xl border p-4">
        <Notes />
      </div>
    </div>
  );
}
