import { determineZone, ZONE_MAPPING } from './zones.js';

const BIGDATACLOUD_API_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const JAKIM_API_URL = "./proxy.php?zone=";

const ui = {
    locationBadge: document.getElementById('location-badge'),
    locationText: document.getElementById('location-text'),
    currentTime: document.getElementById('current-time'),
    currentDate: document.getElementById('current-date'),
    hijriDate: document.getElementById('hijri-date'),
    nextPrayerName: document.getElementById('next-prayer-name'),
    countdownTimer: document.getElementById('countdown-timer'),
    prayerGrid: document.getElementById('prayer-grid'),
    retryBtn: document.getElementById('retry-btn'),
    manualSelector: document.getElementById('manual-selector'),
    stateSelect: document.getElementById('state-select'),
};

let currentPrayerTimes = null;
let currentZone = null;

async function init() {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered:', reg.scope))
            .catch(err => console.error('SW Fail:', err));
    }

    updateClock();
    setInterval(updateClock, 1000);
    populateManualSelector();

    // Check if we have a saved zone
    const savedZone = localStorage.getItem('waktuSolatZone');
    const savedLocation = localStorage.getItem('waktuSolatLocation');

    if (savedZone && savedLocation) {
        currentZone = savedZone;
        ui.locationText.textContent = savedLocation;
        fetchPrayerTimes(savedZone);
        ui.stateSelect.value = savedZone; // Sync selector
    } else {
        requestLocation();
    }

    ui.retryBtn.addEventListener('click', requestLocation);
    ui.stateSelect.addEventListener('change', handleManualSelection);

    // NEW: Clickable location badge to show selector
    ui.locationBadge.addEventListener('click', () => {
        ui.manualSelector.classList.remove('hidden');
        ui.manualSelector.scrollIntoView({ behavior: 'smooth' });
    });
}

function populateManualSelector() {
    // Helper to invert the map: We need unique Zones per state with their districts
    // Structure: State -> { ZoneCode: [District1, District2] }

    for (const [state, districts] of Object.entries(ZONE_MAPPING)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = state;

        // Group districts by zone code
        const zoneMap = {};
        for (const [district, code] of Object.entries(districts)) {
            if (!zoneMap[code]) zoneMap[code] = [];
            zoneMap[code].push(district);
        }

        for (const [code, districtList] of Object.entries(zoneMap)) {
            const option = document.createElement('option');
            option.value = code;
            // Truncate if too long
            const distStr = districtList.join(', ');
            const label = distStr.length > 50 ? distStr.substring(0, 47) + '...' : distStr;
            option.textContent = `${code} - ${label}`;
            optgroup.appendChild(option);
        }

        ui.stateSelect.appendChild(optgroup);
    }
}

function handleManualSelection(e) {
    const zone = e.target.value;
    if (!zone) return;

    currentZone = zone;

    // Find friendly name from selector
    const option = ui.stateSelect.options[ui.stateSelect.selectedIndex];
    // Use the State (optgroup) as part of location name
    const state = option.parentNode.label;
    const locationName = `${state} (${zone})`; // Simplified name for manual selection

    ui.locationText.textContent = locationName;

    // Save preference
    localStorage.setItem('waktuSolatZone', zone);
    localStorage.setItem('waktuSolatLocation', locationName);

    fetchPrayerTimes(zone);

    // Hide selector after selection
    ui.manualSelector.classList.add('hidden');
}

function updateClock() {
    const now = new Date();
    ui.currentTime.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    ui.currentDate.textContent = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    if (currentPrayerTimes) {
        updateCountdown(now);
    }
}

function requestLocation() {
    ui.locationText.textContent = "Locating...";
    ui.retryBtn.classList.add('hidden');
    ui.manualSelector.classList.add('hidden');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
    } else {
        errorLocation({ message: "Geolocation not supported" });
    }
}

async function successLocation(position) {
    const { latitude, longitude } = position.coords;

    try {
        const response = await fetch(`${BIGDATACLOUD_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();

        // This API returns fields like "locality", "city", "principalSubdivision" (State)
        const district = data.locality || data.city || "";
        const state = data.principalSubdivision || "";

        console.log("Location detected:", { district, state });

        const zone = determineZone(state, district);

        if (zone) {
            currentZone = zone;
            const locationName = `${district}, ${state}`;
            ui.locationText.textContent = locationName;

            // Save to local storage
            localStorage.setItem('waktuSolatZone', zone);
            localStorage.setItem('waktuSolatLocation', locationName);

            fetchPrayerTimes(zone);
        } else {
            fallbackManual("Zone not found. Please select manually.");
        }

    } catch (error) {
        console.error("Reverse Geocoding Error:", error);
        fallbackManual("Location error. Please select manually.");
    }
}

function errorLocation(err) {
    console.error("Geolocation Error:", err);

    // Check for insecure origin
    if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
        fallbackManual("Require HTTPS for Location. Select manually.");
    } else {
        fallbackManual("Location denied. Select manually.");
    }
}

function fallbackManual(msg) {
    ui.locationText.textContent = msg;
    ui.retryBtn.classList.remove('hidden');
    ui.manualSelector.classList.remove('hidden');
}

async function fetchPrayerTimes(zone) {
    try {
        const response = await fetch(JAKIM_API_URL + zone);
        const data = await response.json();

        if (data.status === "OK!" && data.prayerTime.length > 0) {
            processPrayerData(data);
        } else {
            throw new Error("API Error");
        }
    } catch (error) {
        console.error("JAKIM API Error:", error);
        ui.locationText.textContent = "Error loading times.";
    }
}

function processPrayerData(data) {
    const todayData = data.prayerTime[0];
    currentPrayerTimes = {
        Imsak: todayData.imsak,
        Subuh: todayData.fajr,
        Syuruk: todayData.syuruk,
        Zohor: todayData.dhuhr,
        Asar: todayData.asr,
        Maghrib: todayData.maghrib,
        Isyak: todayData.isha
    };

    // Format Hijri Date (YYYY-MM-DD -> DD Month YYYY)
    const [hYear, hMonth, hDay] = todayData.hijri.split('-');
    const hijriMonths = [
        "Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir",
        "Jamadil Awal", "Jamadil Akhir", "Rejab", "Syaaban",
        "Ramadhan", "Syawal", "Zulkaedah", "Zulhijjah"
    ];
    const formattedHijri = `${hDay} ${hijriMonths[parseInt(hMonth) - 1]} ${hYear}`;

    // Use innerHTML to render HTML entities in bearing (e.g. &#176;)
    ui.hijriDate.innerHTML = `${formattedHijri} &nbsp;|&nbsp; ${data.bearing}`;

    renderPrayerGrid();
    updateCountdown(new Date());
}

function renderPrayerGrid() {
    ui.prayerGrid.innerHTML = '';

    for (const [name, time] of Object.entries(currentPrayerTimes)) {
        // time is "HH:mm:ss"
        const formattedTime = time.slice(0, 5); // HH:mm

        const div = document.createElement('div');
        div.className = 'prayer-item';
        div.id = `prayer-${name}`;
        div.innerHTML = `
            <span class="name">${name}</span>
            <span class="time">${formattedTime}</span>
        `;
        ui.prayerGrid.appendChild(div);
    }
}

function updateCountdown(now) {
    if (!currentPrayerTimes) return;

    const times = [];
    const nowTimeStr = now.toTimeString().split(' ')[0]; // HH:mm:ss

    for (const [name, time] of Object.entries(currentPrayerTimes)) {
        // time is "HH:mm:ss"
        // Create full Date objects for comparison
        const [h, m, s] = time.split(':');
        const pDate = new Date(now);
        pDate.setHours(h, m, s, 0);

        times.push({ name, date: pDate });
    }

    // Sort times
    times.sort((a, b) => a.date - b.date);

    // Find next prayer
    let nextPrayer = times.find(t => t.date > now);

    // If no more prayers today, next is Imsak tomorrow
    if (!nextPrayer) {
        nextPrayer = { name: "Imsak (Tmr)", date: new Date(times[0].date) };
        nextPrayer.date.setDate(nextPrayer.date.getDate() + 1);
    }

    // Update UI
    ui.nextPrayerName.textContent = nextPrayer.name;

    const diff = nextPrayer.date - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    ui.countdownTimer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Highlight active prayer (previous one)
    highlightCurrentPrayer(now, times);
}

function highlightCurrentPrayer(now, times) {
    // Find the last passed prayer
    // Filter prayers that are in the past
    const passed = times.filter(t => t.date <= now);
    const current = passed.length > 0 ? passed[passed.length - 1] : null; // If none passed, maybe it's before Subuh (Isyak previous night technically, but for visual we reset or show last of yesterday? simplify to just nothing or last)

    document.querySelectorAll('.prayer-item').forEach(el => el.classList.remove('active'));

    if (current) {
        const el = document.getElementById(`prayer-${current.name}`);
        if (el) el.classList.add('active');
    }
}

init();
