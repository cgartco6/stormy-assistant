import ChatArea from './components/ChatArea';
import AlarmButton from './components/AlarmButton';
import MapSection from './components/MapSection';

function App() {
  return (
    <div className="relative min-h-screen">
      <ChatArea />
      
      <div className="absolute top-6 right-6 flex flex-col gap-6 items-end">
        <AlarmButton />
        <MapSection />
      </div>
    </div>
  );
}

export default App;
