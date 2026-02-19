'use client';

import { useState } from 'react';
import { Sidebar } from "@/components/sidebar";
import { Dashboard } from "@/components/dashboard";
import Chat from "@/components/Chat";
import Notes from "@/components/Notes";

export default function Home() {
  const [view, setView] = useState('dashboard');

  return (
    <main className="flex h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar currentView={view} setView={setView} />
      <div className="flex-1 overflow-auto bg-white dark:bg-slate-950">
        {view === 'dashboard' && <Dashboard setView={setView} />}
        {view === 'ai-tutor' && (
          <div className="p-8 h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-6">AI Tutor</h1>
            <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-2xl border p-4">
              <Chat />
            </div>
          </div>
        )}
        {view === 'knowledge-base' && (
          <div className="p-8 h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>
            <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-2xl border p-4">
              <Notes />
            </div>
          </div>
        )}
        {['flashcards', 'planner'].includes(view) && (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p className="text-xl">Feature coming soon: {view.replace('-', ' ')}</p>
          </div>
        )}
      </div>
    </main>
  );
}
