"use client";

import React, { useState, useEffect } from 'react';
import { Save, FileText, Loader2, Check } from 'lucide-react';

export default function Notes() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('New Study Note');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
      const savedNotes = localStorage.getItem('scholar_notes');
      if (savedNotes) {
          const notes = JSON.parse(savedNotes);
          if (notes.length > 0) {
              setTitle(notes[0].title);
              setContent(notes[0].content);
          }
      }
  }, []);

  const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
          const newNote = { id: Date.now(), title, content, date: new Date().toISOString() };
          localStorage.setItem('scholar_notes', JSON.stringify([newNote]));
          setSaving(false);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
      }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-800 relative">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div className="flex items-center gap-3 w-1/2">
             <div className="p-2 bg-indigo-50 dark:bg-slate-800 rounded-lg shrink-0">
                 <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
             </div>
             <input
                 value={title}
                 onChange={e => setTitle(e.target.value)}
                 className="text-xl font-bold bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-800 dark:text-slate-100 placeholder-slate-400 w-full"
                 placeholder="Enter note title..."
             />
        </div>

        <button
            onClick={handleSave}
            disabled={saving || !content.trim()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm
                ${saved
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white border border-transparent'
                }
            `}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Note'}
        </button>
      </div>

      <textarea 
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Start typing your research, lecture notes, or ideas here..."
        className="flex-1 w-full resize-none bg-transparent border-none p-0 focus:ring-0 outline-none text-slate-700 dark:text-slate-300 leading-relaxed text-base h-full"
      />

      <div className="absolute bottom-8 left-8 right-8 mt-4 p-4 bg-indigo-50/80 dark:bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-100 dark:border-indigo-800/30 flex items-center gap-4 shadow-sm">
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
        <div>
            <p className="text-sm text-indigo-800 dark:text-indigo-300 font-medium">Nexus AI is active.</p>
            <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Your notes are automatically being indexed for semantic search.</p>
        </div>
      </div>
    </div>
  );
}
