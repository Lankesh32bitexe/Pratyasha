/* ==========================================================================
   GLOBAL UTILITIES & STATE
   ========================================================================== */
const state = {
  theme: localStorage.getItem('theme') || 'light',
  isMuted: true,
  currentPhotoIndex: 0,
  photos: []
};

// Colors for balloons and confetti
const PALETTE = [
  '#c97d8b', '#e6a17b', '#f0c38e', '#b46b78', '#f9dbbd', 
  '#a3c3d9', '#d6e2e9', '#bcd4e6', '#c4e0e5', '#e8dbfc'
];

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  state.theme = theme;
  
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

// Initialise Theme
setTheme(state.theme);

themeToggleBtn.addEventListener('click', () => {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  // Trigger a small confetti burst on theme change for fun!
  createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
});

/* ==========================================================================
   FLOATING BALLOONS & GLOWING LANTERNS GENERATOR
   ========================================================================== */
let poppedCount = 0;
const BLESSINGS = [
  "Wishing you infinite smiles! 🌸",
  "May your day be filled with magic! ✨",
  "Cheers to a spectacular year! 🥂",
  "You are a true shining star! 🌟",
  "May all your dreams take flight! 🎈",
  "Wishing you unlimited happiness! 💖",
  "To a wonderful sister! 🧸",
  "May your path shine bright! 🗺️",
  "Sending you endless love! 💕",
  "May you conquer every peak! 🏔️"
];

function popBalloon(balloon, event) {
  if (balloon.classList.contains('popped')) return;
  balloon.classList.add('popped');

  // Increment counter
  poppedCount++;
  
  // Confetti burst of balloon's specific color
  const rect = balloon.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const balloonColor = balloon.style.backgroundColor || '#ffc04d';
  
  createColorConfettiBurst(x, y, balloonColor, 25);

  // Play chime pop synth sound
  if (!state.isMuted) {
    playPopChime();
  }

  // Floating blessing text
  spawnFloatingBlessing(x, y);

  // Update HUD
  const hudProgress = document.getElementById('hud-progress');
  const hudCounter = document.getElementById('hud-counter');
  if (hudProgress) {
    const pVal = Math.min(poppedCount, 5);
    hudProgress.style.width = `${(pVal / 5) * 100}%`;
  }
  if (hudCounter) {
    hudCounter.innerText = `${poppedCount}/5`;
  }

  // Check 5 pops unlock
  if (poppedCount === 5) {
    setTimeout(unlockSurpriseSurprise, 600);
  }

  // Spawn replacement balloon after 2s
  setTimeout(() => {
    balloon.remove();
    spawnSingleBalloon();
  }, 300);
}

function spawnSingleBalloon() {
  const container = document.getElementById('bubble-container');
  if (!container) return;
  
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  
  const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const size = Math.random() * 40 + 50;
  const left = Math.random() * 95; // slightly inset to prevent offscreen
  
  balloon.style.backgroundColor = color;
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.25}px`;
  balloon.style.left = `${left}%`;
  balloon.style.animationDelay = '0s';
  balloon.style.animationDuration = `${Math.random() * 10 + 10}s`;
  
  // Centered white icon emoji
  const emojiSpan = document.createElement('span');
  emojiSpan.innerText = ['✨', '💖', '🌸', '🎂', '🎈', '🎁', '🧸'][Math.floor(Math.random() * 7)];
  emojiSpan.style.position = 'absolute';
  emojiSpan.style.top = '40%';
  emojiSpan.style.left = '50%';
  emojiSpan.style.transform = 'translate(-50%, -50%)';
  emojiSpan.style.fontSize = `${size * 0.35}px`;
  emojiSpan.style.pointerEvents = 'none';
  emojiSpan.style.color = '#ffffff';
  emojiSpan.style.textShadow = '0 1px 4px rgba(0,0,0,0.15)';
  balloon.appendChild(emojiSpan);
  
  const string = document.createElement('div');
  string.className = 'balloon-string';
  balloon.appendChild(string);
  
  // Click event
  balloon.addEventListener('click', (e) => {
    popBalloon(balloon, e);
  });
  
  container.appendChild(balloon);
}

function createBalloons() {
  const container = document.getElementById('bubble-container');
  if (!container) return;

  const balloonCount = window.innerWidth < 768 ? 10 : 22;
  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const size = Math.random() * 40 + 50; 
    const left = Math.random() * 95; 
    const delay = Math.random() * 8; 
    const duration = Math.random() * 10 + 10; 
    
    balloon.style.backgroundColor = color;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.25}px`;
    balloon.style.left = `${left}%`;
    balloon.style.animationDelay = `${delay}s`;
    balloon.style.animationDuration = `${duration}s`;
    
    const emojiSpan = document.createElement('span');
    emojiSpan.innerText = ['✨', '💖', '🌸', '🎂', '🎈', '🎁', '🧸'][Math.floor(Math.random() * 7)];
    emojiSpan.style.position = 'absolute';
    emojiSpan.style.top = '40%';
    emojiSpan.style.left = '50%';
    emojiSpan.style.transform = 'translate(-50%, -50%)';
    emojiSpan.style.fontSize = `${size * 0.35}px`;
    emojiSpan.style.pointerEvents = 'none';
    emojiSpan.style.color = '#ffffff';
    emojiSpan.style.textShadow = '0 1px 4px rgba(0,0,0,0.15)';
    balloon.appendChild(emojiSpan);
    
    const string = document.createElement('div');
    string.className = 'balloon-string';
    balloon.appendChild(string);
    
    // Add Click listener
    balloon.addEventListener('click', (e) => {
      popBalloon(balloon, e);
    });
    
    container.appendChild(balloon);
  }
}
createBalloons();

/* ==========================================================================
   CONFETTI & PARTICLE CANVAS SYSTEM (Twinkling Stars & Pastel Sparkles)
   ========================================================================== */
const canvas = document.getElementById('effects-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let stars = [];
let shootingStars = [];
let ambientSparkles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (state.theme === 'dark') {
    initStars();
  }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 1. Twinkling Stars (Dark Mode)
class TwinkleStar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.6 + 0.4;
    this.alpha = Math.random();
    this.speed = Math.random() * 0.02 + 0.005;
    this.twinkleFactor = Math.random() * Math.PI * 2;
  }
  
  update() {
    this.twinkleFactor += this.speed;
    this.alpha = (Math.sin(this.twinkleFactor) + 1) / 2 * 0.8 + 0.2; 
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initStars() {
  stars = [];
  for (let i = 0; i < 75; i++) {
    stars.push(new TwinkleStar());
  }
}

// 2. Shooting Stars (Dark Mode)
class ShootingStar {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * (canvas.height * 0.4); 
    this.len = Math.random() * 60 + 30;
    this.speed = Math.random() * 8 + 5;
    this.angle = Math.PI / 6; 
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.opacity = 1;
    this.active = true;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.015;
    if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
      this.active = false;
    }
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = 'rgba(255, 240, 200, 0.8)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 1.5, this.y - this.vy * 1.5);
    ctx.stroke();
    ctx.restore();
  }
}

// 3. Ambient Sparkles & Hearts (Light Mode)
class AmbientSparkle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10;
    this.size = Math.random() * 8 + 4;
    this.type = Math.random() < 0.4 ? 'heart' : 'sparkle'; 
    this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    this.vy = -(Math.random() * 1.2 + 0.4); 
    this.vx = Math.random() * 0.8 - 0.4; 
    this.opacity = Math.random() * 0.5 + 0.4;
    this.fadeSpeed = Math.random() * 0.004 + 0.002;
    this.phase = Math.random() * Math.PI * 2;
    this.weaveSpeed = Math.random() * 0.02 + 0.01;
  }
  
  update() {
    this.y += this.vy;
    this.phase += this.weaveSpeed;
    this.x += Math.sin(this.phase) * 0.3;
    this.opacity -= this.fadeSpeed;
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    
    if (this.type === 'heart') {
      const x = this.x;
      const y = this.y;
      const size = this.size;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - size/2, y - size/2, x - size, y + size/3, x, y + size);
      ctx.bezierCurveTo(x + size, y + size/3, x + size/2, y - size/2, x, y);
      ctx.fill();
    } else {
      const x = this.x;
      const y = this.y;
      const r = this.size / 2;
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.quadraticCurveTo(x, y, x, y + r);
      ctx.quadraticCurveTo(x, y, x - r, y);
      ctx.quadraticCurveTo(x, y, x, y - r);
      ctx.fill();
    }
    ctx.restore();
  }
}

// 4. Custom Confetti Particles
class ConfettiParticle {
  constructor(x, y, isBurst = false, customColor = null) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 4;
    this.color = customColor || PALETTE[Math.floor(Math.random() * PALETTE.length)];
    
    if (isBurst) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 2; 
    } else {
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 + 1;
    }
    
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 4 - 2;
    this.opacity = 1;
    this.gravity = 0.12;
    this.decay = Math.random() * 0.01 + 0.008;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity; 
    this.rotation += this.rotationSpeed;
    this.opacity -= this.decay;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function createConfettiBurst(x, y, count = 80) {
  for (let i = 0; i < count; i++) {
    particles.push(new ConfettiParticle(x, y, true));
  }
}

function createColorConfettiBurst(x, y, color, count = 25) {
  for (let i = 0; i < count; i++) {
    particles.push(new ConfettiParticle(x, y, true, color));
  }
}

function spawnAmbientConfetti() {
  if (particles.length < 50 && Math.random() < 0.05) {
    particles.push(new ConfettiParticle(Math.random() * canvas.width, -10, false));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (state.theme === 'dark') {
    if (stars.length === 0) {
      initStars();
    }
    stars.forEach(s => {
      s.update();
      s.draw();
    });
    
    if (shootingStars.length < 2 && Math.random() < 0.004) {
      shootingStars.push(new ShootingStar());
    }
    shootingStars = shootingStars.filter(s => s.active);
    shootingStars.forEach(s => {
      s.update();
      s.draw();
    });
    
    ambientSparkles = [];
  } else {
    stars = [];
    shootingStars = [];
    
    if (ambientSparkles.length < 30 && Math.random() < 0.06) {
      ambientSparkles.push(new AmbientSparkle());
    }
    ambientSparkles = ambientSparkles.filter(s => s.opacity > 0 && s.y > -20);
    ambientSparkles.forEach(s => {
      s.update();
      s.draw();
    });
  }
  
  spawnAmbientConfetti();
  particles = particles.filter(p => p.opacity > 0 && p.y < canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Hook up Celebrate Button
const celebrateBtn = document.getElementById('celebrate-btn');
celebrateBtn.addEventListener('click', (e) => {
  const rect = celebrateBtn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  createConfettiBurst(x, y, 100);
  
  if (!state.isMuted) {
    playFanfare();
  }
});

/* ==========================================================================
   WEB AUDIO API SYNTHESIZER
   ========================================================================== */
let audioCtx = null;
let musicInterval = null;
let currentNoteIndex = 0;

// Happy Birthday melody frequencies (C4 to C5 range)
// Note: [Frequency (Hz), Duration (ms), Delay offset before next note (ms)]
const MELODY = [
  [261.63, 300, 350], // Happy (C4)
  [261.63, 100, 150], // birth- (C4)
  [293.66, 400, 450], // day (D4)
  [261.63, 400, 450], // to (C4)
  [349.23, 400, 450], // you (F4)
  [329.63, 800, 900], // , (E4)
  
  [261.63, 300, 350], // Happy (C4)
  [261.63, 100, 150], // birth- (C4)
  [293.66, 400, 450], // day (D4)
  [261.63, 400, 450], // to (C4)
  [392.00, 400, 450], // you (G4)
  [349.23, 800, 900], // , (F4)
  
  [261.63, 300, 350], // Happy (C4)
  [261.63, 100, 150], // birth- (C4)
  [523.25, 400, 450], // day (C5)
  [440.00, 400, 450], // dear (A4)
  [349.23, 400, 450], // Prat- (F4)
  [329.63, 400, 450], // ya- (E4)
  [293.66, 800, 950], // sha (D4)
  
  [466.16, 300, 350], // Hap- (Bb4)
  [466.16, 100, 150], // py (Bb4)
  [440.00, 400, 450], // birth- (A4)
  [349.23, 400, 450], // day (F4)
  [392.00, 400, 450], // to (G4)
  [349.23, 800, 1500] // you (F4)
];

const musicToggleBtn = document.getElementById('music-toggle');
const musicIcon = musicToggleBtn.querySelector('i');

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playNote(freq, duration) {
  if (!audioCtx) return;
  
  // Custom synthesizer graph for sweet music-box chiming sound
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'triangle'; // triangle gives soft, chime-like quality
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  // Vibrato (Frequency Modulation) for richness
  const vibrato = audioCtx.createOscillator();
  const vibratoGain = audioCtx.createGain();
  vibrato.frequency.value = 6; // 6Hz speed
  vibratoGain.gain.value = freq * 0.015; // pitch bend depth
  
  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc.frequency);
  vibrato.start();
  
  // Envelope for chime note (rapid attack, slow decay/release)
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05); // quick fade in
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration / 1000); // fade out
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  
  setTimeout(() => {
    osc.stop();
    vibrato.stop();
  }, duration);
}

function startMelodyLoop() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  function triggerNextNote() {
    if (state.isMuted) return;
    
    const [freq, duration, delay] = MELODY[currentNoteIndex];
    playNote(freq, duration);
    
    // Spawn floating music note particle
    if (typeof spawnMusicNoteParticle === 'function') {
      spawnMusicNoteParticle();
    }
    
    // Pulse music button on note hits
    musicToggleBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      musicToggleBtn.style.transform = 'scale(1)';
    }, 150);
    
    currentNoteIndex = (currentNoteIndex + 1) % MELODY.length;
    musicInterval = setTimeout(triggerNextNote, delay);
  }
  
  triggerNextNote();
}

function stopMelodyLoop() {
  clearTimeout(musicInterval);
  musicInterval = null;
}

// Special button click effect fanfare
function playFanfare() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  const now = audioCtx.currentTime;
  const chords = [349.23, 440.00, 523.25, 659.25]; // F Major 7 (arpeggiated)
  
  chords.forEach((freq, idx) => {
    setTimeout(() => {
      playNote(freq, 600);
    }, idx * 100);
  });
}

// Music Button Handler
musicToggleBtn.addEventListener('click', () => {
  state.isMuted = !state.isMuted;
  
  if (!state.isMuted) {
    musicIcon.className = 'fa-solid fa-volume-high';
    musicToggleBtn.setAttribute('title', 'Mute Music');
    musicToggleBtn.classList.add('playing');
    startMelodyLoop();
  } else {
    musicIcon.className = 'fa-solid fa-music';
    musicToggleBtn.setAttribute('title', 'Play Sweet Chime Music');
    musicToggleBtn.classList.remove('playing');
    stopMelodyLoop();
  }
});

// Share Button Handler
const shareBtn = document.getElementById('share-btn');
shareBtn.addEventListener('click', () => {
  const shareData = {
    title: document.title,
    text: 'Check out this birthday celebration! 🎉',
    url: window.location.href
  };
  const fallbackCopy = () => {
    navigator.clipboard.writeText(shareData.url).then(() => {
      showToast('Link copied to clipboard!', 'info');
    }).catch(() => {
      showToast('Failed to copy link.', 'error');
    });
  };
  if (navigator.share) {
    navigator.share(shareData).catch(err => {
      console.error('Share failed:', err);
      fallbackCopy();
    });
  } else {
    fallbackCopy();
  }
});

/* ==========================================================================
   POLAROID LIGHTBOX CAROUSEL
   ========================================================================== */
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const polaroidCards = document.querySelectorAll('.polaroid-card');

// Populate image sources in state
polaroidCards.forEach((card, idx) => {
  const img = card.querySelector('img');
  const caption = card.querySelector('.polaroid-caption').innerText;
  state.photos.push({
    src: img.getAttribute('src'),
    caption: caption
  });
  
  // Attach event listener
  card.addEventListener('click', () => {
    openLightbox(idx);
  });
});

function openLightbox(index) {
  state.currentPhotoIndex = index;
  updateLightboxContent();
  lightboxModal.classList.add('active');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // stop scroll background
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const photo = state.photos[state.currentPhotoIndex];
  lightboxImg.setAttribute('src', photo.src);
  lightboxCaption.innerText = photo.caption;
}

function navigateLightbox(direction) {
  state.currentPhotoIndex = (state.currentPhotoIndex + direction + state.photos.length) % state.photos.length;
  updateLightboxContent();
}

// Lightbox Listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

// Clicking backdrop closes modal
lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) closeLightbox();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (!lightboxModal.classList.contains('active')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

/* ==========================================================================
   CUSTOM TOAST & CONFIRMATION MODALS
   ========================================================================== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-xmark';
  if (type === 'info') icon = 'fa-circle-info';

  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
    <div class="toast-message">${message}</div>
  `;

  container.appendChild(toast);

  // Auto-remove toast after animation finishes (4s total)
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Custom Confirm Modal Logic
const confirmModal = document.getElementById('confirm-modal');
const confirmCancelBtn = document.getElementById('confirm-cancel');
const confirmOkBtn = document.getElementById('confirm-ok');
let confirmCallback = null;

function showConfirmModal(message, onConfirm) {
  if (!confirmModal) return;
  document.getElementById('confirm-modal-msg').innerText = message;
  confirmCallback = onConfirm;
  confirmModal.classList.add('active');
  confirmModal.setAttribute('aria-hidden', 'false');
}

function hideConfirmModal() {
  if (!confirmModal) return;
  confirmModal.classList.remove('active');
  confirmModal.setAttribute('aria-hidden', 'true');
  confirmCallback = null;
}

if (confirmCancelBtn) confirmCancelBtn.addEventListener('click', hideConfirmModal);
if (confirmOkBtn) {
  confirmOkBtn.addEventListener('click', () => {
    if (confirmCallback) confirmCallback();
    hideConfirmModal();
  });
}

if (confirmModal) {
  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) hideConfirmModal();
  });
}

/* ==========================================================================
   INTERACTIVE GUESTBOOK (WISHING WELL)
   ========================================================================== */
const wishForm = document.getElementById('wish-form');
const wishBoard = document.getElementById('wish-board');
const clearBoardBtn = document.getElementById('clear-board');

// Color classes list for sticky notes
const NOTE_COLORS = ['note-color-pink', 'note-color-yellow', 'note-color-blue', 'note-color-green'];

let isUsingLocalFallback = false;

// Robust dual-mode fetch
async function getSavedWishes() {
  // 1. Try relative API
  try {
    const response = await fetch('/api/wishes');
    if (response.ok) {
      isUsingLocalFallback = false;
      return await response.json();
    }
  } catch (e) {
    console.log('Relative API fetch failed, trying local fallback server...');
  }

  // 2. Try Node.js server fallback on port 3000 if we are on localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    try {
      const response = await fetch('http://localhost:3000/api/wishes');
      if (response.ok) {
        isUsingLocalFallback = false;
        return await response.json();
      }
    } catch (e) {
      console.log('Local port 3000 server fallback failed...');
    }
  }

  // 3. Fallback to LocalStorage
  isUsingLocalFallback = true;
  try {
    const localWishes = localStorage.getItem('birthday_wishes');
    return localWishes ? JSON.parse(localWishes) : [];
  } catch (e) {
    console.error('Failed to parse local wishes:', e);
    return [];
  }
}

function renderWish(wish, index) {
  const note = document.createElement('div');
  
  // Pick sticky color and random rotation for realism
  const colorClass = NOTE_COLORS[index % NOTE_COLORS.length];
  const rot = (Math.random() * 8 - 4).toFixed(2); // rotation between -4deg and 4deg
  
  note.className = `sticky-note ${colorClass}`;
  note.style.setProperty('--rotation', `${rot}deg`);
  
  note.innerHTML = `
    <div>
      <div class="sticky-avatar">${wish.avatar}</div>
      <div class="sticky-msg">"${wish.message}"</div>
    </div>
    <div class="sticky-author">- ${wish.name}</div>
  `;
  
  wishBoard.appendChild(note);
}

async function displayAllWishes() {
  if (!wishBoard) return;
  wishBoard.innerHTML = '';
  const wishes = await getSavedWishes();

  if (wishes.length === 0) {
    wishBoard.innerHTML = `
      <div class="wish-board-empty">
        <div class="wish-board-empty-icon">💌</div>
        <p>Be the first to leave a birthday wish!</p>
        <span>Fill in the form and pin your message here.</span>
      </div>
    `;
    return;
  }

  wishes.forEach((wish, idx) => {
    renderWish(wish, idx);
  });
}

// Initialise display
displayAllWishes();

// Robust dual-mode post
async function saveWish(newWish) {
  if (!isUsingLocalFallback) {
    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish)
      });
      if (response.ok) {
        showToast('Wish pinned to the wall! 💖', 'success');
        return true;
      }
    } catch (e) {
      console.log('Failed to post to relative API, trying localhost:3000...');
    }

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      try {
        const response = await fetch('http://localhost:3000/api/wishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWish)
        });
        if (response.ok) {
          showToast('Wish pinned to the wall! 💖', 'success');
          return true;
        }
      } catch (e) {
        console.log('Failed to post to localhost:3000...');
      }
    }
  }

  // Fallback to LocalStorage
  try {
    const localWishes = localStorage.getItem('birthday_wishes');
    const wishes = localWishes ? JSON.parse(localWishes) : [];
    wishes.unshift({ ...newWish, timestamp: Date.now() });
    localStorage.setItem('birthday_wishes', JSON.stringify(wishes));
    
    if (!isUsingLocalFallback) {
      isUsingLocalFallback = true;
      showToast('Wish pinned! (Saved locally on your browser)', 'info');
    } else {
      showToast('Wish pinned to the wall! 💖', 'success');
    }
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    showToast('Could not save your wish. Please try again.', 'error');
    return false;
  }
}

// Form Submit Handler
if (wishForm) {
  wishForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');
    const selectedAvatar = document.querySelector('input[name="avatar"]:checked').value;

    const newWish = {
      name: nameInput.value.trim(),
      avatar: selectedAvatar,
      message: messageInput.value.trim()
    };

    const success = await saveWish(newWish);
    if (success) {
      await displayAllWishes();
      
      // Reward User with confetti burst
      const rect = wishForm.getBoundingClientRect();
      createConfettiBurst(rect.left + rect.width / 2, rect.top, 80);
      
      // Reset Form
      wishForm.reset();
    }
  });
}

// Robust dual-mode delete
async function deleteWishes() {
  if (!isUsingLocalFallback) {
    try {
      const response = await fetch('/api/wishes', { method: 'DELETE' });
      if (response.ok) {
        showToast('Wishes wall cleared successfully.', 'success');
        return true;
      }
    } catch (e) {
      console.log('Failed to delete relative API, trying localhost:3000...');
    }

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      try {
        const response = await fetch('http://localhost:3000/api/wishes', { method: 'DELETE' });
        if (response.ok) {
          showToast('Wishes wall cleared successfully.', 'success');
          return true;
        }
      } catch (e) {
        console.log('Failed to delete on localhost:3000...');
      }
    }
  }

  try {
    localStorage.removeItem('birthday_wishes');
    showToast('Wishes wall cleared successfully.', 'success');
    return true;
  } catch (e) {
    console.error('Failed to clear localStorage:', e);
    showToast('Failed to clear wishes.', 'error');
    return false;
  }
}

// Reset Board Handler
if (clearBoardBtn) {
  clearBoardBtn.addEventListener('click', () => {
    showConfirmModal('Do you really want to clear all birthday wishes from the wall? This cannot be undone.', async () => {
      const success = await deleteWishes();
      if (success) {
        await displayAllWishes();
      }
    });
  });
}

/* ==========================================================================
   MAGICAL COUNTDOWN TIMER
   ========================================================================== */
const targetDate = new Date('May 23, 2026 00:00:00').getTime();
const countdownContainer = document.getElementById('countdown-container');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    if (countdownContainer) {
      countdownContainer.innerHTML = `
        <div class="countdown-label">🎉 IT'S HER SPECIAL DAY! 🎉</div>
        <div style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: var(--primary); text-shadow: 0 2px 10px rgba(201,125,139,0.2); animation: pulseDivider 2s infinite;">
          Happy Birthday, Pratyasha! 🌸✨
        </div>
      `;
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysSpan) daysSpan.innerText = days.toString().padStart(2, '0');
  if (hoursSpan) hoursSpan.innerText = hours.toString().padStart(2, '0');
  if (minutesSpan) minutesSpan.innerText = minutes.toString().padStart(2, '0');
  if (secondsSpan) secondsSpan.innerText = seconds.toString().padStart(2, '0');
}

// Initialise and start interval
updateCountdown();
setInterval(updateCountdown, 1000);

/* ==========================================================================
   INTERACTIVE QUIZ SYSTEM
   ========================================================================== */
const quizQuestions = document.querySelectorAll('.quiz-question-card');
const quizProgress = document.getElementById('quiz-progress');
const quizSuccessCard = document.getElementById('quiz-success-card');
const quizRestartBtn = document.getElementById('quiz-restart-btn');

const QUIZ_ANSWERS = [1, 0, 1]; // Correct answers: book, laugh, landscapes
let currentQuizQuestion = 0;
let quizCompleted = false;

quizQuestions.forEach((card, qIndex) => {
  const optButtons = card.querySelectorAll('.quiz-opt-btn');
  optButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizCompleted) return;
      
      const selectedOpt = parseInt(btn.getAttribute('data-opt'), 10);
      const correctOpt = QUIZ_ANSWERS[qIndex];
      
      if (selectedOpt === correctOpt) {
        btn.classList.add('correct');
        if (!state.isMuted && audioCtx) {
          playNote(523.25, 200); // C5
          setTimeout(() => playNote(659.25, 300), 120); // E5
        }
        
        optButtons.forEach(b => b.style.pointerEvents = 'none');
        
        setTimeout(() => {
          advanceQuiz();
        }, 1200);
      } else {
        btn.classList.add('wrong');
        if (!state.isMuted && audioCtx) {
          playNote(220.00, 400); // Fail buzzer
        }
        
        setTimeout(() => {
          btn.classList.remove('wrong');
        }, 800);
      }
    });
  });
});

function advanceQuiz() {
  const activeCard = quizQuestions[currentQuizQuestion];
  if (activeCard) activeCard.classList.remove('active');
  
  currentQuizQuestion++;
  const progressPercent = ((currentQuizQuestion / quizQuestions.length) * 100).toFixed(0);
  if (quizProgress) quizProgress.style.width = `${progressPercent}%`;
  
  if (currentQuizQuestion < quizQuestions.length) {
    const nextCard = quizQuestions[currentQuizQuestion];
    if (nextCard) nextCard.classList.add('active');
  } else {
    quizCompleted = true;
    if (quizSuccessCard) quizSuccessCard.classList.add('active');
    
    // Confetti rain!
    const rect = document.getElementById('quiz-container').getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createConfettiBurst(x, y, 120);
    setTimeout(() => createConfettiBurst(x - 120, y - 40, 60), 300);
    setTimeout(() => createConfettiBurst(x + 120, y - 40, 60), 600);
    
    showToast('🏆 Pratyasha Expert status unlocked! 🎉', 'success');
  }
}

if (quizRestartBtn) {
  quizRestartBtn.addEventListener('click', restartQuiz);
}

function restartQuiz() {
  quizCompleted = false;
  currentQuizQuestion = 0;
  if (quizProgress) quizProgress.style.width = '0%';
  
  if (quizSuccessCard) quizSuccessCard.classList.remove('active');
  
  quizQuestions.forEach((card, idx) => {
    card.classList.remove('active');
    const optButtons = card.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
      btn.classList.remove('correct', 'wrong');
      btn.style.pointerEvents = 'auto';
    });
    
    if (idx === 0) card.classList.add('active');
  });
}

/* ==========================================================================
   FLOATING MUSIC NOTES GENERATOR
   ========================================================================== */
function spawnMusicNoteParticle() {
  const btn = document.getElementById('music-toggle');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const particle = document.createElement('span');
  particle.className = 'music-note-particle';
  
  const notes = ['🎵', '🎶', '🎼', '✨', '💖', '🎹'];
  particle.innerText = notes[Math.floor(Math.random() * notes.length)];
  
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  const dx = (Math.random() * 80 - 40).toFixed(0);
  const rot = (Math.random() * 60 - 30).toFixed(0);
  particle.style.setProperty('--dx', `${dx}px`);
  particle.style.setProperty('--rot', `${rot}deg`);
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 2500);
}

/* ==========================================================================
   POLAROID 3D PARALLAX EFFECT
   ========================================================================== */
const cards = document.querySelectorAll('.polaroid-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate inside element
    const y = e.clientY - rect.top;  // y coordinate inside element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Degrees rotation limits: -15deg to 15deg
    const rotateY = ((x - centerX) / centerX * 15).toFixed(2);
    const rotateX = (-(y - centerY) / centerY * 15).toFixed(2);
    
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    // Reset rotation styles on mouse leave
    card.style.transform = '';
  });
});

/* ==========================================================================
   POP SYSTEM SYNTH & SURPRISE UNLOCK MECHANICAL ENGINE
   ========================================================================== */
function playPopChime() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const now = audioCtx.currentTime;
  
  // Create bubble pop synthesizer chimer
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(750, now + 0.1);
  
  gainNode.gain.setValueAtTime(0.18, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

function spawnFloatingBlessing(x, y) {
  const el = document.createElement('div');
  el.className = 'floating-blessing-text';
  el.innerText = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
  
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  
  document.body.appendChild(el);
  
  setTimeout(() => el.remove(), 3500);
}

function unlockSurpriseSurprise() {
  createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 120);
  setTimeout(() => createConfettiBurst(window.innerWidth / 4, window.innerHeight / 2, 60), 250);
  setTimeout(() => createConfettiBurst((window.innerWidth * 3) / 4, window.innerHeight / 2, 60), 500);

  if (!state.isMuted) {
    playFanfare();
    setTimeout(playFanfare, 450);
  }

  const modal = document.getElementById('surprise-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
  
  showToast('🎁 Sibling Love surprise card unlocked! 🎉', 'success');
}

// Hook up Surprise Modal Event Handlers
const surpriseModal = document.getElementById('surprise-modal');
const surpriseClose = document.getElementById('surprise-close');
const surpriseCelebrateBtn = document.getElementById('surprise-celebrate');

if (surpriseClose) {
  surpriseClose.addEventListener('click', () => {
    if (surpriseModal) {
      surpriseModal.classList.remove('active');
      surpriseModal.setAttribute('aria-hidden', 'true');
    }
  });
}

if (surpriseModal) {
  surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) {
      surpriseModal.classList.remove('active');
      surpriseModal.setAttribute('aria-hidden', 'true');
    }
  });
}

if (surpriseCelebrateBtn) {
  surpriseCelebrateBtn.addEventListener('click', () => {
    createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 150);
    if (!state.isMuted) {
      playFanfare();
    }
    showToast('🎂 Double Birthday Confetti Shower! 🎉', 'success');
  });
}
