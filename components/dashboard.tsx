"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { 
  FileText,
  Layers,
  Bookmark,
  Zap,
  PenTool,
  AlignLeft,
  Calendar,
  Loader2, ArrowRight
} from 'lucide-react';

export function Dashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Scholar';

  const [stats, setStats] = useState({
      notesCount: 0,
      decksCount: 0,
      flashcardsCount: 0,
      plansCount: 0,
      recentProjects: [] as {id: string, title: string, updatedAt: string}[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchStats = async () => {
          try {
              const res = await fetch('/api/stats');
              if (res.ok) {
                  const data = await res.json();
                  setStats(data);
              }
          } catch (e) {
              console.error("Failed to fetch stats");
          } finally {
              setLoading(false);
          }
      };
      fetchStats();
  }, []);

  const statCards = [
    { label: 'Study Notes', value: stats.notesCount.toString(), icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Flashcard Decks', value: stats.decksCount.toString(), icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Cards', value: stats.flashcardsCount.toString(), icon: Bookmark, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Study Plans', value: stats.plansCount.toString(), icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 p-6 lg:p-10 overflow-y-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Here's your academic overview and AI tools for today.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Link
              href="/ai-tutor"
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200 dark:shadow-none hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4" />
              Start Study Session
            </Link>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loading ? (
           Array.from({length: 4}).map((_, i) => (
             <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 h-32 flex items-center justify-center">
                 <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
             </div>
           ))
        ) : statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute -right-4 -top-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
              <stat.icon className="w-24 h-24" />
            </div>

            <div className="relative z-10">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <div className="flex items-end gap-3 mt-2">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Split Content */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Column: Current Projects */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Notes</h3>
            <Link href="/knowledge-base" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-[250px]">
            {loading ? (
               <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
               </div>
            ) : stats.recentProjects.length === 0 ? (
               <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
                  <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                  <p className="text-slate-500 dark:text-slate-400">No notes found.</p>
                  <Link href="/knowledge-base" className="text-sm font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">Create your first note</Link>
               </div>
            ) : (
              stats.recentProjects.map((project, index) => (
                <Link key={project.id} href="/knowledge-base" className="block p-5 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0
                        ${index % 3 === 0 ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' :
                          index % 3 === 1 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                          'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'}`
                    }>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">{project.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        Last updated {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Nexus AI Tools */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nexus AI Tools</h3>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group h-full flex flex-col min-h-[280px]">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-600 rounded-full blur-3xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-purple-600 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-lg tracking-wide">AI Assistant</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Ready to accelerate your learning? Generate study materials instantly.
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/ai-tutor" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all group/btn">
                  <div className="bg-indigo-600/80 h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Ask Tutor</p>
                    <p className="text-xs text-slate-400 mt-0.5">Get instant answers</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-slate-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </Link>

                <Link href="/quiz" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all group/btn">
                  <div className="bg-emerald-600/80 h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                    <PenTool className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Generate Quiz</p>
                    <p className="text-xs text-slate-400 mt-0.5">Test your knowledge</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-slate-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </Link>

                <Link href="/summarizer" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all group/btn">
                  <div className="bg-amber-600/80 h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                    <AlignLeft className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Summarize</p>
                    <p className="text-xs text-slate-400 mt-0.5">Condense complex docs</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-slate-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
