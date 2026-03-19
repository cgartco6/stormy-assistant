function App() {
  return (
    <div className="min-h-screen relative">
      <ChatArea /> {/* top left exactly as requested */}
      <div className="absolute top-8 right-8 flex gap-4">
        <AlarmSystem />
        <MapNavigator />
      </div>
    </div>
  );
}
