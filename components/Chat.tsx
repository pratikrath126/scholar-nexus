"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'ai', text: 'Hello! I am your ScholarNexus AI Tutor. How can I help you today?' }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.answer || data.error }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I hit a snag.' }]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-900">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-800 shadow-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t flex gap-2">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..." 
          className="flex-1 bg-gray-100 border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button onClick={handleSend} className="bg-indigo-600 text-white p-2 rounded-lg">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
