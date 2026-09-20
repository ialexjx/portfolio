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
    initThemeToggle();
    initSpecularGlowAndTilt();
    initTerminalStream();
    initBreakProdModal();
    initEmailCopy();
    initRoastGenerator();
    initMobileMenu();
    initSoundEffects();
    initTpsStressTester();
    initClusterHealthHud();
    initArchitectureVisualizer();
    initArchitecturalBenchmarkLab();
    initRaceConditionChallenge();
    initTechChatModal();
    initCliQaModal();
    initFireworksEngine();
    initLofiAmbientPlayer();
    initCodeDiffDrawers();
    initKonamiCodeEasterEgg();
    initRoiCalculator();
    initSqlIndexingLab();
    initAdrAccordion();
    initIncidentSimulator();
    initProductionWrapped();
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
        { tag: "SCALE", color: "text-sky-300", msg: "DigiLocker Surge: Scaled from 28k to 90,000 daily successful transactions post-revamp" },
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

    // Load roasts from window or fallback list
    let roasts = (window.PORTFOLIO_ROASTS && Array.isArray(window.PORTFOLIO_ROASTS) && window.PORTFOLIO_ROASTS.length > 0)
        ? window.PORTFOLIO_ROASTS
        : [
            "Merck let me go after a 1-year internship. Not because my Java code had bugs (it had 98% test coverage), but because the moment tickets were done, I was the undisputed office foosball champion and playing extreme luka chhipi (hide-and-seek) behind the server racks.",
            "Merck HR exit interview: 'Akshat, your APIs are great, but this is a 350-year-old German healthcare conglomerate, not a summer camp for 6-hour foosball tournaments and indoor hide-and-seek.' Honestly? Fair enough.",
            "Merck taught me two foundational skills: disciplined 98% JUnit code coverage, and the exact blind spots of every CCTV camera in the office during hide-and-seek.",
            "At Digitap, we don't have a staging environment for eSign or OVSE. We test directly on live bank transactions. If it works, it's a feature. If it crashes, congratulations, you've just unlocked emergency character-building at 2 AM.",
            "Digitap's legacy eSign had zero PDF validation. A client could literally upload a 1-page photo of their lunch, and the system would only crash at the final OTP step asking where the signature went.",
            "Before my DigiLocker revamp, triggering one client webhook required jumping through 4 separate SNS topics and 4 AWS CloudWatch groups. It wasn't an event-driven architecture, it was a relay race through Dante's Inferno.",
            "At Digitap, operations was preparing physical mandates on Excel sheets and manually verifying bank responses line-by-line. They weren't ops engineers, they were 18th-century scribes trapped inside an AWS account.",
            "Promoted to SSE in 2.5 years not because I'm a 10x god, but because I broke so many things in dev during my first 6 months that I was the only human alive who understood how the duct tape held together.",
            "Management gave me the Senior title purely so they could write an official name in incident post-mortems when the production database cries at 3 AM instead of blaming themselves.",
            "Built APIs, survived production, earned promotion. Officially promoted from fixing other people's bugs to being personally blamed for the entire architecture.",
            "My doctor told me to reduce my caffeine intake. I told him to reduce Digitap's third-party banking timeout from 30 seconds to 50ms, and we'll both live longer.",
            "I don't have work-life balance. I have a heartbeat, a JVM process, and a terminal window running tail -f on production logs while normal people have hobbies.",
            "Frontend colleagues spend 4 days debating whether a button should have an 8px or 10px border-radius. Meanwhile, I migrate 200,000 live banking transactions while sipping lukewarm chai.",
            "My backend colleague: 'Hey Akshat, the query is taking 45 seconds.' Me: 'Did you index the column?' Him: 'What's an index?' This is why I have trust issues with humanity.",
            "Product Managers: 'Can we schedule a quick 30-minute sync to align on the pre-meeting agenda for tomorrow's standup?' I swear corporate PMs would schedule a meeting to approve taking a breath.",
            "Colleagues who commit code with messages like 'fixed stuff' or 'wip 2' belong in a special federal prison where the only text editor is nano with a broken backspace key.",
            "QA teammate filed a P1 bug: 'System responded in 12ms, is this expected or did it skip the database?' No bro, the code is just fast. Not everything needs to take 5 business days like your test runs.",
            "When DigiLocker or UIDAI goes down, colleagues immediately ping Slack: 'Is DigiLocker down?'. No bhai, government servers just went out to have Parle-G with chai.",
            "If your daily Scrum standup takes longer than 15 minutes, you're not practicing Agile — you're hosting an unpaid group therapy session for developers who don't know how to write an SQL join.",
            "Yes, I use Java. No, it doesn't consume 64GB of RAM. It's Java 25 with Virtual Threads — your single-threaded Node.js server is hyperventilating inside its single-core cage.",
            "Why spend 6 months in quarterly roadmapping workshops when you can build, test, and ship a UIDAI-compliant OVSE engine in 7 calendar days flat?",
            "Never deploy on a Friday evening... unless you're Akshat, you wrote 98% unit test coverage, and you have a high-stakes foosball rematch scheduled for Saturday morning."
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
        'merck-foosball': {
            cmd: 'ask --topic "merck-internship-exit-interview"',
            text: `Merck is a 350-year-old German healthcare conglomerate. I loved their engineering discipline — they taught me 98% JUnit test coverage. But here was the problem: I would finish my entire sprint's Jira tickets by Tuesday lunch.\n\nThe rest of the week? Undisputed champion of office foosball and master of office hide-and-seek (luka chhipi) behind the cold-aisle server racks. During my exit interview, HR politely told me this wasn't an Olympic training camp for table soccer. Fair enough. Best 1-year internship of my life.`,
            tag: 'CONFESSION',
            color: 'text-rose-400'
        },
        'zero-staging': {
            cmd: 'ask --topic "digitap-zero-staging-policy"',
            text: `At Digitap, third-party bank partners and UIDAI/eMudhra vendors have notoriously unstable or non-existent sandbox environments. In FinTech, mock servers lie to you; live banks tell you the brutal truth at 2:00 AM.\n\nWe architect for zero-downtime with distributed locks, idempotent retries, strict validation at the outer gateway boundary, and in-memory fallback. If you survive production here, everywhere else feels like a walk in Cubbon Park.`,
            tag: 'FINTECH-REALITY',
            color: 'text-amber-400'
        },
        'purge-engine': {
            cmd: 'ask --topic "aws-s3-throttle-2500-tps"',
            text: `We had legacy tables accumulating millions of mandate and DigiLocker rows that needed cleanup. Normal DELETE queries with massive OFFSETs lock rows, bloat the InnoDB redo log, and bring live customer APIs to their knees.\n\nI built an asynchronous chunked purge engine pumping at 2,500 records/sec. It was so aggressive that AWS S3 literally returned 'SlowDown: 503 Service Unavailable' because we saturated their prefix request limit! We had to introduce exponential jitter backoffs just so Amazon could catch up with my JVM.`,
            tag: 'PURGE-ENGINE',
            color: 'text-purple-400'
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
                    text: 'Available Commands:\n- ask [topic]: virtual-threads, digilocker, merck, staging, purge\n- projects: View summary of flagship war stories\n- metrics: View 150 TPS and 2,500 TPS production numbers\n- roast: Get a fresh reality check from Akshat\n- clear: Clear terminal output screen'
                });
            } else if (val === 'projects') {
                streamResponse('projects --list', {
                    tag: 'WAR-STORIES',
                    color: 'text-emerald-400',
                    text: '1. OKYC Aadhaar Pipeline (2L-3L daily successes, sub-40ms verification)\n2. Digitap eSign Gateway v2 (Java 25, Virtual Threads, In-Memory PDF Merge)\n3. DigiLocker Revamp & DB Civil War (4 repos -> 1, 90k/day success)\n4. VKYC v2 & Video-PD (Solo security, sub-3s analytics, 0 deadlocks)\n5. eNACH Mandate Engine (Kotak & Yes Bank auto-clearing, 0 Excel)\n6. Clickwrap Digital Contract Rail (Instant legal consent, SHA-256 audit)\n7. OVSE Aadhaar XML Verification (7-day greenfield delivery, 99% tests)'
                });
            } else if (val === 'metrics') {
                streamResponse('system --metrics', {
                    tag: 'STATS',
                    color: 'text-sky-400',
                    text: '- 4 Enterprise Products Architected Solo From Scratch\n- 250,000+ Daily OKYC Successful Verifications\n- 90,000 Daily DigiLocker Successful Transactions (Scaled from 28k)\n- 150 TPS Sustained Database Migration Throughput\n- 2,500 TPS Asynchronous Table Purge Engine\n- 7 Days Zero-to-Prod Turnaround on UIDAI OVSE\n- 0 Production Bugs on Revamp Go-Live'
                });
            } else if (val === 'roast') {
                const roasts = window.PORTFOLIO_ROASTS || ["Frontend devs spend 3 days picking a CSS framework. I migrate 200k daily transactions while drinking chai."];
                const r = roasts[Math.floor(Math.random() * roasts.length)];
                streamResponse('roast --target dev', {
                    tag: 'SAVAGE',
                    color: 'text-rose-400',
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
        showToast("⚡ GOD MODE ACTIVATED", "Root access granted to Akshat's 2,500 TPS Purge Engine & Merck Foosball Table!");
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
   16. Interactive System Architecture Visualizer (Live Pipeline Simulator)
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
                    // Remove active from all, activate current
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
⚡ Daily Surge Scale:    90,000 Tx/Day (Scaled from 28k)
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



