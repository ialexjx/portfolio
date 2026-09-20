/**
 * "Kill The Monolith" Retro Cyberpunk Arcade Mini-Game
 * Java 25 Virtual Core vs The Legacy Monolith Bugs
 * Pure HTML5 Canvas + Web Audio API 8-Bit Synthesizer (No external dependencies)
 */

(function () {
    'use strict';

    // Game Audio Synthesizer (Web Audio API)
    let audioCtx = null;
    let audioMuted = false;

    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playTone(freq, type, duration, endFreq, gainVal = 0.1) {
        if (audioMuted || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            if (endFreq) {
                osc.frequency.exponentialRampToValueAtTime(Math.max(10, endFreq), audioCtx.currentTime + duration);
            }
            gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context restrictions
        }
    }

    function playLaserSound() {
        initAudio();
        playTone(900, 'square', 0.09, 180, 0.08);
    }

    function playExplosionSound() {
        initAudio();
        if (audioMuted || !audioCtx) return;
        try {
            const bufferSize = audioCtx.sampleRate * 0.2;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, audioCtx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.2);

            const gain = audioCtx.createGain();
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            noise.start();
        } catch (e) {}
    }

    function playPowerupSound() {
        initAudio();
        if (audioMuted || !audioCtx) return;
        [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
            setTimeout(() => playTone(f, 'sine', 0.1, f * 1.05, 0.1), idx * 60);
        });
    }

    function playDamageSound() {
        initAudio();
        playTone(130, 'sawtooth', 0.2, 55, 0.18);
    }

    function playVictorySound() {
        initAudio();
        if (audioMuted || !audioCtx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((f, idx) => {
            setTimeout(() => playTone(f, 'square', 0.25, null, 0.12), idx * 100);
        });
    }

    // Game Engine State
    let canvas, ctx;
    let animId = null;
    let isRunning = false;
    let gameState = 'START'; // 'START' | 'PLAYING' | 'GAMEOVER' | 'VICTORY'
    let score = 0;
    let jvmHealth = 100;
    let gameTimer = 60;
    let timerInterval = null;
    let lastSpawnTime = 0;
    let lastShotTime = 0;
    let highScore = parseInt(localStorage.getItem('kill_monolith_high_score') || '0', 10);

    const keys = {
        left: false,
        right: false,
        fire: false
    };

    // Player (Java 25 Core Defender)
    const player = {
        x: 320,
        y: 360,
        width: 44,
        height: 32,
        speed: 7,
        weaponType: 'single', // 'single' | 'spread'
        weaponTimer: 0,
        shield: false,
        shieldTimer: 0
    };

    let lasers = [];
    let enemies = [];
    let powerups = [];
    let particles = [];
    let floatingTexts = [];

    // Enemy Type Definitions
    const ENEMY_TYPES = [
        { type: 'OOM', label: 'OutOfMemory', color: '#f43f5e', hp: 3, points: 60, speed: 1.2, width: 38, height: 34 },
        { type: 'DEADLOCK', label: 'Deadlock', color: '#f59e0b', hp: 2, points: 40, speed: 1.6, width: 34, height: 30 },
        { type: 'SEQ_SCAN', label: 'Seq Scan', color: '#eab308', hp: 1, points: 25, speed: 2.2, width: 30, height: 26 },
        { type: 'TIMEOUT', label: '30s Timeout', color: '#c084fc', hp: 1, points: 35, speed: 2.6, width: 32, height: 28, zigzag: true },
        { type: 'NPE', label: 'NullPointer', color: '#38bdf8', hp: 1, points: 20, speed: 2.8, width: 28, height: 24 }
    ];

    function resetGame() {
        score = 0;
        jvmHealth = 100;
        gameTimer = 60;
        player.x = (canvas ? canvas.width / 2 : 320) - player.width / 2;
        player.weaponType = 'single';
        player.weaponTimer = 0;
        player.shield = false;
        player.shieldTimer = 0;
        lasers = [];
        enemies = [];
        powerups = [];
        particles = [];
        floatingTexts = [];
        updateHUD();
    }

    function updateHUD() {
        const scoreEl = document.getElementById('arcade-score');
        const tpsEl = document.getElementById('arcade-tps');
        const healthEl = document.getElementById('arcade-health');
        const highEl = document.getElementById('arcade-high-score');

        const tpsPurged = Math.min(2500, Math.floor(score * 2.5));
        if (scoreEl) scoreEl.textContent = score.toString();
        if (tpsEl) tpsEl.textContent = `${tpsPurged} / 2,500`;
        if (healthEl) {
            healthEl.textContent = `${Math.max(0, jvmHealth)}%`;
            healthEl.className = jvmHealth > 50 ? 'font-bold text-emerald-400 text-sm' : (jvmHealth > 25 ? 'font-bold text-amber-400 text-sm' : 'font-bold text-rose-400 text-sm animate-pulse');
        }
        if (highEl) highEl.textContent = Math.max(score, highScore).toString();
    }

    function addFloatingText(text, x, y, color = '#38bdf8') {
        floatingTexts.push({
            text: text,
            x: x,
            y: y,
            color: color,
            alpha: 1.0,
            vy: -1.2
        });
    }

    function spawnParticles(x, y, color, count = 12) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3.5 + 1;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: color,
                size: Math.random() * 3 + 2,
                alpha: 1.0,
                life: Math.random() * 20 + 20
            });
        }
    }

    function spawnEnemy() {
        if (!canvas) return;
        const typeConfig = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
        const x = Math.random() * (canvas.width - typeConfig.width - 20) + 10;
        enemies.push({
            x: x,
            y: -40,
            width: typeConfig.width,
            height: typeConfig.height,
            speed: typeConfig.speed + Math.random() * 0.5,
            hp: typeConfig.hp,
            maxHp: typeConfig.hp,
            color: typeConfig.color,
            label: typeConfig.label,
            type: typeConfig.type,
            points: typeConfig.points,
            zigzag: typeConfig.zigzag || false,
            zigCounter: Math.random() * 10
        });
    }

    function spawnPowerUp(x, y) {
        const kinds = ['SPREAD', 'ZGC', 'SHIELD'];
        const kind = kinds[Math.floor(Math.random() * kinds.length)];
        powerups.push({
            x: x,
            y: y,
            width: 22,
            height: 22,
            kind: kind,
            vy: 1.8
        });
    }

    function fireLaser() {
        if (!isRunning || gameState !== 'PLAYING') return;
        const now = Date.now();
        if (now - lastShotTime < 120) return; // Fire rate limiter
        lastShotTime = now;

        const px = player.x + player.width / 2;
        const py = player.y;

        if (player.weaponType === 'single') {
            lasers.push({ x: px - 2, y: py, vx: 0, vy: -9, color: '#38bdf8', damage: 1 });
        } else if (player.weaponType === 'spread') {
            lasers.push({ x: px - 2, y: py, vx: 0, vy: -9, color: '#34d399', damage: 1 });
            lasers.push({ x: px - 6, y: py, vx: -2.2, vy: -8.5, color: '#38bdf8', damage: 1 });
            lasers.push({ x: px + 2, y: py, vx: 2.2, vy: -8.5, color: '#38bdf8', damage: 1 });
        }
        playLaserSound();
    }

    function triggerZgcSweep() {
        playExplosionSound();
        addFloatingText("⚡ GENERATIONAL ZGC SWEEP!", canvas.width / 2 - 80, canvas.height / 2, '#a855f7');
        enemies.forEach(enemy => {
            spawnParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color, 16);
            score += enemy.points;
        });
        enemies = [];
        updateHUD();
    }

    function update() {
        if (!canvas || gameState !== 'PLAYING') return;

        // Player Movement
        if (keys.left) player.x -= player.speed;
        if (keys.right) player.x += player.speed;
        if (player.x < 10) player.x = 10;
        if (player.x > canvas.width - player.width - 10) player.x = canvas.width - player.width - 10;

        // Auto-fire while space/button held
        if (keys.fire) {
            fireLaser();
        }

        // Power-up Timers
        if (player.weaponTimer > 0) {
            player.weaponTimer--;
            if (player.weaponTimer <= 0) player.weaponType = 'single';
        }
        if (player.shieldTimer > 0) {
            player.shieldTimer--;
            if (player.shieldTimer <= 0) player.shield = false;
        }

        // Update Lasers
        for (let i = lasers.length - 1; i >= 0; i--) {
            const l = lasers[i];
            l.x += l.vx;
            l.y += l.vy;
            if (l.y < -10 || l.x < 0 || l.x > canvas.width) {
                lasers.splice(i, 1);
            }
        }

        // Spawn Enemies
        const now = Date.now();
        const spawnDelay = Math.max(450, 1100 - (60 - gameTimer) * 12);
        if (now - lastSpawnTime > spawnDelay) {
            spawnEnemy();
            lastSpawnTime = now;
        }

        // Update Enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            e.y += e.speed;
            if (e.zigzag) {
                e.zigCounter += 0.08;
                e.x += Math.sin(e.zigCounter) * 2.5;
            }

            // Check Collision with Lasers
            for (let j = lasers.length - 1; j >= 0; j--) {
                const l = lasers[j];
                if (l.x >= e.x && l.x <= e.x + e.width && l.y >= e.y && l.y <= e.y + e.height) {
                    e.hp -= l.damage;
                    lasers.splice(j, 1);
                    spawnParticles(l.x, l.y, l.color, 4);

                    if (e.hp <= 0) {
                        playExplosionSound();
                        spawnParticles(e.x + e.width / 2, e.y + e.height / 2, e.color, 14);
                        score += e.points;
                        addFloatingText(`+${e.points}`, e.x, e.y, e.color);

                        // Chance to drop power-up
                        if (Math.random() < 0.16) {
                            spawnPowerUp(e.x + e.width / 2, e.y + e.height / 2);
                        }

                        enemies.splice(i, 1);
                        updateHUD();

                        // Check Victory Condition
                        if (score >= 1000) { // 2,500 TPS Purged!
                            handleVictory();
                            return;
                        }
                        break;
                    }
                }
            }

            // Enemy Reached Bottom / Gateway Crash
            if (e.y > canvas.height - 20) {
                if (!player.shield) {
                    playDamageSound();
                    jvmHealth -= 15;
                    addFloatingText("-15% JVM STACK!", canvas.width / 2 - 40, canvas.height - 60, '#f43f5e');
                    updateHUD();
                } else {
                    addFloatingText("🛡️ SHIELD BLOCKED!", e.x, canvas.height - 50, '#c084fc');
                }
                spawnParticles(e.x + e.width / 2, canvas.height - 10, '#f43f5e', 8);
                enemies.splice(i, 1);

                if (jvmHealth <= 0) {
                    handleGameOver();
                    return;
                }
            }
        }

        // Update Power-ups
        for (let i = powerups.length - 1; i >= 0; i--) {
            const p = powerups[i];
            p.y += p.vy;

            // Check collision with player
            if (p.x >= player.x - 10 && p.x <= player.x + player.width + 10 &&
                p.y >= player.y - 10 && p.y <= player.y + player.height + 10) {
                playPowerupSound();
                if (p.kind === 'SPREAD') {
                    player.weaponType = 'spread';
                    player.weaponTimer = 360; // 6 seconds at 60fps
                    addFloatingText("⚡ VIRTUAL THREADS 3x BURST!", player.x, player.y - 20, '#34d399');
                } else if (p.kind === 'ZGC') {
                    triggerZgcSweep();
                } else if (p.kind === 'SHIELD') {
                    player.shield = true;
                    player.shieldTimer = 300; // 5 seconds
                    addFloatingText("🛡️ CIRCUIT BREAKER SHIELD!", player.x, player.y - 20, '#c084fc');
                }
                powerups.splice(i, 1);
            } else if (p.y > canvas.height + 20) {
                powerups.splice(i, 1);
            }
        }

        // Update Particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 1 / p.life;
            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
        }

        // Update Floating Texts
        for (let i = floatingTexts.length - 1; i >= 0; i--) {
            const t = floatingTexts[i];
            t.y += t.vy;
            t.alpha -= 0.025;
            if (t.alpha <= 0) {
                floatingTexts.splice(i, 1);
            }
        }
    }

    function render() {
        if (!ctx || !canvas) return;

        // Background Space with Starfield Grid
        ctx.fillStyle = '#050914';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines (retro CRT wireframe vibe)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw Player (Java 25 Core Ship)
        ctx.save();
        ctx.translate(player.x, player.y);

        // Thruster flame
        const flameHeight = Math.random() * 8 + 10;
        const grad = ctx.createLinearGradient(0, player.height, 0, player.height + flameHeight);
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(player.width * 0.35, player.height);
        ctx.lineTo(player.width * 0.5, player.height + flameHeight);
        ctx.lineTo(player.width * 0.65, player.height);
        ctx.fill();

        // Ship Body
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = player.shield ? '#c084fc' : (player.weaponType === 'spread' ? '#34d399' : '#38bdf8');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(player.width / 2, 0); // Tip
        ctx.lineTo(player.width, player.height * 0.85);
        ctx.lineTo(player.width * 0.75, player.height);
        ctx.lineTo(player.width / 2, player.height * 0.7);
        ctx.lineTo(player.width * 0.25, player.height);
        ctx.lineTo(0, player.height * 0.85);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cockpit Core Dot
        ctx.fillStyle = player.shield ? '#c084fc' : '#38bdf8';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(player.width / 2, player.height * 0.45, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Shield Bubble
        if (player.shield) {
            ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(player.width / 2, player.height / 2, player.width * 0.8, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();

        // Draw Lasers (Virtual Threads)
        lasers.forEach(l => {
            ctx.fillStyle = l.color;
            ctx.shadowColor = l.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(l.x - 2, l.y, 4, 14);
            ctx.shadowBlur = 0;
        });

        // Draw Enemies
        enemies.forEach(e => {
            ctx.save();
            ctx.translate(e.x, e.y);
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.strokeStyle = e.color;
            ctx.lineWidth = 1.8;
            ctx.shadowColor = e.color;
            ctx.shadowBlur = 6;

            // Box / Shape
            ctx.beginPath();
            ctx.roundRect(0, 0, e.width, e.height, 6);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Bug Label Text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(e.label.substring(0, 7), e.width / 2, e.height / 2 + 3);

            // Health bar if multi-hit
            if (e.maxHp > 1) {
                const hpPct = Math.max(0, e.hp / e.maxHp);
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(2, -5, e.width - 4, 3);
                ctx.fillStyle = e.color;
                ctx.fillRect(2, -5, (e.width - 4) * hpPct, 3);
            }
            ctx.restore();
        });

        // Draw Power-ups
        powerups.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            const color = p.kind === 'SPREAD' ? '#34d399' : (p.kind === 'ZGC' ? '#a855f7' : '#38bdf8');
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.width / 2, p.height / 2, p.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#0f172a';
            ctx.font = 'black 8px monospace';
            ctx.textAlign = 'center';
            const label = p.kind === 'SPREAD' ? '3x' : (p.kind === 'ZGC' ? 'ZGC' : 'DEF');
            ctx.fillText(label, p.width / 2, p.height / 2 + 2.5);
            ctx.restore();
        });

        // Draw Particles
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        });
        ctx.globalAlpha = 1.0;

        // Draw Floating Texts
        floatingTexts.forEach(t => {
            ctx.fillStyle = t.color;
            ctx.globalAlpha = Math.max(0, t.alpha);
            ctx.font = 'bold 11px monospace';
            ctx.fillText(t.text, t.x, t.y);
        });
        ctx.globalAlpha = 1.0;
    }

    function gameLoop() {
        if (!isRunning) return;
        update();
        render();
        animId = requestAnimationFrame(gameLoop);
    }

    function startGame() {
        initAudio();
        resetGame();
        gameState = 'PLAYING';
        isRunning = true;

        const overlay = document.getElementById('arcade-overlay');
        if (overlay) overlay.classList.add('hidden');

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (gameState === 'PLAYING') {
                gameTimer--;
                if (gameTimer <= 0) {
                    handleVictory();
                }
            }
        }, 1000);

        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(gameLoop);
    }

    function handleGameOver() {
        gameState = 'GAMEOVER';
        isRunning = false;
        clearInterval(timerInterval);
        playDamageSound();

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('kill_monolith_high_score', highScore.toString());
        }
        updateHUD();

        const overlay = document.getElementById('arcade-overlay');
        const badge = document.getElementById('arcade-overlay-badge');
        const title = document.getElementById('arcade-overlay-title');
        const desc = document.getElementById('arcade-overlay-desc');
        const startBtn = document.getElementById('arcade-start-btn');

        if (badge) { badge.textContent = 'PRODUCTION DOWN'; badge.className = 'px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40'; }
        if (title) { title.textContent = 'JVM CRASHED (OUT OF MEMORY)'; title.className = 'text-2xl sm:text-3xl font-black text-rose-400 tracking-tight'; }
        if (desc) { desc.textContent = `The legacy monolith overwhelmed the server! You purged ${Math.floor(score * 2.5)} TPS and scored ${score} points before stack overflow.`; }
        if (startBtn) { startBtn.innerHTML = '<i data-lucide="rotate-ccw" class="w-4 h-4"></i><span>TRY AGAIN (RESTART JVM)</span>'; }
        if (overlay) overlay.classList.remove('hidden');

        if (window.lucide) window.lucide.createIcons();
    }

    function handleVictory() {
        gameState = 'VICTORY';
        isRunning = false;
        clearInterval(timerInterval);
        playVictorySound();

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('kill_monolith_high_score', highScore.toString());
        }
        updateHUD();

        const overlay = document.getElementById('arcade-overlay');
        const badge = document.getElementById('arcade-overlay-badge');
        const title = document.getElementById('arcade-overlay-title');
        const desc = document.getElementById('arcade-overlay-desc');
        const startBtn = document.getElementById('arcade-start-btn');

        if (badge) { badge.textContent = '🏆 ARCHITECTURE RESILIENT'; badge.className = 'px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40'; }
        if (title) { title.textContent = 'PRODUCTION SAVED! 2,500 TPS CLEARED'; title.className = 'text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight'; }
        if (desc) { desc.textContent = `Zero downtime achieved! Final Score: ${score} points with ${Math.floor(score * 2.5)} TPS purged. Certified Staff Distributed Systems Architect!`; }
        if (startBtn) { startBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i><span>PLAY AGAIN (NEW WAVE)</span>'; }
        if (overlay) overlay.classList.remove('hidden');

        if (window.lucide) window.lucide.createIcons();
    }

    function stopGame() {
        isRunning = false;
        clearInterval(timerInterval);
        cancelAnimationFrame(animId);
    }

    // Initialize Modal and Listeners
    function initArcadeGame() {
        canvas = document.getElementById('arcade-canvas');
        if (canvas) {
            ctx = canvas.getContext('2d');
        }

        const modal = document.getElementById('arcade-game-modal');
        const openBtns = document.querySelectorAll('.open-arcade-btn');
        const closeBtn = document.getElementById('arcade-modal-close');
        const startBtn = document.getElementById('arcade-start-btn');
        const soundBtn = document.getElementById('arcade-sound-toggle');
        const soundIcon = document.getElementById('arcade-sound-icon');

        // Open Modal
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                initAudio();
                if (modal) {
                    modal.classList.remove('hidden');
                    resetGame();
                    render();
                }
            });
        });

        // Close Modal
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
                stopGame();
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    stopGame();
                }
            });
        }

        // Start Button
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                startGame();
            });
        }

        // Sound Toggle Button
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                audioMuted = !audioMuted;
                if (soundIcon) {
                    soundIcon.className = audioMuted ? 'w-3.5 h-3.5 text-slate-500' : 'w-3.5 h-3.5 text-emerald-400';
                }
            });
        }

        // Keyboard Controls
        window.addEventListener('keydown', (e) => {
            if (!modal || modal.classList.contains('hidden')) return;
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') { keys.left = true; e.preventDefault(); }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') { keys.right = true; e.preventDefault(); }
            if (e.code === 'Space') {
                keys.fire = true;
                e.preventDefault();
                if (gameState === 'PLAYING') fireLaser();
            }
            if (e.code === 'Escape') {
                modal.classList.add('hidden');
                stopGame();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
            if (e.code === 'Space') keys.fire = false;
        });

        // Mobile On-Screen Buttons
        const leftBtn = document.getElementById('arcade-left-btn');
        const rightBtn = document.getElementById('arcade-right-btn');
        const fireBtn = document.getElementById('arcade-fire-btn');

        if (leftBtn) {
            leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); keys.left = true; });
            leftBtn.addEventListener('touchend', (e) => { e.preventDefault(); keys.left = false; });
            leftBtn.addEventListener('mousedown', () => keys.left = true);
            leftBtn.addEventListener('mouseup', () => keys.left = false);
        }
        if (rightBtn) {
            rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); keys.right = true; });
            rightBtn.addEventListener('touchend', (e) => { e.preventDefault(); keys.right = false; });
            rightBtn.addEventListener('mousedown', () => keys.right = true);
            rightBtn.addEventListener('mouseup', () => keys.right = false);
        }
        if (fireBtn) {
            fireBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                keys.fire = true;
                if (gameState === 'PLAYING') fireLaser();
            });
            fireBtn.addEventListener('touchend', (e) => { e.preventDefault(); keys.fire = false; });
            fireBtn.addEventListener('mousedown', () => {
                keys.fire = true;
                if (gameState === 'PLAYING') fireLaser();
            });
            fireBtn.addEventListener('mouseup', () => keys.fire = false);
        }

        // Canvas Direct Touch / Click Control
        if (canvas) {
            canvas.addEventListener('pointerdown', (e) => {
                if (gameState !== 'PLAYING') return;
                const rect = canvas.getBoundingClientRect();
                const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
                if (clickX < player.x) {
                    player.x -= player.speed * 3;
                } else if (clickX > player.x + player.width) {
                    player.x += player.speed * 3;
                }
                fireLaser();
            });
        }

        updateHUD();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initArcadeGame);
    } else {
        initArcadeGame();
    }
})();
