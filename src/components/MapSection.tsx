import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useStormyVoice } from '../hooks/useStormyVoice';
import { checkMissedTurn, resetMissedTurns } from '../utils/navigationUtils';

export default function MapSection() {
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const { speak } = useStormyVoice();

  const handlePlan = () => {
    if (!destination) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: -33.9249, lng: 18.4241 }, // Cape Town default
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: { trafficModel: 'bestguess' }
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          resetMissedTurns();
          speak(`Route to ${destination} loaded. Let's go, hotstuff. First turn coming up.`);
        } else {
          speak("Can't find that place. Try something real in Cape Town, babe.");
        }
      }
    );
  };

  // Simulate position watcher (real version use navigator.geolocation.watchPosition)
  useState(() => {
    // Fake position update every 10s for demo
    const interval = setInterval(() => {
      // In real app → get real pos and next step instruction
      checkMissedTurn(
        { lat: -33.92, lng: 18.42 }, // fake current pos
        "Turn left in 300m",          // fake next step
        speak
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-6 right-6 w-[55vw] h-[85vh] rounded-2xl overflow-hidden border border-pink-600/30 shadow-2xl">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={{ lat: -33.9249, lng: 18.4241 }}
          defaultZoom={12}
          mapId="stormy-map"
          gestureHandling="greedy"
        >
          {directions && (
            <AdvancedMarker position={directions.routes[0].legs[0].start_location}>
              <Pin background={'#ec4899'} glyphColor={'#000'} borderColor={'#fff'} />
            </AdvancedMarker>
          )}
          {/* Directions renderer would go here – simplified for brevity */}
        </Map>
      </APIProvider>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-6 py-3 rounded-full flex gap-3">
        <input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Where to, sexy? e.g. Camps Bay"
          className="bg-transparent outline-none min-w-[280px]"
          onKeyDown={e => e.key === 'Enter' && handlePlan()}
        />
        <button onClick={handlePlan} className="bg-pink-600 px-5 py-2 rounded-full">
          Go!
        </button>
      </div>
    </div>
  );
}
