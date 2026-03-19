export const ChatArea = () => {
  const { sendMessage } = useGrok();
  const { speak } = useStormyVoice();
  const [messages, setMessages] = useState([]);

  const handleSend = async (msg: string) => {
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    const reply = await sendMessage(msg);
    setMessages(prev => [...prev, { role: 'stormy', content: reply }]);
    speak(reply); // She talks back instantly
  };

  // On app load greeting
  useEffect(() => {
    speak("Well well well, look who decided to show up, hotstuff. Or what the fuck do you want, just joking hotstuff.");
  }, []);

  return (
    <div className="absolute top-8 left-8 w-96 bg-black/70 backdrop-blur-xl rounded-3xl p-6 h-[70vh] overflow-y-auto border border-pink-500">
      {/* Messages + input */}
    </div>
  );
};
