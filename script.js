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
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Esri",
        maxZoom: 16
    }
).addTo(map);

// =========================
// CITY LAYER
// =========================

const cityLayer = L.layerGroup();

const cities = [
["New York",40.7128,-74.0060],
["Los Angeles",34.0522,-118.2437],
["Chicago",41.8781,-87.6298],
["Houston",29.7604,-95.3698],
["Phoenix",33.4484,-112.0740],
["Philadelphia",39.9526,-75.1652],
["San Antonio",29.4241,-98.4936],
["San Diego",32.7157,-117.1611],
["Dallas",32.7767,-96.7970],
["Austin",30.2672,-97.7431],
["Jacksonville",30.3322,-81.6557],
["Columbus",39.9612,-82.9988],
["Charlotte",35.2271,-80.8431],
["Indianapolis",39.7684,-86.1581],
["Seattle",47.6062,-122.3321],
["Denver",39.7392,-104.9903],
["Washington",38.9072,-77.0369],
["Boston",42.3601,-71.0589],
["Nashville",36.1627,-86.7816],
["Atlanta",33.7490,-84.3880],
["Detroit",42.3314,-83.0458],
["Kansas City",39.0997,-94.5786],
["St. Louis",38.6270,-90.1994],
["Minneapolis",44.9778,-93.2650],
["Miami",25.7617,-80.1918],
["Tampa",27.9506,-82.4572],
["Orlando",28.5383,-81.3792],
["Oklahoma City",35.4676,-97.5164],
["Omaha",41.2565,-95.9345],
["Memphis",35.1495,-90.0490],
["New Orleans",29.9511,-90.0715],
["Salt Lake City",40.7608,-111.8910],
["Las Vegas",36.1699,-115.1398],
["Portland",45.5152,-122.6784],
["Cleveland",41.4993,-81.6944],
["Cincinnati",39.1031,-84.5120],
["Pittsburgh",40.4406,-79.9959]
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

    const lat = site[1];
    const lon = site[2];

    // Radar Range Ring

    L.circle(
        [lat, lon],
        {
            radius: 230000,
            color: "#00ff66",
            weight: 1,
            opacity: 0.20,
            fillOpacity: 0
        }
    ).addTo(map);

    // Radar Sweep

    const sweep = L.polyline(
        [
            [lat, lon],
            [lat, lon]
        ],
        {
            color: "#00ff66",
            weight: 2,
            opacity: 0.9
        }
    ).addTo(map);

    let angle = Math.random() * 360;

    setInterval(() => {

        angle += 2;

        const length = 2.2;

        const endLat =
            lat +
            Math.cos(angle * Math.PI / 180) * length;

        const endLon =
            lon +
            Math.sin(angle * Math.PI / 180) * length;

        sweep.setLatLngs([
            [lat, lon],
            [endLat, endLon]
        ]);

    }, 25);

    // Radar Site Marker

    const marker = L.circleMarker(
        [lat, lon],
        {
            radius: 5,
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
            [lat, lon],
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
// SETTINGS
// =========================

const settingsBtn =
    document.getElementById("settingsBtn");

const settingsPanel =
    document.getElementById("settingsPanel");

settingsBtn.addEventListener(
    "click",
    () => {

        settingsPanel.style.display =
            settingsPanel.style.display === "block"
            ? "none"
            : "block";

    }
);

// =========================
// CITY TOGGLE
// =========================

const cityCheckbox =
    document.getElementById("showCities");

if(cityCheckbox){

    cityCheckbox.addEventListener(
        "change",
        function(){

            if(this.checked){

                map.addLayer(cityLayer);

            } else {

                map.removeLayer(cityLayer);

            }

        }
    );

}

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
