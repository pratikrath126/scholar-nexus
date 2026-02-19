"use client";

import React from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Settings, 
  BrainCircuit,
  PlusCircle,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BookOpen, label: 'Knowledge Base', active: false },
  { icon: FileText, label: 'Flashcards', active: false },
  { icon: BrainCircuit, label: 'AI Tutor', active: false },
  { icon: Calendar, label: 'Study Planner', active: false },
];

export function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-slate-50/50 flex flex-col p-4 dark:bg-slate-900/50">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <BookOpen className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">ScholarNexus</span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Quick search..." 
          className="w-full pl-9 pr-4 py-2 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800"
        />
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              item.active 
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400" 
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors mb-1">
          <PlusCircle className="w-4 h-4" />
          New Project
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  );
}
