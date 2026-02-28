"use client";

import React, { useState } from 'react';
import { AlignLeft, Loader2, Copy } from 'lucide-react';

export default function Summarizer() {
  const [text, setText] = useState('');
  const [type, setType] = useState('bullet points');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type })
      });
      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (e) {
      console.error(e);
      alert("Error summarizing text");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-8 h-full flex flex-col max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Summarizer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 flex flex-col gap-6 shadow-sm overflow-y-auto">
          <div className="flex items-center gap-3 text-amber-600 font-semibold text-lg pb-4 border-b">
            <AlignLeft className="w-5 h-5" />
            Original Text
          </div>

          <div className="space-y-4 flex-1 flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
              Paste long articles, research papers, or notes here.
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full flex-1 resize-none border rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50 dark:bg-slate-800"
            />

            <div className="flex gap-4">
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-1/3 bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
              >
                <option value="bullet points">Bullet Points</option>
                <option value="short paragraph">Short Paragraph</option>
                <option value="detailed executive summary">Detailed Summary</option>
              </select>

              <button
                onClick={generateSummary}
                disabled={loading || !text}
                className="w-2/3 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Summarize Text'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 border rounded-2xl p-6 flex flex-col shadow-inner overflow-hidden">
           <div className="flex items-center justify-between pb-4 border-b mb-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-semibold text-lg">
                <SparklesIcon className="w-5 h-5" />
                AI Summary
            </div>
            {summary && (
              <button onClick={copyToClipboard} className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200 transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto prose prose-slate dark:prose-invert max-w-none pr-4">
            {summary ? (
               <div className="whitespace-pre-wrap text-sm leading-relaxed">{summary}</div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
                  <AlignLeft className="w-16 h-16" />
                  <p>Your AI-generated summary will appear here.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
        </svg>
    );
}
