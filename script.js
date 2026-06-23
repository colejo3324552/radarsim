console.log("RadarSim loaded");

setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 1000);

}, 2500);
