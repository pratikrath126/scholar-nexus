"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ClipboardList, Loader2, Save, Trash2, Check } from 'lucide-react';

export default function Planner() {
  const [goals, setGoals] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
      const fetchPlan = async () => {
          try {
              const res = await fetch('/api/plans');
              const data = await res.json();
              if (res.ok && data.length > 0) {
                  setPlan(data[0].content);
                  setGoals(data[0].goals);
              }
          } catch (error) {
              console.error("Failed to fetch plan:", error);
          } finally {
              setFetching(false);
          }
      };
      fetchPlan();
  }, []);

  const generatePlan = async () => {
    if (!goals.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goals })
      });
      const data = await res.json();
      if (data.plan) {
        setPlan(data.plan);
        await handleSave(data.plan, goals);
      }
    } catch (e) {
      console.error(e);
      alert("Error generating study plan");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
      try {
          await fetch('/api/plans', { method: 'DELETE' });
          setPlan('');
          setGoals('');
      } catch (error) {
          console.error("Failed to delete plan:", error);
      }
  }

  const handleSave = async (planContent = plan, planGoals = goals) => {
      try {
          const res = await fetch('/api/plans', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: planContent, goals: planGoals })
          });
          if (res.ok) {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
          }
      } catch (error) {
          console.error("Failed to save plan:", error);
      }
  }

  if (fetching) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
      );
  }

  return (
    <div className="p-8 h-full flex flex-col max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Study Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border rounded-2xl p-6 flex flex-col gap-6 shadow-sm overflow-y-auto">
          <div className="flex items-center gap-3 text-indigo-600 font-semibold text-lg pb-4 border-b">
            <Calendar className="w-5 h-5" />
            Plan Generation
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
              What are your study goals and timeline?
            </label>
            <textarea
              value={goals}
              onChange={e => setGoals(e.target.value)}
              placeholder="E.g., I have a Data Structures exam in 2 weeks. I need to review Trees, Graphs, and Sorting algorithms."
              className="w-full h-40 resize-none border rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 dark:bg-slate-800"
            />
            <button
              onClick={generatePlan}
              disabled={loading || !goals}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Plan'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl p-6 flex flex-col shadow-inner overflow-hidden">
           <div className="flex items-center justify-between pb-4 border-b mb-4">
               <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-semibold text-lg">
                <ClipboardList className="w-5 h-5" />
                Your AI Study Plan
              </div>

              {plan && (
                  <div className="flex gap-2">
                       <button onClick={handleClear} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-medium bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-red-100">
                           <Trash2 className="w-4 h-4" /> Clear
                       </button>
                       <button onClick={() => handleSave()} className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-medium bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors border border-indigo-100">
                           {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                           {saved ? 'Saved' : 'Save Plan'}
                       </button>
                  </div>
              )}
          </div>

          <div className="flex-1 overflow-y-auto prose prose-slate dark:prose-invert max-w-none pr-4">
            {plan ? (
               <div className="whitespace-pre-wrap text-sm leading-relaxed">{plan}</div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
                  <Calendar className="w-16 h-16" />
                  <p>Describe your goals to generate a personalized study schedule.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
