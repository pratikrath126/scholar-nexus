"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Cpu, Loader2 } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'ai', text: 'Hello! I am your ScholarNexus AI Tutor. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.answer || data.error }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I hit a snag.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-inner overflow-hidden border">
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} gap-4`}>
            {m.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                </div>
            )}

            <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-slate-50 border text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 rounded-bl-sm whitespace-pre-wrap'
            }`}>
              {m.text}
            </div>

            {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-slate-500" />
                </div>
            )}
          </div>
        ))}
        {loading && (
            <div className="flex justify-start gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-slate-50 border rounded-bl-sm flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                </div>
            </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t flex gap-3">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..." 
          disabled={loading}
          className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-shadow disabled:opacity-50"
        />
        <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-sm transition-colors flex items-center justify-center min-w-[3rem]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
