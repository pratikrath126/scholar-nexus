"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  BookMarked,
  Sparkles
} from 'lucide-react';

const stats = [
  { label: 'Study Hours', value: '42.5', icon: Clock, trend: '+12%' },
  { label: 'Topics Mastered', value: '18', icon: CheckCircle2, trend: '+3' },
  { label: 'Flashcards', value: '124', icon: BookMarked, trend: '+24' },
  { label: 'Brain Power', value: '84%', icon: TrendingUp, trend: '+5%' },
];

export function Dashboard() {
  return (
    <div className="flex-1 overflow-auto p-8">
      <header className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Scholar</h1>
            <p className="text-slate-500 mt-1">Here's your academic overview for today.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none">
            <Sparkles className="w-4 h-4" />
            AI Study Session
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="p-6 bg-white border rounded-xl dark:bg-slate-800/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-900/20 dark:text-indigo-400">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full dark:bg-emerald-900/20 dark:text-emerald-400">
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl overflow-hidden dark:bg-slate-800/50">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="font-bold text-slate-900 dark:text-white">Current Projects</h2>
              <button className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:underline">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="p-0">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b last:border-0">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center dark:bg-slate-700">
                    <BookMarked className="text-slate-400 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Advanced ML Architecture</h3>
                    <p className="text-xs text-slate-500">Last updated 2 hours ago</p>
                  </div>
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item * 30}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bold text-lg mb-2">Nexus AI</h2>
              <p className="text-slate-400 text-sm mb-6">Ask me anything about your current study material or let me generate a quiz.</p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Analyze chapter 4..." 
                  className="w-full bg-slate-800 border-none rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-indigo-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-indigo-600 rounded-md">
                  <ArrowRight className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
