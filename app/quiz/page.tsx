"use client";

import React, { useState } from 'react';
import { PenTool, CheckCircle, XCircle } from 'lucide-react';

export default function Quiz() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, numQuestions })
      });
      const data = await res.json();
      if (data.quiz) {
        setQuiz(data.quiz);
        setUserAnswers({});
        setShowResults(false);
      }
    } catch (e) {
      console.error(e);
      alert("Error generating quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index: number, option: string) => {
    setUserAnswers(prev => ({ ...prev, [index]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="p-8 h-full flex flex-col max-w-5xl mx-auto overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">AI Quiz Generator</h1>

      {!quiz.length ? (
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900/50 rounded-2xl border p-8 flex flex-col items-center justify-center shadow-inner">
            <div className="max-w-md w-full space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <PenTool className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">Test Your Knowledge</h2>
                <p className="text-slate-500 text-center">Generate multiple-choice quizzes on any topic to evaluate your understanding.</p>

                <div className="space-y-4 pt-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="E.g., World War II, Calculus Limits, React Hooks..."
                        className="w-full bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
                    />

                    <div className="flex gap-4">
                        <select
                            value={difficulty}
                            onChange={e => setDifficulty(e.target.value)}
                            className="flex-1 bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>

                        <select
                            value={numQuestions}
                            onChange={e => setNumQuestions(Number(e.target.value))}
                            className="flex-1 bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
                        >
                            <option value={3}>3 Questions</option>
                            <option value={5}>5 Questions</option>
                            <option value={10}>10 Questions</option>
                        </select>
                    </div>

                    <button
                        onClick={generateQuiz}
                        disabled={loading || !topic}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 rounded-xl transition-colors shadow-sm"
                    >
                        {loading ? 'Generating...' : 'Start Quiz'}
                    </button>
                </div>
            </div>
        </div>
      ) : (
          <div className="flex-1 flex flex-col items-center overflow-y-auto pr-4 pb-8 space-y-8 w-full">
              <div className="w-full flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm sticky top-0 z-10">
                 <h2 className="text-lg font-bold text-slate-800">Quiz: <span className="text-emerald-600">{topic}</span></h2>
                 {!showResults && (
                     <button
                        onClick={() => setShowResults(true)}
                        disabled={Object.keys(userAnswers).length < quiz.length}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                     >
                        Submit Quiz
                     </button>
                 )}
                 {showResults && (
                     <div className="flex items-center gap-4">
                         <span className="font-bold text-lg">Score: {calculateScore()}/{quiz.length}</span>
                         <button onClick={() => setQuiz([])} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors">
                            New Quiz
                         </button>
                     </div>
                 )}
              </div>

              {quiz.map((q, index) => (
                  <div key={index} className="w-full max-w-3xl bg-white dark:bg-slate-800 border rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">{index + 1}. {q.question}</h3>
                      <div className="space-y-3">
                          {q.options.map((option: string, i: number) => {
                              const isSelected = userAnswers[index] === option;
                              const isCorrect = showResults && option === q.correctAnswer;
                              const isWrong = showResults && isSelected && option !== q.correctAnswer;

                              let bgClass = "bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-700 dark:border-slate-600";
                              if (isSelected && !showResults) bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
                              if (isCorrect) bgClass = "bg-emerald-100 border-emerald-500 text-emerald-800 font-medium";
                              if (isWrong) bgClass = "bg-red-50 border-red-500 text-red-700";

                              return (
                                  <button
                                      key={i}
                                      onClick={() => !showResults && handleAnswerSelect(index, option)}
                                      disabled={showResults}
                                      className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between ${bgClass}`}
                                  >
                                      <span>{option}</span>
                                      {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                                      {isWrong && <XCircle className="w-5 h-5 text-red-600" />}
                                  </button>
                              );
                          })}
                      </div>

                      {showResults && (
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-sm">
                              <span className="font-bold block mb-1">Explanation:</span>
                              {q.explanation}
                          </div>
                      )}
                  </div>
              ))}
          </div>
      )}
    </div>
  );
}
