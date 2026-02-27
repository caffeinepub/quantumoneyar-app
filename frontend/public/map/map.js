// Quantumoney AR — Leaflet Map
// Reads AR interaction state from localStorage and postMessage for real-time sync

(function () {
  'use strict';

  // Default spawn data (fallback)
  var defaultSpawns = [
    { id: 'coin_spawn_001', spawnType: 'coin', latitude: 38.5667, longitude: -7.9, itemType: 'QMY_coin' },
    { id: 'coin_spawn_002', spawnType: 'coin', latitude: 38.5700, longitude: -7.905, itemType: 'QMY_coin' },
    { id: 'coin_spawn_003', spawnType: 'coin', latitude: 38.5650, longitude: -7.895, itemType: 'QMY_coin' },
    { id: 'monster_spawn_001', spawnType: 'monster', latitude: 38.5680, longitude: -7.902, itemType: 'Quantumon_Alpha' },
    { id: 'monster_spawn_002', spawnType: 'monster', latitude: 38.5640, longitude: -7.908, itemType: 'Quantumon_Beta' },
    { id: 'monster_spawn_003', spawnType: 'monster', latitude: 38.5710, longitude: -7.898, itemType: 'Quantumon_Gamma' },
    { id: 'coin_spawn_004', spawnType: 'coin', latitude: 38.5720, longitude: -7.910, itemType: 'QMY_coin' },
    { id: 'monster_spawn_004', spawnType: 'monster', latitude: 38.5630, longitude: -7.892, itemType: 'Quantumon_Delta' },
    { id: 'coin_spawn_005', spawnType: 'coin', latitude: 38.5690, longitude: -7.915, itemType: 'QMY_coin' },
    { id: 'monster_spawn_005', spawnType: 'monster', latitude: 38.5660, longitude: -7.888, itemType: 'Quantumon_Epsilon' },
  ];

  var map;
  var userMarker = null;
  var spawnMarkers = {};
  var currentSpawns = defaultSpawns;
  var lockedCoins = new Set();
  var capturedMonsters = new Set();

  // Load AR state from localStorage
  function loadArState() {
    try {
      var raw = localStorage.getItem('arInteractionsStore');
      if (raw) {
        var parsed = JSON.parse(raw);
        lockedCoins = new Set(parsed.lockedCoins || []);
        capturedMonsters = new Set(parsed.capturedMonsters || []);
      }
    } catch (e) {
      console.warn('Failed to load AR state:', e);
    }
  }

  // Create coin icon
  function createCoinIcon(locked) {
    var iconUrl = locked
      ? '/assets/generated/map-locked-qmy-coin-gold.dim_32x32.png'
      : '/assets/generated/map-unlocked-qmy-coin-silver.dim_32x32.png';
    return L.icon({
      iconUrl: iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  }

  // Create monster icon
  function createMonsterIcon(captured) {
    var iconUrl = captured
      ? '/assets/generated/map-monster-purple.dim_32x32.png'
      : '/assets/generated/map-monster-marker-transparent.dim_32x32.png';
    return L.icon({
      iconUrl: iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  }

  // Render all spawn markers
  function renderSpawnMarkers() {
    // Remove old markers
    Object.values(spawnMarkers).forEach(function (m) {
      map.removeLayer(m);
    });
    spawnMarkers = {};

    currentSpawns.forEach(function (spawn) {
      var marker;
      if (spawn.spawnType === 'coin') {
        var locked = lockedCoins.has(spawn.id);
        marker = L.marker([spawn.latitude, spawn.longitude], {
          icon: createCoinIcon(locked),
        });
        var status = locked ? '🔒 Locked' : '🪙 Available';
        marker.bindPopup(
          '<b>' + spawn.itemType + '</b><br>' +
          'ID: ' + spawn.id + '<br>' +
          'Status: ' + status + '<br>' +
          '<small>Use AR Camera to lock/unlock</small>'
        );
      } else if (spawn.spawnType === 'monster') {
        var captured = capturedMonsters.has(spawn.id);
        marker = L.marker([spawn.latitude, spawn.longitude], {
          icon: createMonsterIcon(captured),
        });
        var mStatus = captured ? '✅ Captured' : '⚡ Wild';
        marker.bindPopup(
          '<b>' + spawn.itemType + '</b><br>' +
          'ID: ' + spawn.id + '<br>' +
          'Status: ' + mStatus + '<br>' +
          '<small>Use AR Camera to capture</small>'
        );
      }

      if (marker) {
        marker.addTo(map);
        spawnMarkers[spawn.id] = marker;
      }
    });
  }

  // Initialize map
  function initMap() {
    map = L.map('map', {
      center: [38.5667, -7.9],
      zoom: 14,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    loadArState();
    renderSpawnMarkers();

    // GPS tracking
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        function (pos) {
          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;

          if (userMarker) {
            userMarker.setLatLng([lat, lng]);
          } else {
            var playerIcon = L.divIcon({
              className: '',
              html: '<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 8px rgba(59,130,246,0.8);"></div>',
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });
            userMarker = L.marker([lat, lng], { icon: playerIcon }).addTo(map);
            userMarker.bindPopup('<b>You are here</b>');
            map.setView([lat, lng], 15);
          }
        },
        function (err) {
          console.warn('GPS error:', err.message);
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }

    // Hide loading overlay
    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'none';
  }

  // Handle postMessage from parent React app
  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.type !== 'AR_STATE_UPDATE') return;

    if (data.lockedCoins) lockedCoins = new Set(data.lockedCoins);
    if (data.capturedMonsters) capturedMonsters = new Set(data.capturedMonsters);
    if (data.spawns && data.spawns.length > 0) currentSpawns = data.spawns;

    if (map) renderSpawnMarkers();
  });

  // Listen for localStorage changes (same tab)
  window.addEventListener('storage', function (e) {
    if (e.key === 'arInteractionsStore') {
      loadArState();
      if (map) renderSpawnMarkers();
    }
  });

  // Init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
