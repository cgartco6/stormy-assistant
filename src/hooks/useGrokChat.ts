import axios from 'axios';
import { SYSTEM_PROMPT } from '../utils/constants';

export function useGrokChat() {
  const sendMessage = async (
    userMessage: string,
    history: { role: string; content: string }[],
    learnedRules: string[]
  ) => {
    const memoryContext = learnedRules.length > 0 
      ? `Learned rules you must always follow:\n${learnedRules.join('\n')}\n\n`
      : '';

    try {
      const res = await axios.post(
        'https://api.x.ai/v1/chat/completions',
        {
          model: 'grok-beta', // or latest fast model available in 2026
          messages: [
            { role: 'system', content: SYSTEM_PROMPT + '\n' + memoryContext },
            ...history.slice(-10), // last 10 to save tokens
            { role: 'user', content: userMessage }
          ],
          temperature: 0.9,
          max_tokens: 350
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return res.data.choices[0].message.content.trim();
    } catch (err) {
      console.error(err);
      return "Fuck... something broke on my end. Try again, hotstuff.";
    }
  };

  return { sendMessage };
}
