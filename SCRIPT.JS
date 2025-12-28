/* PARTICLE BACKGROUND */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".hero").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.y < 0 || p.x > canvas.width || p.y > canvas.height) {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,80,80,0.5)";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

/* CURSOR MAGIC */
const words = document.querySelectorAll(".magnetic .word");
let lastX = 0, lastY = 0;

document.addEventListener("mousemove", e => {
  const speed = Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
  const intensity = Math.min(speed / 120, 1.5);

  words.forEach((word, i) => {
    const rect = word.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    word.style.transform = `translate(${dx * 0.01 * intensity}px, ${dy * 0.01 * intensity}px)`;
  });

  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener("mouseleave", () => {
  words.forEach(w => w.style.transform = "translate(0,0)");
});

/* HERO RED MOUSE GLOW */
const hero = document.querySelector(".hero");
const glow = document.querySelector(".mouse-glow");

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

hero.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
});

hero.addEventListener("mouseenter", () => {
  glow.style.opacity = "1";
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;

  glow.style.left = glowX + "px";
  glow.style.top = glowY + "px";

  requestAnimationFrame(animateGlow);
}

animateGlow();
const nodes = document.querySelectorAll(".ai-node");
const core = document.querySelector(".ai-core");
const beam = document.querySelector(".energy-beam");

nodes.forEach(node => {
  node.addEventListener("mouseenter", () => {
    const nodeRect = node.getBoundingClientRect();
    const coreRect = core.getBoundingClientRect();
    const ecoRect = document.querySelector(".ecosystem").getBoundingClientRect();

    const startX = nodeRect.left + nodeRect.width / 2 - ecoRect.left;
    const startY = nodeRect.top + nodeRect.height / 2 - ecoRect.top;
    const endY = coreRect.top + coreRect.height / 2 - ecoRect.top;

    beam.style.left = startX + "px";
    beam.style.top = Math.min(startY, endY) + "px";
    beam.style.height = Math.abs(endY - startY) + "px";
    beam.style.opacity = "1";

    core.classList.add("boost");
  });

  node.addEventListener("mouseleave", () => {
    beam.style.opacity = "0";
    core.classList.remove("boost");
  });
});
let lastScrollY = window.scrollY;
const lines = document.querySelectorAll(".data-lines path");

window.addEventListener("scroll", () => {
  const speed = Math.abs(window.scrollY - lastScrollY);
  const duration = Math.max(1.5, 6 - speed * 0.02);

  lines.forEach(line => {
    line.style.animationDuration = duration + "s";
  });

  lastScrollY = window.scrollY;
});
const ecosystem = document.querySelector(".crazy-ai");

ecosystem.addEventListener("mousemove", e => {
  const rect = ecosystem.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y / rect.height) - 0.5) * -10;
  const rotateY = ((x / rect.width) - 0.5) * 10;

  core.style.transform =
    `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

ecosystem.addEventListener("mouseleave", () => {
  core.style.transform = "translate(-50%, -50%)";
});
let idleTimer;

function activateThinking() {
  core.classList.add("thinking");
}

function resetThinking() {
  core.classList.remove("thinking");
  clearTimeout(idleTimer);
  idleTimer = setTimeout(activateThinking, 2000);
}

["mousemove", "scroll"].forEach(evt => {
  window.addEventListener(evt, resetThinking);
});

activateThinking();
nodes.forEach(node => {
  ecosystem.addEventListener("mousemove", e => {
    const coreRect = core.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    const dx = coreRect.left - nodeRect.left;
    const dy = coreRect.top - nodeRect.top;

    node.style.transform =
      `translate(${dx * 0.002}px, ${dy * 0.002}px)`;
  });

  ecosystem.addEventListener("mouseleave", () => {
    node.style.transform = "translate(0,0)";
  });
});
const counter = document.getElementById("counter");
let count = 927651002;

setInterval(() => {
  count += Math.floor(Math.random() * 6);
  counter.textContent = count.toLocaleString();
}, 1200);
