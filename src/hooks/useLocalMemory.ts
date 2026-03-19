import { useState, useEffect } from 'react';

const MEMORY_KEY = 'stormy_memory';
const MAX_HISTORY = 30;

type Memory = {
  history: { role: 'user' | 'assistant'; content: string }[];
  learnedRules: string[];
};

export function useLocalMemory() {
  const [memory, setMemory] = useState<Memory>(() => {
    const saved = localStorage.getItem(MEMORY_KEY);
    return saved ? JSON.parse(saved) : { history: [], learnedRules: [] };
  });

  useEffect(() => {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
  }, [memory]);

  const addToHistory = (role: 'user' | 'assistant', content: string) => {
    setMemory(prev => ({
      ...prev,
      history: [...prev.history, { role, content }].slice(-MAX_HISTORY)
    }));
  };

  const learnRule = (rule: string) => {
    setMemory(prev => ({
      ...prev,
      learnedRules: [...prev.learnedRules, rule]
    }));
  };

  const resetMemory = () => {
    localStorage.removeItem(MEMORY_KEY);
    setMemory({ history: [], learnedRules: [] });
  };

  return { memory, addToHistory, learnRule, resetMemory };
}
