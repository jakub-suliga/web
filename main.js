/* === Start- und Enddatum === */
const startDate = new Date("Apr 6, 2025 12:25:00").getTime();
const endDate = new Date("May 7, 2025 14:15:00").getTime();

/* === Timer-Funktionen (Countdown und Abwesenheit) === */
function updateTimers() {
  const now = Date.now();
  const distance = endDate - now;

  // Countdown
  if (distance >= 0) {
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerText = `${d}T ${h}h ${m}m ${s}s`;
  } else {
    document.getElementById("countdown").innerText = "Ich bin da! ♥";
  }

  // Abwesenheit
  const elapsed = now - startDate;
  if (elapsed >= 0) {
    const dd = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hh = Math.floor(
      (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mm = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const ss = Math.floor((elapsed % (1000 * 60)) / 1000);
    document.getElementById("elapsed").innerText = `${dd}T ${hh}h ${mm}m ${ss}s`;
  }
}

/* === Vogelbewegung === */
function moveBird() {
  const now = Date.now();
  const total = endDate - startDate;
  const elapsed = now - startDate;
  let progress = elapsed / total;

  // Fortschritt zwischen 0 und 1 halten
  progress = Math.min(Math.max(progress, 0), 1);

  const path = document.getElementById("birdPath");
  const bird = document.getElementById("bird");
  const pathLength = path.getTotalLength();
  const point = path.getPointAtLength(progress * pathLength);

  // Positionieren des Vogels relativ zum SVG-Pfad
  bird.style.left = `${point.x}%`;
  bird.style.top = `${point.y}%`;
}

/* === Spatzi-Zeit vs. lokale Zeit ===
   Wenn die lokale Zeit != Berliner Zeit ist, dann "Spatzi Zeit" = Berlin.
   Wenn die lokale Zeit == Berliner Zeit, dann "Spatzi Zeit" = Thailand.
*/
function updateTimeDisplays() {
  // Lokale Zeit (Gerätezeit)
  const localTime = new Date().toLocaleTimeString("de-DE", {
    hour12: false,
  });

  // Berliner Zeit
  const berlinTime = new Date().toLocaleTimeString("de-DE", {
    timeZone: "Europe/Berlin",
    hour12: false,
  });

  // Thailändische Zeit
  const thailandTime = new Date().toLocaleTimeString("de-DE", {
    timeZone: "Asia/Bangkok",
    hour12: false,
  });

  // Prüfen, ob lokale Zeit mit Berliner Zeit übereinstimmt
  // (Hier ein einfacher Vergleich anhand der HH:MM:SS-Strings)
  let spatziTime;
  if (localTime === berlinTime) {
    // Gleiche Zeitzone => "Spatzi Zeit" = Thailand
    spatziTime = thailandTime;
  } else {
    // Unterschiedliche Zeitzone => "Spatzi Zeit" = Berlin
    spatziTime = berlinTime;
  }

  // HTML aktualisieren
  document.getElementById("localTime").innerText = localTime;
  document.getElementById("spatziTime").innerText = spatziTime;
}

/* === Initiale Aufrufe === */
updateTimers();
moveBird();
updateTimeDisplays();

/* === Wiederholungen aller Funktionen === */
setInterval(() => {
  updateTimers();
  moveBird();
  updateTimeDisplays();
}, 1000);
