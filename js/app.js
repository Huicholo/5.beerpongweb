// ============================================================
//  BEERPONG APP — lógica principal
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initStats();
  initTabs();
  renderGanadores();
  renderPerdedores();
  renderPerfiles();
  renderHistorial();
  checkRacha();
});

// ─── STATS ──────────────────────────────────────────────────
function initStats() {
  const total    = PARTIDAS.length;
  const ganadas  = PARTIDAS.filter(p => p.ganador === 'nosotros').length;
  const perdidas = total - ganadas;
  const pct      = total ? Math.round((ganadas / total) * 100) : 0;

  // Win rate ring
  const circle = document.querySelector('.ring-progress');
  if (circle) {
    const r = parseFloat(circle.getAttribute('r'));
    const circ = 2 * Math.PI * r;
    circle.style.strokeDasharray = circ;
    circle.style.strokeDashoffset = circ - (circ * pct / 100);
  }

  animCounter('stat-total',   total);
  animCounter('stat-ganadas', ganadas);
  animCounter('stat-perdidas', perdidas);
  animCounter('stat-pct', pct, '%');

  // Racha actual
  const racha = calcRacha();
  const rachaEl = document.getElementById('racha-badge');
  if (rachaEl) {
    if (racha.count > 1) {
      rachaEl.textContent = racha.tipo === 'win'
        ? `🔥 ${racha.count} victorias seguidas`
        : `💀 ${racha.count} derrotas seguidas`;
      rachaEl.className = 'racha-badge ' + (racha.tipo === 'win' ? 'racha-win' : 'racha-loss');
      rachaEl.style.display = 'inline-block';
    }
  }

  // Stats por jugador
  let bombonTiros = 0, munpecoTiros = 0;
  PARTIDAS.forEach(p => {
    bombonTiros  += p.bombon_tiros || 0;
    munpecoTiros += p.munpeco_tiros || 0;
  });
  const elBombon  = document.getElementById('stat-bombon-tiros');
  const elMunpeco = document.getElementById('stat-munpeco-tiros');
  if (elBombon)  animCounter('stat-bombon-tiros',  bombonTiros);
  if (elMunpeco) animCounter('stat-munpeco-tiros', munpecoTiros);
}

function calcRacha() {
  const ordenadas = [...PARTIDAS].sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
  if (!ordenadas.length) return { count: 0, tipo: 'win' };
  const tipo = ordenadas[0].ganador === 'nosotros' ? 'win' : 'loss';
  let count = 0;
  for (const p of ordenadas) {
    const esWin = p.ganador === 'nosotros';
    if ((tipo === 'win' && esWin) || (tipo === 'loss' && !esWin)) count++;
    else break;
  }
  return { count, tipo };
}

function animCounter(id, target, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = 1200;
  const start = performance.now();
  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ─── RACHA CONFETTI ─────────────────────────────────────────
function checkRacha() {
  const racha = calcRacha();
  if (racha.tipo === 'win' && racha.count >= 3) {
    setTimeout(launchConfetti, 800);
  }
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#e8b923','#3F7CAC','#F7F8FA','#698D68','#e05c3a'];
  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltSpeed: Math.random() * 0.1 + 0.05
  }));

  let frame = 0;
  const maxFrames = 180;

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      p.tiltAngle += p.tiltSpeed;
      p.y += p.d;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r/2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/2);
      ctx.stroke();
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(draw);
    else { ctx.clearRect(0,0,canvas.width,canvas.height); canvas.style.display='none'; }
  }
  draw();
}

// ─── TABS ───────────────────────────────────────────────────
function initTabs() {
  const tabs    = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t  => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('panel-' + tab.dataset.tab);
      if (target) { target.classList.add('active'); }
    });
  });
}

// ─── GALERÍA HELPER ─────────────────────────────────────────
function buildGallery(container, items) {
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<p class="empty-msg">Aún no hay registros aquí. ¡A jugar! 🍺</p>';
    return;
  }
  container.innerHTML = items.map(item => `
    <div class="photo-card" style="animation-delay:${Math.random()*0.4}s">
      <div class="photo-wrap">
        <img src="${item.foto || PLACEHOLDER}" alt="${item.rival}"
             onerror="this.src='${PLACEHOLDER}'" loading="lazy">
        <div class="photo-overlay">
          <span class="overlay-badge ${item.ganador === 'nosotros' ? 'badge-win' : 'badge-loss'}">
            ${item.ganador === 'nosotros' ? '✅ Los noqueamos' : '☠️ Nos ganaron'}
          </span>
        </div>
      </div>
      <div class="photo-info">
        <h3>${item.rival}</h3>
        <span class="photo-date">${formatFecha(item.fecha)}</span>
        ${item.nota ? `<p class="photo-nota">${item.nota}</p>` : ''}
      </div>
    </div>
  `).join('');
}

// ─── GANADORES (los que NOS ganaron) ────────────────────────
function renderGanadores() {
  const container = document.getElementById('grid-ganadores');
  const items = PARTIDAS
    .filter(p => p.ganador === 'ellos')
    .map(p => ({ ...p, foto: p.foto_rival }));
  buildGallery(container, items);
}

// ─── PERDEDORES (los que les ganamos) ───────────────────────
function renderPerdedores() {
  const container = document.getElementById('grid-perdedores');
  const items = PARTIDAS
    .filter(p => p.ganador === 'nosotros')
    .map(p => ({ ...p, foto: p.foto_rival }));
  buildGallery(container, items);
}

// ─── PERFILES ───────────────────────────────────────────────
function renderPerfiles() {
  ['bombon','munpeco'].forEach(key => {
    const j = JUGADORES[key];
    const wins = PARTIDAS.filter(p => p.ganador === 'nosotros').length;
    const tiros = PARTIDAS.reduce((s,p) => s + (p[key+'_tiros'] || 0), 0);
    const totalTiros = PARTIDAS.reduce((s,p) => s + (p.bombon_tiros||0) + (p.munpeco_tiros||0), 0);
    const pct = totalTiros ? Math.round((tiros / totalTiros) * 100) : 0;

    const card = document.getElementById('perfil-' + key);
    if (!card) return;

    card.querySelector('.perfil-foto').src = j.foto;
    card.querySelector('.perfil-foto').onerror = function(){ this.src = PLACEHOLDER_PLAYER; };
    card.querySelector('.perfil-nombre').textContent = j.nombre;
    card.querySelector('.perfil-alias').textContent = j.alias;
    card.querySelector('.perfil-desc').textContent = j.descripcion;
    card.querySelector('.perfil-habilidad').textContent = j.habilidad;
    card.querySelector('.perfil-tiros').textContent = tiros;
    card.querySelector('.perfil-pct').textContent = pct + '%';
    card.querySelector('.perfil-pct-bar').style.width = pct + '%';
    card.querySelector('.perfil-pct-bar').style.background = j.color;
  });
}

// ─── HISTORIAL ──────────────────────────────────────────────
function renderHistorial() {
  const tbody = document.getElementById('historial-tbody');
  if (!tbody) return;
  const ordenadas = [...PARTIDAS].sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
  tbody.innerHTML = ordenadas.map(p => `
    <tr class="${p.ganador === 'nosotros' ? 'row-win' : 'row-loss'}">
      <td>${formatFecha(p.fecha)}</td>
      <td><strong>${p.rival}</strong></td>
      <td class="${p.ganador === 'nosotros' ? 'result-win' : 'result-loss'}">
        ${p.ganador === 'nosotros' ? '🏆 Victoria' : '💀 Derrota'}
      </td>
      <td>${p.bombon_tiros ?? '-'}</td>
      <td>${p.munpeco_tiros ?? '-'}</td>
      <td class="nota-cell">${p.nota || ''}</td>
    </tr>
  `).join('');
}

// ─── UTILS ──────────────────────────────────────────────────
function formatFecha(fechaStr) {
  if (!fechaStr) return '';
  const [y,m,d] = fechaStr.split('-');
  const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${parseInt(d)} ${meses[parseInt(m)-1]} ${y}`;
}
