/**
 * Interactive Script for Akshat Jaiswal's High-Scale FinTech Portfolio
 * Features:
 * - Apple-style Light/Dark mode switcher with persistence
 * - Specular mouse reflection inside glass cards
 * - 3D Card Hover Tilt effect
 * - Live Simulated Terminal Stream (Java 25, Virtual Threads, 45 TPS)
 * - "Break Prod" Savage Interactive Modal
 * - Copy Email Toast with Savage Humour
 * - Live System Health Poller
 */

document.addEventListener('DOMContentLoaded', () => {
    const safeInit = (fn, name) => {
        try {
            if (typeof fn === 'function') fn();
        } catch (err) {
            console.warn(`[Init Error in ${name}]:`, err);
        }
    };

    safeInit(initThemeToggle, 'initThemeToggle');
    safeInit(initProjectTabs, 'initProjectTabs');
    safeInit(initSpecularGlowAndTilt, 'initSpecularGlowAndTilt');
    safeInit(initTerminalStream, 'initTerminalStream');
    safeInit(initBreakProdModal, 'initBreakProdModal');
    safeInit(initEmailCopy, 'initEmailCopy');
    safeInit(initRoastGenerator, 'initRoastGenerator');
    safeInit(initMobileMenu, 'initMobileMenu');
    safeInit(initSoundEffects, 'initSoundEffects');
    safeInit(initTpsStressTester, 'initTpsStressTester');
    safeInit(initClusterHealthHud, 'initClusterHealthHud');
    safeInit(initArchitectureVisualizer, 'initArchitectureVisualizer');
    safeInit(initArchitecturalBenchmarkLab, 'initArchitecturalBenchmarkLab');
    safeInit(initRaceConditionChallenge, 'initRaceConditionChallenge');
    safeInit(initTechChatModal, 'initTechChatModal');
    safeInit(initCliQaModal, 'initCliQaModal');
    safeInit(initFireworksEngine, 'initFireworksEngine');
    safeInit(initLofiAmbientPlayer, 'initLofiAmbientPlayer');
    safeInit(initCodeDiffDrawers, 'initCodeDiffDrawers');
    safeInit(initKonamiCodeEasterEgg, 'initKonamiCodeEasterEgg');
    safeInit(initRoiCalculator, 'initRoiCalculator');
    safeInit(initSqlIndexingLab, 'initSqlIndexingLab');
    safeInit(initAdrAccordion, 'initAdrAccordion');
    safeInit(initIncidentSimulator, 'initIncidentSimulator');
    safeInit(initProductionWrapped, 'initProductionWrapped');
    safeInit(initLiveSystemPreviewModal, 'initLiveSystemPreviewModal');
    safeInit(initShortafQuickTester, 'initShortafQuickTester');
    safeInit(initCopyCodeButtons, 'initCopyCodeButtons');
    safeInit(initAdrRcaToggle, 'initAdrRcaToggle');
    safeInit(initScrollSpy, 'initScrollSpy');
    safeInit(initCommandPalette, 'initCommandPalette');
    safeInit(initChaosSimulator, 'initChaosSimulator');
    safeInit(initTradeoffSimulator, 'initTradeoffSimulator');
    safeInit(initSqlOptimizer, 'initSqlOptimizer');
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const root = document.documentElement;
    
    // Check saved or default to dark
    const savedTheme = localStorage.getItem('akshat-theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('akshat-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const sunIcon = document.getElementById('theme-sun-icon');
    const moonIcon = document.getElementById('theme-moon-icon');
    if (!sunIcon || !moonIcon) return;

    if (theme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

/* ==========================================================================
   2. Apple Glass Specular Glow & 3D Card Tilt
   ========================================================================== */
function initSpecularGlowAndTilt() {
    const cards = document.querySelectorAll('.apple-glass-card');

    cards.forEach(card => {
        // Create specular glow element if not present
        let glow = card.querySelector('.specular-glow');
        if (!glow) {
            glow = document.createElement('div');
            glow.className = 'specular-glow';
            card.appendChild(glow);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update specular glow position
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;

            // 3D Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* ==========================================================================
   3. Live Simulated High-Throughput Terminal Stream
   ========================================================================== */
function initTerminalStream() {
    const terminalLogs = document.getElementById('terminal-logs');
    if (!terminalLogs) return;

    const simulatedLogs = [
        { tag: "INFO", color: "text-sky-400", msg: "VirtualThreadExecutor: Spawning 128 virtual threads on Java 25 Corretto" },
        { tag: "ROLE", color: "text-amber-400", msg: "Senior Software Engineer (SSE) leading core FinTech architecture & distributed systems" },
        { tag: "OKYC", color: "text-emerald-400", msg: "OKYC Engine: 250,000+ daily successful verifications running at sub-40ms" },
        { tag: "ESIGN", color: "text-emerald-400", msg: "Single OTP Multi-Stamp: 4 PDFs merged in-memory via PDFBox 3.x in 14ms" },
        { tag: "MIGRATE", color: "text-emerald-400", msg: "DigiLocker Batch: 150 TPS sustained throughput with auto-retry active" },
        { tag: "PURGE", color: "text-rose-400", msg: "PurgeEngine: 2,500 TPS async table purge - 0 deadlocks, zero lock contention" },
        { tag: "SCALE", color: "text-sky-300", msg: "DigiLocker Surge: 1.5M+ daily API hits across 12-hop pipeline; scaled from 30k-35k to 2 Lakh successful tx/day" },
        { tag: "CIVIL-WAR", color: "text-purple-400", msg: "Dual-DB Query: Boundary routing executed across Legacy + Revamp DB seamlessly" },
        { tag: "ENACH", color: "text-sky-400", msg: "eNACH Mandate Engine: Automated webhook bank clearance with Kotak & Yes Bank" },
        { tag: "REDIS", color: "text-amber-400", msg: "DistributedLock acquired: 'SET NX EX 30s' - eMudhra token cached cluster-wide" },
        { tag: "VKYC-V2", color: "text-sky-400", msg: "Real-time Analytics: Aggregated 450k agent activities via ON DUPLICATE KEY UPDATE in 28ms" },
        { tag: "ALLOCATE", color: "text-emerald-400", msg: "Agent Assignment: 0 bottlenecks reported. BharatPe & Mpokket queues optimal" },
        { tag: "VIDEO-PD", color: "text-purple-400", msg: "Video-PD Real-time Stream: WebRTC session active with 0 agent allocation lag" },
        { tag: "CLICKWRAP", color: "text-teal-300", msg: "Clickwrap Legal Rail: SHA-256 cryptographic audit trail sealed in 9ms" },
        { tag: "OVSE", color: "text-pink-400", msg: "UIDAI Offline XML: Verified cryptographic digital signature. Status 200 OK" }
    ];

    let logIndex = 0;

    function addLog() {
        const item = simulatedLogs[logIndex % simulatedLogs.length];
        logIndex++;

        const now = new Date().toTimeString().split(' ')[0];
        const logLine = document.createElement('div');
        logLine.className = 'font-mono text-xs leading-relaxed transition-all duration-300 opacity-90 hover:opacity-100 flex items-start gap-2';
        logLine.innerHTML = `
            <span class="text-slate-500 select-none">[${now}]</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/5 ${item.color} select-none">${item.tag}</span>
            <span class="text-slate-300">${item.msg}</span>
        `;

        terminalLogs.appendChild(logLine);

        // Keep last 8 lines
        while (terminalLogs.children.length > 8) {
            terminalLogs.removeChild(terminalLogs.firstChild);
        }

        // Auto scroll to bottom
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
    }

    // Initial logs
    for (let i = 0; i < 4; i++) {
        addLog();
    }

    // Stream new log every 2.4 seconds
    setInterval(addLog, 2400);
}

/* ==========================================================================
   4. The "Break Prod" Interactive Troll Modal
   ========================================================================== */
function initBreakProdModal() {
    const triggerBtns = document.querySelectorAll('.break-prod-trigger');
    const modal = document.getElementById('break-prod-modal');
    const modalClose = document.getElementById('break-prod-close');
    const countdownEl = document.getElementById('panic-countdown');
    const panicTerminal = document.getElementById('panic-terminal');

    if (!modal) return;

    triggerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            startPanicSequence();
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    function startPanicSequence() {
        if (!panicTerminal) return;
        panicTerminal.innerHTML = '';
        
        const panicLines = [
            { text: "🚨 [CRITICAL ALERT] Junior dev pushed raw SQL queries directly to main!", delay: 200, color: "text-rose-400 font-bold" },
            { text: "💥 [DB DEADLOCK] MySQL connection pool exhausted... CPU at 99.8%", delay: 800, color: "text-amber-400" },
            { text: "📞 [PAGERDUTY] 47 missed calls from Management & Operations...", delay: 1500, color: "text-rose-300" },
            { text: "⚡ [INTERCEPTOR ACTIVATED] Akshat's defensive architecture engaged.", delay: 2200, color: "text-sky-400 font-semibold" },
            { text: "🛡️ [AUTO-HEAL] Circuit breaker tripped. Virtual Threads re-routed traffic.", delay: 2900, color: "text-emerald-400" },
            { text: "✅ [RESOLVED] All 98% unit tests passed. Production restored in 0.4s.", delay: 3600, color: "text-emerald-300 font-bold" },
            { text: "☕ [STATUS] Relax, go drink chai. That's why you hire backend engineers who know their craft.", delay: 4200, color: "text-slate-300 italic" }
        ];

        panicLines.forEach(item => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.className = `${item.color} font-mono text-xs md:text-sm`;
                p.textContent = item.text;
                panicTerminal.appendChild(p);
                panicTerminal.scrollTop = panicTerminal.scrollHeight;
            }, item.delay);
        });
    }
}

/* ==========================================================================
   5. Copy Email with Savage Toast Notification
   ========================================================================== */
function initEmailCopy() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const emailToCopy = 'akshathrx6393@gmail.com';

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                showToast(
                    "✉️ Email Copied to Clipboard!",
                    "Please don't send 'Quick 15-min sync?'. Send JD, Tech Stack, and Budget or expect HTTP 402 Payment Required."
                );
            }).catch(() => {
                showToast("✉️ Manual Email", `Send an email to: ${emailToCopy}`);
            });
        });
    });
}

function showToast(title, body) {
    let toastContainer = document.getElementById('savage-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'savage-toast-container';
        toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto apple-glass p-4 rounded-2xl shadow-2xl border border-sky-500/30 max-w-sm transition-all duration-300 transform translate-y-4 opacity-0';
    toast.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="flex-1">
                <h4 class="text-sm font-semibold text-white">${title}</h4>
                <p class="text-xs text-slate-300 mt-1 leading-snug">${body}</p>
            </div>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    // Auto remove after 5s
    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

/* ==========================================================================
   6. Savage Roast Generator (Continuous Auto-Loop & Sequential Cycling)
   ========================================================================== */
function initRoastGenerator() {
    const roastBtn = document.getElementById('generate-roast-btn');
    const roastDisplay = document.getElementById('active-roast-display');
    const counterBadge = document.getElementById('roast-counter-badge');
    const cardContainer = document.getElementById('roast-card-container');
    const progressBar = document.getElementById('roast-progress-bar');
    if (!roastDisplay) return;

    // Load principles from window or fallback list
    let roasts = (window.PORTFOLIO_ROASTS && Array.isArray(window.PORTFOLIO_ROASTS) && window.PORTFOLIO_ROASTS.length > 0)
        ? window.PORTFOLIO_ROASTS
        : [
            "Virtual Threads Over Reactive Complexity: Blocking I/O code with Java 25 Virtual Threads scales to hundreds of thousands of concurrent requests with clean, readable synchronous stack traces, completely eliminating the cognitive tax of WebFlux and Mono/Flux debugging.",
            "Zero Disk I/O Under Concurrency: Never write ephemeral payloads (PDFs, biometric hashes, XML signatures) to container disk. Direct streaming buffers via Apache PDFBox eliminate EBS I/O bottlenecks and keep container memory footprints predictable.",
            "Deterministic Idempotency at Network Boundaries: Every banking and digital signature API call must derive an idempotent lock key from the request fingerprint. If an upstream payment rail times out at 29.9s, our gateway never double-executes.",
            "Partitioned Batch Purging vs AWS S3 Throttling: Deleting millions of compliance documents at 2,500 TPS requires date-hash prefix partitioning. Without partitioned key spaces, AWS S3 throttles with 503 SlowDown and starves live ingestion.",
            "Dual-DB Boundary Routing & Zero-Downtime Cutover: When migrating legacy monolithic databases to new schemas, never perform hard maintenance cutovers. Use application-level dual writes, cursor-based background backfills, and Redis feature gates to shift traffic with zero seconds of downtime.",
            "Pre-Flight Validation Saves Upstream Circuit Breakers: Validate PDF dimensions, signature block bounds, and Aadhaar XML schemas in-memory before hitting upstream government or banking APIs. Catching bad payloads early protects your circuit breakers.",
            "Fail-Fast Circuit Breakers for State-Run Upstreams: Government and banking APIs experience national peak latency surges. Implementing thread-isolated bulkheads and exponential backoff with jitter prevents upstream sluggishness from exhausting internal gateway connection pools.",
            "Execution Plans Don't Lie: A query that looks fast in local staging with 50 rows will trigger catastrophic table locks on production at 1,000 TPS. Always profile EXPLAIN plans, eliminate filesorts, and leverage covering indexes.",
            "Test Coverage as Production Armor: Writing 98%+ branch and integration test coverage is not academic pedantry; it is the reason you can deploy high-velocity code to live banking endpoints with absolute confidence.",
            "Prune Architectural Complexity: If a problem can be solved with a clean distributed Redis lock and a virtual-threaded worker pool, don't introduce Kafka clusters or distributed event brokers until data volume genuinely mandates it."
        ];

    let currentIndex = 0;
    const total = roasts.length;
    const DURATION = 6500; // 6.5s per roast
    let autoTimer = null;
    let isPaused = false;
    let isTransitioning = false;

    // Async fetch if somehow window data was missing
    if (!window.PORTFOLIO_ROASTS || window.PORTFOLIO_ROASTS.length === 0) {
        fetch('/api/roasts')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    roasts = data;
                    if (counterBadge) counterBadge.textContent = `${currentIndex + 1} / ${roasts.length}`;
                }
            })
            .catch(() => {});
    }

    function renderRoast(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = ((index % roasts.length) + roasts.length) % roasts.length;

        // Smooth fade out
        roastDisplay.style.transition = 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        roastDisplay.style.opacity = '0';
        roastDisplay.style.transform = 'translateY(-6px)';

        setTimeout(() => {
            const rawRoast = roasts[currentIndex];
            const cleanRoast = rawRoast.replace(/^["']|["']$/g, '');
            roastDisplay.textContent = `"${cleanRoast}"`;
            roastDisplay.style.opacity = '1';
            roastDisplay.style.transform = 'translateY(0)';

            if (counterBadge) {
                counterBadge.textContent = `${currentIndex + 1} / ${roasts.length}`;
            }
            isTransitioning = false;
        }, 250);

        restartProgressBar();
    }

    function restartProgressBar() {
        if (!progressBar) return;
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        // Force reflow
        void progressBar.offsetWidth;
        if (!isPaused) {
            progressBar.style.transition = `width ${DURATION}ms linear`;
            progressBar.style.width = '100%';
        }
    }

    function startAutoLoop() {
        clearInterval(autoTimer);
        restartProgressBar();
        autoTimer = setInterval(() => {
            if (!isPaused) {
                renderRoast(currentIndex + 1);
            }
        }, DURATION);
    }

    // Manual next button click
    if (roastBtn) {
        roastBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderRoast(currentIndex + 1);
            startAutoLoop();
        });
    }

    // Direct card click advances to next
    if (cardContainer) {
        cardContainer.addEventListener('click', (e) => {
            // Don't trigger if clicking child button
            if (e.target.closest('#generate-roast-btn')) return;
            renderRoast(currentIndex + 1);
            startAutoLoop();
        });

        // Hover pause
        cardContainer.addEventListener('mouseenter', () => {
            isPaused = true;
            if (progressBar) {
                const currentWidth = window.getComputedStyle(progressBar).width;
                progressBar.style.transition = 'none';
                progressBar.style.width = currentWidth;
            }
        });

        // Mouse leave resumes
        cardContainer.addEventListener('mouseleave', () => {
            isPaused = false;
            restartProgressBar();
        });
    }

    // Initialize badge and start loop
    if (counterBadge) {
        counterBadge.textContent = `1 / ${roasts.length}`;
    }
    startAutoLoop();
}

/* ==========================================================================
   7. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/* ==========================================================================
   8. Tactile Sound FX System (Synthesized Web Audio API)
   ========================================================================== */
let audioCtx = null;
// Default to ON unless explicitly disabled by user
let soundEnabled = localStorage.getItem('akshat-sound') !== 'false';

function initAudioContextOnFirstGesture() {
    const resumeAudio = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    };
    document.addEventListener('pointerdown', resumeAudio, { once: true });
    document.addEventListener('keydown', resumeAudio, { once: true });
}

function playHapticTick(freq = 850, duration = 0.02) {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + duration);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

function initSoundEffects() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    const onIcon = document.getElementById('sound-on-icon');
    const offIcon = document.getElementById('sound-off-icon');

    initAudioContextOnFirstGesture();
    updateSoundIcons();

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem('akshat-sound', soundEnabled ? 'true' : 'false');
            updateSoundIcons();
            if (soundEnabled) playHapticTick(1100, 0.03);
        });
    }

    function updateSoundIcons() {
        if (!onIcon || !offIcon) return;
        if (soundEnabled) {
            onIcon.classList.remove('hidden');
            offIcon.classList.add('hidden');
        } else {
            onIcon.classList.add('hidden');
            offIcon.classList.remove('hidden');
        }
    }

    // Attach haptic click sound to buttons, dock items, and interactive elements
    document.querySelectorAll('button, a.mac-dock-item, .cli-prompt-chip').forEach(el => {
        el.addEventListener('click', () => playHapticTick(750, 0.015));
    });
}

/* ==========================================================================
   9. Interactive TPS Load Simulator (Hero Section)
   ========================================================================== */
function initTpsStressTester() {
    const slider = document.getElementById('tps-range-slider');
    const sliderVal = document.getElementById('tps-slider-val');
    const tpsDisplay = document.getElementById('active-tps-display');
    const threadsDisplay = document.getElementById('active-threads-display');
    const clusterState = document.getElementById('cluster-state-display');
    const statusMsg = document.getElementById('tps-status-msg');
    const cpuStat = document.getElementById('tps-cpu-stat');

    if (!slider) return;

    slider.addEventListener('input', (e) => {
        const tps = parseInt(e.target.value, 10);
        playHapticTick(400 + Math.min(1200, tps / 8), 0.012);

        if (sliderVal) sliderVal.textContent = `${tps.toLocaleString()} TPS`;
        if (tpsDisplay) tpsDisplay.textContent = `${tps.toLocaleString()}.0 tx/s`;
        if (threadsDisplay) threadsDisplay.textContent = `${tps.toLocaleString()} fibers`;

        if (tps < 1000) {
            if (clusterState) {
                clusterState.textContent = 'OPTIMAL 100%';
                clusterState.className = 'text-emerald-400 font-bold';
            }
            if (statusMsg) statusMsg.textContent = 'Baseline traffic: Virtual Threads cruising without sweat (~32MB Heap).';
            if (cpuStat) {
                cpuStat.textContent = `CPU: ${Math.round(2 + (tps / 200))}%`;
                cpuStat.className = 'text-emerald-400 font-bold shrink-0';
            }
        } else if (tps < 2400) {
            if (clusterState) {
                clusterState.textContent = 'AUTO-SCALING';
                clusterState.className = 'text-sky-400 font-bold';
            }
            if (statusMsg) statusMsg.textContent = 'Traffic spike detected: In-memory queues handling concurrency with sub-30ms latency.';
            if (cpuStat) {
                cpuStat.textContent = `CPU: ${Math.round(8 + (tps / 250))}%`;
                cpuStat.className = 'text-sky-400 font-bold shrink-0';
            }
        } else if (tps <= 3500) {
            if (clusterState) {
                clusterState.textContent = '🔥 2,500 PURGE';
                clusterState.className = 'text-rose-400 font-bold animate-pulse';
            }
            if (statusMsg) statusMsg.textContent = '🚨 AWS S3 RATE LIMIT: 2,500 TPS Purge saturated prefix! S3 throwing "SlowDown" 503.';
            if (cpuStat) {
                cpuStat.textContent = 'CPU: 18%';
                cpuStat.className = 'text-rose-400 font-bold shrink-0';
            }
        } else if (tps < 8000) {
            if (clusterState) {
                clusterState.textContent = 'HEAVY LOAD';
                clusterState.className = 'text-amber-400 font-bold';
            }
            if (statusMsg) statusMsg.textContent = '💀 Node.js single-thread melted. Java 25 Virtual Threads sipping cold brew at 22% CPU.';
            if (cpuStat) {
                cpuStat.textContent = `CPU: ${Math.round(15 + (tps / 400))}%`;
                cpuStat.className = 'text-amber-400 font-bold shrink-0';
            }
        } else {
            if (clusterState) {
                clusterState.textContent = '⚡ OVERDRIVE';
                clusterState.className = 'text-purple-400 font-bold animate-pulse';
            }
            if (statusMsg) statusMsg.textContent = '⚡ 10,000 CONCURRENT FIBERS: Zero OS thread stack exhaustion. Zero deadlocks. DBA is asleep.';
            if (cpuStat) {
                cpuStat.textContent = 'CPU: 29%';
                cpuStat.className = 'text-purple-400 font-bold shrink-0';
            }
            // Trigger celebration rockets when maxed out
            if (tps >= 10000 && window.launchRocketBarrage && !slider.dataset.exploded) {
                slider.dataset.exploded = "true";
                window.launchRocketBarrage(8);
                setTimeout(() => { delete slider.dataset.exploded; }, 4000);
            }
        }
    });

    // Wire SRE preset load buttons
    document.querySelectorAll('.tps-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const presetVal = btn.getAttribute('data-preset-tps');
            if (presetVal && slider) {
                slider.value = presetVal;
                slider.dispatchEvent(new Event('input'));
            }
        });
    });
}

/* ==========================================================================
   9B. Master-Detail Interactive System Architecture Tabs
   ========================================================================== */
function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.project-tab-btn');
    const projectPanels = document.querySelectorAll('.project-card-panel');

    if (!tabButtons.length || !projectPanels.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-project-target');
            if (!targetId) return;

            // Update active tab buttons
            tabButtons.forEach(b => {
                b.classList.remove('active');
                const dot = b.querySelector('.project-pulse-dot');
                if (dot) dot.classList.add('hidden');
            });

            btn.classList.add('active');
            const activeDot = btn.querySelector('.project-pulse-dot');
            if (activeDot) activeDot.classList.remove('hidden');

            // Switch active panel
            projectPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.remove('hidden');
                    panel.classList.add('block', 'animate-in', 'fade-in', 'duration-200');
                } else {
                    panel.classList.add('hidden');
                    panel.classList.remove('block');
                }
            });

            if (typeof playHapticTick === 'function') playHapticTick(900, 0.02);
            if (window.lucide) window.lucide.createIcons();
        });
    });

    // Subtab navigation inside project cards
    projectPanels.forEach(panel => {
        const subtabBtns = panel.querySelectorAll('.project-subtab-btn');
        const archContent = panel.querySelector('.subtab-architecture');
        const probContent = panel.querySelector('.subtab-problem-solution');
        const diffContent = panel.querySelector('.subtab-code-diff');

        subtabBtns.forEach(subBtn => {
            subBtn.addEventListener('click', () => {
                const subtabName = subBtn.getAttribute('data-subtab');
                subtabBtns.forEach(b => b.classList.remove('active'));
                subBtn.classList.add('active');

                if (archContent) archContent.classList.toggle('hidden', subtabName !== 'architecture');
                if (probContent) probContent.classList.toggle('hidden', subtabName !== 'problem-solution');
                if (diffContent) diffContent.classList.toggle('hidden', subtabName !== 'code-diff');

                if (typeof playHapticTick === 'function') playHapticTick(750, 0.015);
                if (window.lucide) window.lucide.createIcons();
            });
        });
    });
}

/* ==========================================================================
   10. Interactive "Ask Akshat's CLI" Terminal Q&A Modal
   ========================================================================== */
function initCliQaModal() {
    const openBtn = document.getElementById('open-cli-qa-btn');
    const modal = document.getElementById('cli-qa-modal');
    const closeBtn = document.getElementById('cli-qa-close');
    const closeDot = document.getElementById('cli-qa-close-dot');
    const promptChips = document.querySelectorAll('.cli-prompt-chip');
    const outputStream = document.getElementById('cli-output-stream');
    const terminalScreen = document.getElementById('cli-terminal-screen');
    const form = document.getElementById('cli-terminal-form');
    const input = document.getElementById('cli-input-field');

    if (!modal) return;

    function openModal() {
        modal.classList.remove('hidden');
        playHapticTick(900, 0.02);
        if (input) setTimeout(() => input.focus(), 150);
    }

    function closeModal() {
        modal.classList.add('hidden');
        playHapticTick(600, 0.02);
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeDot) closeDot.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    const answers = {
        'virtual-threads': {
            cmd: 'ask --topic "virtual-threads-vs-node-go"',
            text: `Node.js runs on a single event-loop thread: one unhandled async rejection or synchronous regex and your entire banking gateway stops breathing. Platform OS threads cost ~1MB RAM each — 5,000 platform threads consume 5GB RAM in stack memory alone!\n\nJava 25 Virtual Threads (Project Loom) take ~1KB of heap memory. I can spin up 100,000 concurrent IO operations on a $20 server while your Go developer is still arguing about error-handling boilerplate.`,
            tag: 'ARCHITECTURE',
            color: 'text-sky-400'
        },
        'digilocker-hell': {
            cmd: 'ask --topic "digilocker-4-repo-consolidation"',
            text: `When I inherited DigiLocker, it was partitioned across 4 separate git repos. A single user webhook had to hop through 4 chained AWS SNS topics! If an error occurred, developers had to open 4 browser tabs for 4 different CloudWatch log groups just to find where the user dropped off.\n\nI consolidated all 4 repos into a single unified Spring Boot architecture, introduced Virtual Threads for concurrent file downloads (slashing latency from 30s to 7s), and built full DB-level telemetry. CloudWatch logins dropped by 100%.`,
            tag: 'DIGILOCKER',
            color: 'text-emerald-400'
        },
        'aadhaar-okyc': {
            cmd: 'ask --topic "aadhaar-okyc-300k-daily-pipeline"',
            text: `Our OKYC (Offline KYC / Aadhaar XML) verification pipeline processes 200,000 to 300,000 daily successful transactions at sub-40ms latency.\n\nTo achieve this under strict UIDAI compliance, we decrypt and parse the signed XML envelope in-memory, validate tamper-evident SHA-256 digital certificates against UIDAI root authorities, and cache ephemeral verification tokens with a 60-second sliding window in Redis. Zero disk writes, zero garbage collector pauses.`,
            tag: 'OKYC-SCALE',
            color: 'text-sky-400'
        },
        'live-migration': {
            cmd: 'ask --topic "zero-downtime-150-tps-db-migration"',
            text: `Migrating millions of active banking records between disparate schemas cannot tolerate maintenance windows in a 24/7 FinTech environment.\n\nI architected a multi-threaded batch migration framework running at a sustained 150 TPS. We used cursor-based key-range slicing to avoid MySQL table-level locks, coupled with application-level dual-write verification. Over 14 million records were cut over to the revamp architecture with 0 seconds of downtime and 0 data divergence.`,
            tag: 'MIGRATION',
            color: 'text-amber-400'
        },
        'purge-engine': {
            cmd: 'ask --topic "aws-s3-throttle-2500-tps"',
            text: `We had legacy tables accumulating millions of mandate and DigiLocker rows that needed cleanup. Normal DELETE queries with massive OFFSETs lock rows, bloat the InnoDB redo log, and bring live customer APIs to their knees.\n\nI built an asynchronous chunked purge engine pumping at 2,500 records/sec. It was so aggressive that AWS S3 literally returned 'SlowDown: 503 Service Unavailable' because we saturated their prefix request limit! We had to introduce exponential jitter backoffs just so Amazon could catch up with my JVM.`,
            tag: 'PURGE-ENGINE',
            color: 'text-purple-400'
        },
        'distributed-tx': {
            cmd: 'ask --drill "distributed-transactions-without-2pc"',
            text: `Two-Phase Commit (2PC) is a distributed death sentence in high-throughput FinTech: blocking coordinators hold database locks across network boundaries, tanking throughput under 50 TPS.\n\nInstead, I engineer distributed workflows using the Saga Pattern with Transactional Outbox:\n1. The initiating service mutates state and writes an outbox event in the same atomic local DB transaction.\n2. Debezium / CDC or a lightweight Virtual Thread poller tail the outbox and emit idempotent events.\n3. Downstream consumers maintain strict idempotency keys (SHA-256 fingerprint). If a step fails, backward compensating transactions automatically revert state with 0 inconsistent balances.`,
            tag: 'SYSTEM-DESIGN',
            color: 'text-sky-400'
        },
        'mysql-deadlocks': {
            cmd: 'ask --drill "mysql-deadlock-concurrent-insert-update"',
            text: `Under MySQL InnoDB Repeatable Read, concurrent INSERT ... ON DUPLICATE KEY UPDATE queries cause cyclic deadlocks due to Gap Locks & Next-Key Locks.\n\nWhen Thread-A encounters an existing secondary unique index key, InnoDB acquires a Shared (S) Next-Key Lock. When Thread-B does the same, it also gets an S lock. When both try to upgrade to an Exclusive (X) Insert-Intention Lock to update the row, they mutually block each other, triggering a 1213 Deadlock.\n\nSolution: Pre-allocate IDs via Redis or serialize writes using Redis distributed locks ('SET NX EX 30s') so only one thread modifies the index boundary at a time.`,
            tag: 'DB-INTERNALS',
            color: 'text-amber-400'
        },
        'vt-pinning': {
            cmd: 'ask --drill "virtual-thread-pinning-synchronized"',
            text: `In Java Virtual Threads (Project Loom), 'pinning' occurs when a virtual thread cannot unmount from its underlying OS carrier thread during a blocking I/O operation.\n\nThis happens when blocking code is executed inside a 'synchronized' block/method or a native method (JNI). When pinned, the OS carrier thread is frozen, starving the fork-join pool and bringing concurrency down to platform thread limits.\n\nSolution: Replace all legacy 'synchronized (lock)' blocks with 'java.util.concurrent.locks.ReentrantLock'. ReentrantLock allows virtual threads to yield continuations cleanly, maintaining massive concurrency with sub-1ms carrier thread handoffs.`,
            tag: 'JVM-INTERNALS',
            color: 'text-emerald-400'
        }
    };

    function streamResponse(cmdText, answerObj) {
        if (!outputStream) return;

        const block = document.createElement('div');
        block.className = 'space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5';
        block.innerHTML = `
            <div class="flex items-center gap-2 text-slate-400">
                <span class="text-emerald-400 font-bold">&gt;</span>
                <span class="text-sky-300 font-bold font-mono">${cmdText}</span>
            </div>
            <div class="flex items-start gap-2 pt-1">
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/10 ${answerObj.color} shrink-0 mt-0.5">${answerObj.tag}</span>
                <p class="text-slate-200 leading-relaxed font-mono text-xs whitespace-pre-line"></p>
            </div>
        `;
        outputStream.appendChild(block);

        const p = block.querySelector('p');
        const fullText = answerObj.text;
        let charIndex = 0;

        function typeChar() {
            if (charIndex < fullText.length) {
                p.textContent += fullText.substring(charIndex, charIndex + 2);
                charIndex += 2;
                if (charIndex % 8 === 0) playHapticTick(950, 0.008);
                if (terminalScreen) terminalScreen.scrollTop = terminalScreen.scrollHeight;
                setTimeout(typeChar, 10);
            } else {
                p.textContent = fullText;
                if (terminalScreen) terminalScreen.scrollTop = terminalScreen.scrollHeight;
            }
        }
        typeChar();
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-command');
            if (cmd && form && input) {
                input.value = cmd;
                form.dispatchEvent(new Event('submit'));
                return;
            }
            const qKey = chip.getAttribute('data-question');
            if (answers[qKey]) {
                streamResponse(answers[qKey].cmd, answers[qKey]);
            }
        });
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = (input.value || '').trim().toLowerCase();
            input.value = '';
            if (!val) return;

            if (val === 'clear') {
                outputStream.innerHTML = '';
                return;
            }

            if (val === 'help') {
                streamResponse('help', {
                    tag: 'SYSTEM',
                    color: 'text-sky-400',
                    text: 'Available Commands:\n- ask [topic]: virtual-threads, digilocker, aadhaar, migration, purge\n- projects: View summary of flagship architectural war stories\n- metrics: View 1.5M daily hits, 150 TPS and 2,500 TPS production numbers\n- principles: Read hard-earned distributed systems engineering convictions\n- clear: Clear terminal output screen'
                });
            } else if (val === 'projects') {
                streamResponse('projects --list', {
                    tag: 'WAR-STORIES',
                    color: 'text-emerald-400',
                    text: '1. OKYC Aadhaar Pipeline (2L-3L daily successes, sub-40ms verification)\n2. Digitap eSign Gateway v2 (Java 25, Virtual Threads, In-Memory PDF Merge)\n3. DigiLocker Revamp & DB Civil War (4 repos -> 1, 2L/day success, scaled from 30k-35k)\n4. VKYC v2 & Video-PD (Solo security, sub-3s analytics, 0 deadlocks)\n5. eNACH Mandate Engine (Kotak & Yes Bank auto-clearing, 0 Excel)\n6. Clickwrap Digital Contract Rail (Instant legal consent, SHA-256 audit)\n7. OVSE Aadhaar XML Verification (7-day greenfield delivery, 99% tests)'
                });
            } else if (val === 'metrics') {
                streamResponse('system --metrics', {
                    tag: 'STATS',
                    color: 'text-sky-400',
                    text: '- 4 Enterprise Products Architected Solo From Scratch\n- 250,000+ Daily OKYC Successful Verifications\n- 1.5M+ Daily DigiLocker API Hits (12+ Micro-APIs / Journey)\n- 2 Lakh Daily DigiLocker Successful Transactions (Scaled from 30k–35k)\n- 150 TPS Sustained Database Migration Throughput\n- 2,500 TPS Asynchronous Table Purge Engine\n- 7 Days Zero-to-Prod Turnaround on UIDAI OVSE\n- 0 Production Bugs on Revamp Go-Live'
                });
            } else if (val === 'principles' || val === 'principle' || val === 'roast') {
                const roasts = window.PORTFOLIO_ROASTS || ["Virtual Threads Over Reactive Complexity: Blocking I/O code with Java 25 Virtual Threads scales to hundreds of thousands of concurrent requests."];
                const r = roasts[Math.floor(Math.random() * roasts.length)];
                streamResponse('principles --read', {
                    tag: 'CONVICTION',
                    color: 'text-emerald-400',
                    text: `"${r.replace(/^["']|["']$/g, '')}"`
                });
            } else if (val === 'rocket' || val === 'patakha' || val === 'fireworks' || val === 'godmode') {
                if (window.launchRocketBarrage) window.launchRocketBarrage(8);
                streamResponse(val, {
                    tag: 'CELEBRATE',
                    color: 'text-amber-400',
                    text: '🚀💥 PATAKHA BARRAGE LAUNCHED! Celebrating God-Tier Concurrency, Java 25 & Zero Staging!'
                });
            } else if (val === 'thor' || val === 'hammer' || val === 'lightning') {
                if (window.Avengers && window.Avengers.thor) window.Avengers.thor();
                streamResponse('thor --strike', {
                    tag: 'THOR',
                    color: 'text-sky-400',
                    text: '⚡ MJOLNIR STRIKE TRIGGERED! "Whosoever holds this hammer shall possess the power of 128 Virtual Threads!"'
                });
            } else if (val === 'ironman' || val === 'jarvis' || val === 'tony') {
                if (window.Avengers && window.Avengers.ironman) window.Avengers.ironman();
                streamResponse('jarvis --diagnostics', {
                    tag: 'STARK',
                    color: 'text-rose-400',
                    text: '🤖 JARVIS HUD ACTIVE: "128 Virtual Threads operating at peak Mark 85 capacity. I love you 3000."'
                });
            } else if (val === 'thanos' || val === 'snap' || val === 'purge') {
                if (window.Avengers && window.Avengers.thanos) window.Avengers.thanos();
                streamResponse('thanos --snap', {
                    tag: 'THANOS',
                    color: 'text-purple-400',
                    text: '🫰 THE THANOS SNAP! "I am inevitable... 2,500 records/sec turned to dust. Perfectly balanced."'
                });
            } else if (val === 'hulk' || val === 'smash') {
                if (window.Avengers && window.Avengers.hulk) window.Avengers.hulk();
                streamResponse('hulk --smash', {
                    tag: 'HULK',
                    color: 'text-emerald-400',
                    text: '🟢 HULK SMASH! "That\'s my secret, Cap... my threads are always Virtual."'
                });
            } else if (val === 'cap' || val === 'shield') {
                if (window.Avengers && window.Avengers.cap) window.Avengers.cap();
                streamResponse('cap --shield', {
                    tag: 'CAPTAIN',
                    color: 'text-blue-400',
                    text: '🛡️ VIBRANIUM DEFLECTION! "I can do this all day. 100% Circuit Breaker resilience."'
                });
            } else if (val === 'spidey' || val === 'spider' || val === 'peter') {
                if (window.Avengers && window.Avengers.spidey) window.Avengers.spidey();
                streamResponse('spidey --thwip', {
                    tag: 'SPIDEY',
                    color: 'text-rose-400',
                    text: '🕷️ THWIP! "With great throughput comes great responsibility! Sub-50ms web pipelines active."'
                });
            } else if (val === 'avengers' || val === 'assemble') {
                if (window.Avengers && window.Avengers.assemble) window.Avengers.assemble();
                streamResponse('avengers --assemble', {
                    tag: 'ASSEMBLE',
                    color: 'text-amber-400',
                    text: '🅰️ AVENGERS ASSEMBLE! Whatever it takes. Zero downtime across all FinTech rails!'
                });
            } else if (val === 'chat' || val === 'connect' || val === 'hire' || val === 'contact') {
                const modal = document.getElementById('tech-chat-modal');
                if (modal) modal.classList.remove('hidden');
                streamResponse('chat --initiate', {
                    tag: 'CONNECT',
                    color: 'text-sky-400',
                    text: 'Opened Zero-BS Tech Chat dialog! Email: akshathrx6393@gmail.com | Direct phone: +91 9839783219 | Bengaluru, India (IST).'
                });
            } else if (val === 'jitter' || val === 'chaos') {
                if (window.simulateBankJitter) window.simulateBankJitter();
                streamResponse('chaos --inject-jitter', {
                    tag: 'CHAOS',
                    color: 'text-amber-400',
                    text: 'Injected 2,400ms network jitter into eMudhra gateway! Watch Resilience4j Circuit Breaker trip and recover.'
                });
            } else if (val === 'arch' || val === 'architecture' || val === 'pipeline') {
                document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
                streamResponse('nav --goto architecture', {
                    tag: 'TOPOLOGY',
                    color: 'text-emerald-400',
                    text: 'Scrolled to Interactive Distributed Topology visualizer. Click "Fire Request Packet" to test!'
                });
            } else if (val === 'bench' || val === 'benchmark') {
                document.getElementById('run-bench-btn')?.click();
                document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
                streamResponse('benchmark --run-concurrent', {
                    tag: 'BENCH',
                    color: 'text-purple-400',
                    text: 'Simulating 1,000 concurrent user requests across Legacy vs Java 25 Virtual Threads stack...'
                });
            } else if (val === 'race' || val === 'exploit' || val === 'double-spend') {
                document.getElementById('fire-race-btn')?.click();
                document.getElementById('thread-a-box')?.scrollIntoView({ behavior: 'smooth' });
                streamResponse('exploit --concurrent-debit', {
                    tag: 'RACE-ATTEMPT',
                    color: 'text-amber-400',
                    text: 'Fired 2 concurrent debit threads at T+0ms. Distributed mutex acquired by Thread-A; Thread-B rejected with 409 Conflict.'
                });
            } else if (answers[val]) {
                streamResponse(answers[val].cmd, answers[val]);
            } else {
                streamResponse(val, {
                    tag: 'CLI-ERROR',
                    color: 'text-rose-400',
                    text: `Command '${val}' not recognized. Try clicking one of the chips above or type 'help'.`
                });
            }
        });
    }
}

/* ==========================================================================
   11. Rocket & Fireworks Celebration Engine (Pure HTML5 Canvas)
   ========================================================================== */
function playRocketLaunchSound() {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(250, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
}

function playPatakhaExplosionSound() {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        // Deep bass pop
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);

        // Crackle noise burst
        const bufferSize = Math.floor(audioCtx.sampleRate * 0.12);
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        whiteNoise.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        whiteNoise.start();
    } catch (e) {}
}

function initFireworksEngine() {
    const canvas = document.getElementById('fireworks-canvas');
    const heroRocketBtn = document.getElementById('hero-rocket-btn');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let particles = [];
    let rockets = [];
    let isRunning = false;

    class Rocket {
        constructor(startX, startY, targetX, targetY, color) {
            this.x = startX;
            this.y = startY;
            this.targetX = targetX;
            this.targetY = targetY;
            this.color = color;
            this.speed = 13 + Math.random() * 5;
            const angle = Math.atan2(targetY - startY, targetX - startX);
            this.vx = Math.cos(angle) * this.speed;
            this.vy = Math.sin(angle) * this.speed;
            this.trail = [];
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 6) this.trail.shift();
            this.x += this.vx;
            this.y += this.vy;
            const dist = Math.hypot(this.targetX - this.x, this.targetY - this.y);
            return dist < 18 || this.y <= this.targetY;
        }

        draw() {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2.5;
            for (let i = 0; i < this.trail.length - 1; i++) {
                ctx.moveTo(this.trail[i].x, this.trail[i].y);
                ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
            }
            ctx.stroke();

            // Rocket head
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 7;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = 0.018 + Math.random() * 0.02;
            this.gravity = 0.14;
            this.size = 2.5 + Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.vx *= 0.98;
            this.alpha -= this.decay;
            return this.alpha <= 0;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createExplosion(x, y, baseColor) {
        playPatakhaExplosionSound();
        const colors = [baseColor, '#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#c084fc', '#ffffff'];
        for (let i = 0; i < 65; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);

        for (let i = rockets.length - 1; i >= 0; i--) {
            const exploded = rockets[i].update();
            rockets[i].draw();
            if (exploded) {
                createExplosion(rockets[i].x, rockets[i].y, rockets[i].color);
                rockets.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const dead = particles[i].update();
            particles[i].draw();
            if (dead) particles.splice(i, 1);
        }

        if (rockets.length > 0 || particles.length > 0) {
            requestAnimationFrame(loop);
        } else {
            isRunning = false;
            ctx.clearRect(0, 0, width, height);
        }
    }

    window.launchRocketBarrage = function(count = 5) {
        const colors = ['#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#a855f7'];
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                playRocketLaunchSound();
                const startX = width * 0.15 + Math.random() * (width * 0.7);
                const targetX = startX + (Math.random() - 0.5) * 160;
                const targetY = height * 0.15 + Math.random() * (height * 0.35);
                const color = colors[Math.floor(Math.random() * colors.length)];
                rockets.push(new Rocket(startX, height, targetX, targetY, color));
                if (!isRunning) {
                    isRunning = true;
                    loop();
                }
            }, i * 220);
        }
    };

    if (heroRocketBtn) {
        heroRocketBtn.addEventListener('click', (e) => {
            e.preventDefault();
            playHapticTick(1200, 0.03);
            window.launchRocketBarrage(6);
        });
    }
}

/* ==========================================================================
   12. Apple-Style "Lo-Fi Coding Beats" Ambient Player
   ========================================================================== */
let lofiNodes = [];
let isLofiPlaying = false;

function initLofiAmbientPlayer() {
    const lofiBtn = document.getElementById('lofi-player-btn');
    const playIcon = document.getElementById('lofi-play-icon');
    const pauseIcon = document.getElementById('lofi-pause-icon');
    const statusTag = document.getElementById('lofi-status-tag');

    if (!lofiBtn) return;

    lofiBtn.addEventListener('click', () => {
        playHapticTick(800, 0.02);
        toggleLofiBeats();
    });

    function toggleLofiBeats() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        if (isLofiPlaying) {
            // Stop playing
            lofiNodes.forEach(node => {
                try { node.stop(); node.disconnect(); } catch (e) {}
            });
            lofiNodes = [];
            isLofiPlaying = false;
            lofiBtn.classList.remove('lofi-playing');
            if (playIcon) playIcon.classList.remove('hidden');
            if (pauseIcon) pauseIcon.classList.add('hidden');
            if (statusTag) {
                statusTag.textContent = 'OFF';
                statusTag.className = 'text-[8.5px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold';
            }
        } else {
            // Start playing cozy analog synthwave pads (Fm9 chord)
            isLofiPlaying = true;
            const freqs = [174.61, 207.65, 261.63, 311.13, 392.00]; // Fm9
            const masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.035, audioCtx.currentTime);

            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(380, audioCtx.currentTime);

            freqs.forEach((f, i) => {
                const osc = audioCtx.createOscillator();
                osc.type = i % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(f, audioCtx.currentTime);

                // Gentle pitch drift (tape wow effect)
                const lfo = audioCtx.createOscillator();
                const lfoGain = audioCtx.createGain();
                lfo.frequency.setValueAtTime(0.2 + i * 0.08, audioCtx.currentTime);
                lfoGain.gain.setValueAtTime(1.2, audioCtx.currentTime);
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                lfo.start();

                osc.connect(filter);
                osc.start();
                lofiNodes.push(osc, lfo);
            });

            filter.connect(masterGain);
            masterGain.connect(audioCtx.destination);
            lofiNodes.push(masterGain, filter);

            lofiBtn.classList.add('lofi-playing');
            if (playIcon) playIcon.classList.add('hidden');
            if (pauseIcon) pauseIcon.classList.remove('hidden');
            if (statusTag) {
                statusTag.textContent = 'ON';
                statusTag.className = 'text-[8.5px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold';
            }
        }
    }
}

/* ==========================================================================
   13. Expandable Architectural Code Diff Drawers
   ========================================================================== */
function initCodeDiffDrawers() {
    const diffButtons = document.querySelectorAll('.code-diff-toggle-btn');
    diffButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            playHapticTick(900, 0.02);
            const parent = btn.closest('div');
            const drawer = parent ? parent.querySelector('.code-diff-drawer') : null;
            const chevron = btn.querySelector('.diff-chevron');

            if (drawer) {
                drawer.classList.toggle('hidden');
                if (chevron) {
                    chevron.classList.toggle('rotate-180');
                }
            }
        });
    });
}

/* ==========================================================================
   14. Secret Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A)
   ========================================================================== */
function initKonamiCodeEasterEgg() {
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiSequence.length) {
                konamiIndex = 0;
                activateGodMode();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateGodMode() {
        if (window.launchRocketBarrage) {
            window.launchRocketBarrage(14);
        }
        showToast("⚡ GOD MODE ACTIVATED", "Root access granted to Akshat's 2,500 TPS Purge Engine & Distributed FinTech Rails!");
    }
}

/* ==========================================================================
   15. FinTech SRE Mission Control: Cluster Health HUD
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
   16. Interactive System Architecture Visualizer (Live Pipeline Simulator & OpenTelemetry Waterfall)
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
            trace: {
                traceId: 'trace_e82b7a94c1f20d88',
                duration: '42.4ms',
                spansCount: '7 Spans',
                spans: [
                    { id: 'span-1', name: 'POST /api/v2/esign/verify-otp', service: 'esign-gateway', duration: '42.4ms', offsetPct: 0, widthPct: 100, barColor: 'bg-gradient-to-r from-sky-500 to-emerald-400', tags: { 'http.method': 'POST', 'http.status_code': '200', 'thread.type': 'VirtualThread[#14829]', 'client.ip': '10.0.4.82', 'security.tls': 'TLSv1.3' } },
                    { id: 'span-2', name: 'RedisTokenBucket.tryAcquire', service: 'redis-cluster', duration: '0.8ms', offsetPct: 2, widthPct: 4, barColor: 'bg-emerald-400', tags: { 'ratelimit.quota': '150 TPS', 'ratelimit.allowed': 'true', 'redis.host': 'redis-cluster-prod:6379' } },
                    { id: 'span-3', name: 'RS256JwtValidator.verify', service: 'auth-security', duration: '1.4ms', offsetPct: 6, widthPct: 5, barColor: 'bg-purple-400', tags: { 'jwt.algo': 'RS256', 'jwt.issuer': 'digitap-auth', 'signature.valid': 'true' } },
                    { id: 'span-4', name: 'RedissonMutex.acquire(doc:4092)', service: 'redis-lock', duration: '2.1ms', offsetPct: 11, widthPct: 7, barColor: 'bg-amber-400', tags: { 'lock.key': 'lock:contract:8294', 'lock.ttl_sec': '30', 'lock.acquired': 'true' } },
                    { id: 'span-5', name: 'In-Memory PDFBox 3.x Multi-Stamp', service: 'pdf-engine', duration: '14.2ms', offsetPct: 18, widthPct: 33, barColor: 'bg-sky-400', tags: { 'pdf.pages': '4', 'memory.alloc': '6.4MB (in-memory buffer)', 'disk.io': '0 bytes (Zero Disk I/O)' } },
                    { id: 'span-6', name: 'UIDAI / eMudhra TSP Gateway Hop', service: 'bank-tsp-outbound', duration: '18.6ms', offsetPct: 51, widthPct: 43, barColor: 'bg-rose-400', tags: { 'downstream.url': 'https://api.emudhra.com/v2/aadhaar/stamp', 'http.status_code': '200', 'tls.version': 'TLSv1.3' } },
                    { id: 'span-7', name: 'VirtualThread -> MySQL Audit Persist', service: 'mysql-async', duration: '2.8ms', offsetPct: 94, widthPct: 6, barColor: 'bg-emerald-400', tags: { 'db.statement': 'INSERT INTO audit_log VALUES (?, ?)', 'thread.virtual': 'true', 'rows_affected': '1' } }
                ]
            },
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
            trace: {
                traceId: 'trace_d14f9011a7c88b23',
                duration: '18.5ms',
                spansCount: '5 Spans',
                spans: [
                    { id: 'span-p1', name: 'POST /internal/v1/purge/batch', service: 'purge-engine', duration: '18.5ms', offsetPct: 0, widthPct: 100, barColor: 'bg-gradient-to-r from-rose-500 to-amber-400', tags: { 'cron.scheduler': 'high-velocity-cron', 'batch.size': '500', 'thread.type': 'VirtualThread[#8812]' } },
                    { id: 'span-p2', name: 'PartitionCursor.fetchNextBatch', service: 'mysql-read', duration: '1.9ms', offsetPct: 2, widthPct: 11, barColor: 'bg-sky-400', tags: { 'db.statement': 'SELECT id, s3_key FROM tbl WHERE id > ? LIMIT 500', 'index.type': 'PRIMARY KEY RANGE' } },
                    { id: 'span-p3', name: 'S3Client.deleteObjects(hash_prefix=bucket/p7)', service: 'aws-s3', duration: '8.4ms', offsetPct: 13, widthPct: 45, barColor: 'bg-purple-400', tags: { 's3.bucket': 'fintech-vault-prod', 'partition.hash': '0x7F2A', 'http.status_code': '200', 'aws.retries': '0' } },
                    { id: 'span-p4', name: 'IngestionPurgeRepository.deleteByIdIn', service: 'mysql-write', duration: '5.8ms', offsetPct: 58, widthPct: 31, barColor: 'bg-rose-400', tags: { 'db.statement': 'DELETE FROM tbl WHERE id IN (?)', 'lock.wait_ms': '0', 'deadlocks': '0' } },
                    { id: 'span-p5', name: 'PrometheusMicrometer.counterIncrement', service: 'telemetry-meter', duration: '0.4ms', offsetPct: 89, widthPct: 9, barColor: 'bg-emerald-400', tags: { 'metric.name': 'purge.records.deleted', 'counter.increment': '500', 'tps.current': '2500' } }
                ]
            },
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
            title: 'DigiLocker 1.5M+ Daily Hits & 12-Hop Orchestration',
            desc: 'Orchestrates 7 public ingress endpoints and 6 upstream government micro-calls (1.5M+ daily hits), routes across dual-database boundaries, and streams byte arrays straight to S3 with zero disk write latency.',
            defense: 'Token-bucket rate limiter smooths upstream spike bursts; dual-DB partition routing ensures zero data collisions between legacy and revamp schemas.',
            safety: 'ZERO PACKET LOSS',
            duration: '60ms',
            trace: {
                traceId: 'trace_7a43f882e919dc04',
                duration: '34.2ms',
                spansCount: '6 Spans',
                spans: [
                    { id: 'span-d1', name: 'POST /api/v1/digilocker/fetch-doc', service: 'digilocker-gateway', duration: '34.2ms', offsetPct: 0, widthPct: 100, barColor: 'bg-gradient-to-r from-emerald-500 to-sky-400', tags: { 'http.method': 'POST', 'http.status_code': '200', 'daily.surge': '1.5M+ hits', 'thread.type': 'VirtualThread[#9103]' } },
                    { id: 'span-d2', name: 'RateLimiter & Client IP Shaper', service: 'rate-shaper', duration: '0.6ms', offsetPct: 1.5, widthPct: 3, barColor: 'bg-sky-400', tags: { 'token_bucket.fill_rate': '150/s', 'status': 'ALLOWED' } },
                    { id: 'span-d3', name: 'Read-Replica Route Resolver', service: 'db-boundary', duration: '1.1ms', offsetPct: 4.5, widthPct: 5, barColor: 'bg-amber-400', tags: { 'db.route': 'REVAMP_PARTITION_2', 'connection.pool': 'HikariCP-Read' } },
                    { id: 'span-d4', name: 'Redis Document Metadata Cache Hit', service: 'redis-cache', duration: '1.8ms', offsetPct: 9.5, widthPct: 7, barColor: 'bg-purple-400', tags: { 'cache.status': 'HIT', 'key': 'doc:meta:9018', 'latency_us': '180' } },
                    { id: 'span-d5', name: 'DigiLocker Auth & XML Parser Hop', service: 'upstream-gov', duration: '24.3ms', offsetPct: 16.5, widthPct: 69, barColor: 'bg-emerald-400', tags: { 'endpoint': 'https://api.digitallocker.gov.in/oauth/token', 'xml.signed': 'true', 'sha256': 'VALID' } },
                    { id: 'span-d6', name: 'Primary DB Dual-Sync Virtual Task', service: 'async-sync', duration: '4.1ms', offsetPct: 85.5, widthPct: 14, barColor: 'bg-blue-400', tags: { 'sync.strategy': 'DUAL_WRITE_SHADOW_VERIFIED', 'divergence': '0.00%', 'thread.virtual': 'true' } }
                ]
            },
            nodes: [
                { step: 1, title: 'Public Ingress (7 APIs)', sub: '1.5M+ Daily Volume', badge: '0ms' },
                { step: 2, title: 'Token Bucket', sub: 'Burst Rate Limiter', badge: '+3ms' },
                { step: 3, title: 'Boundary Router', sub: 'Dual-DB Partition', badge: '+9ms' },
                { step: 4, title: 'Upstream Fetch (6 APIs)', sub: 'Parallel V-Threads', badge: '+16ms' },
                { step: 5, title: 'AWS S3 Cold', sub: 'Glacier Archival', badge: '+32ms' },
                { step: 6, title: 'Partner Callback', sub: '2L Daily Sustained (from 30k)', badge: 'Roundtrip: 60ms' }
            ],
            logs: [
                '[T+0ms] DigiLocker ingress: 7-endpoint pipeline active under surge (1.5M+ daily volume).',
                '[T+3ms] Token bucket rate limiter smooths queue: 0 packets dropped, 0 throttled.',
                '[T+12ms] Boundary routing filter applied: ID mapped to Revamp DB partition.',
                '[T+28ms] Virtual Threads orchestrate 6 upstream calls in-memory (Aadhaar XML, PDF streams, tokens).',
                '[T+60ms] S3 multipart chunk stream uploaded with AES-256 server-side encryption.',
                '[T+68ms] Partner webhook acknowledged with 200 OK. Daily counter updated: 201,480 tx (scaled from 30k-35k).'
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

    // View Switcher Elements (Nodes vs Trace Waterfall)
    const viewNodesBtn = document.getElementById('topo-view-nodes-btn');
    const viewTraceBtn = document.getElementById('topo-view-trace-btn');
    const nodesContainer = document.getElementById('pipeline-nodes-container');
    const traceContainer = document.getElementById('pipeline-trace-container');
    const traceIdDisplay = document.getElementById('trace-id-display');
    const traceSpansBadge = document.getElementById('trace-spans-badge');
    const traceTotalLatency = document.getElementById('trace-total-latency');
    const traceWaterfallTrack = document.getElementById('trace-waterfall-track');
    const inspectorSpanName = document.getElementById('inspector-span-name');
    const inspectorSpanDuration = document.getElementById('inspector-span-duration');
    const inspectorSpanTags = document.getElementById('inspector-span-tags');

    function renderTraceWaterfall(key) {
        const p = PIPELINES[key];
        if (!p || !p.trace || !traceWaterfallTrack) return;

        if (traceIdDisplay) traceIdDisplay.textContent = p.trace.traceId;
        if (traceSpansBadge) traceSpansBadge.textContent = p.trace.spansCount;
        if (traceTotalLatency) traceTotalLatency.textContent = p.trace.duration;

        let html = '';
        p.trace.spans.forEach((span, idx) => {
            const isFirst = idx === 0;
            html += `
                <div class="trace-row ${isFirst ? 'active' : ''} p-2.5 rounded-xl border border-white/5 space-y-1.5 transition-all text-xs font-mono" data-span-id="${span.id}" data-idx="${idx}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 truncate">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">${span.service}</span>
                            <span class="font-bold text-white truncate">${span.name}</span>
                        </div>
                        <span class="text-emerald-400 font-bold shrink-0 ml-2">${span.duration}</span>
                    </div>
                    <div class="trace-bar-track">
                        <div class="trace-bar-fill ${span.barColor}" style="margin-left: ${span.offsetPct}%; width: ${span.widthPct}%;"></div>
                    </div>
                </div>
            `;
        });
        traceWaterfallTrack.innerHTML = html;

        // Set default inspector to first span
        if (p.trace.spans.length > 0) {
            updateInspector(p.trace.spans[0]);
        }

        // Attach click listeners to rows
        traceWaterfallTrack.querySelectorAll('.trace-row').forEach(row => {
            row.addEventListener('click', () => {
                traceWaterfallTrack.querySelectorAll('.trace-row').forEach(r => r.classList.remove('active'));
                row.classList.add('active');
                const idx = parseInt(row.getAttribute('data-idx'), 10);
                if (p.trace.spans[idx]) {
                    updateInspector(p.trace.spans[idx]);
                    playHapticTick(900, 0.015);
                }
            });
        });
    }

    function updateInspector(span) {
        if (inspectorSpanName) inspectorSpanName.textContent = `${span.service} :: ${span.name}`;
        if (inspectorSpanDuration) inspectorSpanDuration.textContent = `${span.duration} (${span.widthPct}% width)`;

        if (inspectorSpanTags) {
            let tagsHtml = '';
            for (const [k, v] of Object.entries(span.tags)) {
                tagsHtml += `
                    <div class="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col justify-between truncate">
                        <span class="text-[9.5px] text-slate-500 uppercase truncate">${k}</span>
                        <span class="text-slate-200 font-bold truncate mt-0.5">${v}</span>
                    </div>
                `;
            }
            inspectorSpanTags.innerHTML = tagsHtml;
        }
    }

    if (viewNodesBtn && viewTraceBtn) {
        viewNodesBtn.addEventListener('click', () => {
            viewNodesBtn.classList.add('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
            viewNodesBtn.classList.remove('text-slate-400');
            viewTraceBtn.classList.remove('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
            viewTraceBtn.classList.add('text-slate-400');

            if (nodesContainer) nodesContainer.classList.remove('hidden');
            if (traceContainer) traceContainer.classList.add('hidden');
            playHapticTick(700, 0.02);
        });

        viewTraceBtn.addEventListener('click', () => {
            viewTraceBtn.classList.add('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
            viewTraceBtn.classList.remove('text-slate-400');
            viewNodesBtn.classList.remove('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
            viewNodesBtn.classList.add('text-slate-400');

            if (nodesContainer) nodesContainer.classList.add('hidden');
            if (traceContainer) traceContainer.classList.remove('hidden');
            renderTraceWaterfall(activePipeline);
            playHapticTick(850, 0.02);
        });
    }

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

        renderTraceWaterfall(key);
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
            const traceRows = traceWaterfallTrack ? traceWaterfallTrack.querySelectorAll('.trace-row') : [];
            if (execTime) execTime.textContent = 'EXECUTING PIPELINE...';
            if (telemetryLog) telemetryLog.innerHTML = '';

            let step = 0;

            function processStep() {
                if (step < nodes.length) {
                    // Remove active from all, activate current node
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

                    // Also animate matching trace waterfall row if present
                    if (traceRows[step]) {
                        traceRows.forEach(r => r.classList.remove('active'));
                        traceRows[step].classList.add('active');
                        if (p.trace && p.trace.spans[step]) {
                            updateInspector(p.trace.spans[step]);
                        }
                    }

                    // Play frequency beep
                    playHapticTick(450 + step * 120, 0.03);

                    // Add log line
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
                    // Final completion
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

    // Initial render
    renderPipeline('esign');
}

/* ==========================================================================
   17. Architectural Benchmark Lab (Head-to-Head Latency Comparator)
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

        // Animate Akshat's Java 25 Virtual Threads stack instantly
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
   18. "Schedule a Zero-BS Tech Chat" Modal
   ========================================================================== */
function initTechChatModal() {
    const modal = document.getElementById('tech-chat-modal');
    const heroTrigger = document.getElementById('open-tech-chat-modal-btn');
    const contactTrigger = document.getElementById('contact-book-chat-btn');
    const closeBtn = document.getElementById('tech-chat-close');
    const closeDot = document.getElementById('tech-chat-close-dot');

    if (!modal) return;

    function openModal() {
        modal.classList.remove('hidden');
        playHapticTick(850, 0.02);
    }

    function closeModal() {
        modal.classList.add('hidden');
        playHapticTick(600, 0.02);
    }

    if (heroTrigger) heroTrigger.addEventListener('click', openModal);
    if (contactTrigger) contactTrigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeDot) closeDot.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   19. Concurrency Race Condition Challenge (Distributed Mutex Guard)
   ========================================================================== */
function initRaceConditionChallenge() {
    const fireBtn = document.getElementById('fire-race-btn');
    const resetBtn = document.getElementById('reset-race-btn');
    const walletBalance = document.getElementById('race-wallet-balance');
    const threadABox = document.getElementById('thread-a-box');
    const threadBBox = document.getElementById('thread-b-box');
    const threadABadge = document.getElementById('thread-a-badge');
    const threadBBadge = document.getElementById('thread-b-badge');
    const threadADelta = document.getElementById('thread-a-delta');
    const threadBDelta = document.getElementById('thread-b-delta');
    const threadAHttp = document.getElementById('thread-a-http');
    const threadBHttp = document.getElementById('thread-b-http');
    const lockState = document.getElementById('race-lock-state');
    const lockKey = document.getElementById('race-lock-key');
    const verdictText = document.getElementById('race-verdict-text');

    if (!fireBtn) return;

    let isRacing = false;

    function resetArena() {
        if (isRacing) return;
        if (walletBalance) {
            walletBalance.textContent = '₹10,000';
            walletBalance.className = 'block text-sm font-black text-emerald-400 font-mono';
        }
        if (threadABox) threadABox.className = 'md:col-span-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 race-thread-box';
        if (threadBBox) threadBBox.className = 'md:col-span-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 race-thread-box';

        if (threadABadge) {
            threadABadge.textContent = 'STANDBY';
            threadABadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-400';
        }
        if (threadBBadge) {
            threadBBadge.textContent = 'STANDBY';
            threadBBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-400';
        }

        if (threadADelta) threadADelta.textContent = 'T+0.00ms';
        if (threadBDelta) threadBDelta.textContent = 'T+0.00ms';
        if (threadAHttp) {
            threadAHttp.textContent = '--';
            threadAHttp.className = 'text-slate-400 font-bold';
        }
        if (threadBHttp) {
            threadBHttp.textContent = '--';
            threadBHttp.className = 'text-slate-400 font-bold';
        }

        if (lockState) {
            lockState.textContent = 'IDLE';
            lockState.className = 'text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold';
        }
        if (lockKey) lockKey.textContent = 'SET NX EX 30s';

        if (verdictText) {
            verdictText.innerHTML = 'Ready. Click button above to fire 2 threads simultaneously.';
        }
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

        // Step 1: Thread A reaches Mutex at 200ms
        setTimeout(() => {
            if (threadABox) threadABox.classList.add('race-winner');
            if (threadABadge) {
                threadABadge.textContent = 'LOCK ACQUIRED';
                threadABadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400';
            }
            if (threadAHttp) {
                threadAHttp.textContent = '200 OK (DEBITED)';
                threadAHttp.className = 'text-emerald-400 font-bold';
            }
            if (lockState) {
                lockState.textContent = 'LOCKED: THREAD-A';
                lockState.className = 'text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold animate-pulse';
            }
            if (lockKey) lockKey.textContent = 'lock:acc:4092 (TTL: 30s)';
            if (walletBalance) {
                walletBalance.textContent = '₹0';
                walletBalance.className = 'block text-sm font-black text-slate-400 font-mono line-through';
            }
            playHapticTick(950, 0.03);
        }, 220);

        // Step 2: Thread B reaches Mutex 160ms later and is rejected
        setTimeout(() => {
            if (threadBBox) threadBBox.classList.add('race-loser');
            if (threadBBadge) {
                threadBBadge.textContent = 'LOCK REJECTED';
                threadBBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400';
            }
            if (threadBHttp) {
                threadBHttp.textContent = '409 CONFLICT';
                threadBHttp.className = 'text-rose-400 font-bold';
            }
            playHapticTick(240, 0.06);
        }, 400);

        // Step 3: Final State & Verdict at 650ms
        setTimeout(() => {
            if (verdictText) {
                verdictText.innerHTML = '<span class="text-emerald-400 font-bold">RACE CONDITION CRUSHED:</span> Mutex acquired by Thread-A in 0.8ms. Thread-B rejected with 409 Conflict. ₹0 double-spend.';
            }
            showToast("🛡️ CONCURRENCY GUARD VERIFIED", "Distributed Redis Mutex prevented the race condition. Exactly 1 transaction committed.");

            isRacing = false;
            fireBtn.disabled = false;
            fireBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }, 650);
    });

    if (resetBtn) resetBtn.addEventListener('click', resetArena);
}

/* ==========================================================================
   19. FinTech Cloud Infrastructure ROI & Savings Calculator
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

    // Run initial calculation
    updateRoi();
}

/* ==========================================================================
   20. Interactive SQL EXPLAIN ANALYZE Indexing Lab
   ========================================================================== */
function initSqlIndexingLab() {
    const tabUnindexed = document.getElementById('sql-tab-unindexed');
    const tabIndexed = document.getElementById('sql-tab-indexed');
    const badge = document.getElementById('sql-query-badge');
    const code = document.getElementById('sql-query-code');
    const tree = document.getElementById('sql-plan-tree-content');
    const timeMetric = document.getElementById('sql-metric-time');
    const rowsMetric = document.getElementById('sql-metric-rows');
    const lockMetric = document.getElementById('sql-metric-lock');
    const verdictMetric = document.getElementById('sql-metric-verdict');

    if (!tabUnindexed || !tabIndexed) return;

    tabUnindexed.addEventListener('click', () => {
        tabUnindexed.className = 'sql-plan-tab active px-3.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold transition-all cursor-pointer';
        tabIndexed.className = 'sql-plan-tab px-3.5 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';

        if (badge) {
            badge.textContent = 'FULL TABLE SCAN DANGER';
            badge.className = 'text-rose-400 font-bold';
        }
        if (code) {
            code.textContent = `SELECT * FROM tbl_contract_signatures \nWHERE status = 'PENDING' AND created_at >= '2026-01-01'`;
        }
        if (tree) {
            tree.innerHTML = `
                <div class="sql-tree-node text-rose-400">
                    <span class="font-bold">-> Seq Scan (Full Table Scan)</span> on tbl_contract_signatures
                    <div class="text-[10px] text-slate-400 mt-0.5">cost=0.00..48210.00 rows=1,240,000 width=184</div>
                </div>
                <div class="sql-tree-node text-amber-400 ml-4">
                    <span class="font-bold">-> Filter:</span> (status = 'PENDING' AND created_at >= '2026-01-01')
                    <div class="text-[10px] text-slate-400 mt-0.5">Rows Removed by Filter: 1,239,988 | Buffer Hits: 4,812 / Reads: 14,290</div>
                </div>
            `;
        }
        if (timeMetric) {
            timeMetric.textContent = '4,820.4 ms';
            timeMetric.className = 'text-rose-400 font-bold';
        }
        if (rowsMetric) {
            rowsMetric.textContent = '1,240,000 rows';
            rowsMetric.className = 'text-rose-400 font-bold';
        }
        if (lockMetric) {
            lockMetric.textContent = 'Table Lock Contention';
            lockMetric.className = 'text-rose-400 font-bold';
        }
        if (verdictMetric) {
            verdictMetric.textContent = 'InnoDB reads every disk page; blocks concurrent INSERTs and triggers 504 Gateway Timeouts on spike load.';
        }
        playHapticTick(300, 0.03);
    });

    tabIndexed.addEventListener('click', () => {
        tabIndexed.className = 'sql-plan-tab active px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold transition-all cursor-pointer';
        tabUnindexed.className = 'sql-plan-tab px-3.5 py-1.5 rounded-lg bg-transparent text-slate-400 hover:text-white font-bold transition-all cursor-pointer';

        if (badge) {
            badge.textContent = 'COVERING INDEX HIT (0 DISK READS)';
            badge.className = 'text-emerald-400 font-bold';
        }
        if (code) {
            code.textContent = `-- Composite Index: idx_signatures_status_created (status, created_at, id)\nSELECT id, status, created_at FROM tbl_contract_signatures\nWHERE status = 'PENDING' AND created_at >= '2026-01-01'`;
        }
        if (tree) {
            tree.innerHTML = `
                <div class="sql-tree-node text-emerald-400">
                    <span class="font-bold">-> Index Only Scan using idx_signatures_status_created</span>
                    <div class="text-[10px] text-slate-400 mt-0.5">cost=0.43..12.85 rows=12 width=32 | Heap Fetches: 0</div>
                </div>
                <div class="sql-tree-node text-sky-400 ml-4">
                    <span class="font-bold">-> Index Cond:</span> ((status = 'PENDING') AND (created_at >= '2026-01-01'))
                    <div class="text-[10px] text-slate-400 mt-0.5">Buffer Hits: 3 (100% In-Memory Buffer Pool) | Reads: 0</div>
                </div>
            `;
        }
        if (timeMetric) {
            timeMetric.textContent = '1.2 ms';
            timeMetric.className = 'text-emerald-400 font-bold';
        }
        if (rowsMetric) {
            rowsMetric.textContent = '12 rows';
            rowsMetric.className = 'text-emerald-400 font-bold';
        }
        if (lockMetric) {
            lockMetric.textContent = 'Zero Lock Contention';
            lockMetric.className = 'text-emerald-400 font-bold';
        }
        if (verdictMetric) {
            verdictMetric.textContent = 'Index covers query completely. Direct B-Tree descent in 3 buffer hits. 4,000x latency reduction under 150 TPS!';
        }
        playHapticTick(950, 0.03);
    });
}

/* ==========================================================================
   21. Architecture Decision Records (ADRs) Drawer
   ========================================================================== */
function initAdrAccordion() {
    const toggleBtns = document.querySelectorAll('.adr-toggle-btn');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const chevron = btn.querySelector('.adr-chevron');

            if (!targetContent) return;

            const isCurrentlyOpen = !targetContent.classList.contains('hidden');

            // Close all open drawers for accordion behavior
            document.querySelectorAll('.adr-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.querySelectorAll('.adr-chevron').forEach(icon => {
                icon.classList.remove('rotate-180');
            });

            // If it was closed, open it
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
   22. Friday 7:30 PM On-Call Incident Simulator (P0 War Room)
   ========================================================================== */
function initIncidentSimulator() {
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
            toastTitle: "❌ INCIDENT ESCALATED",
            toastBody: "Adding compute nodes choked the shared RDS connection pool. Max pool limit reached.",
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
            toastTitle: "❌ SYSTEM PANIC",
            toastBody: "1,800 blocked OS threads consumed all RAM. Linux OOM-killer terminated the JVM.",
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
            toastTitle: "🏆 P0 INCIDENT RESOLVED",
            toastBody: "Virtual Threads + Redis Token Bucket stabilized the cluster. Zero dropped packets.",
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

            // Highlight chosen button and dim others
            choices.forEach(c => {
                c.classList.remove('ring-2', 'ring-sky-400', 'ring-rose-500', 'ring-emerald-400');
                c.classList.add('opacity-50', 'pointer-events-none');
            });
            btn.classList.remove('opacity-50');
            const ringColor = choiceKey === 'c' ? 'ring-emerald-400' : 'ring-rose-500';
            btn.classList.add('ring-2', ringColor);

            playHapticTick(600, 0.02);

            // Clear terminal and prepare
            terminalOutput.innerHTML = `<div class="text-slate-500">// Executing ${scenario.title}...</div>`;
            if (statusTag) {
                statusTag.innerHTML = '<span class="text-amber-400 animate-pulse font-bold">TRIAGING MITIGATION...</span>';
            }

            // Stream logs line by line
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

                    // Final step completion
                    if (index === scenario.logs.length - 1) {
                        if (statusTag) statusTag.innerHTML = scenario.status;
                        showToast(scenario.toastTitle, scenario.toastBody);

                        if (scenario.fireworks && window.launchRocketBarrage) {
                            window.launchRocketBarrage(6);
                        }

                        // Re-enable choices
                        setTimeout(() => {
                            isSimulating = false;
                            choices.forEach(c => {
                                c.classList.remove('opacity-50', 'pointer-events-none');
                            });
                        }, 800);
                    }
                }, (index + 1) * 350);
            });
        });
    });
}

/* ==========================================================================
   23. Spotify-Style Production Wrapped 2026 Shareable Card
   ========================================================================== */
function initProductionWrapped() {
    const copyBtn = document.getElementById('copy-wrapped-btn');
    if (!copyBtn) return;

    const wrappedText = `🚀 FINTECH PRODUCTION WRAPPED (2026)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Daily Surge Scale:    1.5M+ Hits / 2L Tx/Day (Scaled from 30k-35k)
🔥 Async Purge Velocity:  2,500 TPS (0 Table Locks, 14M+ Purged)
🔄 Database Migration:    150 TPS Sustained (Zero Downtime)
🛡️ Deadlocks in Prod:     0 (Strict PK-Chunking & Redis Mutex)
💻 Core Stack:            Java 25 (Virtual Threads) • Spring Boot 3 • AWS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Architected for zero-downtime, sub-second latency, and maximum financial throughput.`;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(wrappedText).then(() => {
            playHapticTick(1100, 0.03);
            const origHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="text-emerald-400 font-bold">Copied Summary!</span>
            `;
            showToast("📋 PRODUCTION WRAPPED COPIED", "2026 battle-tested telemetry copied to clipboard!");

            setTimeout(() => {
                copyBtn.innerHTML = origHtml;
            }, 2500);
        }).catch(err => {
            console.error("Clipboard copy failed: ", err);
            showToast("⚠️ COPY FAILED", "Please allow clipboard permissions in your browser.");
        });
    });
}

/* ==========================================================================
   24. Live System Interactive Preview Modal (ShortAF & External Demos)
   ========================================================================== */
function initLiveSystemPreviewModal() {
    const modal = document.getElementById('live-system-preview-modal');
    if (!modal) return;

    const iframe = document.getElementById('preview-modal-iframe');
    const titleEl = document.getElementById('preview-modal-title');
    const extLink = document.getElementById('preview-modal-external-link');
    const spinner = document.getElementById('preview-loading-spinner');
    const closeBtns = modal.querySelectorAll('.close-preview-modal-btn');
    const openBtns = document.querySelectorAll('.preview-live-modal-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            playHapticTick(1000, 0.03);
            const targetUrl = btn.getAttribute('data-preview-url') || 'https://scalelink-url-shortener.onrender.com/';
            const title = btn.getAttribute('data-preview-title') || 'ShortAF — Live System Preview';

            if (titleEl) titleEl.textContent = title + ' — Live Preview';
            if (extLink) extLink.href = targetUrl;
            if (spinner) spinner.classList.remove('hidden');

            if (iframe) {
                iframe.src = targetUrl;
                iframe.onload = () => {
                    if (spinner) spinner.classList.add('hidden');
                };
            }

            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });
    });

    const closeModal = () => {
        playHapticTick(600, 0.02);
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        if (iframe) iframe.src = '';
    };

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   25. ShortAF Live Telemetry Poller & Quick Shorten Tester
   ========================================================================== */
function initShortafQuickTester() {
    const quickForm = document.getElementById('shortaf-quick-form');
    if (!quickForm) return;
    const testUrlInput = document.getElementById('shortaf-test-url');
    const submitBtn = document.getElementById('shortaf-shorten-submit-btn');
    const resultBox = document.getElementById('shortaf-quick-result');
    const resultLink = document.getElementById('shortaf-result-link');
    const openResultBtn = document.getElementById('shortaf-open-result-btn');
    const copyResultBtn = document.getElementById('shortaf-copy-result-btn');

    // Telemetry Elements
    const statusPill = document.getElementById('shortaf-live-status-pill');
    const statEngine = document.getElementById('shortaf-stat-engine');
    const statHeap = document.getElementById('shortaf-stat-heap');
    const statBloom = document.getElementById('shortaf-stat-bloom');
    const statCache = document.getElementById('shortaf-stat-cache');

    // Fetch live telemetry status from Render API
    const fetchShortafTelemetry = async () => {
        try {
            const resp = await fetch('https://scalelink-url-shortener.onrender.com/api/v1/system/status', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (resp.ok) {
                const data = await resp.json();
                if (statusPill) {
                    statusPill.textContent = 'ONLINE (' + (data.status || 'OPTIMAL') + ')';
                    statusPill.className = 'px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold';
                }
                if (statEngine && data.architectureHighlights) {
                    statEngine.textContent = 'Java ' + (data.architectureHighlights.javaVersion || '21') + ' Loom';
                }
                if (statHeap && data.jvmMemoryUsedMb) {
                    statHeap.textContent = data.jvmMemoryUsedMb + ' MB / ' + (data.jvmMemoryMaxMb || 371) + ' MB';
                }
                if (statBloom) {
                    statBloom.textContent = 'Guava (0 DB queries)';
                }
                if (statCache) {
                    statCache.textContent = 'L1 Caffeine (<2ms)';
                }
            }
        } catch (e) {
            console.log('ShortAF telemetry check standby (cold start or sleep):', e);
            if (statusPill) {
                statusPill.textContent = 'STANDBY (CONTAINER SLEEPING)';
                statusPill.className = 'px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold';
            }
        }
    };

    fetchShortafTelemetry();

    if (!quickForm) return;

    quickForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const originalUrl = testUrlInput ? testUrlInput.value.trim() : '';
        if (!originalUrl) return;

        playHapticTick(1000, 0.04);
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            <span>Butchering...</span>
        `;

        try {
            const resp = await fetch('https://scalelink-url-shortener.onrender.com/api/v1/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalUrl: originalUrl })
            });

            if (!resp.ok) {
                throw new Error('API returned ' + resp.status);
            }

            const data = await resp.json();
            const shortUrl = data.shortUrl || `https://scalelink-url-shortener.onrender.com/${data.shortCode}`;

            if (resultBox && resultLink) {
                resultLink.textContent = shortUrl;
                resultLink.href = shortUrl;
                if (openResultBtn) openResultBtn.href = shortUrl;
                resultBox.classList.remove('hidden');

                if (window.triggerCelebration) {
                    window.triggerCelebration();
                }
                showToast("⚡ LINK BUTCHERED SHORTAF!", "Butchered the bloat so your chat doesn't look like a 300-char ransom note.");
            }
        } catch (err) {
            console.error('ShortAF shorten error:', err);
            showToast("⚠️ CONTAINER WAKING UP", "Render free container is waking from sleep. Please try again in 10s or click 'Launch Live App'!");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            if (window.lucide) {
                lucide.createIcons();
            }
        }
    });

    if (copyResultBtn && resultLink) {
        copyResultBtn.addEventListener('click', () => {
            const urlToCopy = resultLink.textContent;
            if (!urlToCopy) return;
            navigator.clipboard.writeText(urlToCopy).then(() => {
                playHapticTick(1200, 0.03);
                copyResultBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyResultBtn.textContent = 'Copy Link';
                }, 2000);
                showToast("📋 LINK COPIED", "Short URL copied to clipboard!");
            });
        });
    }
}

/* ==========================================================================
   26. Copy Code Button with Checkmark Animation
   ========================================================================== */
function initCopyCodeButtons() {
    const copyBtns = document.querySelectorAll('.copy-code-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const parentCard = btn.closest('div.space-y-2');
            const preEl = parentCard ? parentCard.querySelector('pre') : null;
            if (!preEl) return;

            const codeText = preEl.textContent.trim();
            try {
                await navigator.clipboard.writeText(codeText);
                btn.classList.add('copied');
                btn.innerHTML = '<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i><span class="text-emerald-400 font-bold">Copied!</span>';
                if (window.lucide) window.lucide.createIcons();
                playHapticTick(1100, 0.03);

                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i data-lucide="copy" class="w-3 h-3"></i><span>Copy</span>';
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code snippet', err);
            }
        });
    });
}

/* ==========================================================================
   27. Architecture Decision Records (ADRs) vs Incident RCAs Tab Toggle
   ========================================================================== */
function initAdrRcaToggle() {
    const adrsBtn = document.getElementById('toggle-view-adrs-btn');
    const rcasBtn = document.getElementById('toggle-view-rcas-btn');
    const adrsPanel = document.getElementById('adrs-panel');
    const rcasPanel = document.getElementById('rcas-panel');

    if (!adrsBtn || !rcasBtn || !adrsPanel || !rcasPanel) return;

    adrsBtn.addEventListener('click', () => {
        adrsBtn.classList.add('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40', 'shadow-lg', 'shadow-sky-500/20');
        adrsBtn.classList.remove('text-slate-400', 'border-transparent');
        rcasBtn.classList.remove('active', 'bg-rose-500/20', 'text-rose-300', 'border-rose-500/40', 'shadow-lg', 'shadow-rose-500/20');
        rcasBtn.classList.add('text-slate-400');

        adrsPanel.classList.remove('hidden');
        rcasPanel.classList.add('hidden');
        playHapticTick(750, 0.02);
    });

    rcasBtn.addEventListener('click', () => {
        rcasBtn.classList.add('active', 'bg-rose-500/20', 'text-rose-300', 'border-rose-500/40', 'shadow-lg', 'shadow-rose-500/20');
        rcasBtn.classList.remove('text-slate-400');
        adrsBtn.classList.remove('active', 'bg-sky-500/20', 'text-sky-300', 'border-sky-500/40', 'shadow-lg', 'shadow-sky-500/20');
        adrsBtn.classList.add('text-slate-400');

        rcasPanel.classList.remove('hidden');
        adrsPanel.classList.add('hidden');
        playHapticTick(850, 0.02);
    });
}

/* ==========================================================================
   28. Floating Apple Navbar Dynamic Scroll-Spy
   ========================================================================== */
function initScrollSpy() {
    const sections = ['stats', 'architecture-visualizer', 'projects', 'tradeoff-simulator', 'sql-optimizer', 'skills', 'experience', 'adrs', 'principles', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    currentSectionId = id;
                }
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active-nav-link');
            } else {
                link.classList.remove('active-nav-link');
            }
        });
    }, { passive: true });
}

/* ==========================================================================
   29. Spotlight / Raycast Command Palette (Cmd + K / Ctrl + K)
   ========================================================================== */
function initCommandPalette() {
    const modal = document.getElementById('cmd-palette-modal');
    const input = document.getElementById('cmd-palette-input');
    const resultsContainer = document.getElementById('cmd-palette-results');
    const triggerBtn = document.getElementById('cmd-palette-trigger');
    const mobileTriggerBtn = document.getElementById('mobile-cmd-palette-trigger');
    const closeEsc = document.getElementById('cmd-palette-close-esc');

    if (!modal || !input || !resultsContainer) return;

    let selectedIndex = 0;
    let filteredCommands = [];

    const commands = [
        // Navigation / Deep Dives
        {
            id: 'nav-topology',
            title: 'Interactive Distributed Topology',
            subtitle: 'Real-time packet hop animation, virtual threads, and Jaeger traces',
            category: 'Navigation',
            icon: 'network',
            action: () => scrollToSection('architecture-visualizer')
        },
        {
            id: 'nav-tradeoffs',
            title: 'Architecture Trade-Off Live Scorecard',
            subtitle: 'Interactive benchmark: Concurrency, Locking, and I/O pipeline',
            category: 'Navigation',
            icon: 'scale',
            action: () => scrollToSection('tradeoff-simulator')
        },
        {
            id: 'nav-sql-explain',
            title: 'MySQL 8.0 EXPLAIN ANALYZE Optimizer',
            subtitle: '15M row volume slider vs composite B-Tree index scan',
            category: 'Navigation',
            icon: 'database',
            action: () => scrollToSection('sql-optimizer')
        },
        {
            id: 'nav-projects',
            title: 'The War Stories (Flagship Projects)',
            subtitle: 'Digitap Single-OTP, 2,500 TPS Purge Engine, DigiLocker 1.5M+ hits',
            category: 'Navigation',
            icon: 'layers',
            action: () => scrollToSection('projects')
        },
        {
            id: 'nav-adrs',
            title: 'Architecture Decision Records (ADRs) & Incident RCAs',
            subtitle: 'Real production design choices and blameless post-mortems',
            category: 'Navigation',
            icon: 'book-open',
            action: () => scrollToSection('adrs')
        },
        {
            id: 'nav-skills',
            title: 'Superpowers & Distributed Stack',
            subtitle: 'Java 25, Virtual Threads, Spring Boot 3, Kafka, Redis, MySQL',
            category: 'Navigation',
            icon: 'cpu',
            action: () => scrollToSection('skills')
        },
        {
            id: 'nav-experience',
            title: 'Battlefield Experience (Career History)',
            subtitle: 'Digitap (FinTech SSE), Merck Group, and Cognizant',
            category: 'Navigation',
            icon: 'briefcase',
            action: () => scrollToSection('experience')
        },
        {
            id: 'nav-contact',
            title: 'Contact & Zero-BS Tech Chat',
            subtitle: 'Direct email, phone, and 15-min architectural chat',
            category: 'Navigation',
            icon: 'mail',
            action: () => scrollToSection('contact')
        },
        {
            id: 'nav-lab',
            title: 'Systems Architecture Lab Portal',
            subtitle: 'Head-to-head architectural benchmark lab & race condition simulator',
            category: 'Deep Dive',
            icon: 'cpu',
            action: () => { window.location.href = '/lab'; }
        },

        // Chaos Monkey Injections
        {
            id: 'chaos-504',
            title: 'Inject Chaos: Downstream TSP 504 Timeout',
            subtitle: 'Simulate eMudhra gateway outage & Resilience4j circuit breaker trip',
            category: 'Chaos Engine',
            icon: 'flame',
            action: () => {
                scrollToSection('architecture-visualizer');
                setTimeout(() => {
                    const btn = document.getElementById('chaos-btn-tsp-504');
                    if (btn) btn.click();
                }, 300);
            }
        },
        {
            id: 'chaos-surge',
            title: 'Inject Chaos: 10x Flash Crowd Burst (25k TPS)',
            subtitle: 'Simulate sudden loan disbursement burst & token bucket rate limiter',
            category: 'Chaos Engine',
            icon: 'zap',
            action: () => {
                scrollToSection('architecture-visualizer');
                setTimeout(() => {
                    const btn = document.getElementById('chaos-btn-surge-burst');
                    if (btn) btn.click();
                }, 300);
            }
        },
        {
            id: 'chaos-race',
            title: 'Inject Chaos: Twin Request Race Condition (2ms)',
            subtitle: 'Double OTP submission handled by Redis Redisson distributed lock (409)',
            category: 'Chaos Engine',
            icon: 'shield-alert',
            action: () => {
                scrollToSection('architecture-visualizer');
                setTimeout(() => {
                    const btn = document.getElementById('chaos-btn-twin-race');
                    if (btn) btn.click();
                }, 300);
            }
        },

        // Instant Production Actions
        {
            id: 'action-fire-packet',
            title: 'Fire Packet in Topology Visualizer',
            subtitle: 'Trace live virtual thread dispatch across microservices',
            category: 'Actions',
            icon: 'play',
            action: () => {
                scrollToSection('architecture-visualizer');
                setTimeout(() => {
                    const btn = document.getElementById('fire-packet-btn');
                    if (btn) btn.click();
                }, 300);
            }
        },
        {
            id: 'action-theme',
            title: 'Toggle Light / Dark Theme',
            subtitle: 'Switch between Apple Dark and High-Contrast White mode',
            category: 'Actions',
            icon: 'sun',
            action: () => {
                const btn = document.getElementById('theme-toggle-btn');
                if (btn) btn.click();
            }
        },
        {
            id: 'action-sound',
            title: 'Toggle Tactile Sound Effects',
            subtitle: 'Enable or mute realistic haptic audio clicks',
            category: 'Actions',
            icon: 'volume-2',
            action: () => {
                const btn = document.getElementById('sound-toggle-btn');
                if (btn) btn.click();
            }
        },
        {
            id: 'action-copy-email',
            title: 'Copy Akshat\'s Direct Email',
            subtitle: 'akshatrawat9211@gmail.com',
            category: 'Actions',
            icon: 'copy',
            action: () => {
                const copyBtn = document.querySelector('.copy-email-btn');
                if (copyBtn) copyBtn.click();
            }
        },
        {
            id: 'action-resume-pdf',
            title: 'Download Senior Software Engineer Resume (.PDF)',
            subtitle: 'ATS-optimized executive format with verified production metrics',
            category: 'Downloads',
            icon: 'file-text',
            action: () => {
                window.location.href = '/downloads/Akshat_Jaiswal_Senior_Software_Engineer.pdf';
            }
        },
        {
            id: 'action-linkedin',
            title: 'Open LinkedIn Profile',
            subtitle: 'Connect with Akshat Jaiswal on LinkedIn',
            category: 'External',
            icon: 'external-link',
            action: () => {
                window.open('https://www.linkedin.com/in/akshat-jaiswal-9a0397193/', '_blank');
            }
        }
    ];

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function openPalette() {
        modal.classList.remove('hidden');
        input.value = '';
        selectedIndex = 0;
        filterCommands('');
        setTimeout(() => input.focus(), 50);
        playHapticTick(900, 0.03);
    }

    function closePalette() {
        modal.classList.add('hidden');
        playHapticTick(500, 0.02);
    }

    function renderResults() {
        resultsContainer.innerHTML = '';
        if (filteredCommands.length === 0) {
            resultsContainer.innerHTML = `
                <div class="p-6 text-center text-slate-500 text-xs font-mono">
                    No matching commands or sections found for "${input.value.trim()}".
                </div>
            `;
            return;
        }

        let currentCategory = '';
        filteredCommands.forEach((cmd, idx) => {
            if (cmd.category !== currentCategory) {
                currentCategory = cmd.category;
                const header = document.createElement('div');
                header.className = 'px-3 pt-2.5 pb-1 text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500';
                header.textContent = currentCategory;
                resultsContainer.appendChild(header);
            }

            const item = document.createElement('div');
            item.className = `cmd-palette-item p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${idx === selectedIndex ? 'selected bg-sky-500/20 text-white border-sky-500/40' : 'text-slate-300 hover:text-white'}`;
            item.innerHTML = `
                <div class="flex items-center gap-3 min-w-0">
                    <div class="p-2 rounded-lg bg-white/[0.04] text-sky-400 shrink-0">
                        <i data-lucide="${cmd.icon}" class="w-4 h-4"></i>
                    </div>
                    <div class="truncate">
                        <div class="font-bold text-xs truncate">${cmd.title}</div>
                        <div class="text-[10.5px] text-slate-400 truncate">${cmd.subtitle}</div>
                    </div>
                </div>
                <div class="shrink-0 flex items-center gap-2 pl-2">
                    <span class="text-[9.5px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 hidden sm:inline">${cmd.category}</span>
                    <i data-lucide="corner-down-left" class="w-3.5 h-3.5 text-slate-500"></i>
                </div>
            `;

            item.addEventListener('click', () => {
                closePalette();
                cmd.action();
            });

            item.addEventListener('mouseenter', () => {
                selectedIndex = idx;
                updateSelectionHighlight();
            });

            resultsContainer.appendChild(item);
        });

        if (window.lucide && typeof lucide.createIcons === 'function') {
            lucide.createIcons();
        }
    }

    function updateSelectionHighlight() {
        const items = resultsContainer.querySelectorAll('.cmd-palette-item');
        items.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add('selected', 'bg-sky-500/20', 'text-white', 'border-sky-500/40');
            } else {
                item.classList.remove('selected', 'bg-sky-500/20', 'text-white', 'border-sky-500/40');
            }
        });
        const activeItem = items[selectedIndex];
        if (activeItem) {
            activeItem.scrollIntoView({ block: 'nearest' });
        }
    }

    function filterCommands(query) {
        const cleanQuery = query.toLowerCase().trim();
        if (!cleanQuery) {
            filteredCommands = [...commands];
        } else {
            filteredCommands = commands.filter(cmd =>
                cmd.title.toLowerCase().includes(cleanQuery) ||
                cmd.subtitle.toLowerCase().includes(cleanQuery) ||
                cmd.category.toLowerCase().includes(cleanQuery)
            );
        }
        selectedIndex = 0;
        renderResults();
    }

    input.addEventListener('input', (e) => {
        filterCommands(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (filteredCommands.length > 0) {
                selectedIndex = (selectedIndex + 1) % filteredCommands.length;
                updateSelectionHighlight();
                playHapticTick(450, 0.015);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (filteredCommands.length > 0) {
                selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
                updateSelectionHighlight();
                playHapticTick(450, 0.015);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
                const action = filteredCommands[selectedIndex].action;
                closePalette();
                action();
                playHapticTick(850, 0.02);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closePalette();
        }
    });

    if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
    if (mobileTriggerBtn) mobileTriggerBtn.addEventListener('click', openPalette);
    if (closeEsc) closeEsc.addEventListener('click', closePalette);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePalette();
    });

    // Global Cmd + K / Ctrl + K listener
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (modal.classList.contains('hidden')) {
                openPalette();
            } else {
                closePalette();
            }
        } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closePalette();
        }
    });
}

/* ==========================================================================
   30. Chaos Monkey & Live Failure Mode Injection
   ========================================================================== */
function initChaosSimulator() {
    const btnTsp = document.getElementById('chaos-btn-tsp-504');
    const btnSurge = document.getElementById('chaos-btn-surge-burst');
    const btnRace = document.getElementById('chaos-btn-twin-race');
    const logBox = document.getElementById('pipeline-telemetry-log');
    const execTimeDisplay = document.getElementById('pipeline-execution-time');

    if (!btnTsp || !btnSurge || !btnRace) return;

    function appendLog(text, colorClass = 'text-slate-300') {
        if (!logBox) return;
        const div = document.createElement('div');
        div.className = `leading-relaxed font-mono ${colorClass}`;
        div.innerHTML = text;
        logBox.appendChild(div);
        logBox.scrollTop = logBox.scrollHeight;
    }

    function resetLogBox(headerText) {
        if (!logBox) return;
        logBox.innerHTML = `<div class="text-sky-400 font-bold border-b border-white/10 pb-1">// ${headerText}</div>`;
    }

    // 1. Downstream TSP 504 Timeout
    btnTsp.addEventListener('click', () => {
        playHapticTick(300, 0.05);
        resetLogBox('CHAOS INJECTION: DOWNSTREAM TSP 504 TIMEOUT (CIRCUIT BREAKER TEST)');
        if (execTimeDisplay) {
            execTimeDisplay.textContent = 'INJECTING 504 TIMEOUT...';
            execTimeDisplay.className = 'text-rose-400 font-bold animate-pulse';
        }

        setTimeout(() => appendLog('[00:00:00.002] [VirtualThread#4821] POST /api/v2/esign/verify-otp dispatching to eMudhra TSP gateway...', 'text-slate-400'), 100);
        setTimeout(() => appendLog('[00:00:01.004] [Resilience4j-Timer] Upstream gateway response timeout (>1000ms). HTTP 504 GATEWAY TIMEOUT.', 'text-rose-400 font-bold'), 350);
        setTimeout(() => appendLog('[00:00:01.006] [CircuitBreaker] Failure rate threshold exceeded (60%). State transition: CLOSED -> OPEN.', 'text-amber-400 font-bold'), 600);
        setTimeout(() => {
            appendLog('[00:00:01.008] [FallbackExecutor] Fallback queue engaged: Document queued for async retry worker. Return graceful ACK to client.', 'text-emerald-400 font-bold');
            if (execTimeDisplay) {
                execTimeDisplay.textContent = 'CIRCUIT_BREAKER_OPEN: FALLBACK_SERVED (12ms)';
                execTimeDisplay.className = 'text-amber-400 font-bold';
            }
            playHapticTick(900, 0.03);
            showToast('⚡ CHAOS MONKEY: TSP 504 DEFENDED', 'Resilience4j Circuit Breaker tripped to OPEN. Fallback queue safely engaged; 0 customer requests dropped.');
        }, 900);
    });

    // 2. 10x Flash Crowd Surge (25k TPS)
    btnSurge.addEventListener('click', () => {
        playHapticTick(400, 0.05);
        resetLogBox('CHAOS INJECTION: 10x FLASH CROWD SURGE (RATE LIMITER & THREAD ELASTICITY)');
        if (execTimeDisplay) {
            execTimeDisplay.textContent = 'BURSTING 25,000 TPS...';
            execTimeDisplay.className = 'text-amber-400 font-bold animate-pulse';
        }

        setTimeout(() => appendLog('[00:00:00.001] [Ingress-Gateway] Flash crowd surge detected: Inbound requests jumped from 2,500 TPS to 25,400 TPS!', 'text-amber-300 font-bold'), 100);
        setTimeout(() => appendLog('[00:00:00.004] [JVM-CarrierPool] Java 21 Virtual Threads spawned: 25,000 threads mounted across 16 OS carrier cores.', 'text-sky-300'), 350);
        setTimeout(() => appendLog('[00:00:00.007] [Redis-TokenBucket] Tenant quota exceeded (5,000 TPS limit). Token bucket depleted.', 'text-rose-400 font-bold'), 600);
        setTimeout(() => {
            appendLog('[00:00:00.009] [RateLimiter] 20,400 excess requests rejected with HTTP 429 Too Many Requests (Retry-After: 2s). Core DB CPU stays at 18%.', 'text-emerald-400 font-bold');
            if (execTimeDisplay) {
                execTimeDisplay.textContent = '429_TOO_MANY_REQUESTS: RATE_LIMIT_PROTECTED';
                execTimeDisplay.className = 'text-emerald-400 font-bold';
            }
            playHapticTick(900, 0.03);
            showToast('⚡ CHAOS MONKEY: 25k TPS SURGE SHIELDED', 'Virtual Thread pool expanded seamlessly; Redis token bucket throttled excess load with HTTP 429, shielding MySQL.');
        }, 900);
    });

    // 3. Twin Request Race Condition (2ms)
    btnRace.addEventListener('click', () => {
        playHapticTick(500, 0.05);
        resetLogBox('CHAOS INJECTION: TWIN REQUEST RACE CONDITION (REDIS REDISSON DISTRIBUTED LOCK)');
        if (execTimeDisplay) {
            execTimeDisplay.textContent = 'SIMULATING 2ms TWIN REQUESTS...';
            execTimeDisplay.className = 'text-sky-400 font-bold animate-pulse';
        }

        setTimeout(() => appendLog('[00:00:00.001] [VirtualThread#7102] Req 1 (Sign OTP) -> Acquiring Redis lock: lock:esign:user_9839...', 'text-slate-300'), 100);
        setTimeout(() => appendLog('[00:00:00.003] [VirtualThread#7103] Req 2 (Twin Duplicate, +2ms) -> Attempting acquire lock:esign:user_9839...', 'text-amber-300 font-bold'), 350);
        setTimeout(() => appendLog('[00:00:00.004] [RedissonLock] Req 1 lock ACQUIRED (TTL: 30000ms, Watchdog lease active).', 'text-emerald-400 font-bold'), 600);
        setTimeout(() => {
            appendLog('[00:00:00.005] [RedissonLock] Req 2 lock REJECTED (tryLock failed). Idempotency collision intercepted.', 'text-rose-400 font-bold');
            appendLog('[00:00:00.008] [Dispatcher] Req 2 aborted with HTTP 409 Conflict. Zero duplicate Aadhaar verification charges incurred!', 'text-emerald-400 font-bold');
            if (execTimeDisplay) {
                execTimeDisplay.textContent = '409_CONFLICT: 100% IDEMPOTENT';
                execTimeDisplay.className = 'text-emerald-400 font-bold';
            }
            playHapticTick(900, 0.03);
            showToast('⚡ CHAOS MONKEY: TWIN RACE INTERCEPTED', 'Redisson distributed lock granted exclusive execution to Req 1 and safely rejected twin Req 2 with HTTP 409 Conflict.');
        }, 900);
    });
}

/* ==========================================================================
   31. Systems Architecture Trade-Off Live Scorecard
   ========================================================================== */
function initTradeoffSimulator() {
    const buttons = document.querySelectorAll('.tradeoff-toggle-btn');
    const tpsDisplay = document.getElementById('scorecard-tps');
    const latencyDisplay = document.getElementById('scorecard-latency');
    const memoryDisplay = document.getElementById('scorecard-memory');
    const locksDisplay = document.getElementById('scorecard-locks');
    const verdictTag = document.getElementById('scorecard-verdict-tag');
    const verdictText = document.getElementById('scorecard-verdict-text');

    if (!buttons.length || !tpsDisplay) return;

    const state = {
        concurrency: 'virtual',  // 'platform' | 'virtual'
        locking: 'redis_lock',   // 'mysql_lock' | 'redis_lock'
        io: 'direct_byte'        // 'disk_io' | 'direct_byte'
    };

    function recalculateScorecard() {
        let tps = 4850;
        let latency = 38;
        let memory = '420 MB / 16 Carrier';
        let contention = '0.0% Contention';
        let tag = 'DIGITAP PRODUCTION STANDARD (TIER-1)';
        let tagClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
        let explanation = '';

        const isVirtual = state.concurrency === 'virtual';
        const isRedis = state.locking === 'redis_lock';
        const isDirect = state.io === 'direct_byte';

        if (isVirtual && isRedis && isDirect) {
            tps = 4850;
            latency = 38;
            memory = '420 MB / 16 Carrier';
            contention = '0.0% Contention';
            tag = 'DIGITAP PRODUCTION STANDARD (TIER-1)';
            tagClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            explanation = 'Optimal FinTech architecture: Java 21 Virtual Threads decouple request concurrency from kernel OS threads. Redis Redisson locks prevent database row lock escalations, while Direct ByteBuffer streams eliminate EBS disk write latency. Handles 4,800+ TPS with zero deadlocks.';
        } else if (!isVirtual && !isRedis && !isDirect) {
            tps = 320;
            latency = 1840;
            memory = '2.8 GB / 1,200 OS Threads';
            contention = '89.4% (Deadlock Danger)';
            tag = 'LEGACY DISASTER (FATAL BOTTLENECK)';
            tagClass = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
            explanation = 'Worst-case legacy setup: OS platform threads pin carrier cores on I/O wait. MySQL row locks trigger deadlocks and Lock Wait Timeout Exceeded errors under 350 TPS. Disk spooling saturates AWS EBS IOPS, causing severe cascading 504 timeouts.';
        } else {
            // Mixed combinations
            let penalties = [];

            if (!isVirtual) {
                tps = Math.min(tps, 650);
                latency += 420;
                memory = '1.8 GB / 800 OS Threads';
                penalties.push('Platform thread exhaustion caps concurrency');
            }

            if (!isRedis) {
                tps = Math.min(tps, 950);
                latency += 280;
                contention = '68.2% Contention (Row Locks)';
                penalties.push('MySQL row locks create connection queue spikes');
            }

            if (!isDirect) {
                latency += 340;
                tps = Math.min(tps, 1800);
                penalties.push('Disk spooling hits EBS burst IOPS limits');
            }

            tag = 'SUB-OPTIMAL COMPROMISE';
            tagClass = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
            explanation = `Noticeable production bottlenecks detected: ${penalties.join(', ')}. While operational at low volume, this configuration degrades under spike traffic.`;
        }

        // DOM updates
        tpsDisplay.textContent = `${tps.toLocaleString()} TPS`;
        tpsDisplay.className = `text-xl sm:text-2xl font-black font-mono ${tps >= 3000 ? 'text-emerald-400' : tps >= 1000 ? 'text-amber-400' : 'text-rose-400'}`;

        latencyDisplay.textContent = `${latency} ms`;
        latencyDisplay.className = `text-xl sm:text-2xl font-black font-mono ${latency <= 50 ? 'text-emerald-400' : latency <= 300 ? 'text-sky-400' : 'text-rose-400'}`;

        memoryDisplay.textContent = memory;
        memoryDisplay.className = `text-xl sm:text-2xl font-black font-mono ${isVirtual ? 'text-purple-400' : 'text-rose-400'}`;

        locksDisplay.textContent = contention;
        locksDisplay.className = `text-xl sm:text-2xl font-black font-mono ${isRedis ? 'text-emerald-400' : 'text-rose-400'}`;

        if (verdictTag) {
            verdictTag.textContent = tag;
            verdictTag.className = `px-2 py-0.5 rounded text-[10px] font-bold border ${tagClass}`;
        }

        if (verdictText) {
            verdictText.textContent = explanation;
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const axis = btn.getAttribute('data-axis');
            const choice = btn.getAttribute('data-choice');
            if (!axis || !choice) return;

            state[axis] = choice;

            // Update button styles in this axis
            const axisButtons = document.querySelectorAll(`.tradeoff-toggle-btn[data-axis="${axis}"]`);
            axisButtons.forEach(b => {
                if (b === btn) {
                    b.classList.add('active');
                    if (axis === 'concurrency') {
                        b.className = 'tradeoff-toggle-btn active w-full text-left p-3 rounded-xl border border-sky-500/40 bg-sky-500/15 text-sky-300 transition-all text-xs font-mono cursor-pointer';
                    } else if (axis === 'locking') {
                        b.className = 'tradeoff-toggle-btn active w-full text-left p-3 rounded-xl border border-amber-500/40 bg-amber-500/15 text-amber-300 transition-all text-xs font-mono cursor-pointer';
                    } else {
                        b.className = 'tradeoff-toggle-btn active w-full text-left p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 transition-all text-xs font-mono cursor-pointer';
                    }
                } else {
                    b.classList.remove('active');
                    b.className = 'tradeoff-toggle-btn w-full text-left p-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white transition-all text-xs font-mono cursor-pointer';
                }
            });

            recalculateScorecard();
            playHapticTick(750, 0.02);
        });
    });
}

/* ==========================================================================
   32. Interactive MySQL 8.0 EXPLAIN ANALYZE & B-Tree Optimizer
   ========================================================================== */
function initSqlOptimizer() {
    const slider = document.getElementById('sql-volume-slider');
    const volumeDisplay = document.getElementById('sql-volume-display');
    const btnNone = document.getElementById('sql-strategy-none-btn');
    const btnIndexed = document.getElementById('sql-strategy-indexed-btn');
    const metricLatency = document.getElementById('sql-metric-latency');
    const metricSpeedup = document.getElementById('sql-metric-speedup');
    const metricExamined = document.getElementById('sql-metric-examined');
    const metricEfficiency = document.getElementById('sql-metric-efficiency');
    const metricBuffer = document.getElementById('sql-metric-buffer');
    const metricBufferNote = document.getElementById('sql-metric-buffer-note');
    const metricStatus = document.getElementById('sql-metric-status');
    const metricStatusNote = document.getElementById('sql-metric-status-note');
    const appliedTag = document.getElementById('sql-index-applied-tag');
    const explainTbody = document.getElementById('sql-explain-tbody');

    if (!slider || !btnNone || !btnIndexed || !explainTbody) return;

    let isIndexed = true;

    const volumeMap = {
        1: { count: 10000, label: '10,000 Rows', rawLatency: 8.5 },
        2: { count: 100000, label: '100,000 Rows', rawLatency: 48.2 },
        3: { count: 1000000, label: '1,000,000 Rows', rawLatency: 380.0 },
        4: { count: 5000000, label: '5,000,000 Rows', rawLatency: 1650.0 },
        5: { count: 15000000, label: '15,000,000 Rows', rawLatency: 4210.0 }
    };

    function renderOptimizer() {
        const val = parseInt(slider.value, 10) || 5;
        const vol = volumeMap[val] || volumeMap[5];

        if (volumeDisplay) {
            volumeDisplay.textContent = vol.label;
        }

        if (isIndexed) {
            // Composite Index Active
            const latency = 1.4;
            const speedupRatio = Math.round(vol.rawLatency / latency);

            if (metricLatency) {
                metricLatency.textContent = `${latency.toFixed(1)} ms`;
                metricLatency.className = 'text-xl sm:text-2xl font-black text-emerald-400 font-mono';
            }
            if (metricSpeedup) {
                metricSpeedup.textContent = `${speedupRatio.toLocaleString()}x Faster`;
                metricSpeedup.className = 'text-[10.5px] font-mono text-emerald-400 block font-bold';
            }
            if (metricExamined) {
                metricExamined.textContent = '50 rows';
                metricExamined.className = 'text-xl sm:text-2xl font-black text-emerald-400 font-mono';
            }
            if (metricEfficiency) {
                metricEfficiency.textContent = '100% Index Selectivity';
                metricEfficiency.className = 'text-[10.5px] font-mono text-slate-400 block';
            }
            if (metricBuffer) {
                metricBuffer.textContent = '0 Disk Reads';
                metricBuffer.className = 'text-xl sm:text-2xl font-black text-sky-400 font-mono';
            }
            if (metricBufferNote) {
                metricBufferNote.textContent = 'In-Memory B-Tree Descent';
            }
            if (metricStatus) {
                metricStatus.textContent = 'Tier-1 Safe';
                metricStatus.className = 'text-xl sm:text-2xl font-black text-emerald-400 font-mono';
            }
            if (metricStatusNote) {
                metricStatusNote.textContent = '0 Deadlock Risk';
                metricStatusNote.className = 'text-[10.5px] font-mono text-emerald-400 block font-bold';
            }
            if (appliedTag) {
                appliedTag.textContent = 'INDEX: `idx_kyc_client_status_created` (client_id, status, created_at DESC)';
                appliedTag.className = 'text-[11px] font-bold text-emerald-400';
            }

            explainTbody.innerHTML = `
                <tr class="hover:bg-white/[0.02] transition-colors">
                    <td class="p-2.5 font-bold text-white">1</td>
                    <td class="p-2.5">SIMPLE</td>
                    <td class="p-2.5 text-sky-300">kyc_request_logs</td>
                    <td class="p-2.5"><span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">range</span></td>
                    <td class="p-2.5 text-emerald-400">idx_kyc_client_status_created</td>
                    <td class="p-2.5 text-emerald-400 font-bold">idx_kyc_client_status_created</td>
                    <td class="p-2.5">138</td>
                    <td class="p-2.5 text-slate-500">NULL</td>
                    <td class="p-2.5 text-emerald-400 font-bold">50</td>
                    <td class="p-2.5">100.00</td>
                    <td class="p-2.5 text-emerald-300 font-semibold">Using index condition; Backward index scan</td>
                </tr>
            `;
        } else {
            // Unindexed - Full Table Scan (ALL)
            const latency = vol.rawLatency;

            if (metricLatency) {
                metricLatency.textContent = `${latency.toLocaleString()} ms`;
                metricLatency.className = 'text-xl sm:text-2xl font-black text-rose-400 font-mono';
            }
            if (metricSpeedup) {
                metricSpeedup.textContent = '1x (BASELINE / SLOW)';
                metricSpeedup.className = 'text-[10.5px] font-mono text-rose-400 block font-bold';
            }
            if (metricExamined) {
                metricExamined.textContent = `${vol.count.toLocaleString()} rows`;
                metricExamined.className = 'text-xl sm:text-2xl font-black text-rose-400 font-mono';
            }
            if (metricEfficiency) {
                metricEfficiency.textContent = 'Full Table Scan (ALL)';
                metricEfficiency.className = 'text-[10.5px] font-mono text-rose-400 block font-bold';
            }
            if (metricBuffer) {
                metricBuffer.textContent = '12.8 GB Churn';
                metricBuffer.className = 'text-xl sm:text-2xl font-black text-rose-400 font-mono';
            }
            if (metricBufferNote) {
                metricBufferNote.textContent = 'EBS IOPS Bottleneck';
            }
            if (metricStatus) {
                metricStatus.textContent = 'FATAL 504 RISK';
                metricStatus.className = 'text-xl sm:text-2xl font-black text-rose-400 font-mono';
            }
            if (metricStatusNote) {
                metricStatusNote.textContent = 'Lock Wait Timeouts';
                metricStatusNote.className = 'text-[10.5px] font-mono text-rose-400 block font-bold';
            }
            if (appliedTag) {
                appliedTag.textContent = 'NO INDEX (ALL ROWS READ FROM DISK)';
                appliedTag.className = 'text-[11px] font-bold text-rose-400';
            }

            explainTbody.innerHTML = `
                <tr class="hover:bg-white/[0.02] transition-colors">
                    <td class="p-2.5 font-bold text-white">1</td>
                    <td class="p-2.5">SIMPLE</td>
                    <td class="p-2.5 text-rose-300">kyc_request_logs</td>
                    <td class="p-2.5"><span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">ALL</span></td>
                    <td class="p-2.5 text-slate-500">NULL</td>
                    <td class="p-2.5 text-slate-500">NULL</td>
                    <td class="p-2.5 text-slate-500">NULL</td>
                    <td class="p-2.5 text-slate-500">NULL</td>
                    <td class="p-2.5 text-rose-400 font-bold">${vol.count.toLocaleString()}</td>
                    <td class="p-2.5">10.00</td>
                    <td class="p-2.5 text-rose-400 font-bold">Using where; Using filesort</td>
                </tr>
            `;
        }
    }

    slider.addEventListener('input', () => {
        renderOptimizer();
        playHapticTick(600, 0.015);
    });

    btnNone.addEventListener('click', () => {
        isIndexed = false;
        btnNone.className = 'sql-strat-btn active flex-1 py-2.5 px-3 rounded-xl border border-rose-500/40 bg-rose-500/20 text-rose-300 transition-all cursor-pointer text-center font-bold shadow-lg shadow-rose-500/20';
        btnIndexed.className = 'sql-strat-btn flex-1 py-2.5 px-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white transition-all cursor-pointer text-center font-bold';
        renderOptimizer();
        playHapticTick(300, 0.03);
    });

    btnIndexed.addEventListener('click', () => {
        isIndexed = true;
        btnIndexed.className = 'sql-strat-btn active flex-1 py-2.5 px-3 rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 transition-all cursor-pointer text-center font-bold shadow-lg shadow-emerald-500/20';
        btnNone.className = 'sql-strat-btn flex-1 py-2.5 px-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white transition-all cursor-pointer text-center font-bold';
        renderOptimizer();
        playHapticTick(950, 0.03);
    });

    // Initial render
    renderOptimizer();
}




