// Leaflet map implementation with GPS tracking and spawn markers
let map;
let userMarker = null;
let userCircle = null;
let spawnMarkers = [];

// Load AR interactions state from localStorage
function loadArInteractionsState() {
  const stored = localStorage.getItem('quantumoney_ar_interactions');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { coinLocks: {}, unlockCounters: {}, currentlyUnlocked: {} };
    }
  }
  return { coinLocks: {}, unlockCounters: {}, currentlyUnlocked: {} };
}

// Initialize map
function initMap() {
  // Create map centered on Évora, Portugal (default)
  map = L.map('map', {
    center: [38.5667, -7.9067],
    zoom: 16,
    zoomControl: true,
    attributionControl: true,
  });

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  // Add spawn markers
  addSpawnMarkers();

  // Request geolocation
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      updateUserLocation,
      handleGeolocationError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  // Listen for location updates from parent window
  window.addEventListener('message', (event) => {
    if (event.data.type === 'updatePlayerLocation') {
      updateUserLocationFromParent(event.data.latitude, event.data.longitude);
    }
  });

  // Listen for storage changes to update markers
  window.addEventListener('storage', (event) => {
    if (event.key === 'quantumoney_ar_interactions') {
      updateSpawnMarkers();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (map) {
      map.invalidateSize();
    }
  });

  // Hide loading overlay
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

// Update user location marker
function updateUserLocation(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  updateUserMarkerPosition(lat, lng, accuracy);
}

// Update user location from parent window (postMessage)
function updateUserLocationFromParent(lat, lng) {
  updateUserMarkerPosition(lat, lng, 10);
}

// Update user marker position (shared logic)
function updateUserMarkerPosition(lat, lng, accuracy) {
  if (!userMarker) {
    // Create user marker
    const userIcon = L.divIcon({
      className: 'user-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
    userMarker.bindPopup('Your Location');

    // Create accuracy circle
    userCircle = L.circle([lat, lng], {
      radius: accuracy,
      color: '#4A90E2',
      fillColor: '#4A90E2',
      fillOpacity: 0.1,
      weight: 1,
    }).addTo(map);

    // Center map on user
    map.setView([lat, lng], 16);
  } else {
    // Update existing marker position
    userMarker.setLatLng([lat, lng]);
    if (userCircle) {
      userCircle.setLatLng([lat, lng]);
      userCircle.setRadius(accuracy);
    }
  }
}

// Handle geolocation errors
function handleGeolocationError(error) {
  console.warn('Geolocation error:', error.message);
  // Map remains functional without user location
}

// Add spawn markers (coins and monsters)
function addSpawnMarkers() {
  const spawns = [
    // Unlocked coins (silver)
    { id: 'coin-u-1', type: 'coin-unlocked', lat: 38.5667, lng: -7.9067, reward: 5, name: 'Silver Coin Alpha' },
    { id: 'coin-u-2', type: 'coin-unlocked', lat: 38.5668, lng: -7.9068, reward: 5, name: 'Silver Coin Beta' },
    { id: 'coin-u-3', type: 'coin-unlocked', lat: 38.5666, lng: -7.9066, reward: 5, name: 'Silver Coin Gamma' },
    
    // Locked coins (gold)
    { id: 'coin-l-1', type: 'coin-locked', lat: 38.5669, lng: -7.9069, reward: 10, name: 'Gold Coin Alpha' },
    { id: 'coin-l-2', type: 'coin-locked', lat: 38.5665, lng: -7.9065, reward: 10, name: 'Gold Coin Beta' },
    
    // Common monsters
    { id: 'monster-c-1', type: 'monster-common', lat: 38.5670, lng: -7.9070, reward: 15, name: 'Quantum Sprite' },
    { id: 'monster-c-2', type: 'monster-common', lat: 38.5664, lng: -7.9064, reward: 15, name: 'Pixel Beast' },
    
    // Rare monsters
    { id: 'monster-r-1', type: 'monster-rare', lat: 38.5672, lng: -7.9072, reward: 30, name: 'Cyber Dragon' },
    { id: 'monster-r-2', type: 'monster-rare', lat: 38.5662, lng: -7.9062, reward: 30, name: 'Neon Phoenix' },
    
    // Legendary monster
    { id: 'monster-l-1', type: 'monster-legendary', lat: 38.5675, lng: -7.9075, reward: 100, name: 'Quantum Leviathan' },
    
    // Lisboa spawns
    { id: 'coin-u-lisboa-1', type: 'coin-unlocked', lat: 38.7223, lng: -9.1393, reward: 5, name: 'Lisboa Silver' },
    { id: 'coin-l-lisboa-1', type: 'coin-locked', lat: 38.7224, lng: -9.1394, reward: 10, name: 'Lisboa Gold' },
    { id: 'monster-c-lisboa-1', type: 'monster-common', lat: 38.7225, lng: -9.1395, reward: 15, name: 'Lisboa Guardian' },
  ];

  const arState = loadArInteractionsState();

  spawns.forEach(spawn => {
    let iconUrl;
    let iconSize = [32, 32];
    let popupContent = `<b>${spawn.name}</b><br>${spawn.reward} XP`;

    // Check if coin is locked in AR interactions
    const lockState = arState.coinLocks[spawn.id];
    const isLocked = lockState && lockState.isLocked;

    if (spawn.type === 'coin-unlocked') {
      iconUrl = isLocked 
        ? '/assets/generated/map-locked-qmy-coin-gold-bright.dim_32x32.png'
        : '/assets/generated/map-unlocked-qmy-coin-silver-bright.dim_32x32.png';
      if (isLocked) {
        popupContent += '<br>🔒 Locked';
      }
    } else if (spawn.type === 'coin-locked') {
      iconUrl = isLocked 
        ? '/assets/generated/map-locked-qmy-coin-gold-bright.dim_32x32.png'
        : '/assets/generated/map-unlocked-qmy-coin-silver-bright.dim_32x32.png';
      if (isLocked) {
        popupContent += '<br>🔒 Locked';
      }
    } else if (spawn.type.startsWith('monster')) {
      iconUrl = '/assets/generated/map-monster-purple.dim_32x32.png';
    }

    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: iconSize,
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

    const marker = L.marker([spawn.lat, spawn.lng], { icon: icon }).addTo(map);
    marker.bindPopup(popupContent);
    marker.spawnData = spawn;
    spawnMarkers.push(marker);
  });
}

// Update spawn markers based on AR interactions state
function updateSpawnMarkers() {
  const arState = loadArInteractionsState();
  
  spawnMarkers.forEach(marker => {
    const spawn = marker.spawnData;
    if (!spawn || !spawn.type.startsWith('coin')) return;

    const lockState = arState.coinLocks[spawn.id];
    const isLocked = lockState && lockState.isLocked;

    let iconUrl;
    let popupContent = `<b>${spawn.name}</b><br>${spawn.reward} XP`;

    if (spawn.type === 'coin-unlocked' || spawn.type === 'coin-locked') {
      iconUrl = isLocked 
        ? '/assets/generated/map-locked-qmy-coin-gold-bright.dim_32x32.png'
        : '/assets/generated/map-unlocked-qmy-coin-silver-bright.dim_32x32.png';
      if (isLocked) {
        popupContent += '<br>🔒 Locked';
      }
    }

    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

    marker.setIcon(icon);
    marker.setPopupContent(popupContent);
  });
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMap);
} else {
  initMap();
}
