"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Trash2, ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Flashcards() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState<{front: string, back: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [savedDeck, setSavedDeck] = useState(false);
  const [deckId, setDeckId] = useState<string | null>(null);

  useEffect(() => {
      const fetchDecks = async () => {
          try {
              const res = await fetch('/api/decks');
              const data = await res.json();
              if (res.ok && data.length > 0) {
                  setFlashcards(data[0].cards);
                  setTopic(data[0].topic);
                  setDeckId(data[0].id);
                  setSavedDeck(true);
              }
          } catch (error) {
              console.error("Failed to fetch decks:", error);
          } finally {
              setFetching(false);
          }
      };
      fetchDecks();
  }, []);

  const generateFlashcards = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      if (data.flashcards) {
        setFlashcards(data.flashcards);
        setCurrentIndex(0);
        setIsFlipped(false);
        setSavedDeck(false);
        setDeckId(null);
      } else {
        alert("Failed to parse flashcards");
      }
    } catch (e) {
      console.error(e);
      alert("Error generating flashcards");
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const handleSaveDeck = async () => {
      try {
          const res = await fetch('/api/decks', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic, flashcards })
          });
          const data = await res.json();
          if (res.ok) {
              setSavedDeck(true);
              setDeckId(data.id);
          }
      } catch (error) {
          console.error("Failed to save deck:", error);
      }
  };

  const handleDiscard = async () => {
      if (deckId) {
          try {
              await fetch(`/api/decks/${deckId}`, { method: 'DELETE' });
          } catch (error) {
              console.error("Failed to delete deck:", error);
          }
      }
      setFlashcards([]);
      setTopic('');
      setDeckId(null);
      setSavedDeck(false);
  };

  if (fetching) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
      );
  }

  return (
    <div className="p-8 h-full flex flex-col max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Flashcards</h1>

      {!flashcards.length ? (
        <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-2xl border p-8 flex flex-col items-center justify-center">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Generate Flashcards from any Topic</h2>
                <p className="text-slate-500">Enter a topic, concept, or paste a brief note, and our AI will generate targeted flashcards for you.</p>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && generateFlashcards()}
                        placeholder="E.g., Photosynthesis, Quick Sort Algorithm, French Revolution..."
                        className="w-full bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <button
                        onClick={generateFlashcards}
                        disabled={loading || !topic}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? 'Generating...' : 'Generate Flashcards'}
                    </button>
                </div>
            </div>
        </div>
      ) : (
          <div className="flex-1 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-slate-500">Card {currentIndex + 1} of {flashcards.length}</span>
                  <div className="flex gap-2">
                     <button onClick={handleDiscard} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-medium bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                         <Trash2 className="w-4 h-4" /> Discard
                     </button>
                     <button onClick={handleSaveDeck} disabled={savedDeck} className="text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 font-medium bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                         {savedDeck ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                         {savedDeck ? 'Saved' : 'Save Deck'}
                     </button>
                  </div>
              </div>

              <div className="relative w-full max-w-2xl aspect-[3/2] perspective-[1000px] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                  <motion.div
                      className="w-full h-full relative preserve-3d transition-transform duration-500"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                  >
                      {/* Front */}
                      <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 text-center">
                          <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded">Question</span>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                             {flashcards[currentIndex].front}
                          </h3>
                          <span className="absolute bottom-4 text-sm text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to flip</span>
                      </div>

                      {/* Back */}
                      <div className="absolute w-full h-full backface-hidden bg-indigo-50 dark:bg-slate-700 border-2 border-indigo-200 dark:border-slate-600 rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 text-center" style={{ transform: 'rotateY(180deg)' }}>
                           <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Answer</span>
                          <p className="text-xl text-slate-800 dark:text-slate-100 font-medium">
                             {flashcards[currentIndex].back}
                          </p>
                      </div>
                  </motion.div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                  <button onClick={prevCard} className="p-3 bg-white border rounded-full hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
                      <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextCard} className="p-3 bg-white border rounded-full hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
                      <ChevronRight className="w-6 h-6" />
                  </button>
              </div>
          </div>
      )}
    </div>
  );
}
