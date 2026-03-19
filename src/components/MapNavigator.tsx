import { APIProvider, Map, Directions } from '@vis.gl/react-google-maps';

export const MapNavigator = () => {
  const [route, setRoute] = useState(null);
  const { speak } = useStormyVoice();

  const planTrip = async (dest: string) => {
    // Call DirectionsService (full example in Google docs)
    // Then speak first turn: "In 300m, turn left onto N1, hotstuff"
    startNavigation(dest, mapInstance, speak); // from utils
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map defaultCenter={{ lat: -33.9249, lng: 18.4241 }} zoom={12} mapId="your-map-id">
        {/* DirectionsRenderer here */}
      </Map>
      <input placeholder="Where to, hotstuff? (e.g. Table Mountain)" onKeyDown={e => e.key === 'Enter' && planTrip(e.target.value)} />
    </APIProvider>
  );
};
