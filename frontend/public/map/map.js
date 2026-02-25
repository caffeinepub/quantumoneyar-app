// Leaflet map implementation with GPS tracking and AR state sync
(function () {
  'use strict';

  // Read AR interaction state from localStorage
  function getARState() {
    try {
      const raw = localStorage.getItem('qmy_ar_interactions_v2');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { lockedCoins: {}, capturedMonsters: {} };
  }

  // Initialize map
  const map = L.map('map', {
    center: [38.7169, -9.1399],
    zoom: 13,
    zoomControl: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  // Custom zoom control
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Marker icons
  function createCoinIcon(locked) {
    const color = locked ? '#FFD700' : '#C0C0C0';
    const emoji = locked ? '🔒' : '🪙';
    return L.divIcon({
      className: '',
      html: `<div style="
        width:32px;height:32px;
        background:rgba(0,0,0,0.7);
        border:2px solid ${color};
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:16px;
        box-shadow:0 0 8px ${color};
      ">${emoji}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }

  function createMonsterIcon(captured) {
    const color = captured ? '#888' : '#B400FF';
    const emoji = captured ? '💀' : '👾';
    return L.divIcon({
      className: '',
      html: `<div style="
        width:32px;height:32px;
        background:rgba(0,0,0,0.7);
        border:2px solid ${color};
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:16px;
        box-shadow:0 0 8px ${color};
        opacity:${captured ? 0.5 : 1};
      ">${emoji}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }

  function createPlayerIcon() {
    return L.divIcon({
      className: '',
      html: `<div style="
        width:20px;height:20px;
        background:#4A90E2;
        border:3px solid #fff;
        border-radius:50%;
        box-shadow:0 0 12px rgba(74,144,226,0.8);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }

  // Spawn data — matches mockSpawns.ts
  const SPAWNS = [
    { id: 'coin-lisboa-1', type: 'coin', lat: 38.7169, lng: -9.1399, name: 'Lisboa Centro' },
    { id: 'coin-madrid-1', type: 'coin', lat: 40.4168, lng: -3.7038, name: 'Madrid' },
    { id: 'coin-london-1', type: 'coin', lat: 51.5074, lng: -0.1278, name: 'London' },
    { id: 'coin-paris-1', type: 'coin', lat: 48.8566, lng: 2.3522, name: 'Paris' },
    { id: 'coin-berlin-1', type: 'coin', lat: 52.5200, lng: 13.4050, name: 'Berlin' },
    { id: 'coin-nyc-1', type: 'coin', lat: 40.7128, lng: -74.0060, name: 'New York' },
    { id: 'coin-tokyo-1', type: 'coin', lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
    { id: 'coin-sydney-1', type: 'coin', lat: -33.8688, lng: 151.2093, name: 'Sydney' },
    { id: 'monster-evora-1', type: 'monster', lat: 38.5714, lng: -7.9121, name: 'Évora Monster' },
    { id: 'monster-sao-paulo-1', type: 'monster', lat: -23.5505, lng: -46.6333, name: 'São Paulo Monster' },
    { id: 'monster-seoul-1', type: 'monster', lat: 37.5665, lng: 126.9780, name: 'Seoul Monster' },
    { id: 'monster-cape-town-1', type: 'monster', lat: -33.9249, lng: 18.4241, name: 'Cape Town Monster' },
  ];

  // Marker layer
  const markersLayer = L.layerGroup().addTo(map);
  let playerMarker = null;

  function renderMarkers() {
    markersLayer.clearLayers();
    const arState = getARState();

    SPAWNS.forEach(function (spawn) {
      let marker;
      if (spawn.type === 'monster') {
        const captured = arState.capturedMonsters[spawn.id] === true;
        marker = L.marker([spawn.lat, spawn.lng], { icon: createMonsterIcon(captured) });
        marker.bindPopup(
          `<div style="color:#B400FF;font-weight:bold;">${spawn.name}</div>` +
          `<div style="font-size:12px;">${captured ? '✓ Captured' : '👾 Monster'}</div>`
        );
      } else {
        const locked = arState.lockedCoins[spawn.id] === true;
        marker = L.marker([spawn.lat, spawn.lng], { icon: createCoinIcon(locked) });
        marker.bindPopup(
          `<div style="color:#FFD700;font-weight:bold;">${spawn.name}</div>` +
          `<div style="font-size:12px;">${locked ? '🔒 Locked QMY' : '🪙 QMY Coin'}</div>`
        );
      }
      markersLayer.addLayer(marker);
    });
  }

  // Initial render
  renderMarkers();

  // GPS tracking
  let watchId = null;

  function startTracking() {
    if (!navigator.geolocation) return;
    watchId = navigator.geolocation.watchPosition(
      function (pos) {
        const { latitude, longitude } = pos.coords;
        if (!playerMarker) {
          playerMarker = L.marker([latitude, longitude], { icon: createPlayerIcon() }).addTo(map);
          map.setView([latitude, longitude], 15);
        } else {
          playerMarker.setLatLng([latitude, longitude]);
        }
      },
      function (err) {
        console.warn('GPS error:', err.message);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  }

  startTracking();

  // Listen for storage events (cross-tab sync)
  window.addEventListener('storage', function (e) {
    if (e.key === 'qmy_ar_interactions_v2') {
      renderMarkers();
    }
  });

  // Listen for postMessage from parent window
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'AR_STATE_UPDATE') {
      try {
        localStorage.setItem('qmy_ar_interactions_v2', JSON.stringify(e.data.payload));
        renderMarkers();
      } catch (err) {}
    }
  });
})();
