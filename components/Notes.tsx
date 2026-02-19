"use client";

import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function Notes() {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full bg-white p-6 text-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">New Study Note</h3>
        <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          <Save className="w-4 h-4" /> Save Note
        </button>
      </div>
      <textarea 
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Start typing your research or lecture notes..."
        className="flex-1 w-full resize-none border rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
      />
      <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center gap-3">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
        <p className="text-xs text-indigo-700 font-medium">Nexus AI is ready to index your notes for semantic search.</p>
      </div>
    </div>
  );
}
