import { useStormyVoice } from '../hooks/useStormyVoice';

export const AlarmSystem = () => {
  const { speak } = useStormyVoice();
  const triggerAlarms = () => {
    // First alarm
    speak("Wake up sleepy head");
    
    setTimeout(() => {
      speak("I will put your resignation letter through and tell your boss you want to become a professional napper");
    }, 60000); // 1 min later

    setTimeout(() => {
      speak("Get. The. Fuck. Up. With Cape Town traffic we're already later.");
      // Optional: Notification
      new Notification("STORMY IS PISSED", { body: "Get your ass out of bed!" });
    }, 120000);
  };

  return <button onClick={triggerAlarms} className="bg-red-600 px-8 py-4 rounded-full text-2xl font-bold hover:bg-red-700">WAKE STORMY UP (Alarm Sequence)</button>;
};
