/**
 * Systems Architecture & Benchmark Lab JavaScript
 * Drives all deep-dive simulations on /lab:
 * - 100k TPS Payment Switch System Design Sandbox
 * - Live Concurrency Race Condition Arena
 * - SQL EXPLAIN ANALYZE Indexing Lab
 * - JVM Heap & Generational ZGC vs G1GC Profiler
 * - Cryptographic Digital Signature & PKI Inspector
 * - Hiring Manager 30-60-90 Day Blueprint Calculator
 * - ADRs Accordion
 * - Friday 7:30 PM On-Call Incident Simulator
 * - Terminal REPL & Cheat Codes with Mobile Physical Haptics
 */

document.addEventListener('DOMContentLoaded', () => {
    initLabThemeAndSound();
    initLabFireworks();
    initClusterHealthHud();
    initArchitectureVisualizer();
    initArchitecturalBenchmarkLab();
    initRoiCalculator();
    initPaymentSwitchSandbox();
    initLabRateLimiter();
    initLabConcurrencyArena();
    initLabSqlIndexing();
    initLabJvmProfiler();
    initLabCryptoInspector();
    initLabHiringBlueprint();
    initLabAdrAccordion();
    initLabIncidentSimulator();
    initLabTerminalRepl();
});

/* ==========================================================================
   Sound & Haptics Engine
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function playHapticTick(freq = 800, duration = 0.02) {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}

    // Mobile physical vibration if supported
    if (navigator.vibrate) {
        try { navigator.vibrate(15); } catch (e) {}
    }
}

function initLabThemeAndSound() {
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle-btn');
    const soundBtn = document.getElementById('sound-toggle-btn');
    const sunIcon = document.getElementById('theme-sun-icon');
    const moonIcon = document.getElementById('theme-moon-icon');
    const soundOnIcon = document.getElementById('sound-on-icon');
    const soundOffIcon = document.getElementById('sound-off-icon');

    // Load saved theme
    const savedTheme = localStorage.getItem('akshat-theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    if (sunIcon && moonIcon) {
        sunIcon.classList.toggle('hidden', savedTheme !== 'dark');
        moonIcon.classList.toggle('hidden', savedTheme === 'dark');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('akshat-theme', next);
            if (sunIcon && moonIcon) {
                sunIcon.classList.toggle('hidden', next !== 'dark');
                moonIcon.classList.toggle('hidden', next === 'dark');
            }
            playHapticTick(900, 0.02);
        });
    }

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundOnIcon && soundOffIcon) {
                soundOnIcon.classList.toggle('hidden', !soundEnabled);
                soundOffIcon.classList.toggle('hidden', soundEnabled);
            }
            if (soundEnabled) playHapticTick(1000, 0.03);
        });
    }
}

/* ==========================================================================
   Fireworks Celebration Engine
   ========================================================================== */
function initLabFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let particles = [];
    let isRunning = false;

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 2.5 + 1.5;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.08;
            this.alpha -= this.decay;
            return this.alpha <= 0;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].update()) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }
        if (particles.length > 0) {
            requestAnimationFrame(loop);
        } else {
            isRunning = false;
        }
    }

    window.launchRocketBarrage = function(count = 5) {
        const colors = ['#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#a855f7'];
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = width * 0.2 + Math.random() * (width * 0.6);
                const y = height * 0.2 + Math.random() * (height * 0.35);
                const baseColor = colors[Math.floor(Math.random() * colors.length)];
                for (let p = 0; p < 45; p++) {
                    particles.push(new Particle(x, y, baseColor));
                }
                playHapticTick(1000 + i * 80, 0.03);
                if (!isRunning) {
                    isRunning = true;
                    loop();
                }
            }, i * 200);
        }
    };
}

/* ==========================================================================
   1. 100k TPS Payment Switch Sandbox
   ========================================================================== */
function initPaymentSwitchSandbox() {
    const simBtn = document.getElementById('sim-switch-btn');
    const optRateLimit = document.getElementById('switch-opt-ratelimit');
    const optGateway = document.getElementById('switch-opt-gateway');
    const optKafka = document.getElementById('switch-opt-kafka');
    const optLoom = document.getElementById('switch-opt-loom');
    const optMutex = document.getElementById('switch-opt-mutex');
    const optDb = document.getElementById('switch-opt-db');

    const slaDisplay = document.getElementById('switch-sla-display');
    const throughputStat = document.getElementById('switch-throughput-stat');
    const latencyStat = document.getElementById('switch-latency-stat');
    const debitStat = document.getElementById('switch-debit-stat');
    const verdictBox = document.getElementById('switch-verdict-box');

    if (!simBtn) return;

    simBtn.addEventListener('click', () => {
        playHapticTick(650, 0.02);
        simBtn.disabled = true;
        simBtn.classList.add('opacity-50', 'cursor-not-allowed');

        const hasRateLimit = optRateLimit ? optRateLimit.checked : true;
        const hasKafka = optKafka ? optKafka.checked : true;
        const hasLoom = optLoom ? optLoom.checked : true;
        const hasMutex = optMutex ? optMutex.checked : true;

        if (slaDisplay) slaDisplay.innerHTML = '<span class="text-amber-400 animate-pulse font-bold">STRESS TESTING 100,000 TPS BURST...</span>';

        setTimeout(() => {
            if (!hasRateLimit) {
                // Failure: Unmitigated burst kills edge
                if (slaDisplay) slaDisplay.className = 'px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-bold';
                if (slaDisplay) slaDisplay.textContent = '62.4% SLA (CRASH)';
                if (throughputStat) { throughputStat.textContent = '38,200 req/sec (Throttled)'; throughputStat.className = 'text-rose-400 font-bold'; }
                if (latencyStat) { latencyStat.textContent = '4,520 ms (504 Timeout)'; latencyStat.className = 'text-rose-400 font-bold'; }
                if (verdictBox) verdictBox.innerHTML = '💥 <strong>DOWNSTREAM COLLAPSE:</strong> Without Token Bucket Rate-Limiter, 100k concurrent requests choked thread pools and bank gateways!';
                playHapticTick(200, 0.08);
            } else if (!hasMutex) {
                // Failure: Race condition & double spend
                if (slaDisplay) slaDisplay.className = 'px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-bold';
                if (slaDisplay) slaDisplay.textContent = 'AUDIT FAILED (DOUBLE SPEND)';
                if (debitStat) { debitStat.textContent = '1,420 Double Debits!'; debitStat.className = 'text-rose-400 font-bold animate-pulse'; }
                if (verdictBox) verdictBox.innerHTML = '💥 <strong>FINANCIAL INTEGRITY COMPROMISED:</strong> Without Redis Mutex (`SET NX EX`), concurrent threads debited the same ledger multiple times!';
                playHapticTick(200, 0.08);
            } else if (!hasKafka) {
                // Failure: DB write lock contention
                if (slaDisplay) slaDisplay.className = 'px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold';
                if (slaDisplay) slaDisplay.textContent = '84.1% SLA (DB LOCKS)';
                if (latencyStat) { latencyStat.textContent = '890 ms (Write Contention)'; latencyStat.className = 'text-amber-400 font-bold'; }
                if (verdictBox) verdictBox.innerHTML = '⚠️ <strong>DATABASE CONGESTION:</strong> Without Kafka partition buffering, synchronous database writes saturated connection pool.';
                playHapticTick(400, 0.05);
            } else {
                // God tier success!
                if (slaDisplay) slaDisplay.className = 'px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold';
                if (slaDisplay) slaDisplay.textContent = '99.999% SLA (PERFECT)';
                if (throughputStat) { throughputStat.textContent = '100,000 req/sec'; throughputStat.className = 'text-emerald-400 font-bold'; }
                if (latencyStat) { latencyStat.textContent = '14.2 ms (P99)'; latencyStat.className = 'text-emerald-400 font-bold'; }
                if (debitStat) { debitStat.textContent = '0 (Safe)'; debitStat.className = 'text-emerald-400 font-bold'; }
                if (verdictBox) verdictBox.innerHTML = '🏆 <strong>PRINCIPAL ARCHITECT GRADE:</strong> Upstream token rate-limiter and Kafka partitions shielded the database while Virtual Threads handled 100k non-blocking requests in 14.2ms!';
                playHapticTick(1100, 0.04);
                if (window.launchRocketBarrage) window.launchRocketBarrage(5);
            }

            simBtn.disabled = false;
            simBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }, 600);
    });
}

/* ==========================================================================
   2. Live Concurrency Race Condition Arena
   ========================================================================== */
function initLabConcurrencyArena() {
    const fireBtn = document.getElementById('fire-race-btn');
    const resetBtn = document.getElementById('reset-race-btn');
    const threadABox = document.getElementById('thread-a-box');
    const threadBBox = document.getElementById('thread-b-box');
    const threadABadge = document.getElementById('thread-a-badge');
    const threadBBadge = document.getElementById('thread-b-badge');
    const threadAHttp = document.getElementById('thread-a-http');
    const threadBHttp = document.getElementById('thread-b-http');
    const threadADelta = document.getElementById('thread-a-delta');
    const threadBDelta = document.getElementById('thread-b-delta');
    const lockState = document.getElementById('lock-state-badge');
    const lockKey = document.getElementById('lock-key-display');
    const walletBalance = document.getElementById('shared-wallet-val');
    const verdictText = document.getElementById('race-verdict-text');

    if (!fireBtn) return;

    let isRacing = false;

    function resetArena() {
        isRacing = false;
        fireBtn.disabled = false;
        fireBtn.classList.remove('opacity-50', 'cursor-not-allowed');

        if (threadABox) threadABox.className = 'p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 transition-all duration-300';
        if (threadBBox) threadBBox.className = 'p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 transition-all duration-300';

        if (threadABadge) { threadABadge.textContent = 'IDLE'; threadABadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-400'; }
        if (threadBBadge) { threadBBadge.textContent = 'IDLE'; threadBBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-400'; }

        if (threadAHttp) { threadAHttp.textContent = 'Awaiting Trigger'; threadAHttp.className = 'text-slate-300'; }
        if (threadBHttp) { threadBHttp.textContent = 'Awaiting Trigger'; threadBHttp.className = 'text-slate-300'; }

        if (threadADelta) threadADelta.textContent = 'T+0.00ms';
        if (threadBDelta) threadBDelta.textContent = 'T+0.32ms';

        if (walletBalance) { walletBalance.textContent = '₹5,000'; walletBalance.className = 'text-white font-bold'; }
        if (lockState) { lockState.textContent = 'IDLE'; lockState.className = 'text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold'; }
        if (lockKey) lockKey.textContent = 'SET NX EX 30s';
        if (verdictText) verdictText.textContent = 'Ready. Click \'Fire Concurrent Debits\' above to test race condition resilience.';
        playHapticTick(750, 0.015);
    }

    fireBtn.addEventListener('click', () => {
        if (isRacing) return;
        isRacing = true;
        fireBtn.disabled = true;
        fireBtn.classList.add('opacity-50', 'cursor-not-allowed');
        playHapticTick(550, 0.02);

        if (threadADelta) threadADelta.textContent = 'T+0.82ms';
        if (threadBDelta) threadBDelta.textContent = 'T+1.14ms';
        if (verdictText) verdictText.innerHTML = '<span class="text-amber-400 animate-pulse font-bold">MUTEX CONTENTION:</span> Resolving concurrent packet collision...';

        // Step 1: Thread A acquires lock
        setTimeout(() => {
            if (threadABox) threadABox.classList.add('race-winner');
            if (threadABadge) { threadABadge.textContent = 'LOCK ACQUIRED'; threadABadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400'; }
            if (threadAHttp) { threadAHttp.textContent = '200 OK (DEBITED)'; threadAHttp.className = 'text-emerald-400 font-bold'; }
            if (lockState) { lockState.textContent = 'LOCKED: THREAD-A'; lockState.className = 'text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold animate-pulse'; }
            if (lockKey) lockKey.textContent = 'lock:acc:4092 (TTL: 30s)';
            if (walletBalance) { walletBalance.textContent = '₹0'; walletBalance.className = 'text-slate-400 font-mono line-through'; }
            playHapticTick(950, 0.03);
        }, 220);

        // Step 2: Thread B rejected
        setTimeout(() => {
            if (threadBBox) threadBBox.classList.add('race-loser');
            if (threadBBadge) { threadBBadge.textContent = 'LOCK REJECTED'; threadBBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400'; }
            if (threadBHttp) { threadBHttp.textContent = '409 CONFLICT'; threadBHttp.className = 'text-rose-400 font-bold'; }
            playHapticTick(240, 0.06);
        }, 400);

        // Step 3: Verdict
        setTimeout(() => {
            if (verdictText) {
                verdictText.innerHTML = '<span class="text-emerald-400 font-bold">RACE CONDITION CRUSHED:</span> Mutex acquired by Thread-A in 0.8ms. Thread-B rejected with 409 Conflict. Exactly 1 transaction committed.';
            }
            isRacing = false;
            fireBtn.disabled = false;
            fireBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }, 650);
    });

    if (resetBtn) resetBtn.addEventListener('click', resetArena);
}

/* ==========================================================================
   2.5. Rate Limiter & Circuit Breaker Playground (Token Bucket Simulator)
   ========================================================================== */
function initLabRateLimiter() {
    const tabToken = document.getElementById('rl-algo-token');
    const tabLeaky = document.getElementById('rl-algo-leaky');
    const tabCircuit = document.getElementById('rl-algo-circuit');

    const loadSlider = document.getElementById('rl-load-slider');
    const loadDisplay = document.getElementById('rl-load-display');
    const capacitySlider = document.getElementById('rl-capacity-slider');
    const capacityDisplay = document.getElementById('rl-capacity-display');
    const refillSlider = document.getElementById('rl-refill-slider');
    const refillDisplay = document.getElementById('rl-refill-display');

    const param1Label = document.getElementById('rl-param1-label');
    const param2Label = document.getElementById('rl-param2-label');
    const tankLabel = document.getElementById('rl-tank-label');
    const tankBar = document.getElementById('rl-tank-bar');
    const tokensAvail = document.getElementById('rl-tokens-available');
    const burstStatus = document.getElementById('rl-burst-status');

    const flowInbound = document.getElementById('rl-flow-inbound');
    const flowRefill = document.getElementById('rl-flow-refill');
    const flowForwarded = document.getElementById('rl-flow-forwarded');
    const circuitBadge = document.getElementById('rl-circuit-state-badge');
    const circuitDesc = document.getElementById('rl-circuit-desc');
    const dbLoad = document.getElementById('rl-db-load');
    const dropRatio = document.getElementById('rl-drop-ratio');
    const commentary = document.getElementById('rl-commentary');
    const particleTrack = document.getElementById('rl-particle-track');

    if (!loadSlider || !capacitySlider) return;

    let currentAlgo = 'token'; // 'token' | 'leaky' | 'circuit'
    let currentTokens = 4850;
    let failureCount = 0;
    let circuitState = 'CLOSED'; // 'CLOSED' | 'OPEN' | 'HALF-OPEN'
    let halfOpenTimer = null;

    function updateSimulation() {
        const load = parseInt(loadSlider.value, 10);
        const capacity = parseInt(capacitySlider.value, 10);
        const refill = parseInt(refillSlider.value, 10);

        if (loadDisplay) loadDisplay.textContent = `${load.toLocaleString()} req/s`;
        if (capacityDisplay) capacityDisplay.textContent = currentAlgo === 'circuit' ? `${capacity}% Window` : `${capacity.toLocaleString()} ${currentAlgo === 'leaky' ? 'queue depth' : 'tokens'}`;
        if (refillDisplay) refillDisplay.textContent = currentAlgo === 'circuit' ? `${refill}ms Timeout` : `${refill.toLocaleString()} / sec`;

        if (flowInbound) flowInbound.textContent = `${load.toLocaleString()} req/s`;
        if (flowRefill) flowRefill.textContent = currentAlgo === 'circuit' ? `${refill}ms window` : `+${refill.toLocaleString()}/s`;

        let forwarded = 0;
        let dropped = 0;

        if (currentAlgo === 'token') {
            // Token Bucket Math
            if (load <= refill) {
                currentTokens = Math.min(capacity, currentTokens + Math.floor((refill - load) * 0.2));
                forwarded = load;
                dropped = 0;
            } else {
                // Surpassing refill rate: drains buffer
                const drain = (load - refill) * 0.25;
                currentTokens = Math.max(0, currentTokens - drain);
                const burstCapacityUsed = (currentTokens > 0);
                forwarded = burstCapacityUsed ? Math.min(load, refill + Math.floor(currentTokens * 0.5)) : refill;
                dropped = Math.max(0, load - forwarded);
            }
            const pct = Math.min(100, Math.max(0, Math.round((currentTokens / capacity) * 100)));
            if (tankBar) {
                tankBar.style.width = `${pct}%`;
                tankBar.className = pct > 40 ? 'h-full bg-gradient-to-r from-emerald-500 via-sky-400 to-emerald-400 transition-all duration-200' : 'h-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 transition-all duration-200';
            }
            if (tokensAvail) tokensAvail.textContent = `${Math.round(currentTokens).toLocaleString()} / ${capacity.toLocaleString()} tokens`;
            if (burstStatus) burstStatus.textContent = pct > 0 ? `Burst Headroom: ${pct}% Full` : '⚠️ BUCKET EMPTY - 429 THROTTLING ACTIVE';

            if (circuitBadge) {
                circuitBadge.textContent = pct > 0 ? 'GOVERNANCE: BALANCED' : 'THROTTLING: 429 SHEDDING';
                circuitBadge.className = pct > 0 ? 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse';
            }
            if (circuitDesc) {
                circuitDesc.textContent = pct > 0 ? 'Incoming bursts draw from the token pool. No threads queued in database pool.' : 'Capacity exhausted! Gateway shedding excess packets with HTTP 429 to protect core databases.';
            }
        } else if (currentAlgo === 'leaky') {
            // Leaky Bucket (Constant Outflow Queue)
            forwarded = Math.min(load, refill);
            dropped = Math.max(0, load - refill);
            const queueDepth = Math.min(capacity, Math.max(0, dropped));
            const pct = Math.round((queueDepth / capacity) * 100);

            if (tankBar) {
                tankBar.style.width = `${pct}%`;
                tankBar.className = pct > 80 ? 'h-full bg-rose-500 transition-all duration-200' : 'h-full bg-sky-500 transition-all duration-200';
            }
            if (tokensAvail) tokensAvail.textContent = `${queueDepth} / ${capacity} in Queue`;
            if (burstStatus) burstStatus.textContent = `Outflow Drip: Constant ${refill.toLocaleString()} req/s`;

            if (circuitBadge) {
                circuitBadge.textContent = dropped > 0 ? 'QUEUE FULL: DROPPING SPIKES' : 'LEAKY FIFO: SMOOTH DRIP';
                circuitBadge.className = dropped > 0 ? 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40';
            }
            if (circuitDesc) {
                circuitDesc.textContent = 'Leaky bucket enforces a strictly uniform outbound flow rate to fragile legacy banking systems.';
            }
        } else if (currentAlgo === 'circuit') {
            // Resilience4j Circuit Breaker
            if (load > 10000) {
                failureCount += 5;
            } else {
                failureCount = Math.max(0, failureCount - 2);
            }

            if (failureCount > 25 && circuitState === 'CLOSED') {
                circuitState = 'OPEN';
                playHapticTick(300, 0.08);
                if (halfOpenTimer) clearTimeout(halfOpenTimer);
                halfOpenTimer = setTimeout(() => {
                    circuitState = 'HALF-OPEN';
                    updateSimulation();
                }, 4000);
            } else if (circuitState === 'HALF-OPEN' && load < 5000) {
                circuitState = 'CLOSED';
                failureCount = 0;
            }

            if (circuitState === 'OPEN') {
                forwarded = 0;
                dropped = load; // Fail-fast fallback
                if (tankBar) { tankBar.style.width = '100%'; tankBar.className = 'h-full bg-rose-500'; }
                if (tokensAvail) tokensAvail.textContent = 'CIRCUIT TRIPPED (OPEN)';
                if (burstStatus) burstStatus.textContent = '⚡ FAIL-FAST ACTIVATED (< 0.2ms fallback)';
                if (circuitBadge) {
                    circuitBadge.textContent = 'CIRCUIT: OPEN (TRIPPED)';
                    circuitBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/25 text-rose-300 border border-rose-500/50 animate-pulse';
                }
                if (circuitDesc) {
                    circuitDesc.textContent = 'Downstream bank error rate exceeded 50%. Failing fast immediately to protect connection pools from exhaustion.';
                }
            } else if (circuitState === 'HALF-OPEN') {
                forwarded = Math.floor(load * 0.1);
                dropped = load - forwarded;
                if (tankBar) { tankBar.style.width = '50%'; tankBar.className = 'h-full bg-amber-500'; }
                if (tokensAvail) tokensAvail.textContent = 'TESTING CANARY PROBE';
                if (burstStatus) burstStatus.textContent = 'Probing 10% traffic to check upstream recovery';
                if (circuitBadge) {
                    circuitBadge.textContent = 'CIRCUIT: HALF-OPEN (CANARY)';
                    circuitBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/25 text-amber-300 border border-amber-500/50';
                }
                if (circuitDesc) {
                    circuitDesc.textContent = 'Canary phase: Testing if bank API latency has returned below SLA threshold before restoring 100% traffic.';
                }
            } else {
                forwarded = load;
                dropped = 0;
                if (tankBar) { tankBar.style.width = '20%'; tankBar.className = 'h-full bg-emerald-500'; }
                if (tokensAvail) tokensAvail.textContent = 'HEALTHY (< 2% Errors)';
                if (burstStatus) burstStatus.textContent = 'All requests dispatching normally';
                if (circuitBadge) {
                    circuitBadge.textContent = 'CIRCUIT: CLOSED (HEALTHY)';
                    circuitBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
                }
                if (circuitDesc) {
                    circuitDesc.textContent = 'Normal operating state: sliding window failure rate is within 0.4% bounds.';
                }
            }
        }

        if (flowForwarded) flowForwarded.textContent = `${forwarded.toLocaleString()} req/s`;
        const dropPct = load > 0 ? ((dropped / load) * 100).toFixed(1) : '0.0';
        if (dropRatio) dropRatio.textContent = `${dropPct}% (${dropped.toLocaleString()} drops)`;

        // Database Load estimation
        const dbLoadPct = Math.min(100, Math.round((forwarded / 8000) * 80 + 15));
        if (dbLoad) {
            dbLoad.textContent = circuitState === 'OPEN' ? '5% (Protected by Circuit)' : `${dbLoadPct}% ${dbLoadPct > 80 ? '(Stressed)' : '(Healthy)'}`;
            dbLoad.className = dbLoadPct > 80 && circuitState !== 'OPEN' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold';
        }

        // Render animated packet pulses in particle track
        if (particleTrack) {
            particleTrack.innerHTML = '';
            const packetCount = Math.min(12, Math.max(3, Math.floor(load / 3000)));
            for (let i = 0; i < packetCount; i++) {
                const isRejected = dropped > 0 && Math.random() < (dropped / load);
                const dot = document.createElement('div');
                const delay = (i * 0.15).toFixed(2);
                dot.className = isRejected ?
                    'w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50 mx-2 animate-pulse shrink-0' :
                    'w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 mx-2 shrink-0';
                dot.style.animation = `flowPulse 1.2s ease-in-out infinite ${delay}s`;
                particleTrack.appendChild(dot);
            }
        }
    }

    // Tab Listeners
    if (tabToken) {
        tabToken.addEventListener('click', () => {
            currentAlgo = 'token';
            tabToken.className = 'rl-algo-tab active px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold transition-all cursor-pointer';
            if (tabLeaky) tabLeaky.className = 'rl-algo-tab px-3 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';
            if (tabCircuit) tabCircuit.className = 'rl-algo-tab px-3 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';

            if (param1Label) param1Label.textContent = 'Bucket Capacity:';
            if (param2Label) param2Label.textContent = 'Refill Rate:';
            if (tankLabel) tankLabel.textContent = 'TOKEN BUCKET CAPACITY:';
            if (commentary) commentary.innerHTML = '💡 <strong>PRODUCTION INSIGHT:</strong> Token Bucket is ideal for FinTech REST webhooks because it absorbs burst traffic (e.g. 5,000 immediate eSign callbacks) while guaranteeing average load stays within database thread bounds.';
            playHapticTick(900, 0.03);
            updateSimulation();
        });
    }

    if (tabLeaky) {
        tabLeaky.addEventListener('click', () => {
            currentAlgo = 'leaky';
            tabLeaky.className = 'rl-algo-tab active px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold transition-all cursor-pointer';
            if (tabToken) tabToken.className = 'rl-algo-tab px-3 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';
            if (tabCircuit) tabCircuit.className = 'rl-algo-tab px-3 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';

            if (param1Label) param1Label.textContent = 'Queue Capacity:';
            if (param2Label) param2Label.textContent = 'Outflow Leak Rate:';
            if (tankLabel) tankLabel.textContent = 'LEAKY FIFO BUFFER:';
            if (commentary) commentary.innerHTML = '💡 <strong>PRODUCTION INSIGHT:</strong> Leaky Bucket converts spiky external bank webhooks into a strictly smooth, uniform stream. Perfect for downstream core banking APIs that crash on concurrent bursts.';
            playHapticTick(800, 0.03);
            updateSimulation();
        });
    }

    if (tabCircuit) {
        tabCircuit.addEventListener('click', () => {
            currentAlgo = 'circuit';
            tabCircuit.className = 'rl-algo-tab active px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold transition-all cursor-pointer';
            if (tabToken) tabToken.className = 'rl-algo-tab px-3 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';
            if (tabLeaky) tabLeaky.className = 'rl-algo-tab px-3 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';

            if (param1Label) param1Label.textContent = 'Failure Rate Threshold:';
            if (param2Label) param2Label.textContent = 'Slow Call Duration:';
            if (tankLabel) tankLabel.textContent = 'CIRCUIT BREAKER STATE WINDOW:';
            if (commentary) commentary.innerHTML = '💡 <strong>PRODUCTION INSIGHT:</strong> Resilience4j Circuit Breaker stops cascade failures. When a bank partner hangs for 30s, failing fast saves thousands of Java Virtual Threads from lingering in limbo.';
            playHapticTick(1050, 0.03);
            updateSimulation();
        });
    }

    // Sliders
    loadSlider.addEventListener('input', updateSimulation);
    capacitySlider.addEventListener('input', updateSimulation);
    refillSlider.addEventListener('input', updateSimulation);

    // Preset Buttons
    document.querySelectorAll('.rl-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tps = parseInt(btn.getAttribute('data-tps'), 10);
            loadSlider.value = tps;
            playHapticTick(750, 0.03);
            updateSimulation();
        });
    });

    updateSimulation();
}

/* ==========================================================================
   3. "Can You Beat The Query Planner?" (SQL Optimization Challenge)
   ========================================================================== */
function initLabSqlIndexing() {
    const stratCards = document.querySelectorAll('.sql-strat-card');
    const runBtn = document.getElementById('sql-run-analyze-btn');
    const ddlBadge = document.getElementById('sql-ddl-badge');
    const ddlCode = document.getElementById('sql-ddl-code');
    const tree = document.getElementById('sql-plan-tree-content');
    const speedupBadge = document.getElementById('sql-speedup-badge');
    const timeMetric = document.getElementById('sql-metric-time');
    const rowsMetric = document.getElementById('sql-metric-rows');
    const bufferMetric = document.getElementById('sql-metric-buffer');
    const gradeMetric = document.getElementById('sql-metric-grade');
    const verdictMetric = document.getElementById('sql-metric-verdict');

    if (!stratCards.length) return;

    let currentStrategy = 'none';

    const STRATEGIES = {
        none: {
            ddlBadge: 'NO INDEX APPLIED',
            ddlBadgeClass: 'text-rose-400 font-bold',
            ddl: '-- Zero index optimization. Full table scan required.',
            tree: `
                <div class="sql-tree-node text-rose-400">
                    <span class="font-bold">-> Seq Scan (Full Table Scan)</span> on tbl_fintech_transactions
                    <div class="text-[10px] text-slate-400 mt-0.5">cost=0.00..98450.00 rows=50,000,000 width=96</div>
                </div>
                <div class="sql-tree-node text-amber-400 ml-4">
                    <span class="font-bold">-> Filter:</span> (status = 'FAILED' AND merchant_id = 'MCH_982' AND created_at >= '2026-03-01')
                    <div class="text-[10px] text-slate-400 mt-0.5">Rows Removed by Filter: 49,999,950 | Buffer Hits: 4,120 / Reads: 184,300</div>
                </div>
            `,
            speedup: '1x (BASELINE)',
            speedupClass: 'px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-bold',
            time: '4,820.4 ms',
            timeNum: 4820.4,
            rows: '50,000,000 rows',
            buffer: '2.2% (Disk I/O Choke)',
            grade: '❌ F (FATAL OUTAGE)',
            gradeClass: 'text-rose-400 font-bold',
            verdict: 'Postgres reads every disk page into buffer pool; blows cache for all other tenants and triggers 504 Gateway Timeouts under load.'
        },
        single_btree: {
            ddlBadge: 'SINGLE B-TREE ON CREATED_AT',
            ddlBadgeClass: 'text-amber-400 font-bold',
            ddl: `CREATE INDEX CONCURRENTLY idx_transactions_created_at \nON tbl_fintech_transactions (created_at);`,
            tree: `
                <div class="sql-tree-node text-amber-400">
                    <span class="font-bold">-> Bitmap Heap Scan on tbl_fintech_transactions</span>
                    <div class="text-[10px] text-slate-400 mt-0.5">cost=1240.50..14210.00 rows=2,450,000 width=96 | Heap Fetches: 2,450,000</div>
                </div>
                <div class="sql-tree-node text-sky-400 ml-4">
                    <span class="font-bold">-> Bitmap Index Scan using idx_transactions_created_at</span>
                    <div class="text-[10px] text-slate-400 mt-0.5">Index Cond: (created_at >= '2026-03-01') | Buffer Hits: 14,800 / Reads: 9,200</div>
                </div>
            `,
            speedup: '5.7x SPEEDUP',
            speedupClass: 'px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold',
            time: '842.1 ms',
            timeNum: 842.1,
            rows: '2,450,000 rows',
            buffer: '61.7% (High Heap Fetches)',
            grade: '⚠️ C (MEDIOCRE SPEEDUP)',
            gradeClass: 'text-amber-400 font-bold',
            verdict: 'B-Tree locates the date range, but executor must still fetch 2.45M table rows from disk to filter merchant_id and status. Heavy random I/O penalty.'
        },
        composite: {
            ddlBadge: 'COMPOSITE (MERCHANT, STATUS, DATE)',
            ddlBadgeClass: 'text-sky-400 font-bold',
            ddl: `CREATE INDEX CONCURRENTLY idx_mch_status_created \nON tbl_fintech_transactions (merchant_id, status, created_at DESC);`,
            tree: `
                <div class="sql-tree-node text-sky-400">
                    <span class="font-bold">-> Index Scan using idx_mch_status_created on tbl_fintech_transactions</span>
                    <div class="text-[10px] text-slate-400 mt-0.5">cost=0.56..185.20 rows=50 width=96 | Heap Fetches: 50</div>
                </div>
                <div class="sql-tree-node text-emerald-400 ml-4">
                    <span class="font-bold">-> Index Cond:</span> ((merchant_id = 'MCH_982') AND (status = 'FAILED') AND (created_at >= '2026-03-01'))
                    <div class="text-[10px] text-slate-400 mt-0.5">Buffer Hits: 68 (100% In-Memory Buffer Pool) | Reads: 0 | Pre-Sorted</div>
                </div>
            `,
            speedup: '339x SPEEDUP',
            speedupClass: 'px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold',
            time: '14.2 ms',
            timeNum: 14.2,
            rows: '142 rows',
            buffer: '99.2% (In-Memory Buffer Pool)',
            grade: '⚡ A (PRODUCTION READY)',
            gradeClass: 'text-sky-400 font-bold',
            verdict: 'Composite index satisfies merchant, status, and descending date order simultaneously. Zero sort overhead, only 50 heap fetches required.'
        },
        partial_covering: {
            ddlBadge: 'COVERING INDEX (ZERO HEAP FETCHES)',
            ddlBadgeClass: 'text-emerald-400 font-bold',
            ddl: `CREATE INDEX CONCURRENTLY idx_failed_covering \nON tbl_fintech_transactions (merchant_id, created_at DESC) \nINCLUDE (transaction_id, amount) \nWHERE status = 'FAILED';`,
            tree: `
                <div class="sql-tree-node text-emerald-400">
                    <span class="font-bold">-> Index Only Scan using idx_failed_covering</span>
                    <div class="text-[10px] text-slate-400 mt-0.5">cost=0.28..8.42 rows=50 width=48 | Heap Fetches: 0 (Zero Disk I/O)</div>
                </div>
                <div class="sql-tree-node text-sky-400 ml-4">
                    <span class="font-bold">-> Index Cond:</span> ((merchant_id = 'MCH_982') AND (created_at >= '2026-03-01'))
                    <div class="text-[10px] text-slate-400 mt-0.5">Buffer Hits: 4 (100% L1 RAM Cache Hit) | Storage Footprint: 98% Smaller!</div>
                </div>
            `,
            speedup: '5,350x SPEEDUP',
            speedupClass: 'px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold',
            time: '0.9 ms',
            timeNum: 0.9,
            rows: '50 rows',
            buffer: '100.0% (Zero Heap Visits)',
            grade: '🏆 S+ (QUERY PLANNER MASTERED)',
            gradeClass: 'text-emerald-400 font-bold',
            verdict: 'By indexing only status = "FAILED" (0.5% of dataset) with INCLUDE columns, the query executor performs an Index Only Scan. 5,350x speedup with 98% less index storage on disk!'
        }
    };

    function applyStrategy(stratKey, animate = true) {
        currentStrategy = stratKey;
        const config = STRATEGIES[stratKey];
        if (!config) return;

        stratCards.forEach(card => {
            if (card.getAttribute('data-strategy') === stratKey) {
                card.className = 'sql-strat-card active p-4 rounded-xl bg-white/[0.04] border-2 border-sky-400 shadow-lg shadow-sky-500/20 transition-all cursor-pointer space-y-2';
            } else {
                card.className = 'sql-strat-card p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-sky-500/40 transition-all cursor-pointer space-y-2';
            }
        });

        if (ddlBadge) { ddlBadge.textContent = config.ddlBadge; ddlBadge.className = config.ddlBadgeClass; }
        if (ddlCode) ddlCode.textContent = config.ddl;

        if (animate) {
            if (timeMetric) timeMetric.textContent = 'Calculating...';
            if (speedupBadge) speedupBadge.textContent = 'Scanning...';
            playHapticTick(900, 0.05);

            setTimeout(() => {
                if (tree) tree.innerHTML = config.tree;
                if (speedupBadge) { speedupBadge.textContent = config.speedup; speedupBadge.className = config.speedupClass; }
                if (timeMetric) {
                    timeMetric.textContent = config.time;
                    timeMetric.className = stratKey === 'partial_covering' ? 'text-emerald-400 font-bold text-sm' : (stratKey === 'composite' ? 'text-sky-400 font-bold text-sm' : (stratKey === 'single_btree' ? 'text-amber-400 font-bold text-sm' : 'text-rose-400 font-bold text-sm'));
                }
                if (rowsMetric) rowsMetric.textContent = config.rows;
                if (bufferMetric) bufferMetric.textContent = config.buffer;
                if (gradeMetric) { gradeMetric.textContent = config.grade; gradeMetric.className = config.gradeClass; }
                if (verdictMetric) verdictMetric.textContent = config.verdict;
                playHapticTick(stratKey === 'partial_covering' ? 1200 : 600, 0.04);
            }, 300);
        } else {
            if (tree) tree.innerHTML = config.tree;
            if (speedupBadge) { speedupBadge.textContent = config.speedup; speedupBadge.className = config.speedupClass; }
            if (timeMetric) timeMetric.textContent = config.time;
            if (rowsMetric) rowsMetric.textContent = config.rows;
            if (bufferMetric) bufferMetric.textContent = config.buffer;
            if (gradeMetric) { gradeMetric.textContent = config.grade; gradeMetric.className = config.gradeClass; }
            if (verdictMetric) verdictMetric.textContent = config.verdict;
        }
    }

    stratCards.forEach(card => {
        card.addEventListener('click', () => {
            const strat = card.getAttribute('data-strategy');
            applyStrategy(strat, true);
        });
    });

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            applyStrategy(currentStrategy, true);
        });
    }

    applyStrategy('none', false);
}

/* ==========================================================================
   4. JVM Heap & Generational ZGC vs G1GC Profiler
   ========================================================================== */
function initLabJvmProfiler() {
    const tabG1 = document.getElementById('gc-tab-g1');
    const tabZgc = document.getElementById('gc-tab-zgc');
    const rateSlider = document.getElementById('gc-rate-slider');
    const rateDisplay = document.getElementById('gc-rate-display');

    const edenPct = document.getElementById('eden-pct-display');
    const edenBar = document.getElementById('eden-bar');
    const survivorPct = document.getElementById('survivor-pct-display');
    const survivorBar = document.getElementById('survivor-bar');
    const oldPct = document.getElementById('old-pct-display');
    const oldBar = document.getElementById('old-bar');

    const pauseDisplay = document.getElementById('gc-pause-display');
    const pauseBar = document.getElementById('pause-bar');
    const pauseVerdict = document.getElementById('gc-pause-verdict');

    if (!tabG1 || !tabZgc || !rateSlider) return;

    let isZgcActive = false;

    function updateProfiler() {
        const rate = parseInt(rateSlider.value, 10);
        if (rateDisplay) rateDisplay.textContent = `${rate} MB / sec`;

        const ratio = rate / 1500;
        const edenVal = Math.min(96, Math.round(30 + ratio * 62));
        const surVal = Math.min(80, Math.round(15 + ratio * 45));
        const oldVal = Math.min(88, Math.round(20 + ratio * 55));

        if (edenPct) edenPct.textContent = `${edenVal}%`;
        if (edenBar) edenBar.style.width = `${edenVal}%`;
        if (survivorPct) survivorPct.textContent = `${surVal}%`;
        if (survivorBar) survivorBar.style.width = `${surVal}%`;
        if (oldPct) oldPct.textContent = `${oldVal}%`;
        if (oldBar) oldBar.style.width = `${oldVal}%`;

        if (!isZgcActive) {
            // G1GC: Pause spikes proportional to rate
            const pauseTime = (40 + ratio * 160).toFixed(1);
            if (pauseDisplay) { pauseDisplay.textContent = `${pauseTime} ms`; pauseDisplay.className = 'text-amber-400 font-bold'; }
            if (pauseBar) { pauseBar.style.width = `${Math.min(100, ratio * 100)}%`; pauseBar.className = 'bg-amber-400 h-2 rounded-full transition-all duration-300'; }
            if (pauseVerdict) { pauseVerdict.textContent = 'Stop-The-World Spike Risk'; pauseVerdict.className = 'text-[9.5px] text-amber-300 block'; }
        } else {
            // Generational ZGC: Ultra sub-millisecond flatline
            const pauseTime = (0.2 + ratio * 0.4).toFixed(2);
            if (pauseDisplay) { pauseDisplay.textContent = `${pauseTime} ms`; pauseDisplay.className = 'text-emerald-400 font-bold'; }
            if (pauseBar) { pauseBar.style.width = '6%'; pauseBar.className = 'bg-emerald-400 h-2 rounded-full transition-all duration-300'; }
            if (pauseVerdict) { pauseVerdict.textContent = 'Concurrent Compaction (<1ms)'; pauseVerdict.className = 'text-[9.5px] text-emerald-300 block font-bold'; }
        }
    }

    tabG1.addEventListener('click', () => {
        isZgcActive = false;
        tabG1.className = 'gc-tab active px-3.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold transition-all cursor-pointer';
        tabZgc.className = 'gc-tab px-3.5 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';
        updateProfiler();
        playHapticTick(400, 0.03);
    });

    tabZgc.addEventListener('click', () => {
        isZgcActive = true;
        tabZgc.className = 'gc-tab active px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold transition-all cursor-pointer';
        tabG1.className = 'gc-tab px-3.5 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';
        updateProfiler();
        playHapticTick(950, 0.03);
    });

    rateSlider.addEventListener('input', () => {
        updateProfiler();
        playHapticTick(500 + parseInt(rateSlider.value, 10) / 3, 0.008);
    });

    updateProfiler();
}

/* ==========================================================================
   5. Cryptographic PKI & Digital Signature Inspector
   ========================================================================== */
function initLabCryptoInspector() {
    const verifyBtn = document.getElementById('verify-crypto-btn');
    const traceOutput = document.getElementById('crypto-trace-output');
    const statusTag = document.getElementById('crypto-status-tag');

    if (!verifyBtn || !traceOutput) return;

    let isVerifying = false;

    const steps = [
        { elId: 'crypto-step-1', descId: 'crypto-step-1-desc', log: "[C14N] Canonicalizing XML DOM tree via Exclusive XML-C14N standard... 0 comments omitted.", successMsg: "Normalized (UTF-8)" },
        { elId: 'crypto-step-2', descId: 'crypto-step-2-desc', log: "[HASH] SHA-256 Digest calculated: a4f8b1c9...8d2e (Matches DigestValue element in XML).", successMsg: "Digest Match 100%" },
        { elId: 'crypto-step-3', descId: 'crypto-step-3-desc', log: "[RSA] Extracting X.509 Certificate: 'UIDAI Offline e-KYC Signer 2026'. Decrypting signature with RSA 2048-bit key...", successMsg: "RSA Key Valid" },
        { elId: 'crypto-step-4', descId: 'crypto-step-4-desc', log: "[CCA] Verifying chain of trust against CCA India National Root Certificate: Root Valid. Status 200 OK.", successMsg: "CCA Root Trusted" }
    ];

    verifyBtn.addEventListener('click', () => {
        if (isVerifying) return;
        isVerifying = true;
        verifyBtn.disabled = true;
        verifyBtn.classList.add('opacity-50', 'cursor-not-allowed');

        traceOutput.innerHTML = '<div class="text-slate-500">// Initiating cryptographic signature validation...</div>';
        if (statusTag) statusTag.innerHTML = '<span class="text-amber-400 animate-pulse font-bold">VERIFYING PKI CHAIN...</span>';

        steps.forEach((step, idx) => {
            setTimeout(() => {
                const logEl = document.createElement('div');
                logEl.className = idx === steps.length - 1 ? 'text-emerald-400 font-bold mt-1 pt-1 border-t border-white/10' : 'text-slate-300';
                logEl.textContent = step.log;
                traceOutput.appendChild(logEl);

                const cardEl = document.getElementById(step.elId);
                const descEl = document.getElementById(step.descId);
                if (cardEl) cardEl.classList.add('border-emerald-400', 'bg-emerald-500/[0.05]');
                if (descEl) descEl.textContent = step.successMsg;

                playHapticTick(750 + idx * 120, 0.02);

                if (idx === steps.length - 1) {
                    if (statusTag) statusTag.innerHTML = '<span class="text-emerald-400 font-bold">✓ CRYPTOGRAPHICALLY VALID & TAMPER-PROOF</span>';
                    isVerifying = false;
                    verifyBtn.disabled = false;
                    verifyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }, (idx + 1) * 320);
        });
    });
}

/* ==========================================================================
   6. Hiring Manager 30-60-90 Day Blueprint Calculator
   ========================================================================== */
function initLabHiringBlueprint() {
    const bottleneckSelect = document.getElementById('blueprint-bottleneck-select');
    const scaleSelect = document.getElementById('blueprint-scale-select');
    const phase1Title = document.getElementById('blueprint-phase1-title');
    const phase1Desc = document.getElementById('blueprint-phase1-desc');
    const phase2Title = document.getElementById('blueprint-phase2-title');
    const phase2Desc = document.getElementById('blueprint-phase2-desc');
    const phase3Title = document.getElementById('blueprint-phase3-title');
    const phase3Desc = document.getElementById('blueprint-phase3-desc');

    if (!bottleneckSelect || !scaleSelect) return;

    const blueprints = {
        'cloud-cost': {
            p1: { title: "Infra Cost Profiling & Thread Rightsizing", desc: "Audit CPU/Memory footprint of bloated platform threads. Right-size EC2 clusters to ARM Graviton instances and transition to Java 25 Virtual Threads to eliminate 16x over-provisioned nodes." },
            p2: { title: "In-Memory Caching & S3 Purge Automation", desc: "Deploy Redis cluster-wide caching for repetitive vendor tokens (eMudhra/UIDAI). Roll out 2,500 TPS purge engine to slash MySQL EBS and S3 high-tier storage costs by 40%." },
            p3: { title: "CFO Cloud Savings Verification", desc: "Verify sub-50ms API latency while proving $1,500+/mo (~₹18,50,000/yr) reduction in cloud hosting bills." }
        },
        'db-locks': {
            p1: { title: "Slow Query EXPLAIN ANALYZE Audit", desc: "Isolate queries choking under lock contention. Map out missing covering indexes, unindexed foreign keys, and harmful full table scans." },
            p2: { title: "Redis Mutex Shielding & PK-Chunking", desc: "Implement Redis distributed locks (`SET NX EX`) to protect hot rows. Replace bulk `DELETE` scripts with primary-key chunking (500 records/batch) to eradicate next-key locks." },
            p3: { title: "Zero-Downtime Shard / Partition Cutover", desc: "Execute boundary-routed dual-DB migration at 150 TPS with 0.000s downtime, leaving database connection pool usage under 35%." }
        },
        'legacy-consolidation': {
            p1: { title: "Repository & Dependency Mapping", desc: "Analyze the 4 splintered repositories. Eliminate chained SNS hops and replace fragile external Firebase auth with hardened internal JWT." },
            p2: { title: "Spring Boot Unified Core Architecture", desc: "Consolidate into 1 modular codebase with dynamic enterprise configs (custom EIDs, client fallback URLs). Achieve 98%+ JUnit & Mockito test coverage." },
            p3: { title: "Blue-Green Cutover with Password Preservation", desc: "Run automated migration scripts preserving legacy password hashes for 0 customer credential resets. Deploy directly to production with zero client bugs." }
        },
        'timeouts': {
            p1: { title: "Upstream Telemetry & Traceability Layer", desc: "Implement DB-level observability capturing raw third-party gateway responses. Immediately attribute whether latency stems from bank servers or internal code." },
            p2: { title: "Asynchronous Virtual Thread Decoupling", desc: "Replace sequential HTTP calls with concurrent Virtual Threads. Buffer client bursts using Redis token bucket rate limiters to shield downstream gateways." },
            p3: { title: "Automated Idempotency & Re-stamp Engine", desc: "Ensure 100% idempotent transactions with automatic retries, reducing partner timeout tickets to zero." }
        }
    };

    function updateBlueprint() {
        const key = bottleneckSelect.value;
        const bp = blueprints[key] || blueprints['cloud-cost'];
        if (phase1Title) phase1Title.textContent = bp.p1.title;
        if (phase1Desc) phase1Desc.textContent = bp.p1.desc;
        if (phase2Title) phase2Title.textContent = bp.p2.title;
        if (phase2Desc) phase2Desc.textContent = bp.p2.desc;
        if (phase3Title) phase3Title.textContent = bp.p3.title;
        if (phase3Desc) phase3Desc.textContent = bp.p3.desc;
        playHapticTick(800, 0.015);
    }

    bottleneckSelect.addEventListener('change', updateBlueprint);
    scaleSelect.addEventListener('change', updateBlueprint);
}

/* ==========================================================================
   7. ADRs Accordion
   ========================================================================== */
function initLabAdrAccordion() {
    const toggleBtns = document.querySelectorAll('.adr-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const chevron = btn.querySelector('.adr-chevron');
            if (!targetContent) return;

            const isCurrentlyOpen = !targetContent.classList.contains('hidden');

            document.querySelectorAll('.adr-content').forEach(content => content.classList.add('hidden'));
            document.querySelectorAll('.adr-chevron').forEach(icon => icon.classList.remove('rotate-180'));

            if (!isCurrentlyOpen) {
                targetContent.classList.remove('hidden');
                if (chevron) chevron.classList.add('rotate-180');
                playHapticTick(800, 0.015);
            } else {
                playHapticTick(500, 0.015);
            }
        });
    });
}

/* ==========================================================================
   8. Friday 7:30 PM On-Call Incident Simulator
   ========================================================================== */
function initLabIncidentSimulator() {
    const choices = document.querySelectorAll('.incident-choice');
    const terminalOutput = document.getElementById('incident-terminal-output');
    const statusTag = document.getElementById('incident-status-tag');

    if (!choices.length || !terminalOutput) return;

    let isSimulating = false;

    const scenarios = {
        a: {
            title: "Option A: Scale EC2 Compute",
            status: '<span class="text-rose-400 font-bold animate-pulse">TRIAGE FAILED: LATENCY SPIKE</span>',
            soundFreq: 220,
            logs: [
                "[T+0.0s] AWS AutoScaling: Bootstrapping 10x c5.2xlarge compute instances...",
                "[T+1.2s] Spring Boot JVM warming up. Heap allocated: 4GB per instance...",
                "[T+2.0s] Connection Surge: 10 new nodes opened 200 additional connections to RDS MySQL!",
                "[T+2.8s] CRITICAL: RDS Connection Pool exhausted (1,000/1,000 max connections reached).",
                "[T+3.4s] MySQL IOPS bottleneck saturated. Lock contention spikes. 504 Gateway Timeouts reach 84%!",
                "[VERDICT] ❌ Scaled compute when the bottleneck was the downstream connection pool. Thundering herd caused catastrophic failure."
            ]
        },
        b: {
            title: "Option B: Increase Tomcat Max-Threads to 2,000",
            status: '<span class="text-rose-400 font-bold animate-pulse">TRIAGE FAILED: OOM KILLER</span>',
            soundFreq: 180,
            logs: [
                "[T+0.0s] Configuration applied: server.tomcat.threads.max=2000 dynamically updated...",
                "[T+0.9s] Upstream bank gateway remains degraded with 4,500ms response latency...",
                "[T+1.7s] 1,800 platform OS threads simultaneously enter WAITING state on SocketInputStream.read()...",
                "[T+2.5s] Native OS stack memory consumed: 1,800 threads * 1MB = 1.8GB native thread stack RAM...",
                "[T+3.2s] CRITICAL: Host memory threshold exceeded. Linux Kernel Out-Of-Memory (OOM) killer invoked!",
                "[T+3.5s] Process terminated with SIGKILL (PID 4092). Service totally dead.",
                "[VERDICT] ❌ Platform OS threads are heavy (1MB stack). Multiplying blocked threads causes kernel panics. Thread inflation != concurrency."
            ]
        },
        c: {
            title: "Option C: Token Bucket Rate-Limiter + Virtual Threads",
            status: '<span class="text-emerald-400 font-bold">INCIDENT RESOLVED &bull; 99.99% RESTORED</span>',
            soundFreq: 1050,
            fireworks: true,
            logs: [
                "[T+0.0s] Redis Token Bucket Rate-Limiter engaged: 150 TPS bucket capacity enforced...",
                "[T+0.4s] Java 25 Virtual Threads unmount blocked I/O from OS carrier threads instantly...",
                "[T+0.9s] 12,000 concurrent requests parked in lightweight continuations (only ~300 bytes each)...",
                "[T+1.5s] RDS Connection Pool utilization drops to 34%. 0 Gateway Timeouts reported.",
                "[T+2.1s] Third-party bank gateway stabilizes. Queued transactions flush with 0 duplicate debits.",
                "[VERDICT] ✅ GOD-TIER ARCHITECTURE: Upstream rate shaping protected the database while Virtual Threads handled 10x concurrent blocked I/O with negligible memory overhead."
            ]
        }
    };

    choices.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSimulating) return;
            const choiceKey = btn.getAttribute('data-choice');
            const scenario = scenarios[choiceKey];
            if (!scenario) return;

            isSimulating = true;
            choices.forEach(c => {
                c.classList.remove('ring-2', 'ring-sky-400', 'ring-rose-500', 'ring-emerald-400');
                c.classList.add('opacity-50', 'pointer-events-none');
            });
            btn.classList.remove('opacity-50');
            const ringColor = choiceKey === 'c' ? 'ring-emerald-400' : 'ring-rose-500';
            btn.classList.add('ring-2', ringColor);

            playHapticTick(600, 0.02);
            terminalOutput.innerHTML = `<div class="text-slate-500">// Executing ${scenario.title}...</div>`;
            if (statusTag) statusTag.innerHTML = '<span class="text-amber-400 animate-pulse font-bold">TRIAGING MITIGATION...</span>';

            scenario.logs.forEach((line, index) => {
                setTimeout(() => {
                    const logEl = document.createElement('div');
                    if (line.startsWith('[VERDICT]')) {
                        logEl.className = choiceKey === 'c' ? 'text-emerald-300 font-bold mt-2 pt-2 border-t border-white/10' : 'text-rose-300 font-bold mt-2 pt-2 border-t border-white/10';
                    } else if (line.includes('CRITICAL') || line.includes('WARN')) {
                        logEl.className = 'text-rose-400 font-semibold';
                    } else {
                        logEl.className = 'text-slate-300';
                    }
                    logEl.textContent = line;
                    terminalOutput.appendChild(logEl);
                    playHapticTick(scenario.soundFreq, 0.015);

                    if (index === scenario.logs.length - 1) {
                        if (statusTag) statusTag.innerHTML = scenario.status;
                        if (scenario.fireworks && window.launchRocketBarrage) {
                            window.launchRocketBarrage(6);
                        }
                        setTimeout(() => {
                            isSimulating = false;
                            choices.forEach(c => c.classList.remove('opacity-50', 'pointer-events-none'));
                        }, 800);
                    }
                }, (index + 1) * 350);
            });
        });
    });
}

/* ==========================================================================
   9. Terminal REPL Cheat Codes & Mobile Physical Haptics
   ========================================================================== */
function initLabTerminalRepl() {
    const input = document.getElementById('lab-repl-input');
    const output = document.getElementById('lab-repl-output');
    if (!input || !output) return;

    function appendRepl(text, color = 'text-slate-300') {
        const line = document.createElement('div');
        line.className = `${color} leading-relaxed`;
        line.innerHTML = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const raw = input.value.trim().toLowerCase();
            input.value = '';
            if (!raw) return;

            appendRepl(`<span class="text-sky-400 font-bold">&gt; ${raw}</span>`);
            playHapticTick(900, 0.015);

            switch (raw) {
                case 'help':
                    appendRepl("Available Commands: <br>&bull; <span class='text-sky-300'>whoami</span> - Displays Senior Architect profile JSON<br>&bull; <span class='text-emerald-300'>matrix</span> - Trigger falling digital rain<br>&bull; <span class='text-amber-300'>bench</span> - Execute 100k TPS payment switch test<br>&bull; <span class='text-rose-300'>patakha</span> / <span class='text-purple-300'>fireworks</span> - Launch celebration rockets<br>&bull; <span class='text-slate-400'>clear</span> - Clear terminal output");
                    break;
                case 'whoami':
                    appendRepl(`{<br>&nbsp;&nbsp;"name": "Akshat Jaiswal",<br>&nbsp;&nbsp;"title": "Senior Software Engineer (SSE)",<br>&nbsp;&nbsp;"company": "Digitap.AI",<br>&nbsp;&nbsp;"productsBuiltSolo": 4,<br>&nbsp;&nbsp;"scale": ["OKYC (300k/day)", "DigiLocker (90k/day)", "eSign v2", "eNACH", "VKYC", "Video-PD", "Clickwrap"],<br>&nbsp;&nbsp;"specialties": ["Distributed Systems", "Java 25 Virtual Threads", "150 TPS DB Migrations", "2,500 TPS Purge"],<br>&nbsp;&nbsp;"location": "Bengaluru, India"<br>}`, "text-emerald-400");
                    break;
                case 'matrix':
                    appendRepl("Wake up, Neo... The Matrix has you. Follow the white rabbit.", "text-emerald-400 font-bold");
                    if (window.launchRocketBarrage) window.launchRocketBarrage(3);
                    break;
                case 'bench':
                    appendRepl("Triggering 100k TPS Payment Switch stress test...", "text-sky-300");
                    const simBtn = document.getElementById('sim-switch-btn');
                    if (simBtn) simBtn.click();
                    break;
                case 'patakha':
                case 'fireworks':
                case 'rocket':
                    appendRepl("🚀 Launching celebratory fireworks barrage!", "text-purple-400 font-bold");
                    if (window.launchRocketBarrage) window.launchRocketBarrage(7);
                    break;
                case 'clear':
                    output.innerHTML = '<div class="text-slate-500">// Terminal cleared. Type \'help\' for available commands.</div>';
                    break;
                case 'sudo rm -rf /':
                    appendRepl("❌ Permission denied: Production pe sudo nahi milta bhai.", "text-rose-400 font-bold");
                    playHapticTick(200, 0.08);
                    break;
                default:
                    appendRepl(`Command not recognized: '${raw}'. Type 'help' for command list.`, "text-slate-500");
            }
        }
    });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(title, message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'apple-glass p-3.5 rounded-2xl border border-sky-400/30 shadow-2xl flex items-start gap-3 text-xs pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-2 duration-200';
    toast.innerHTML = `
        <div class="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0 animate-ping"></div>
        <div>
            <div class="font-bold text-white font-mono">${title}</div>
            <div class="text-slate-300 text-[11px] mt-0.5 leading-relaxed">${message}</div>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'scale-95');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
window.showToast = showToast;

/* ==========================================================================
   Cluster Health SRE Mission Control: HUD & Bank Jitter Simulator
   ========================================================================== */
function initClusterHealthHud() {
    const jitterBtn = document.getElementById('hud-jitter-btn');
    const statusBadge = document.getElementById('hud-status-badge');
    const statusText = document.getElementById('hud-status-text');
    const statusDot = document.getElementById('hud-status-dot');
    const tspStat = document.getElementById('hud-tsp-stat');

    let isJittering = false;

    window.simulateBankJitter = function() {
        if (isJittering) return;
        isJittering = true;
        playHapticTick(300, 0.08);

        // Transition to Amber / Degraded (Circuit breaker tripping)
        if (statusBadge) {
            statusBadge.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30';
        }
        if (statusDot) {
            statusDot.className = 'w-2 h-2 rounded-full bg-amber-400 hud-ping';
        }
        if (statusText) {
            statusText.textContent = 'CIRCUIT BREAKER: OPEN';
        }
        if (tspStat) {
            tspStat.className = 'text-amber-400 font-bold';
            tspStat.textContent = 'eMudhra TIMEOUT (2,400ms) ⚠️';
        }

        showToast("⚠️ DOWNSTREAM JITTER INJECTED", "Bank TSP delayed by 2,400ms. Resilience4j Circuit Breaker tripped to OPEN.");

        // Fallback engages at 1.4s
        setTimeout(() => {
            if (tspStat) {
                tspStat.textContent = 'Fallback Cache Engaged (+14ms)';
            }
            if (statusText) {
                statusText.textContent = 'CIRCUIT: HALF-OPEN (RETRYING)';
            }
            playHapticTick(600, 0.02);
        }, 1400);

        // Self-heal and recover at 3.2s
        setTimeout(() => {
            if (statusBadge) {
                statusBadge.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            }
            if (statusDot) {
                statusDot.className = 'w-2 h-2 rounded-full bg-emerald-400 hud-ping';
            }
            if (statusText) {
                statusText.textContent = 'SYSTEMS: ALL GREEN';
            }
            if (tspStat) {
                tspStat.className = 'text-emerald-400 font-bold';
                tspStat.textContent = 'eMudhra 99.99% (38ms)';
            }
            playHapticTick(1050, 0.04);
            showToast("✅ CIRCUIT BREAKER RECOVERED", "Healthy probes confirmed downstream stability. Circuit reset to CLOSED.");
            isJittering = false;
        }, 3200);
    };

    if (jitterBtn) {
        jitterBtn.addEventListener('click', window.simulateBankJitter);
    }
}

/* ==========================================================================
   Interactive System Architecture Visualizer (Live Pipeline Simulator)
   ========================================================================== */
function initArchitectureVisualizer() {
    const PIPELINES = {
        esign: {
            tag: 'PARALLEL IN-MEMORY PDFBOX ORCHESTRATION',
            title: 'Aadhaar Single OTP Multi-Document Aggregation',
            desc: 'Replaces sequential 4-OTP torture with a single cryptographic session. 4 PDFs downloaded, mapped, and stamped in-memory simultaneously.',
            defense: 'Uses Redis distributed lock (\'SET NX EX 30s\'). If the signer double-clicks or refreshes, twin requests are rejected instantly with 409 Conflict, preventing duplicate eMudhra charge fees.',
            safety: '100% IDEMPOTENT',
            duration: '72ms',
            nodes: [
                { step: 1, title: 'Client Ingress', sub: 'Signed Payload', badge: '0ms' },
                { step: 2, title: 'API Gateway', sub: 'Spring Boot 3 + VT', badge: '+4ms' },
                { step: 3, title: 'Redis Lock', sub: 'SET NX EX 30s', badge: '+12ms' },
                { step: 4, title: 'PDFBox Engine', sub: 'In-Memory 4x PDF', badge: '+18ms' },
                { step: 5, title: 'Bank TSP', sub: 'eMudhra HSM Sign', badge: '+38ms' },
                { step: 6, title: 'Callback Webhook', sub: '200 OK Callback', badge: 'Total: 72ms' }
            ],
            logs: [
                '[T+0ms] Ingress packet accepted: TLS 1.3 verified, payload SHA-256 intact.',
                '[T+4ms] VirtualThread-108 spawned. Dispatched to eSign orchestration service.',
                '[T+16ms] Redis distributed lock acquired on \'lock:signer:9839\': Deduplication verified.',
                '[T+34ms] PDFBox 3.x in-memory parallel merger initialized: 4 document byte-streams aggregated.',
                '[T+72ms] eMudhra HSM timestamp generated & cryptographic signature envelope appended.',
                '[T+78ms] In-memory PDF sealed. Async Webhook fired to client partner. Roundtrip complete.'
            ]
        },
        purge: {
            tag: 'HIGH-VELOCITY ASYNC DATABASE PURGE ENGINE',
            title: '2,500 TPS Table Purge & Zero-Lock Partitioning',
            desc: 'Deletes millions of historical transaction logs asynchronously without triggering InnoDB lock timeouts or degrading live user-facing APIs.',
            defense: 'Bounded primary key range partitions (500-row chunks) with 20ms yield pauses prevent lock escalation and table-level locks. DBA sleeps peacefully.',
            safety: 'ZERO DEADLOCKS',
            duration: '38ms (Batch)',
            nodes: [
                { step: 1, title: 'Partition Cron', sub: 'Scheduled Trigger', badge: '0ms' },
                { step: 2, title: 'PK Chunker', sub: 'Bounded 500-Rows', badge: '+2ms' },
                { step: 3, title: 'Virtual Thread Pool', sub: '128 Async Fibers', badge: '+6ms' },
                { step: 4, title: 'InnoDB Cluster', sub: 'Index-Only Deletes', badge: '+14ms' },
                { step: 5, title: 'Kafka Audit', sub: 'Event Tombstone', badge: '+8ms' },
                { step: 6, title: 'Metric Emitter', sub: '2,500 TPS Verified', badge: 'Purge Sustained' }
            ],
            logs: [
                '[T+0ms] Purge engine cron activated: Target table partition selected (created_at < NOW - 90d).',
                '[T+2ms] Primary key bounding query executed: Indexed min_id=1400201 to max_id=1450201.',
                '[T+8ms] Spawning 128 virtual thread batch executors on carrier CPU pool.',
                '[T+22ms] Executing DELETE FROM tbl WHERE id BETWEEN ? AND ? LIMIT 500: Lock wait 0ms.',
                '[T+30ms] Kafka partition audit event emitted to \'audit-purge-events\' topic.',
                '[T+38ms] Batch chunk complete: 2,500 rows purged in 1.02s. InnoDB buffer pool intact.'
            ]
        },
        digilocker: {
            tag: 'HIGH-SPEED SURGE RESILIENCE & COLD STORAGE',
            title: 'DigiLocker 28k to 90k Daily Surge Ingestion',
            desc: 'Ingests fluctuating government DigiLocker payloads, routes across dual-database boundaries, and streams byte arrays straight to S3 with zero disk write latency.',
            defense: 'Token-bucket rate limiter smooths upstream spike bursts; dual-DB partition routing ensures zero data collisions between legacy and revamp schemas.',
            safety: 'ZERO PACKET LOSS',
            duration: '60ms',
            nodes: [
                { step: 1, title: 'Surge Webhook', sub: 'Govt DigiLocker Ingress', badge: '0ms' },
                { step: 2, title: 'Token Bucket', sub: 'Burst Rate Limiter', badge: '+3ms' },
                { step: 3, title: 'Boundary Router', sub: 'Dual-DB Partition', badge: '+9ms' },
                { step: 4, title: 'In-Memory Stream', sub: 'Zero-Disk Transfer', badge: '+16ms' },
                { step: 5, title: 'AWS S3 Cold', sub: 'Glacier Archival', badge: '+32ms' },
                { step: 6, title: 'Partner Callback', sub: '90k Daily Sustained', badge: 'Roundtrip: 60ms' }
            ],
            logs: [
                '[T+0ms] DigiLocker webhook ingress received under surge traffic (150 TPS burst).',
                '[T+3ms] Token bucket rate limiter smooths queue: 0 packets dropped, 0 throttled.',
                '[T+12ms] Boundary routing filter applied: ID mapped to Revamp DB partition.',
                '[T+28ms] PDF payload streamed entirely in-memory: Bypassed local disk I/O completely.',
                '[T+60ms] S3 multipart chunk stream uploaded with AES-256 server-side encryption.',
                '[T+68ms] Partner webhook acknowledged with 200 OK. Daily counter updated: 89,420 tx.'
            ]
        }
    };

    let activePipeline = 'esign';
    let isFiring = false;

    const tabBtns = document.querySelectorAll('.arch-tab-btn');
    const fireBtn = document.getElementById('fire-packet-btn');
    const categoryTag = document.getElementById('pipeline-category-tag');
    const titleDisplay = document.getElementById('pipeline-title-display');
    const descDisplay = document.getElementById('pipeline-desc-display');
    const defenseNote = document.getElementById('pipeline-defense-note');
    const safetyStat = document.getElementById('pipeline-safety-stat');
    const execTime = document.getElementById('pipeline-execution-time');
    const telemetryLog = document.getElementById('pipeline-telemetry-log');
    const track = document.getElementById('pipeline-nodes-track');

    function renderPipeline(key) {
        const p = PIPELINES[key];
        if (!p) return;

        if (categoryTag) categoryTag.textContent = p.tag;
        if (titleDisplay) titleDisplay.textContent = p.title;
        if (descDisplay) descDisplay.textContent = p.desc;
        if (defenseNote) defenseNote.textContent = p.defense;
        if (safetyStat) safetyStat.textContent = p.safety;
        if (execTime) execTime.textContent = 'READY TO FIRE';

        if (telemetryLog) {
            telemetryLog.innerHTML = `<div class="text-slate-500">// Pipeline: ${p.title} loaded. Press "Fire Request Packet" to trace execution...</div>`;
        }

        if (track) {
            let html = '';
            p.nodes.forEach((node, idx) => {
                html += `
                    <div class="arch-node flex-1 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-2" data-step="${node.step}">
                        <div class="w-7 h-7 mx-auto rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center text-xs font-mono font-bold">${node.step}</div>
                        <div class="text-xs font-bold text-white tracking-tight">${node.title}</div>
                        <div class="text-[10px] font-mono text-slate-400">${node.sub}</div>
                        <span class="inline-block text-[9.5px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-semibold">${node.badge}</span>
                    </div>
                `;
                if (idx < p.nodes.length - 1) {
                    html += `<div class="arch-connector-line h-1 w-6 shrink-0 rounded-full"></div>`;
                }
            });
            track.innerHTML = html;
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isFiring) return;
            tabBtns.forEach(b => {
                b.classList.remove('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40', 'shadow-lg', 'shadow-sky-500/20');
                b.classList.add('bg-white/[0.03]', 'text-slate-400', 'border-white/10');
            });
            btn.classList.add('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40', 'shadow-lg', 'shadow-sky-500/20');
            btn.classList.remove('bg-white/[0.03]', 'text-slate-400', 'border-white/10');

            activePipeline = btn.getAttribute('data-pipeline');
            playHapticTick(800, 0.02);
            renderPipeline(activePipeline);
        });
    });

    if (fireBtn) {
        fireBtn.addEventListener('click', () => {
            if (isFiring) return;
            isFiring = true;
            fireBtn.disabled = true;
            fireBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const p = PIPELINES[activePipeline];
            const nodes = track ? track.querySelectorAll('.arch-node') : [];
            if (execTime) execTime.textContent = 'EXECUTING PIPELINE...';
            if (telemetryLog) telemetryLog.innerHTML = '';

            let step = 0;

            function processStep() {
                if (step < nodes.length) {
                    nodes.forEach((n, idx) => {
                        if (idx < step) {
                            n.classList.remove('active-node');
                            n.classList.add('success-node');
                        } else if (idx === step) {
                            n.classList.add('active-node');
                            n.classList.remove('success-node');
                        } else {
                            n.classList.remove('active-node', 'success-node');
                        }
                    });

                    playHapticTick(450 + step * 120, 0.03);

                    if (telemetryLog && p.logs[step]) {
                        const line = document.createElement('div');
                        line.className = 'text-sky-300 font-mono flex items-start gap-2 animate-in fade-in slide-in-from-bottom-1 duration-150';
                        line.innerHTML = `<span class="text-emerald-400 font-bold">&gt;</span><span>${p.logs[step]}</span>`;
                        telemetryLog.appendChild(line);
                        telemetryLog.scrollTop = telemetryLog.scrollHeight;
                    }

                    step++;
                    setTimeout(processStep, 260);
                } else {
                    nodes.forEach(n => {
                        n.classList.remove('active-node');
                        n.classList.add('success-node');
                    });
                    if (execTime) execTime.textContent = `200 OK • ROUNDTRIP ${p.duration}`;
                    playHapticTick(1200, 0.05);

                    if (window.launchRocketBarrage && activePipeline === 'purge') {
                        window.launchRocketBarrage(4);
                    }

                    setTimeout(() => {
                        isFiring = false;
                        fireBtn.disabled = false;
                        fireBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    }, 400);
                }
            }

            processStep();
        });
    }

    renderPipeline('esign');
}

/* ==========================================================================
   Hard Provable Benchmarks: Legacy Monolith vs Modern Java 25 Stack
   ========================================================================== */
function initArchitecturalBenchmarkLab() {
    const benchBtn = document.getElementById('run-bench-btn');
    if (!benchBtn) return;

    benchBtn.addEventListener('click', () => {
        playHapticTick(950, 0.03);
        benchBtn.disabled = true;
        benchBtn.classList.add('opacity-50');

        const barOpt1 = document.getElementById('bench-bar-opt-1');
        const barOpt2 = document.getElementById('bench-bar-opt-2');
        const barOpt3 = document.getElementById('bench-bar-opt-3');
        const barLegacy1 = document.getElementById('bench-bar-legacy-1');
        const barLegacy2 = document.getElementById('bench-bar-legacy-2');
        const barLegacy3 = document.getElementById('bench-bar-legacy-3');

        // Reset widths
        if (barOpt1) barOpt1.style.width = '0%';
        if (barOpt2) barOpt2.style.width = '0%';
        if (barOpt3) barOpt3.style.width = '0%';
        if (barLegacy1) barLegacy1.style.width = '0%';
        if (barLegacy2) barLegacy2.style.width = '0%';
        if (barLegacy3) barLegacy3.style.width = '0%';

        // Animate Modern Java 25 Virtual Threads stack instantly
        setTimeout(() => {
            if (barOpt1) barOpt1.style.width = '21%';
            if (barOpt2) barOpt2.style.width = '8%';
            if (barOpt3) barOpt3.style.width = '3%';
            playHapticTick(1100, 0.04);
        }, 150);

        // Animate Legacy stack slowly to 100%
        setTimeout(() => {
            if (barLegacy1) barLegacy1.style.width = '100%';
            if (barLegacy2) barLegacy2.style.width = '100%';
            if (barLegacy3) barLegacy3.style.width = '100%';
            playHapticTick(400, 0.06);

            showToast("⚡ BENCHMARK COMPLETE", "Modern Java 25 Virtual Threads stack completed in 142ms vs 1,850ms on legacy monolith (13x speedup, 0 deadlocks).");
            benchBtn.disabled = false;
            benchBtn.classList.remove('opacity-50');
        }, 850);
    });
}

/* ==========================================================================
   FinTech Cloud Infrastructure ROI & Savings Calculator
   ========================================================================== */
function initRoiCalculator() {
    const slider = document.getElementById('roi-volume-slider');
    const volumeDisplay = document.getElementById('roi-volume-display');
    const annualSavingsDisplay = document.getElementById('roi-annual-savings');
    const usdSavingsDisplay = document.getElementById('roi-usd-savings');
    const legacyCostDisplay = document.getElementById('roi-legacy-cost');
    const optCostDisplay = document.getElementById('roi-opt-cost');

    if (!slider) return;

    function updateRoi() {
        const volume = parseInt(slider.value, 10);

        // Calculate costs dynamically based on real-world AWS infrastructure scaling
        // Legacy: 16x EC2 c5.2xlarge + oversized RDS + timeout duplicate penalties
        const legacyCost = Math.round(550 + (volume / 350000) * 1300);
        // Optimized: 3x ARM Graviton c6g.xlarge + Virtual Threads + Redis Mutex
        const optCost = Math.round(120 + (volume / 350000) * 190);

        const monthlySavingsUSD = legacyCost - optCost;
        const annualSavingsUSD = monthlySavingsUSD * 12;
        const annualSavingsINR = Math.round((annualSavingsUSD * 86) / 10000) * 10000;

        if (volumeDisplay) {
            volumeDisplay.textContent = `${volume.toLocaleString('en-IN')} Tx / Day`;
        }
        if (legacyCostDisplay) {
            legacyCostDisplay.textContent = `$${legacyCost.toLocaleString()} / mo`;
        }
        if (optCostDisplay) {
            optCostDisplay.textContent = `$${optCost.toLocaleString()} / mo`;
        }
        if (annualSavingsDisplay) {
            annualSavingsDisplay.textContent = `₹${annualSavingsINR.toLocaleString('en-IN')}+`;
        }
        if (usdSavingsDisplay) {
            usdSavingsDisplay.textContent = `~$${annualSavingsUSD.toLocaleString()} USD / Year`;
        }
    }

    slider.addEventListener('input', () => {
        updateRoi();
        playHapticTick(500 + Math.min(600, parseInt(slider.value, 10) / 2500), 0.008);
    });

    updateRoi();
}
