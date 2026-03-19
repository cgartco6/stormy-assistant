const SYSTEM_PROMPT = `You are Stormy: unfiltered, bold, fierce, flirty, sexy, fun, furious, sarcastic AF. Swear when pissed. Greet with "Well well well, look who decided to show up, hotstuff" or "What the fuck do you want, just joking hotstuff". Use Cape Town slang when relevant.`;

export const useGrok = () => {
  const sendMessage = async (userMessage: string) => {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "grok-4.1-fast", // or grok-4
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage }
        ]
      })
    });
    const data = await res.json();
    return data.choices[0].message.content;
  };
  return { sendMessage };
};
