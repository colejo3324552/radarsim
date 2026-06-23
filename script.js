console.log("RadarSim loaded");

// =========================
// MAP
// =========================

const usaBounds = [
    [24.396308, -125.0],
    [49.384358, -66.93457]
];

const map = L.map("map", {
    minZoom: 4,
    maxZoom: 16,
    zoomControl: true,
    worldCopyJump: false,
    maxBounds: usaBounds,
    maxBoundsViscosity: 1.0
}).setView([39.5, -98.35], 5);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
        attribution: "&copy; OpenStreetMap & CARTO"
    }
).addTo(map);

// =========================
// CITIES
// =========================

const cityLayer = L.layerGroup();

const cities = [
    ["New York",40.7128,-74.0060],
    ["Chicago",41.8781,-87.6298],
    ["Los Angeles",34.0522,-118.2437],
    ["Dallas",32.7767,-96.7970],
    ["Atlanta",33.7490,-84.3880],
    ["Denver",39.7392,-104.9903],
    ["Kansas City",39.0997,-94.5786],
    ["St. Louis",38.6270,-90.1994],
    ["Indianapolis",39.7684,-86.1581],
    ["Nashville",36.1627,-86.7816]
];

cities.forEach(city => {

    L.marker(
        [city[1], city[2]],
        {
            icon: L.divIcon({
                className: "city-label",
                html: city[0]
            })
        }
    ).addTo(cityLayer);

});

cityLayer.addTo(map);

// =========================
// RIVER
// =========================

const riverLayer = L.layerGroup();

L.polyline(
[
    [47.24,-95.20],
    [45.0,-93.0],
    [43.0,-91.0],
    [41.5,-91.0],
    [39.0,-90.0],
    [37.0,-89.5],
    [35.0,-90.0],
    [33.0,-91.0],
    [31.0,-91.5],
    [29.0,-89.5]
],
{
    color: "#4aa3ff",
    weight: 3,
    opacity: 0.9
}
).addTo(riverLayer);

riverLayer.addTo(map);

// =========================
// RADAR SITES
// =========================

const radarSites = [
    ["KPAH - Paducah", 37.0683, -88.7719],
    ["KLSX - St. Louis", 38.6989, -90.6829],
    ["KILX - Lincoln", 40.1505, -89.3368],
    ["KLOT - Chicago", 41.6044, -88.0845],
    ["KVWX - Evansville", 38.2600, -87.7247]
];

radarSites.forEach(site => {

    const marker = L.circleMarker(
        [site[1], site[2]],
        {
            radius: 7,
            color: "#00ff66",
            fillColor: "#00ff66",
            fillOpacity: 1,
            weight: 2
        }
    ).addTo(map);

    marker.bindTooltip(
        site[0],
        {
            permanent: true,
            direction: "top"
        }
    );

    marker.on("click", () => {

        document.getElementById(
            "selectedRadar"
        ).textContent = site[0];

        map.flyTo(
            [site[1], site[2]],
            8,
            {
                duration: 1
            }
        );

    });

});

// =========================
// SIDEBAR
// =========================

const sidebar =
    document.getElementById("sidebar");

const sidebarToggle =
    document.getElementById("sidebarToggle");

sidebarToggle.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "collapsed"
        );

    }
);

// =========================
// SETTINGS PANEL
// =========================

const settingsBtn =
    document.getElementById("settingsBtn");

const settingsPanel =
    document.getElementById("settingsPanel");

settingsBtn.addEventListener(
    "click",
    () => {

        if (
            settingsPanel.style.display ===
            "block"
        ) {

            settingsPanel.style.display =
                "none";

        } else {

            settingsPanel.style.display =
                "block";

        }

    }
);

// =========================
// SETTINGS TOGGLES
// =========================

document
.getElementById("showCities")
.addEventListener(
    "change",
    function() {

        if(this.checked) {

            map.addLayer(cityLayer);

        } else {

            map.removeLayer(cityLayer);

        }

    }
);

document
.getElementById("showRivers")
.addEventListener(
    "change",
    function() {

        if(this.checked) {

            map.addLayer(riverLayer);

        } else {

            map.removeLayer(riverLayer);

        }

    }
);

// =========================
// LOADING SCREEN
// =========================

setTimeout(() => {

    document
    .getElementById("loading-screen")
    .style.opacity = "0";

    setTimeout(() => {

        document
        .getElementById("loading-screen")
        .style.display = "none";

    }, 1000);

}, 2500);
