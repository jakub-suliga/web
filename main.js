const startDate = new Date("Jan 1, 2025 12:00:00").getTime();
const endDate = new Date("Mar 26, 2025 06:30:00").getTime();

function updateTimers() {
  const now = Date.now();
  const distance = endDate - now;

  if (distance >= 0) {
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerText = `${d}T ${h}h ${m}m ${s}s`;
  } else {
    document.getElementById("countdown").innerText = "Ich bin da! ♥";
  }

  const elapsed = now - startDate;
  if (elapsed >= 0) {
    const dd = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hh = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mm = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const ss = Math.floor((elapsed % (1000 * 60)) / 1000);
    document.getElementById("elapsed").innerText = `${dd}T ${hh}h ${mm}m ${ss}s`;
  } else {
    document.getElementById("elapsed").innerText = "Unsere Trennung hat noch nicht begonnen.";
  }
}

function moveBird() {
  const now = Date.now();
  const total = endDate - startDate;
  const elapsed = now - startDate;
  let progress = elapsed / total;

  progress = Math.min(Math.max(progress, 0), 1);

  const path = document.getElementById("birdPath");
  const bird = document.getElementById("bird");
  const pathLength = path.getTotalLength();
  const point = path.getPointAtLength(progress * pathLength);

  bird.style.left = `${point.x}%`;
  bird.style.top = `${point.y}%`;
}

updateTimers();
moveBird();

setInterval(() => {
  updateTimers();
  moveBird();
}, 1000);
