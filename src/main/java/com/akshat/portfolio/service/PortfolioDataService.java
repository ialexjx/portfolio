package com.akshat.portfolio.service;

import com.akshat.portfolio.model.Award;
import com.akshat.portfolio.model.Experience;
import com.akshat.portfolio.model.Project;
import com.akshat.portfolio.model.SkillCategory;
import com.akshat.portfolio.model.StatItem;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PortfolioDataService {

    public List<StatItem> getStats() {
        return List.of(
                StatItem.builder()
                        .value("4 Solo")
                        .label("Products Built From Scratch")
                        .subtext("Architected and delivered 4 mission-critical enterprise systems end-to-end to production.")
                        .icon("layers")
                        .build(),
                StatItem.builder()
                        .value("250k+ / Day")
                        .label("OKYC Daily Success Rate")
                        .subtext("High-throughput verification engine processing 2 to 3 Lakh daily successful Aadhaar validations.")
                        .icon("shield-check")
                        .build(),
                StatItem.builder()
                        .value("90k / Day")
                        .label("DigiLocker Daily Success Surge")
                        .subtext("Scaled production success count from 25k-28k up to 85k-90k daily successful transactions post-revamp.")
                        .icon("trending-up")
                        .build(),
                StatItem.builder()
                        .value("150 TPS")
                        .label("Peak DB Migration Speed")
                        .subtext("High-throughput batch framework migrating millions of records with multi-threading & zero downtime.")
                        .icon("zap")
                        .build(),
                StatItem.builder()
                        .value("2,500 TPS")
                        .label("High-Velocity Purge Engine")
                        .subtext("Asynchronous table purging executing at 2,500 records/sec without locking tables or degrading live APIs.")
                        .icon("cpu")
                        .build(),
                StatItem.builder()
                        .value("100%")
                        .label("Agent Bottlenecks Eliminated")
                        .subtext("Overhauled concurrency allocation logic for VKYC & Video-PD (BharatPe & Mpokket).")
                        .icon("check-circle")
                        .build()
        );
    }

    public List<Project> getProjects() {
        return List.of(
                Project.builder()
                        .id("esign-v2")
                        .title("Digitap eSign Gateway (v2)")
                        .tag("ENTERPRISE FINTECH REVAMP")
                        .subtitle("Ground-Up Architectural Re-Engineering of Digital Contract Execution")
                        .icon("file-signature")
                        .statusBadge("BUILT FROM SCRATCH")
                        .savageQuote("\"The legacy eSign was an archaic Core Java relic: zero multi-signing, rigid templates for every minor change, zero user journey logging, and it didn't even validate PDFs at upload — the flow would literally crash AFTER the user started signing when it realized the PDF had fewer pages than the template. I threw the whole thing out and rebuilt it from scratch.\"")
                        .problemStatement("The legacy system was a single-signer-only Core Java monolith with zero multi-signing (no Parallel, no Sequential). It forced rigid template dependencies with zero support for dynamic manual coordinates. The database schema was horribly designed with zero user journey tracking or drop-off observability. Worse, it lacked upload-time PDF validation — users would initiate a signing journey only to have the system blow up mid-flow upon discovering the uploaded PDF had fewer pages than required.")
                        .solutionAndImpact("Re-engineered the entire eSign gateway from the ground up on Spring Boot, Java 25 & Virtual Threads. Delivered native Multi-Signer orchestration (Parallel & Sequential with strict distributed state locking), dynamic runtime (x,y) coordinate mapping with global page offsets, pre-flight upload-time PDF validation, comprehensive user journey audit persistence, a Single Aadhaar OTP Multi-Stamp engine, Redis distributed locking ('SET NX EX 30s'), and sub-50ms in-memory callback processing.")
                        .problemBullets(List.of(
                                "Single-Signer Monolith: Rigid legacy core Java flow with zero support for multi-party parallel or sequential signing.",
                                "Hardcoded Templates: Required static template creation for every layout; zero runtime manual coordinate mapping.",
                                "Zero PDF Upload Validation: Malformed or short PDFs caused crashes mid-flow after the user started signing.",
                                "Blind Operations & Broken DB: Zero user step telemetry or drop-off tracking; unindexed legacy database."
                        ))
                        .solutionBullets(List.of(
                                "Parallel & Sequential Signers: Multi-signer state machine orchestrated via Spring Boot & Redis distributed locks.",
                                "Runtime Dynamic Coordinates: Place signatures anywhere on the fly without rigid template dependencies.",
                                "Pre-Flight PDFBox 3.x Validation: In-memory page count checks; invalid uploads rejected before flow starts.",
                                "Single Aadhaar OTP Multi-Stamp: One OTP stamps all pages simultaneously in-memory via Virtual Threads.",
                                "Sub-50ms Fast-Track Callbacks: In-memory Base64 decoding directly from TSP callbacks, shaving 500ms latency."
                        ))
                        .techStack(List.of("Java 25 (Amazon Corretto)", "Spring Boot", "Redis Distributed Lock", "Apache PDFBox 3.0.8", "Virtual Threads", "MySQL 8.0", "Pre-Flight PDF Validator", "RSA JWT"))
                        .architectureHighlights(List.of(
                                "Multi-Signer Orchestration: Built ground-up support for SINGLE, SEQUENTIAL (with state-enforced sequential locks), and PARALLEL multi-party signing.",
                                "Dynamic Manual Coordinates: Runtime (x,y) coordinate positioning with global page mapping across multiple files, eliminating rigid template lock-in.",
                                "Pre-Flight PDF Upload Validation: Zero mid-flow crashes — strictly validates page counts, coordinate boundaries, file dimensions, and corruption BEFORE minting signing sessions.",
                                "End-to-End Journey Observability: Redesigned the entire database schema to capture granular transaction lifecycles, user drop-offs, OTP submission attempts, and webhook audit trails.",
                                "Single Aadhaar OTP Multi-Stamp: Signers execute all signature stamps across multiple ingested PDFs and pages in one seamless Aadhaar OTP session.",
                                "Sub-50ms Fast-Track Callbacks: In-memory Base64 decoding of signed PDFs directly from TSP callbacks, shaving 500ms latency without disk writes.",
                                "Cluster-Safe Distributed Lock: Redis 'SET NX EX 30s' synchronizes vendor token refresh across all pods, preventing eMudhra rate-limiting and DDoS storms."
                        ))
                        .metrics(Map.of(
                                "Signing Modes", "Single, Sequential, Parallel",
                                "PDF Validation", "100% Pre-Flight at Upload",
                                "Callback Latency", "< 50ms Direct In-Memory",
                                "Architecture", "100% Built From Scratch"
                        ))
                        .problemHeading("The Legacy Horror (Before Revamp)")
                        .solutionHeading("The Ground-Up Architecture (What I Built)")
                        .build(),

                Project.builder()
                        .id("digilocker-revamp")
                        .title("DigiLocker Platform Revamp & The DB Civil War")
                        .tag("ENTERPRISE DISTRIBUTED SYSTEMS")
                        .subtitle("Ground-Up Spring Boot Re-Architecture, 4-Repo Consolidation & S3-Throttling Purge Engine")
                        .icon("database")
                        .statusBadge("BUILT FROM SCRATCH")
                        .savageQuote("\"The legacy DigiLocker was splintered across 4 repos, took 4 chained SNS hops just to fire 1 client webhook, and downloaded files sequentially like it was 1998 — taking 30+ seconds per user. You had to log into production AWS and search across 4 separate CloudWatch groups just to see if a user dropped off. I rebuilt the entire platform in Spring Boot with Virtual Threads, slashed journey latency to 7-10s, and engineered a 2,500 TPS purge engine so fast that AWS S3 literally told me 'Slow Down'.\"")
                        .problemStatement("The legacy DigiLocker was an operational nightmare: splintered across 4 fragmented repositories, requiring 4 chained AWS SNS hops just to trigger a single client webhook. It had zero user tracking — developers had to log into AWS production and manually search across 4 different CloudWatch log groups just to diagnose basic issues. There was zero visibility into user consent, approved files, or drop-offs. When the upstream DigiLocker source went down, the team was completely blind. To make matters worse, files were downloaded sequentially one-by-one (causing 30+ second user wait times), enterprise configs did not exist, and failed transactions were never marked as FAILED.")
                        .solutionAndImpact("Re-architected and rebuilt the entire platform from scratch in Spring Boot. Consolidated 4 repos into a single modular codebase with dynamic enterprise configs (EID support, client fallback, and runtime URL overrides). Built a strict state machine with complete DB-level journey logging — developers never need to touch AWS CloudWatch again. Implemented upstream DigiLocker API logging to capture raw error payloads during source outages. Slashed user journey latency from 30s down to 7-10s using Java Virtual Threads for concurrent multi-file downloads. Engineered a legendary 2,500 TPS purge engine (so fast it triggered S3 'SlowDown' rate limits), and scaled production success count from 28k to 90k daily successful transactions with zero bugs.")
                        .problemBullets(List.of(
                                "4 Fragmented Repositories: Codebase splintered across 4 repos; minor changes required 4 separate deployments.",
                                "4 Chained SNS Topics: A single client webhook had to navigate 4 SNS hops and 4 CloudWatch groups.",
                                "30-Second Sequential Downloads: Files downloaded one-by-one sequentially; painful 30s user completion time.",
                                "Zero Upstream Observability: No tracking of DigiLocker downtime, user consent, or drop-off points."
                        ))
                        .solutionBullets(List.of(
                                "1 Consolidated Spring Boot Repo: Eliminated 3 repos and replaced 4 chained SNS hops with direct event pipelines.",
                                "Virtual Threads Parallel Downloads: Slashed end-to-end journey latency from 30s down to 7–10 seconds.",
                                "100% DB Journey Observability: Logged every user step, consent event, and upstream DigiLocker response in DB.",
                                "150 TPS Migration & 2,500 TPS Purge: High-speed multi-threaded DB migration and AWS S3 purge engine.",
                                "Scaled Success Count to 90k/Day: Boosted daily successful transactions from 25k–28k to 85k–90k."
                        ))
                        .techStack(List.of("Spring Boot", "Java Virtual Threads", "Parallel S3 Downloader", "Multi-DB Boundary Routing", "2,500 TPS Purge Engine", "150 TPS Batch Migration", "Observability DB Layer", "Dynamic EID Configs"))
                        .architectureHighlights(List.of(
                                "Parallel Multi-File Downloads via Virtual Threads: Replaced sequential file fetching with concurrent Java Virtual Threads, slashing end-to-end journey latency from 30s+ down to 7-10s.",
                                "God-Level 2,500 TPS Purge Engine: Asynchronous bulk cleanup engine running at 2,500 records/sec — so aggressive that AWS S3 returned '503 SlowDown' throttling during bulk object deletions.",
                                "Zero CloudWatch Debugging (100% DB Observability): Every user interaction, document consent metadata, drop-off point, and webhook payload is persisted in DB tables. No AWS prod logins needed.",
                                "Upstream Source API Traceability: Logs every external DigiLocker request and raw error payload, immediately attributing whether downtime originates from DigiLocker or internally.",
                                "Consolidated Architecture (4 Repos ➔ 1 System): Replaced 4 chained SNS hops with direct event dispatching, cutting out unnecessary cloud hops and network latency.",
                                "Dynamic Enterprise Configs & URL Overrides: Built flexible tenant configuration supporting custom EIDs, client fallback behaviors, and runtime config overrides during URL minting.",
                                "Dual-DB Pagination Engine ('Civil War Solution'): Boundary-based routing dynamically querying both legacy and new databases with seamless unified pagination.",
                                "Production Success Count Surge: Scaled daily throughput from 25k-28k up to 85k-90k daily successful transactions with zero client-reported issues on rollout."
                        ))
                        .metrics(Map.of(
                                "Daily Success Surge", "28k ➔ 90k successful/day",
                                "Flow Latency", "30s ➔ 7-10s (Virtual Threads)",
                                "Purge Velocity", "2,500 TPS (S3 Throttling)",
                                "Observability", "100% DB Logged (Zero CloudWatch)"
                        ))
                        .problemHeading("The Legacy Horror (Before Revamp)")
                        .solutionHeading("The Ground-Up Architecture (What I Built)")
                        .build(),

                Project.builder()
                        .id("ovse-aadhaar")
                        .title("OVSE: UIDAI Aadhaar Verification")
                        .tag("GREENFIELD ARCHITECTURE")
                        .subtitle("Enterprise Offline Verification Seeking Entity Engine in 7 Days")
                        .icon("shield")
                        .statusBadge("7-DAY SPRINT • 99% TEST COVERAGE")
                        .savageQuote("\"Corporate managers take 2 weeks to schedule an alignment meeting to approve an agenda. I designed, built, and shipped a UIDAI-compliant OVSE system with MySQL and 99% unit test coverage in 7 days flat.\"")
                        .problemStatement("Sudden regulatory mandates and critical enterprise client needs demanded an immediate, standalone Offline Verification Seeking Entity (OVSE) platform capable of paperless Aadhaar verification directly with UIDAI specifications. Zero legacy code to rely on, zero room for delivery delays, and zero tolerance for security loopholes.")
                        .solutionAndImpact("Engineered, tested, and deployed an enterprise-grade OVSE platform from absolute scratch in just 7 calendar days. Built with Spring Boot and MySQL, featuring cryptographic XML digital signature verification, secure QR parsing, and strict UIDAI regulatory compliance — backed by an extraordinary 99% unit test code coverage to ensure zero production vulnerabilities.")
                        .problemBullets(List.of(
                                "Urgent Regulatory Mandate: Immediate compliance deadline with zero legacy codebase or documentation to rely on.",
                                "Complex Cryptographic Specs: Required strict verification of UIDAI public key digital signatures on offline XML.",
                                "Zero Room for Delay: Massive enterprise clients were waiting; delivery timeline was locked at 7 calendar days flat."
                        ))
                        .solutionBullets(List.of(
                                "Greenfield Delivery in 7 Days: Designed MySQL schema, built Spring Boot APIs, and shipped to prod in 7 days flat.",
                                "99% Unit Test Code Coverage: Wrote rigorous JUnit 5 & Mockito test suites covering all cryptographic edge cases.",
                                "Cryptographic XML Verification: High-security public-key validation of UIDAI-signed paperless offline XML.",
                                "Defensive Error Handling: Gracefully handled malformed client payloads and edge-case Aadhaar formats."
                        ))
                        .techStack(List.of("Java", "Spring Boot", "MySQL", "UIDAI Offline Specs", "XML Digital Signatures", "JUnit 5 & Mockito (99% Coverage)", "REST APIs"))
                        .architectureHighlights(List.of(
                                "7-Day Greenfield Delivery: Designed architecture, engineered MySQL schema, built APIs, and shipped to production within 7 calendar days flat.",
                                "99% Unit Test Code Coverage: Wrote comprehensive JUnit & Mockito test suites covering all cryptographic edge cases, achieving 99% coverage during a rapid sprint.",
                                "Robust MySQL Data Architecture: Designed high-integrity relational schema handling transaction proofs, verification audits, and client session records.",
                                "UIDAI Cryptographic Verification: Strict public-key digital signature validation of UIDAI-signed paperless offline XML documents.",
                                "Defensive Error Attribution: Handled malformed client payloads and edge-case Aadhaar formats gracefully."
                        ))
                        .metrics(Map.of(
                                "Turnaround Time", "7 Calendar Days Flat",
                                "Code Coverage", "99% Unit Tests Passing",
                                "Database", "MySQL Production Schema",
                                "Compliance", "100% UIDAI Specs Compliant"
                        ))
                        .problemHeading("The Urgent Regulatory Mandate (The 7-Day Challenge)")
                        .solutionHeading("The Greenfield Architecture (Shipped in 7 Days with 99% Test Coverage)")
                        .build(),

                Project.builder()
                        .id("vkyc-v2")
                        .title("VKYC V2 (Platform Revamp & Analytics Engine)")
                        .tag("ENTERPRISE SECURITY & ANALYTICS")
                        .subtitle("End-to-End Security Architecture (Agent/Admin/Lead/QA), Sub-3s Month-Wide Analytics & Zero-Friction DB Migration")
                        .icon("video")
                        .statusBadge("BUILT FROM SCRATCH ALONE")
                        .savageQuote("\"V1 was collapsing under agent deadlocks, and clients were completely blind to agent productivity. I engineered V2's complete Spring Security for all 4 roles, built an analytics engine that crunches an entire month in 2-3 seconds, and gave clients the data proof they needed to fire slacking agents and boost their revenue.\"")
                        .problemStatement("Legacy VKYC V1 suffered from crippling agent allocation deadlocks during peak concurrency (especially with BharatPe and Mpokket), zero operational visibility into whether agents were actually working or slacking off, and painfully slow or crashing analytics where pulling monthly reports was an absolute nightmare. Furthermore, transitioning call centers to V2 risked operational chaos and thousands of support tickets if hundreds of active agents were forced to reset credentials.")
                        .solutionAndImpact("Single-handedly engineered the foundational core of VKYC V2: Built the complete Spring Security authentication and authorization framework across 4 distinct operational roles (Agent, Admin, Lead, QA) handling secure login/logout, dynamic agent status updates (Available/Busy/Break), and real-time session mute/unmute call controls. Developed the high-speed analytics engine entirely from scratch, aggregating full-month data (both hourly and daily breakdowns) in just 2 to 3 seconds flat, resolving 100% of legacy client tickets. This deep operational transparency directly empowered clients to identify and purge unproductive agents, immediately lifting their bottom-line revenue. Prior to go-live, authored an automated V1-to-V2 database migration script that transferred all agent accounts while preserving their exact password hashes for a 100% seamless cutover with zero password resets. Previously in V1, also devised the concurrency allocation logic that eliminated 100% of agent assignment deadlocks.")
                        .problemBullets(List.of(
                                "V1 Queue Deadlocks: Severe agent allocation locks under peak concurrency for BharatPe and Mpokket.",
                                "Analytics Black Hole: Monthly reports either crashed or timed out; clients had zero visibility into agent slacking.",
                                "High Cutover Risk: Transitioning call centers to V2 risked operational chaos and thousands of password resets."
                        ))
                        .solutionBullets(List.of(
                                "Solo Spring Security & RBAC: Engineered auth, login/logout, status updates, and mute/unmute for Agent, Admin, Lead, QA.",
                                "Sub-3s Month-Wide Analytics: Built aggregation pipelines delivering 30+ days of hourly and daily data in 2-3 seconds.",
                                "Client ROI & Slacker Purge: Telemetry enabled enterprise clients to fire slacking agents and boost revenue.",
                                "Zero-Friction DB Migration: Pre-go-live script migrated all agent accounts with preserved password hashes (0 resets).",
                                "100% Agent Assignment Fix: Conceived the allocation algorithm that permanently eradicated V1 queue deadlocks."
                        ))
                        .techStack(List.of("Java", "Spring Boot", "Spring Security", "RBAC (Agent/Admin/Lead/QA)", "MySQL High-Performance Aggregations", "Password Hash Preservation", "Real-Time Telemetry", "Async Processing"))
                        .architectureHighlights(List.of(
                                "Full RBAC & Operational Security (Solo Engineered): Implemented end-to-end Spring Security authentication, role-based authorization, session management, dynamic status updates (Active/Break/Busy), and in-call mute/unmute state management across Agent, Admin, Lead, and QA modules.",
                                "Sub-3s Month-Wide Analytics Engine (Solo Engineered): Architected high-performance aggregation pipelines delivering hourly and daily data over 30+ days in just 2–3 seconds flat, resolving 100% of historical client reporting queries.",
                                "Measurable Client ROI & Workforce Optimization: Delivered granular agent productivity metrics that enabled enterprise clients to identify and replace slacking agents, dramatically improving call conversion rates and driving direct revenue uplift.",
                                "Zero-Friction DB Migration with Preserved Passwords: Wrote pre-go-live data migration scripts transitioning legacy V1 records to V2, keeping agent accounts and password hashes intact to ensure zero downtime and zero credential reset requests.",
                                "100% Agent Assignment Concurrency Fix: Conceived and engineered the allocation algorithm that permanently eradicated concurrency deadlocks for high-volume enterprise clients like BharatPe and Mpokket."
                        ))
                        .metrics(Map.of(
                                "Month-Wide Analytics", "2 - 3 Seconds (Hourly & Daily)",
                                "Auth & Security Matrix", "Agent, Admin, Lead, QA (Solo Built)",
                                "Legacy Assignment Deadlocks", "100% Eliminated (BharatPe/Mpokket)",
                                "Cutover Credential Friction", "0 Password Resets (Hashes Preserved)"
                        ))
                        .problemHeading("The V1 Deadlocks & Analytics Black Hole")
                        .solutionHeading("The V2 Ground-Up Architecture (Auth, Analytics & Flawless Migration)")
                        .build(),

                Project.builder()
                        .id("nach-npci")
                        .title("NACH & NPCI Gateway (Automated Mandate Engine)")
                        .tag("BANKING INTEGRATIONS & AUTOMATION")
                        .subtitle("End-to-End Physical & E-Mandate Automation, Multi-Bank Reconciliation & Zero-Manual Ops")
                        .icon("credit-card")
                        .statusBadge("PRODUCTION WARRIOR • ZERO MANUAL OPS")
                        .savageQuote("\"Operations was manually copy-pasting customer records into Excel, waiting 3 days for banks, and manually updating DB rows like it was 1995. I killed the Excel circus, automated the bank pipeline with crons and event-driven SNS parsers, and replaced fragile Firebase with raw JWT.\"")
                        .problemStatement("Legacy Physical Mandate processing was a manual nightmare: operations staff manually compiled mandate records into Excel sheets, shared them with sponsor banks, and waited 2-3 business days for bank response files. Once received, ops personnel literally had to eyeball the files line-by-line and manually update mandate statuses in the database. Furthermore, the platform lacked an automated cancellation flow, relied on bloated external Firebase dependencies that introduced latency and security vulnerabilities, and repeatedly broke whenever NPCI dropped unannounced circulars.")
                        .solutionAndImpact("Engineered an autonomous, event-driven banking pipeline that eliminated 100% of human intervention: Built scheduled cron microservices that communicate directly with sponsor banks (Kotak & Yes Bank) to dispatch physical mandate batches automatically. Architected an AWS SNS-triggered ingestion pipeline that listens for incoming bank response files, automatically parses complex bank clearing data, and updates mandate statuses in the DB in real-time. Designed and deployed an end-to-end Mandate Cancellation flow across both Kotak and Yes Bank. Completely stripped out Firebase and replaced it with hardened in-house JWT authentication, resolved critical VAPT audit vulnerabilities, and single-handedly resolved high-stakes live production incidents during rapid NPCI compliance and certificate cutovers.")
                        .problemBullets(List.of(
                                "The Manual Excel Circus: Operations manually compiled mandate records into Excel sheets and waited 2-3 days.",
                                "Manual DB Status Updates: Ops staff sat and manually verified bank response files line-by-line like scribes.",
                                "Missing Cancellation & Bloated Auth: Zero automated cancellation flow, and fragile external Firebase dependencies."
                        ))
                        .solutionBullets(List.of(
                                "Autonomous Bank Cron Pipelines: Automated batch mandate dispatch directly to Kotak & Yes Bank servers.",
                                "Event-Driven AWS SNS Parsers: Bank clearing files automatically ingested, parsed, and DB statuses updated with 0 human touch.",
                                "End-to-End Mandate Cancellation: Built full lifecycle cancellation flows across Kotak and Yes Bank.",
                                "Firebase Purged for Hardened JWT: Replaced Firebase with high-performance JWT tokens and fixed all VAPT issues.",
                                "Solo NPCI Production Firefighter: Handled breaking NPCI circulars and live certificate cutovers single-handedly."
                        ))
                        .techStack(List.of("Java", "Spring Boot", "AWS SNS & Crons", "Bank SFTP / XML Pipelines", "JWT Security", "Kotak & Yes Bank Gateways", "NPCI 008 Circulars", "VAPT Remediation"))
                        .architectureHighlights(List.of(
                                "Zero-Manual Physical Mandate Automation: Replaced manual Excel compilation and 3-day turnaround times with automated cron dispatchers communicating directly with sponsor banks.",
                                "Event-Driven SNS Response Pipeline: Integrated AWS SNS to automatically ingest bank clearance response files, parse status records, and update the database with zero human touch.",
                                "End-to-End Mandate Cancellation: Architected complete lifecycle cancellation flows across Kotak Bank and Yes Bank with real-time status verification.",
                                "Firebase Purged for Hardened JWT: Eliminated third-party Firebase auth dependencies, implementing high-performance JWT tokens and remediating all VAPT security vulnerabilities.",
                                "Autonomous NPCI Production Firefighter: Handled all breaking NPCI circular mandates and single-handedly resolved critical production incidents and live bank certificate rotations."
                        ))
                        .metrics(Map.of(
                                "Manual Ops Effort", "Reduced by 100% (Zero Excel)",
                                "File Reconciliation", "Instant via AWS SNS Crons",
                                "Sponsor Bank Gateways", "Kotak & Yes Bank (Live)",
                                "Auth & Security", "JWT Hardened (Firebase Purged)"
                        ))
                        .problemHeading("The Manual Excel Circus & 3-Day Bank Delays")
                        .solutionHeading("The Event-Driven Bank Automation Engine (Crons, SNS & JWT)")
                        .build(),

                Project.builder()
                        .id("platform-hardening")
                        .title("Live Risk Management & Production Firefighting")
                        .tag("ZERO STAGING SAFETY NET • DIRECT-TO-PROD")
                        .subtitle("Live Hotfixing, UIDAI Emergency Responses, 150 TPS Migrations & 2,500 TPS Purge Engines")
                        .icon("server")
                        .statusBadge("PROD ONLY • ZERO SAFETY NET")
                        .savageQuote("\"Other software engineers start sweating when staging goes down. My systems (eSign, E-NACH, OVSE) don't even HAVE a staging environment — we test, debug, and deploy directly in production. Whether it's UIDAI dropping breaking changes, running 150 TPS live DB migrations, or unleashing 2,500 TPS purge scripts, I keep production humming without dropping a single packet.\"")
                        .problemStatement("In mission-critical enterprise FinTech, systems like eSign, E-NACH, and OVSE operate with zero staging or sandbox fidelity — live UIDAI, NPCI, and bank endpoints only exist in Production. Whenever UIDAI arbitrarily pushed breaking schema updates or certificate shifts in OKYC, DigiLocker suffered upstream blackouts, or VKYC faced live concurrency hiccups, the blast radius threatened millions of ongoing customer onboardings. Meanwhile, core DKYC databases were handling 200,000+ live transactions daily with zero margin for downtime, strict VAPT security audits, and urgent banking encryption requirements.")
                        .solutionAndImpact("Stepped up as the primary production firefighter and risk manager across the entire company ecosystem: Handled live production hotfixing and triage for OKYC, DigiLocker, and VKYC whenever external government APIs or banking gateways broke. When UIDAI altered offline/online payload specs with zero notice, engineered and deployed immediate production parser adaptations to prevent client drop-offs. When DigiLocker faced upstream third-party downtime, built graceful fallback mechanisms to salvage transactions. Concurrently executed high-velocity production data lifecycle operations — including a zero-downtime live migration of 200,000+ daily API requests to a new RDS instance, a 150 TPS batch migration framework, and a blistering 2,500 TPS data purge engine directly against production storage with zero impact on customer transactions. Hardened the entire perimeter by eliminating 100% of VAPT vulnerabilities, rolling out enterprise MFA across all DKYC microservices, integrating bank-grade JWE (JSON Web Encryption) for clients like RevFin, and wiring Kaleyra SMS and URL Shortener across 8 microservices.")
                        .problemBullets(List.of(
                                "Zero Staging Safety Net: Systems like eSign, E-NACH, and OVSE have no staging; banking endpoints exist only in Prod.",
                                "Unannounced Upstream Outages: UIDAI schema breaking changes in OKYC and sudden DigiLocker blackouts.",
                                "High-Volume DB Strain: Core DKYC database groaning under 200k+ req/day, requiring urgent zero-downtime migration."
                        ))
                        .solutionBullets(List.of(
                                "Direct-to-Prod Emergency Triage: Hotfixed live UIDAI parsers and upstream outage fallbacks directly on production.",
                                "Zero-Downtime 200k+ Req/Day RDS Cutover: Migrated active production database traffic with 0.000s downtime.",
                                "High-Velocity Live Data Operations: Executed 150 TPS DB migrations and 2,500 TPS S3 purge engines on live prod.",
                                "Banking Cryptography & VAPT: Implemented JWE (JSON Web Encryption) for RevFin and enterprise MFA across 8 services."
                        ))
                        .techStack(List.of("Direct-to-Prod Live Hotfixing", "UIDAI / OKYC Rapid Adaptations", "Upstream Blackout Mitigation", "AWS RDS Live Cutover", "JWE Banking Encryption", "Enterprise MFA", "VAPT Remediation", "Kaleyra APIs"))
                        .architectureHighlights(List.of(
                                "Direct-to-Prod Engineering (No Staging): Operated mission-critical services (eSign, E-NACH, OVSE) where mock environments do not exist, executing live deployments, real-time testing, and emergency hotfixes directly on production.",
                                "Immediate UIDAI (OKYC) Emergency Hotfixes: Acted as first responder when UIDAI dropped unannounced XML/payload breaking changes, deploying live production patches in minutes to keep enterprise verifications running.",
                                "Upstream Blackout & Outage Mitigation: Engineered live client fallbacks and error attribution when upstream government dependencies (DigiLocker, UIDAI) experienced sudden outages or latency spikes.",
                                "High-Velocity Live Data Operations (150 TPS & 2,500 TPS): Executed zero-downtime RDS migration for 200k+ req/day, engineered 150 TPS live database migrations, and operated an ultra-fast 2,500 TPS purge engine without degrading production throughput.",
                                "Banking-Grade Cryptography & VAPT Remediation: Implemented JWE (JSON Web Encryption) end-to-end payloads for enterprise banking clients (RevFin), rolled out enterprise MFA across DKYC, and remediated 100% of VAPT audit vulnerabilities."
                        ))
                        .metrics(Map.of(
                                "Staging Environments", "0 (Direct-to-Prod Live Execution)",
                                "Live DB Traffic Migrated", "200,000+ Req/Day (150 TPS)",
                                "Purge Engine Velocity", "2,500 TPS (Production Safe)",
                                "VAPT & Security Rating", "100% Remediated & JWE Hardened"
                        ))
                        .problemHeading("The Zero-Safety-Net Reality (No Staging, Live Banking Endpoints)")
                        .solutionHeading("The Live Risk Mitigation & High-Velocity Data Operations")
                        .build()
        );
    }

    public List<Experience> getExperiences() {
        return List.of(
                Experience.builder()
                        .company("Digitap.AI")
                        .role("Senior Software Engineer (SSE)")
                        .location("Bengaluru, India")
                        .period("Aug 2023 – Present")
                        .awardBadge("⚡ PROMOTED TO SSE IN 2.5 YEARS")
                        .savageSummary("Fast-tracked to Senior Software Engineer in 2.5 years by architecting mission-critical FinTech distributed systems, high-speed migrations, and sub-50ms APIs.")
                        .technologies(List.of("Java 25", "Spring Boot", "MySQL", "Redis", "AWS (S3, EC2, CloudWatch)", "Apache PDFBox", "Virtual Threads", "Docker"))
                        .bulletPoints(List.of(
                                "Fast-tracked to Senior Software Engineer in just 2.5 years for high-velocity system delivery and zero-downtime architectural stability.",
                                "Architected and delivered 4 mission-critical enterprise products from scratch end-to-end as solo engineer.",
                                "Scaled OKYC (Offline KYC / Aadhaar XML) verification pipeline processing 200,000 – 300,000 daily successful transactions at sub-40ms latency.",
                                "Architected eSign Gateway v2 with Java 25 & Virtual Threads, introducing in-memory PDF merging and Single Aadhaar OTP Multi-Stamp capability.",
                                "Led end-to-end revamp of DigiLocker platform: unified 3 repositories into 1, created 150 TPS batch migration framework, 2,500 TPS purge engine, and scaled daily success count from 28k to 90k successful transactions with zero downtime.",
                                "Built VKYC V2 and Video-PD security & auth architecture from scratch; developed sub-3s month-wide analytics engine driving client revenue uplift, and migrated agent accounts with preserved password hashes.",
                                "Eliminated 100% of agent allocation bottlenecks for marquee enterprise clients like BharatPe and Mpokket.",
                                "Engineered UIDAI-compliant OVSE (Offline Verification Seeking Entity) Aadhaar app in just 7 days with 99% test coverage.",
                                "Automated physical & E-NACH mandate pipelines with Kotak & Yes Bank using crons and event-driven AWS SNS parsers, eliminating 100% manual Excel operations and replacing Firebase with JWT.",
                                "Engineered Clickwrap digital contract rail for instant legal consent execution with tamper-evident audit persistence."
                        ))
                        .build(),

                Experience.builder()
                        .company("Merck Group")
                        .role("Software Developer Trainee")
                        .location("Bengaluru, India")
                        .period("July 2022 – July 2023")
                        .awardBadge("⭐ 98% CODE COVERAGE CHAMPION")
                        .savageSummary("Learned enterprise software engineering the disciplined way — writing bulletproof APIs with relentless test coverage so bugs never see prod.")
                        .technologies(List.of("Java", "Spring Boot", "RESTful APIs", "JUnit 5", "Mockito", "Clean Architecture"))
                        .bulletPoints(List.of(
                                "Engineered RESTful APIs across core business modules using Java and Spring Boot, establishing robust Controller-Service-Repository boundaries.",
                                "Spearheaded automated unit and integration testing using JUnit and Mockito, achieving over 98% code coverage.",
                                "Reduced production bug escape rate by 6% through defensive coding and rigorous boundary condition testing."
                        ))
                        .build()
        );
    }

    public List<SkillCategory> getSkillCategories() {
        return List.of(
                SkillCategory.builder()
                        .categoryName("Core Backend & Architecture")
                        .icon("cpu")
                        .savageRoast("Java isn't slow. Your nested loops and N+1 queries are. Java 25 + Virtual Threads runs circles around trendy JS runtimes.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("Java 25 / Corretto").level("God Tier").badge("Virtual Threads").build(),
                                SkillCategory.SkillItem.builder().name("Spring Boot 3.x / 4.x").level("Battle Tested").badge("Core Framework").build(),
                                SkillCategory.SkillItem.builder().name("Spring Security & OAuth2").level("Bulletproof").badge("Multi-Chain").build(),
                                SkillCategory.SkillItem.builder().name("Microservices & REST APIs").level("Production Scale").badge("High TPS").build(),
                                SkillCategory.SkillItem.builder().name("Distributed Locking").level("Cluster-Safe").badge("Redis SET NX").build()
                        ))
                        .build(),

                SkillCategory.builder()
                        .categoryName("Databases & Data Pipelines")
                        .icon("database")
                        .savageRoast("If you don't know what an execution plan is, you're not writing SQL, you're just praying to the database gods.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("MySQL 8.0").level("Sub-Second").badge("ON DUPLICATE KEY").build(),
                                SkillCategory.SkillItem.builder().name("Dual-DB Boundary Routing").level("Architect").badge("Civil War Solver").build(),
                                SkillCategory.SkillItem.builder().name("Redis Caching & PubSub").level("Sub-Millisecond").badge("Token Engine").build(),
                                SkillCategory.SkillItem.builder().name("High-Throughput Migrations").level("45 TPS").badge("Zero Downtime").build(),
                                SkillCategory.SkillItem.builder().name("Spring Data JPA & Hibernate").level("Optimized").badge("Zero N+1").build()
                        ))
                        .build(),

                SkillCategory.builder()
                        .categoryName("FinTech Integrations & Compliance")
                        .icon("landmark")
                        .savageRoast("UIDAI circulars and NPCI updates wait for no man. You adapt in 24 hours or explain to leadership why payments broke.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("Aadhaar eSign & IT Act 2000").level("Expert").badge("eMudhra / CCA").build(),
                                SkillCategory.SkillItem.builder().name("DigiLocker Revamp").level("Lead Architect").badge("4 Core APIs").build(),
                                SkillCategory.SkillItem.builder().name("E-NACH & NPCI 008 Circular").level("Automated").badge("Kotak / Yes Bank").build(),
                                SkillCategory.SkillItem.builder().name("VKYC & Video-PD").level("Ground Up").badge("RBI Compliant").build(),
                                SkillCategory.SkillItem.builder().name("OVSE (Aadhaar Offline)").level("7-Day Sprint").badge("UIDAI Specs").build()
                        ))
                        .build(),

                SkillCategory.builder()
                        .categoryName("Cloud, DevOps & Tooling")
                        .icon("cloud")
                        .savageRoast("Localhost is a lie. If it doesn't survive in a multi-pod Kubernetes / AWS cluster under 10,000 RPM, it doesn't work.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("AWS (S3, RDS, EC2, CloudWatch)").level("Production").badge("Cloud Native").build(),
                                SkillCategory.SkillItem.builder().name("Docker & Containers").level("Streamlined").badge("DevOps").build(),
                                SkillCategory.SkillItem.builder().name("Apache PDFBox 3.x").level("In-Memory").badge("Zero Disk I/O").build(),
                                SkillCategory.SkillItem.builder().name("JUnit & Mockito").level("98% Coverage").badge("TDD").build(),
                                SkillCategory.SkillItem.builder().name("Git & CI/CD").level("Flawless").badge("Blue-Green").build()
                        ))
                        .build()
        );
    }

    public List<Award> getAwards() {
        return List.of(
                Award.builder()
                        .title("Fast-Tracked to Senior Software Engineer (SSE)")
                        .organization("Digitap.AI")
                        .year("2025")
                        .badge("⚡ PROMOTED IN 2.5 YEARS")
                        .icon("zap")
                        .highlightMetric("2.5 Yrs (Fast-Track Record)")
                        .savageReason("\"Built APIs, survived production, earned the promotion. Officially promoted from fixing other developers' bugs to being personally blamed for the entire architecture. Fast-tracked to Senior in 2.5 years because when you single-handedly keep mission-critical banking systems alive with zero staging safety net, leadership gives you the SSE badge just to make sure you keep answering Slack at midnight.\"")
                        .build(),

                Award.builder()
                        .title("Quarterly Excellence Award")
                        .organization("Digitap.AI")
                        .year("2026")
                        .badge("⭐ QUARTERLY EXCELLENCE (2026)")
                        .icon("star")
                        .highlightMetric("High-Velocity System Delivery")
                        .savageReason("\"Awarded for ruthless execution velocity — smashing 4 legacy repos into 1, killing manual Excel operations with event-driven bank SNS parsers, and delivering enterprise UIDAI compliance engines in 7 calendar days flat.\"")
                        .build(),

                Award.builder()
                        .title("Rising Star Award")
                        .organization("Digitap.AI")
                        .year("2024")
                        .badge("🏆 ANNUAL TOP TALENT (2024)")
                        .icon("award")
                        .highlightMetric("Top 1% Engineering Impact")
                        .savageReason("\"Conferred for stepping up to untangle the most undocumented, high-liability legacy dumpster fires across the company (DigiLocker, eSign, VKYC) and turning them into sub-second, multi-tenant Swiss watches without a single tearful post on LinkedIn.\"")
                        .build(),

                Award.builder()
                        .title("98%+ Unit Test Code Coverage Champion")
                        .organization("Merck Group")
                        .year("2022 – 2023")
                        .badge("🛡️ 98% TEST DISCIPLINE")
                        .icon("shield-check")
                        .highlightMetric("98%+ JUnit / Mockito Coverage")
                        .savageReason("\"Wrote unit and integration test suites so paranoid and defensive that bugs gave up and surrendered in local maven builds before they could ever dream of embarrassing us on production.\"")
                        .build()
        );
    }

    public List<String> getRoastQuotes() {
        return List.of(
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
        );
    }
}
