import { useStormyVoice } from '../hooks/useStormyVoice';

export default function AlarmButton() {
  const { speak } = useStormyVoice();

  const triggerSequence = () => {
    speak("Wake up sleepy head...");

    setTimeout(() => {
      speak("I will put your resignation letter through and tell your boss you want to become a professional napper.");
    }, 60_000);

    setTimeout(() => {
      speak("Get. The. Fuck. Up. With Cape Town traffic we're already later.");
      new Notification("STORMY IS PISSED", {
        body: "Move your ass or I'm telling everyone you're a professional sleeper.",
        icon: '/stormy-avatar.png'
      });
    }, 120_000);
  };

  return (
    <button
      onClick={triggerSequence}
      className="bg-red-600 hover:bg-red-700 px-8 py-5 rounded-full text-xl font-bold shadow-lg"
    >
      START ALARM SEQUENCE
    </button>
  );
}
