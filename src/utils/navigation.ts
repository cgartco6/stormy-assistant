let missedCount = 0;
export const startNavigation = (destination: string, map: any, speak: any) => {
  // Use Google DirectionsService to get route (full code in MapNavigator)
  // Watch position
  navigator.geolocation.watchPosition((pos) => {
    // Simple deviation check (real version uses route legs)
    const offRoute = true; // replace with actual distance calc
    if (offRoute) {
      missedCount++;
      if (missedCount >= 3) {
        const distanceToNext = "500m"; // calculate from Google step
        speak(`In ${distanceToNext}, this is the 3rd direction you ignore from me. Turn the fuck around, NOW!`);
        missedCount = 0; // reset
      }
    }
  });
};
