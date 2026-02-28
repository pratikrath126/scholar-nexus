"use client";

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Bookmark,
  Zap,
  PenTool,
  AlignLeft
} from 'lucide-react';

const stats = [
  { label: 'Study Hours', value: '42.5', icon: Clock, trend: '+12%' },
  { label: 'Topics Mastered', value: '18', icon: CheckCircle2, trend: '+3' },
  { label: 'Flashcards', value: '124', icon: Bookmark, trend: '+24' },
  { label: 'Brain Power', value: '84%', icon: TrendingUp, trend: '+5%' },
];

export function Dashboard() {
  return (
    <div className="flex-1 overflow-auto p-8 text-slate-900 bg-white">
      <header className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, Scholar</h1>
            <p className="text-slate-500 mt-1">Here&apos;s your academic overview for today.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/ai-tutor"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Zap className="w-4 h-4" />
              AI Study Session
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-slate-50 border rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Current Projects</h2>
              <Link href="/knowledge-base" className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:underline">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-0">
              {[1, 2, 3].map((item) => (
                <Link key={item} href="/knowledge-base" className="block p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b last:border-0 cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Bookmark className="text-slate-400 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm">Advanced ML Architecture</h3>
                    <p className="text-xs text-slate-500">Last updated {item * 2} hours ago</p>
                  </div>
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${100 - item * 20}%` }}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[250px]">
            <div className="relative z-10 flex-1">
              <h2 className="font-bold text-lg mb-2">Nexus AI Tools</h2>
              <p className="text-slate-400 text-sm mb-6">Explore our suite of AI-powered study tools.</p>

              <div className="space-y-3">
                 <Link href="/ai-tutor" className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors cursor-pointer group">
                   <div className="flex items-center gap-3">
                     <Zap className="w-4 h-4 text-indigo-400" />
                     <span className="text-sm font-medium">Ask Tutor</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                 </Link>

                 <Link href="/quiz" className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors cursor-pointer group">
                   <div className="flex items-center gap-3">
                     <PenTool className="w-4 h-4 text-emerald-400" />
                     <span className="text-sm font-medium">Generate Quiz</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                 </Link>

                 <Link href="/summarizer" className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors cursor-pointer group">
                   <div className="flex items-center gap-3">
                     <AlignLeft className="w-4 h-4 text-amber-400" />
                     <span className="text-sm font-medium">Summarize Text</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                 </Link>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
