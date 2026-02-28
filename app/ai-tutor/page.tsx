import Chat from "@/components/Chat";

export default function AITutor() {
  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">AI Tutor</h1>
      <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-2xl border p-4">
        <Chat />
      </div>
    </div>
  );
}
