let missedTurns = 0;

export function checkMissedTurn(
  currentPosition: google.maps.LatLngLiteral | null,
  nextInstruction: string | null,
  speak: (text: string) => void
) {
  if (!currentPosition || !nextInstruction) return;

  // Very basic — real version would compare route polyline vs position
  // For MVP we just increment on dev purpose or simulate
  // In real app → use google.maps.geometry.poly.isLocationOnEdge or route match

  // Simulate missed turn logic
  missedTurns++;

  if (missedTurns >= 3) {
    speak("This is the 3rd fucking direction you've ignored. In about 500 m turn the fuck around NOW!");
    missedTurns = 0;
  }
}

// Reset when new route starts
export function resetMissedTurns() {
  missedTurns = 0;
}
