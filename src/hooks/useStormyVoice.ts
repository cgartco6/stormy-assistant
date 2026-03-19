export const useStormyVoice = () => {
  const speak = (text: string, rate = 1.5, pitch = 1.2) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.lang.includes('en')) || voices[0];
    utterance.voice = femaleVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };
  return { speak };
};
