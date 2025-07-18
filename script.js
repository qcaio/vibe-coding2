// Background animado de rede neural/constelação
const canvas = document.getElementById('bg-anim');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Parâmetros dos pontos
const POINTS = 38;
const points = [];
for (let i = 0; i < POINTS; i++) {
  points.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2.5 + 1.5,
    color: Math.random() > 0.5 ? '#a8325a' : '#6d1835'
  });
}

let pulse = 0;
function drawNetwork() {
  ctx.clearRect(0, 0, width, height);
  pulse += 0.04;
  // Desenha linhas
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.save();
        ctx.globalAlpha = 1 - dist / 140;
        ctx.strokeStyle = '#a8325a55';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  // Desenha pontos com brilho pulsante
  for (let idx = 0; idx < points.length; idx++) {
    const p = points[idx];
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + Math.sin(pulse + idx) * 1.2, 0, 2 * Math.PI);
    // Alterna cor para alguns pontos
    let color = p.color;
    if (idx % 7 === 0) {
      color = '#f3e9f7';
    } else if (idx % 5 === 0) {
      color = '#b08ca7';
    }
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18 + Math.abs(Math.sin(pulse + idx) * 10);
    ctx.globalAlpha = 0.85 + 0.15 * Math.sin(pulse + idx);
    ctx.fill();
    ctx.restore();
    // Movimento
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }
  requestAnimationFrame(drawNetwork);
}
drawNetwork();

// Carrossel dos valores estilo cartas
function initCarrossel() {
  const cards = document.querySelectorAll('.valor-card');
  let current = 0;
  function updateCards() {
    cards.forEach((c, i) => {
      c.classList.remove('center', 'left', 'right', 'hidden');
      if (i === current) {
        c.classList.add('center');
      } else if (i === (current - 1 + cards.length) % cards.length) {
        c.classList.add('left');
      } else if (i === (current + 1) % cards.length) {
        c.classList.add('right');
      } else {
        c.classList.add('hidden');
      }
    });
  }
  updateCards();
  document.getElementById('carrossel-prev').onclick = () => {
    current = (current - 1 + cards.length) % cards.length;
    updateCards();
  };
  document.getElementById('carrossel-next').onclick = () => {
    current = (current + 1) % cards.length;
    updateCards();
  };
}
window.addEventListener('DOMContentLoaded', initCarrossel);

// Partículas animadas de fundo para Home e Experiência
function criarParticulasBg(containerId, cor1, cor2) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w = canvas.width, h = canvas.height;
  let particles = [];
  for (let i = 0; i < 22; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 1.2,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? cor1 : cor2,
      alpha: Math.random() * 0.5 + 0.5
    });
  }
  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    w = canvas.width;
    h = canvas.height;
  });
}
window.addEventListener('DOMContentLoaded', () => {
  criarParticulasBg('particles-home', '#a8325a', '#6d1835');
  criarParticulasBg('particles-experiencia', '#a8325a', '#b08ca7');
});

// Mensagem secreta surpresa com efeito typing e partículas
function mostrarMensagemSecreta() {
  const msg = '💡 Mensagem secreta: A criatividade é o superpoder dos programadores! Experimente, erre, aprenda e crie algo incrível hoje. 🚀';
  const el = document.getElementById('mensagem-secreta');
  const texto = document.getElementById('mensagem-secreta-texto');
  if (!el || !texto) return;
  el.style.display = 'block';
  texto.textContent = '';
  let i = 0;
  function typing() {
    if (i < msg.length) {
      texto.textContent += msg[i];
      i++;
      setTimeout(typing, 28 + Math.random() * 40);
    }
  }
  typing();
  // Partículas brilhantes
  const canvas = document.getElementById('particulas-mensagem');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width, h = canvas.height;
    let particles = [];
    for (let i = 0; i < 18; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        color: Math.random() > 0.5 ? '#a8325a' : '#f3e9f7',
        alpha: Math.random() * 0.5 + 0.5
      });
    }
    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
}
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(mostrarMensagemSecreta, 4200);
  const btnFechar = document.getElementById('fechar-mensagem-secreta');
  if (btnFechar) {
    btnFechar.onclick = () => {
      document.getElementById('mensagem-secreta').style.display = 'none';
    };
  }
});

// ... script de navegação ...
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
  if(sectionId === 'home') {
    document.querySelector('nav a[href="#home"]').classList.add('active');
  } else {
    document.querySelector('nav a[href="#experiencia"]').classList.add('active');
  }
}
// Exibe a seção correta ao carregar com hash na URL
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#','');
  if(hash === 'experiencia') showSection('experiencia');
  else showSection('home');
}); 