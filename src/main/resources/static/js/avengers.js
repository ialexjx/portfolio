/**
 * ============================================================================
 * Avengers Interactive Marvel Engine & Sound Synthesizer
 * Built for Akshat Jaiswal's High-Scale Distributed Systems Portfolio
 * 
 * Features:
 * 1. Web Audio API Synthesizer: Thor Thunder, Iron Man Repulsor, Thanos Snap,
 *    Spider-Man Web, Hulk Smash, Cap Shield, and Alan Silvestri Avengers Fanfare!
 * 2. Canvas Effects: Electric Lightning Bolts, Disintegration Ash Particles,
 *    Gamma Shockwaves, Web Strings.
 * 3. Interactive Widgets: Hanging Spider-Man with Spider-Sense, Arc Reactor with
 *    Jarvis HUD, Thor's Mjolnir Thunder, Thanos 2,500 TPS Snap, Cap Vibranium Shield,
 *    Hulk Smash Stress Test, and "Avengers Assemble" Floating Master Dock.
 * ============================================================================
 */

(function () {
    'use strict';

    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // =========================================================================
    // 1. Procedural Web Audio Synthesizer (Marvel Sound FX)
    // =========================================================================

    function playThorThunder() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // White noise generator for thunder crackle
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(60, now + 1.2);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);

        // Low frequency electrical rumble
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 1.2);

        oscGain.gain.setValueAtTime(0.6, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.3);
    }

    function playIronManRepulsor() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // High pitch charge-up whine
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.35);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);

        // Repulsor blast thump
        setTimeout(() => {
            if (!ctx) return;
            const t = ctx.currentTime;
            const blast = ctx.createOscillator();
            const blastGain = ctx.createGain();
            blast.type = 'triangle';
            blast.frequency.setValueAtTime(180, t);
            blast.frequency.exponentialRampToValueAtTime(40, t + 0.25);

            blastGain.gain.setValueAtTime(0.6, t);
            blastGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

            blast.connect(blastGain);
            blastGain.connect(ctx.destination);
            blast.start(t);
            blast.stop(t + 0.35);
        }, 320);
    }

    function playThanosSnap() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // 6 celestial Infinity Stone chord tones
        const stoneFreqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C, E, G, C, E, G
        stoneFreqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);

            gain.gain.setValueAtTime(0.001, now + idx * 0.05);
            gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.05 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.05);
            osc.stop(now + 1.0);
        });

        // The sharp SNAP transient
        setTimeout(() => {
            if (!ctx) return;
            const t = ctx.currentTime;
            const snapOsc = ctx.createOscillator();
            const snapGain = ctx.createGain();
            snapOsc.type = 'triangle';
            snapOsc.frequency.setValueAtTime(1400, t);
            snapOsc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

            snapGain.gain.setValueAtTime(0.9, t);
            snapGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

            snapOsc.connect(snapGain);
            snapGain.connect(ctx.destination);
            snapOsc.start(t);
            snapOsc.stop(t + 0.12);

            // Whispering dust wind
            const bufferSize = ctx.sampleRate * 1.2;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.5));
            }
            const wind = ctx.createBufferSource();
            wind.buffer = buffer;
            const windFilter = ctx.createBiquadFilter();
            windFilter.type = 'bandpass';
            windFilter.frequency.setValueAtTime(600, t);
            windFilter.Q.value = 3.0;

            const windGain = ctx.createGain();
            windGain.gain.setValueAtTime(0.4, t);
            windGain.gain.exponentialRampToValueAtTime(0.01, t + 1.1);

            wind.connect(windFilter);
            windFilter.connect(windGain);
            windGain.connect(ctx.destination);
            wind.start(t);
        }, 400);
    }

    function playSpideyWeb() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // "THWIP!" high velocity air burst
        const bufferSize = ctx.sampleRate * 0.18;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.12);
        filter.Q.value = 4.0;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
    }

    function playHulkSmash() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Sub-bass 45Hz seismic slam
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(95, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.5);

        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
    }

    function playCapShield() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Metallic Vibranium Ricochet Ring "CLANG!"
        [1250, 1850, 2450].forEach((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.85);
        });
    }

    function playAvengersThemeFanfare() {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Alan Silvestri Iconic Avengers Brass Motif:
        // Notes: G3 (196Hz) -> Bb3 (233Hz) -> C4 (261.6Hz) -> D4 (293.6Hz)
        const notes = [
            { freq: 196.00, time: 0.0, dur: 0.3 },
            { freq: 233.08, time: 0.35, dur: 0.25 },
            { freq: 261.63, time: 0.65, dur: 0.5 },
            { freq: 293.66, time: 1.25, dur: 0.8 }
        ];

        notes.forEach((n) => {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sawtooth';
            osc2.type = 'triangle';
            osc1.frequency.setValueAtTime(n.freq, now + n.time);
            osc2.frequency.setValueAtTime(n.freq * 1.003, now + n.time); // subtle detune for brass richness

            gain.gain.setValueAtTime(0.01, now + n.time);
            gain.gain.linearRampToValueAtTime(0.25, now + n.time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + n.time + n.dur);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1400, now + n.time);

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now + n.time);
            osc2.start(now + n.time);
            osc1.stop(now + n.time + n.dur + 0.1);
            osc2.stop(now + n.time + n.dur + 0.1);
        });
    }

    // =========================================================================
    // 2. Fullscreen Canvas Visual Effects (Lightning & Thanos Ash Dissolve)
    // =========================================================================

    let fxCanvas = null;
    let fxCtx = null;
    let particles = [];
    let animationFrameId = null;

    function initCanvas() {
        fxCanvas = document.getElementById('avengers-fx-canvas');
        if (!fxCanvas) {
            fxCanvas = document.createElement('canvas');
            fxCanvas.id = 'avengers-fx-canvas';
            document.body.appendChild(fxCanvas);
        }
        fxCtx = fxCanvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        if (!fxCanvas) return;
        fxCanvas.width = window.innerWidth;
        fxCanvas.height = window.innerHeight;
    }

    function triggerLightningStrike() {
        if (!fxCanvas || !fxCtx) initCanvas();
        playThorThunder();
        document.body.classList.add('avengers-screen-shake');
        setTimeout(() => document.body.classList.remove('avengers-screen-shake'), 500);

        const w = fxCanvas.width;
        const h = fxCanvas.height;

        // Draw multiple branched electric lightning bolts
        function drawLightningBolt(startX, startY, endX, endY, branchLevel) {
            if (branchLevel <= 0) return;
            fxCtx.beginPath();
            fxCtx.moveTo(startX, startY);

            let curX = startX;
            let curY = startY;
            const steps = 18;
            const dx = (endX - startX) / steps;
            const dy = (endY - startY) / steps;

            for (let i = 0; i < steps; i++) {
                curX += dx + (Math.random() - 0.5) * 45;
                curY += dy + (Math.random() - 0.5) * 20;
                fxCtx.lineTo(curX, curY);

                // Branch off
                if (Math.random() > 0.75 && branchLevel > 1) {
                    drawLightningBolt(curX, curY, curX + (Math.random() - 0.5) * 160, curY + Math.random() * 180, branchLevel - 1);
                }
            }

            fxCtx.strokeStyle = branchLevel === 3 ? '#ffffff' : '#38bdf8';
            fxCtx.lineWidth = branchLevel * 2.2;
            fxCtx.shadowColor = '#38bdf8';
            fxCtx.shadowBlur = 18;
            fxCtx.stroke();
        }

        let flashCount = 0;
        function flash() {
            if (!fxCtx) return;
            fxCtx.clearRect(0, 0, w, h);

            // Screen glow
            fxCtx.fillStyle = 'rgba(56, 189, 248, 0.25)';
            fxCtx.fillRect(0, 0, w, h);

            drawLightningBolt(w * 0.5 + (Math.random() - 0.5) * 200, 0, w * 0.5 + (Math.random() - 0.5) * 400, h * 0.85, 3);
            drawLightningBolt(w * 0.2 + (Math.random() - 0.5) * 100, 0, w * 0.3, h * 0.7, 2);
            drawLightningBolt(w * 0.8 + (Math.random() - 0.5) * 100, 0, w * 0.7, h * 0.75, 2);

            flashCount++;
            if (flashCount < 3) {
                setTimeout(flash, 65);
            } else {
                setTimeout(() => {
                    fxCtx.clearRect(0, 0, w, h);
                }, 120);
            }
        }
        flash();

        showAvengersToast("⚡ THOR'S HAMMER STRIKE", "\"Whosoever holds this hammer shall possess the power of 128 Virtual Threads!\"", "text-sky-400", "border-sky-500/40");
    }

    function triggerThanosSnap() {
        if (!fxCanvas || !fxCtx) initCanvas();
        playThanosSnap();

        const w = fxCanvas.width;
        const h = fxCanvas.height;

        // Screen white cosmic flash
        fxCtx.fillStyle = 'rgba(245, 158, 11, 0.35)';
        fxCtx.fillRect(0, 0, w, h);
        setTimeout(() => fxCtx.clearRect(0, 0, w, h), 100);

        // Spawn 180 floating ash disintegration particles
        for (let i = 0; i < 180; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h * 0.9,
                vx: 1.5 + Math.random() * 3.5, // blowing rightward with wind
                vy: (Math.random() - 0.5) * 1.5 - 0.8,
                size: Math.random() * 3.5 + 1.2,
                alpha: 1.0,
                color: Math.random() > 0.4 ? 'rgba(217, 119, 6, ' : 'rgba(148, 163, 184, ',
                life: Math.random() * 80 + 60
            });
        }

        if (!animationFrameId) {
            updateParticles();
        }

        showAvengersToast("🫰 THANOS SNAP (2,500 TPS PURGE)", "\"I am inevitable... Perfectly balanced, as all distributed tables should be.\"", "text-purple-400", "border-purple-500/40");
    }

    function updateParticles() {
        if (!fxCtx) return;
        fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 1 / p.life;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            fxCtx.fillStyle = p.color + Math.max(0, p.alpha) + ')';
            fxCtx.beginPath();
            fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            fxCtx.fill();
        }

        if (particles.length > 0) {
            animationFrameId = requestAnimationFrame(updateParticles);
        } else {
            animationFrameId = null;
        }
    }

    function triggerHulkSmash() {
        playHulkSmash();
        document.body.classList.add('hulk-screen-shake');
        setTimeout(() => document.body.classList.remove('hulk-screen-shake'), 700);

        showAvengersToast("🟢 HULK SMASH!", "\"That's my secret, Cap... my threads are always Virtual.\"", "text-emerald-400", "border-emerald-500/40");
    }

    function triggerCapShield() {
        playCapShield();
        showAvengersToast("🛡️ CAPTAIN AMERICA", "\"I can do this all day... 100% Circuit Breaker resilience against live banking jitter.\"", "text-blue-400", "border-blue-500/40");
    }

    function triggerSpideyWeb() {
        playSpideyWeb();
        showAvengersToast("🕷️ SPIDER-MAN", "\"With great throughput comes great responsibility! Sub-50ms web pipelines active.\"", "text-rose-400", "border-rose-500/40");
    }

    function triggerIronManJarvis() {
        playIronManRepulsor();

        let hud = document.getElementById('jarvis-hud-overlay');
        if (!hud) {
            hud = document.createElement('div');
            hud.id = 'jarvis-hud-overlay';
            hud.innerHTML = `
                <div class="flex items-center justify-between text-xs font-mono text-sky-400">
                    <span class="px-2.5 py-1 rounded bg-sky-500/20 border border-sky-400/50 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                        <span>JARVIS OS v85.4 // ACTIVE</span>
                    </span>
                    <span class="text-[11px] text-slate-400">STARK INDUSTRIES HIGH-THROUGHPUT STACK</span>
                </div>
                <div class="max-w-md mx-auto p-4 rounded-2xl bg-black/80 border border-sky-400/60 text-sky-300 font-mono text-xs text-center space-y-2 shadow-2xl backdrop-blur-md">
                    <div class="text-white font-bold text-sm tracking-wide">"I AM IRON MAN."</div>
                    <p class="text-slate-300 text-[11px]">Jarvis: "Diagnostic complete, Mr. Jaiswal. 128 Virtual Threads operating at peak Mark 85 capacity. Arc Reactor output: 3000%."</p>
                </div>
                <div class="text-right text-[10px] font-mono text-sky-400/80">TARGET LOCK: 100,000 TPS // ZERO FLIGHT DRAG</div>
            `;
            document.body.appendChild(hud);
        }

        hud.classList.add('active');
        setTimeout(() => hud.classList.remove('active'), 3200);

        showAvengersToast("🤖 IRON MAN // JARVIS PROTOCOL", "\"I love you 3000. Sometimes you gotta run 2,500 TPS before you can walk.\"", "text-sky-300", "border-sky-500/40");
    }

    function triggerAvengersAssemble() {
        playAvengersThemeFanfare();
        triggerLightningStrike();
        setTimeout(triggerIronManJarvis, 400);
        setTimeout(triggerSpideyWeb, 800);
        setTimeout(triggerCapShield, 1200);
        setTimeout(triggerHulkSmash, 1600);
        setTimeout(triggerThanosSnap, 2200);

        showAvengersToast("🅰️ AVENGERS ASSEMBLE!", "\"Whatever it takes. Zero downtime, zero broken packets across all FinTech rails!\"", "text-amber-400", "border-amber-500/50");
    }

    // =========================================================================
    // 3. Toast Notifications for Quotes & Battle Actions
    // =========================================================================

    function showAvengersToast(title, quote, textColorClass, borderColorClass) {
        let toast = document.getElementById('avengers-toast-banner');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'avengers-toast-banner';
            toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-70 pointer-events-none transition-all duration-400';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="apple-glass px-5 py-3 rounded-2xl border ${borderColorClass} shadow-2xl backdrop-blur-xl flex items-center gap-3.5 max-w-lg">
                <div class="space-y-0.5 text-left">
                    <div class="text-xs font-mono font-black ${textColorClass} tracking-wide flex items-center gap-2">
                        <span>${title}</span>
                    </div>
                    <p class="text-[12.5px] text-slate-200 font-sans italic leading-snug">${quote}</p>
                </div>
            </div>
        `;

        toast.classList.add('show');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4200);
    }

    // =========================================================================
    // 4. Inject Interactive Marvel Widgets into DOM
    // =========================================================================

    function injectHangingSpiderMan() {
        if (document.getElementById('spidey-hanging-widget')) return;

        const spidey = document.createElement('div');
        spidey.id = 'spidey-hanging-widget';
        spidey.className = 'spidey-container';
        spidey.title = 'Spider-Man Spider! (Click to shoot web)';

        spidey.innerHTML = `
            <div class="spidey-web-line"></div>
            <div class="spidey-body">
                <!-- Spider Sense Wavy Radiation Glow -->
                <svg class="spider-sense-waves" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14C8 6 14 3 18 3C22 3 28 6 32 14" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M8 17C11 10 15 8 18 8C21 8 25 10 28 17" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
                </svg>

                <!-- Stylized Spider SVG -->
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Spider Abdomen & Head -->
                    <ellipse cx="12" cy="14" rx="4.5" ry="6" fill="#ef4444"/>
                    <circle cx="12" cy="7" r="3" fill="#1e293b"/>
                    <!-- Spider Eyes -->
                    <polygon points="10,6 11,8 11.8,6.5" fill="#ffffff"/>
                    <polygon points="14,6 13,8 12.2,6.5" fill="#ffffff"/>
                    <!-- Spider Legs -->
                    <path d="M8 12 C4 9, 2 13, 1 15" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                    <path d="M8 14 C4 13, 2 17, 1 20" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                    <path d="M16 12 C20 9, 22 13, 23 15" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                    <path d="M16 14 C20 13, 22 17, 23 20" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                    <path d="M9 8 C5 5, 4 8, 3 10" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                    <path d="M15 8 C19 5, 20 8, 21 10" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                </svg>
            </div>
        `;

        document.body.appendChild(spidey);

        // Hover spider-sense trigger
        spidey.addEventListener('mouseenter', () => {
            spidey.classList.add('sense-active');
            playSpideyWeb();
        });
        spidey.addEventListener('mouseleave', () => {
            spidey.classList.remove('sense-active');
        });

        // Click trigger
        spidey.addEventListener('click', () => {
            triggerSpideyWeb();
        });
    }

    function injectArcReactor() {
        // Kept clean - no terminal header DOM tampering
    }

    function injectThorMjolnir() {
        // Kept clean - no slider DOM tampering
    }

    function injectThanosSnapButton() {
        // Kept clean - no stats cards DOM tampering
    }

    function injectAvengersDock() {
        if (document.getElementById('avengers-assemble-dock')) return;

        const dock = document.createElement('div');
        dock.id = 'avengers-assemble-dock';

        dock.innerHTML = `
            <!-- Master Trigger Button (Avengers 'A' Emblem) -->
            <button id="avengers-master-btn" class="avengers-main-trigger" title="Avengers Assemble (Click to expand superhero arsenal)">
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Stylized Avengers 'A' Logo -->
                    <path d="M26 6L14 38H21L23.5 31H30.5L28 24H25.5L26 21.5L30 10L36 28H42L28 6H26Z" fill="#ffffff"/>
                    <path d="M12 28L6 31L34 23L38 27L12 28Z" fill="#38bdf8"/>
                    <circle cx="24" cy="24" r="22" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="6 3"/>
                </svg>
            </button>

            <!-- Expanded Hero Buttons Menu -->
            <div class="avengers-assemble-menu">
                <button class="avenger-pill-btn assemble-all" id="avenger-action-assemble">
                    <span>🅰️ ASSEMBLE ALL</span>
                </button>
                <button class="avenger-pill-btn thor" id="avenger-action-thor">
                    <span>⚡ Thor (Mjolnir Thunder)</span>
                </button>
                <button class="avenger-pill-btn ironman" id="avenger-action-ironman">
                    <span>🤖 Iron Man (Jarvis HUD)</span>
                </button>
                <button class="avenger-pill-btn thanos" id="avenger-action-thanos">
                    <span>🫰 Thanos (2.5k TPS Snap)</span>
                </button>
                <button class="avenger-pill-btn hulk" id="avenger-action-hulk">
                    <span>🟢 Hulk (Gamma Smash)</span>
                </button>
                <button class="avenger-pill-btn cap" id="avenger-action-cap">
                    <span>🛡️ Captain America (Shield)</span>
                </button>
                <button class="avenger-pill-btn spidey" id="avenger-action-spidey">
                    <span>🕷️ Spider-Man (Web Slinger)</span>
                </button>
            </div>
        `;

        document.body.appendChild(dock);

        const masterBtn = dock.querySelector('#avengers-master-btn');
        masterBtn.addEventListener('click', () => {
            dock.classList.toggle('dock-open');
            getAudioContext();
        });

        // Close dock when clicking outside
        document.addEventListener('click', (e) => {
            if (!dock.contains(e.target)) {
                dock.classList.remove('dock-open');
            }
        });

        // Wire individual hero buttons
        dock.querySelector('#avenger-action-thor').addEventListener('click', triggerLightningStrike);
        dock.querySelector('#avenger-action-ironman').addEventListener('click', triggerIronManJarvis);
        dock.querySelector('#avenger-action-thanos').addEventListener('click', triggerThanosSnap);
        dock.querySelector('#avenger-action-hulk').addEventListener('click', triggerHulkSmash);
        dock.querySelector('#avenger-action-cap').addEventListener('click', triggerCapShield);
        dock.querySelector('#avenger-action-spidey').addEventListener('click', triggerSpideyWeb);
        dock.querySelector('#avenger-action-assemble').addEventListener('click', triggerAvengersAssemble);
    }

    // =========================================================================
    // 5. Initialize Everything on DOMContentLoaded & Export
    // =========================================================================

    // Always expose API immediately
    window.Avengers = {
        thor: triggerLightningStrike,
        ironman: triggerIronManJarvis,
        thanos: triggerThanosSnap,
        hulk: triggerHulkSmash,
        cap: triggerCapShield,
        spidey: triggerSpideyWeb,
        assemble: triggerAvengersAssemble
    };

    function initAvengers() {
        initCanvas();
        injectHangingSpiderMan();
        injectAvengersDock();

        // Unlock Web Audio API on first user gesture anywhere
        window.addEventListener('pointerdown', () => getAudioContext(), { once: true });
        window.addEventListener('keydown', () => getAudioContext(), { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAvengers);
    } else {
        initAvengers();
    }
})();
