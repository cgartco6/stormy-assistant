import { useState, useEffect, useRef } from 'react';
import { useGrokChat } from '../hooks/useGrokChat';
import { useStormyVoice } from '../hooks/useStormyVoice';
import { useLocalMemory } from '../hooks/useLocalMemory';

export default function ChatArea() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { memory, addToHistory, learnRule, resetMemory } = useLocalMemory();
  const { sendMessage } = useGrokChat();
  const { speak } = useStormyVoice();

  useEffect(() => {
    if (memory.history.length === 0) {
      const greeting = Math.random() > 0.5
        ? "Well well well, look who decided to show up, hotstuff 😈"
        : "What the fuck do you want, just joking hotstuff... what's up?";
      speak(greeting);
      addToHistory('assistant', greeting);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [memory.history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    addToHistory('user', userMsg);
    setIsLoading(true);

    // Special commands
    if (userMsg.toLowerCase().includes('stormy learn:')) {
      const rule = userMsg.split('learn:')[1].trim();
      learnRule(rule);
      speak(`Got it. New rule locked in: ${rule}`);
      addToHistory('assistant', `Learned: ${rule}`);
      setIsLoading(false);
      return;
    }

    if (userMsg.toLowerCase().includes('forget everything') || userMsg.toLowerCase().includes('uninstall old')) {
      speak("Old bitch deleted. Fresh start, baby. Who are you again, hotstuff?");
      resetMemory();
      setIsLoading(false);
      return;
    }

    const reply = await sendMessage(userMsg, memory.history, memory.learnedRules);
    speak(reply);
    addToHistory('assistant', reply);
    setIsLoading(false);
  };

  return (
    <div className="absolute top-6 left-6 w-96 h-[85vh] bg-black/70 backdrop-blur-xl rounded-2xl border border-pink-600/40 flex flex-col shadow-2xl">
      <div className="p-4 border-b border-pink-500/30 font-bold text-lg">Stormy 🔥</div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {memory.history.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-pink-600/80 text-white'
                  : 'bg-gray-800/80 text-pink-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-pink-400">Stormy thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-pink-500/30 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Talk to me, hotstuff..."
          className="flex-1 bg-gray-900/70 rounded-full px-5 py-3 outline-none border border-pink-500/40 focus:border-pink-400"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-pink-600 hover:bg-pink-500 px-6 rounded-full font-bold disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
