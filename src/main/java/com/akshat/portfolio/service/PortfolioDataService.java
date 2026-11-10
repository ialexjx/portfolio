package com.akshat.portfolio.service;

import com.akshat.portfolio.model.ArchitectureDecisionRecord;
import com.akshat.portfolio.model.Award;
import com.akshat.portfolio.model.Experience;
import com.akshat.portfolio.model.IncidentRca;
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
                        .value("2 Lakh / Day")
                        .label("DigiLocker Daily Success Surge")
                        .subtext("Orchestrated 12+ micro-APIs across 1.5M+ daily hits, scaling daily successful verifications from 30k–35k to 2 Lakh/day.")
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
                        .shortTitle("Digitap eSign Gateway")
                        .tabBadge("Single-OTP Multi-Stamp")
                        .tag("ENTERPRISE FINTECH REVAMP")
                        .subtitle("Ground-Up Architectural Re-Engineering of Digital Contract Execution")
                        .icon("file-signature")
                        .statusBadge("BUILT FROM SCRATCH")
                        .savageQuote("\"Legacy digital signing failed mid-transaction because validation was deferred until after Aadhaar OTP authentication. By shifting coordinate boundaries and document validation to an in-memory pre-flight stage and orchestrating multi-signers via Redis distributed locks, we eliminated 100% of mid-flow crashes and cut callback latency under 50ms.\"")
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
                        .problemHeading("The Legacy Bottlenecks (Before Revamp)")
                        .solutionHeading("The Ground-Up Architecture (What I Built)")
                        .build(),

                Project.builder()
                        .id("digilocker-revamp")
                        .title("DigiLocker Platform Revamp & S3 Purge Engine")
                        .shortTitle("DigiLocker Platform")
                        .tabBadge("1.5M Daily Ingress")
                        .tag("ENTERPRISE DISTRIBUTED SYSTEMS")
                        .subtitle("4-Repo Consolidation, Virtual Threads Parallel Ingestion & 2,500 TPS S3 Purge Engine")
                        .icon("database")
                        .statusBadge("BUILT FROM SCRATCH")
                        .savageQuote("\"Sustaining 1.5M+ daily hits across 12 micro-endpoints per journey requires zero network hops wasted. We consolidated 4 fragmented repositories into a single modular Spring Boot service, replaced chained SNS hops with direct event pipelines, and parallelized multi-file downloads with Virtual Threads — cutting latency from 30s to 7-10s.\"")
                        .problemStatement("The legacy DigiLocker was an operational nightmare: splintered across 4 fragmented repositories, requiring 4 chained AWS SNS hops just to trigger a single client webhook. It had zero user tracking — developers had to log into AWS production and manually search across 4 different CloudWatch log groups just to diagnose basic issues. There was zero visibility into user consent, approved files, or drop-offs. When the upstream DigiLocker source went down, the team was completely blind. To make matters worse, files were downloaded sequentially one-by-one (causing 30+ second user wait times), enterprise configs did not exist, and failed transactions were never marked as FAILED.")
                        .solutionAndImpact("Re-architected and rebuilt the entire platform from scratch in Spring Boot. Consolidated 4 repos into a single modular codebase with dynamic enterprise configs (EID support, client fallback, and runtime URL overrides). Built a strict state machine with complete DB-level journey logging — developers never need to touch AWS CloudWatch again. Implemented upstream DigiLocker API logging to capture raw error payloads during source outages. Slashed user journey latency from 30s down to 7-10s using Java Virtual Threads for concurrent multi-file downloads. Engineered a legendary 2,500 TPS purge engine (so fast it triggered S3 'SlowDown' rate limits), and scaled production throughput to 1.5M+ daily API hits across 12+ orchestrated endpoints per journey, scaling daily successful transactions from 30k–35k to 2 Lakh with zero bugs.")
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
                                "1.5M+ Daily API Hits & 2L Transactions: Orchestrated 12+ micro-APIs per journey, boosting daily success from 30k–35k to 2 Lakh."
                        ))
                        .techStack(List.of("Spring Boot", "Java Virtual Threads", "Parallel S3 Downloader", "Multi-DB Boundary Routing", "2,500 TPS Purge Engine", "150 TPS Batch Migration", "Observability DB Layer", "Dynamic EID Configs"))
                        .architectureHighlights(List.of(
                                "12-Step Chained API Orchestration: Seamlessly coordinated 7 public ingress endpoints and 6 upstream government micro-calls (token exchange, Aadhaar XML extraction, signed PDF streams) per journey, sustaining 1.5M+ daily API hits without thread starvation.",
                                "Parallel Multi-File Downloads via Virtual Threads: Replaced sequential file fetching with concurrent Java Virtual Threads, slashing end-to-end journey latency from 30s+ down to 7-10s.",
                                "High-Velocity 2,500 TPS Purge Engine: Asynchronous bulk cleanup engine running at 2,500 records/sec directly against live production storage without locking tables.",
                                "Zero CloudWatch Debugging (100% DB Observability): Every user interaction, document consent metadata, drop-off point, and webhook payload is persisted in DB tables. No AWS prod logins needed.",
                                "Upstream Source API Traceability: Logs every external DigiLocker request and raw error payload, immediately attributing whether downtime originates from DigiLocker or internally.",
                                "Consolidated Architecture (4 Repos ➔ 1 System): Replaced 4 chained SNS hops with direct event dispatching, cutting out unnecessary cloud hops and network latency.",
                                "Dynamic Enterprise Configs & URL Overrides: Built flexible tenant configuration supporting custom EIDs, client fallback behaviors, and runtime config overrides during URL minting.",
                                "Dual-DB Pagination Engine ('Civil War Solution'): Boundary-based routing dynamically querying both legacy and new databases with seamless unified pagination.",
                                "Production Success Count Surge: Scaled daily throughput from 30k–35k up to 2 Lakh daily successful transactions with zero client-reported issues on rollout."
                        ))
                        .metrics(Map.of(
                                "Daily Ingress Traffic", "1.5M+ Requests/Day",
                                "Daily Success Surge", "30k–35k ➔ 2 Lakh/day",
                                "Orchestration Depth", "12+ Micro-APIs / Tx",
                                "Flow Latency", "30s ➔ 7-10s (Virtual Threads)"
                        ))
                        .problemHeading("The Legacy Architectural Fractures")
                        .solutionHeading("The Ground-Up Architecture (What I Built)")
                        .build(),

                Project.builder()
                        .id("ovse-aadhaar")
                        .title("OVSE: UIDAI Aadhaar Verification")
                        .shortTitle("UIDAI OVSE Aadhaar")
                        .tabBadge("7-Day Greenfield Sprint")
                        .tag("MISSION CRITICAL CRYPTOGRAPHY")
                        .subtitle("Standalone Regulatory Compliance Engine Delivered in 7 Days with 99% Test Coverage")
                        .icon("shield")
                        .statusBadge("7-DAY SPRINT • 99% TEST COVERAGE")
                        .savageQuote("\"When sudden regulatory compliance demands an enterprise cryptographic engine with zero room for delivery delays or security loopholes, defensive coding and 99% test coverage are non-negotiable. Shipped to production in 7 calendar days flat.\"")
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
                        .problemHeading("The Urgent Regulatory Mandate")
                        .solutionHeading("The Greenfield Architecture (Shipped in 7 Days)")
                        .build(),

                Project.builder()
                        .id("vkyc-v2")
                        .title("VKYC V2 (Platform Revamp & Analytics Engine)")
                        .shortTitle("VKYC & Video-PD")
                        .tabBadge("Sub-3s Analytics & RBAC")
                        .tag("ENTERPRISE SECURITY & ANALYTICS")
                        .subtitle("End-to-End Security Architecture (Agent/Admin/Lead/QA), Sub-3s Month-Wide Analytics & Zero-Friction DB Migration")
                        .icon("video")
                        .statusBadge("SOLO ARCHITECTED")
                        .savageQuote("\"Queue deadlocks under peak onboarding concurrency cost FinTech platforms millions in abandoned conversions. Conceived the concurrency allocation algorithm that permanently eradicated deadlocks and built aggregation pipelines delivering 30+ days of hourly and daily metrics in 2-3 seconds.\"")
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
                                "Client ROI & Workforce Optimization: Granular agent productivity metrics enabled enterprise clients to identify bottlenecks.",
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
                        .problemHeading("The V1 Queue Deadlocks & Analytics Timeout")
                        .solutionHeading("The V2 Ground-Up Architecture (Auth, Analytics & Flawless Migration)")
                        .build(),

                Project.builder()
                        .id("nach-npci")
                        .title("NACH & NPCI Gateway (Automated Mandate Engine)")
                        .shortTitle("E-NACH Mandates")
                        .tabBadge("Zero-Excel Event Rail")
                        .tag("BANKING INTEGRATIONS & AUTOMATION")
                        .subtitle("End-to-End Physical & E-Mandate Automation, Multi-Bank Reconciliation & Zero-Manual Ops")
                        .icon("credit-card")
                        .statusBadge("PRODUCTION WARRIOR • ZERO MANUAL OPS")
                        .savageQuote("\"Manual spreadsheet handling in banking clearing is an operational risk. We replaced 3-day turnaround manual Excel compilation with automated cron dispatchers to Kotak and Yes Bank, and wired AWS SNS ingestion pipelines to reconcile clearing files in real time.\"")
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
                        .problemHeading("The Manual Spreadsheet Bottlenecks")
                        .solutionHeading("The Event-Driven Bank Automation Engine (Crons, SNS & JWT)")
                        .build(),

                Project.builder()
                        .id("platform-hardening")
                        .title("Live Risk Management & Production Firefighting")
                        .shortTitle("2,500 TPS Purge Engine")
                        .tabBadge("Zero-Downtime Migration")
                        .tag("ZERO STAGING SAFETY NET • DIRECT-TO-PROD")
                        .subtitle("Live Hotfixing, UIDAI Emergency Responses, 150 TPS Migrations & 2,500 TPS Purge Engines")
                        .icon("server")
                        .statusBadge("PROD ONLY • ZERO SAFETY NET")
                        .savageQuote("\"In mission-critical enterprise FinTech, systems like eSign, E-NACH, and OVSE have zero staging fidelity because live UIDAI and banking APIs exist only in Production. Operating under zero safety nets demands disciplined defensive coding, live DB boundary routing, and zero dropped packets during cutovers.\"")
                        .problemStatement("In mission-critical enterprise FinTech, systems like eSign, E-NACH, and OVSE operate with zero staging or sandbox fidelity — live UIDAI, NPCI, and bank endpoints only exist in Production. Whenever UIDAI arbitrarily pushed breaking schema updates or certificate shifts in OKYC, DigiLocker suffered upstream blackouts, or VKYC faced live concurrency hiccups, the blast radius threatened millions of ongoing customer onboardings. Meanwhile, core DKYC databases were handling 200,000+ live transactions daily with zero margin for downtime, strict VAPT security audits, and urgent banking encryption requirements.")
                        .solutionAndImpact("Stepped up as the primary production firefighter and risk manager across the entire company ecosystem: Handled live production hotfixing and triage for OKYC, DigiLocker, and VKYC whenever external government APIs or banking gateways broke. When UIDAI altered offline/online payload specs with zero notice, engineered and deployed immediate production parser adaptations to prevent client drop-offs. When DigiLocker faced upstream third-party downtime, built graceful fallback mechanisms to salvage transactions. Concurrently executed high-velocity production data lifecycle operations — including a zero-downtime live migration of 200,000+ daily API requests to a new RDS instance, a 150 TPS batch migration framework, and a blistering 2,500 TPS data purge engine directly against production storage with zero impact on customer transactions. Hardened the entire perimeter by eliminating 100% of VAPT vulnerabilities, rolling out enterprise MFA across all DKYC microservices, integrating bank-grade JWE (JSON Web Encryption) for clients like RevFin, and wiring Kaleyra SMS and distributed services across 8 microservices.")
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
                        .problemHeading("The Zero-Safety-Net Reality (Live Banking Endpoints)")
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
                                "Led end-to-end revamp of DigiLocker platform: unified 3 repositories into 1, orchestrated 12+ micro-APIs across 1.5M+ daily API requests, created 150 TPS batch migration framework, 2,500 TPS purge engine, and scaled daily success count from 30k–35k to 2 Lakh successful transactions with zero downtime.",
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
                        .savageRoast("Java 25 with Virtual Threads achieves 100,000+ concurrent requests on a single JVM without the reactive complexity, callback hell, or debugging opacity of WebFlux.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("Java 25 / Corretto").level("Production Expert").badge("Virtual Threads").build(),
                                SkillCategory.SkillItem.builder().name("Spring Boot 3.x / 4.x").level("Battle Tested").badge("Core Framework").build(),
                                SkillCategory.SkillItem.builder().name("Spring Security & OAuth2").level("Multi-Chain").badge("Zero-Trust").build(),
                                SkillCategory.SkillItem.builder().name("Microservices & High TPS APIs").level("10k+ TPS Scale").badge("Structured Concurrency").build(),
                                SkillCategory.SkillItem.builder().name("Distributed Locking").level("Cluster-Safe").badge("Redis Mutex SET NX").build()
                        ))
                        .build(),

                SkillCategory.builder()
                        .categoryName("Databases & Data Pipelines")
                        .icon("database")
                        .savageRoast("High-throughput database engineering demands rigorous execution plan profiling. Covering indexes, cursor pagination, and bounded lock windows keep MySQL latency sub-second under 1,000+ TPS.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("MySQL 8.0").level("Sub-Millisecond").badge("Covering Indexes").build(),
                                SkillCategory.SkillItem.builder().name("Dual-DB Boundary Routing").level("Zero Downtime").badge("Dynamic Sharding").build(),
                                SkillCategory.SkillItem.builder().name("Redis Caching & PubSub").level("Sub-Millisecond").badge("Token Engine").build(),
                                SkillCategory.SkillItem.builder().name("High-Throughput Migrations").level("150 TPS Sustained").badge("Cursor Backfills").build(),
                                SkillCategory.SkillItem.builder().name("Spring Data JPA & Hibernate").level("Optimized JPA").badge("Zero N+1 Queries").build()
                        ))
                        .build(),

                SkillCategory.builder()
                        .categoryName("FinTech Integrations & Compliance")
                        .icon("landmark")
                        .savageRoast("National identity and banking rails (UIDAI, DigiLocker, NPCI) enforce zero-tolerance compliance. Defensive in-memory validation and strict idempotency ensure zero duplicate financial liability.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("Aadhaar eSign & IT Act 2000").level("CCA / eMudhra").badge("Single OTP Multi-Stamp").build(),
                                SkillCategory.SkillItem.builder().name("DigiLocker Platform Revamp").level("Lead Architect").badge("1.5M Daily Ingress").build(),
                                SkillCategory.SkillItem.builder().name("E-NACH & NPCI Mandate Rails").level("Event-Driven").badge("Kotak / Yes Bank").build(),
                                SkillCategory.SkillItem.builder().name("VKYC & Video-PD Security").level("RBI Compliant").badge("WebRTC & Sub-3s Analytics").build(),
                                SkillCategory.SkillItem.builder().name("OVSE (Aadhaar Offline XML)").level("UIDAI Compliant").badge("7-Day Production Sprint").build()
                        ))
                        .build(),

                SkillCategory.builder()
                        .categoryName("Cloud, DevOps & Tooling")
                        .icon("cloud")
                        .savageRoast("Architecture must withstand real-world network anomalies: zero-copy in-memory streaming, containerized health probes, and partition-level bulk operations ensure services remain resilient under sudden traffic surges.")
                        .skills(List.of(
                                SkillCategory.SkillItem.builder().name("AWS (S3, RDS, EC2, CloudWatch)").level("Cloud Native").badge("Multi-AZ Distributed").build(),
                                SkillCategory.SkillItem.builder().name("Docker & Containerization").level("Production").badge("OCI Containers").build(),
                                SkillCategory.SkillItem.builder().name("Apache PDFBox 3.x").level("Zero Disk I/O").badge("Direct Memory Streaming").build(),
                                SkillCategory.SkillItem.builder().name("JUnit 5 & Mockito").level("98% Coverage").badge("TDD Defense").build(),
                                SkillCategory.SkillItem.builder().name("Git, Blue-Green & CI/CD").level("Automated").badge("Zero-Downtime Deploy").build()
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
                        .savageReason("\"Promoted to Senior Software Engineer in just 2.5 years for taking complete end-to-end technical ownership of mission-critical FinTech products, engineering high-throughput migration engines, and maintaining zero-downtime operational stability across India's largest banking rails.\"")
                        .build(),

                Award.builder()
                        .title("Quarterly Excellence Award")
                        .organization("Digitap.AI")
                        .year("2026")
                        .badge("⭐ QUARTERLY EXCELLENCE (2026)")
                        .icon("star")
                        .highlightMetric("High-Velocity System Delivery")
                        .savageReason("\"Awarded for exceptional execution velocity and architectural leadership — consolidating 4 disparate legacy repositories into a unified DigiLocker platform, building a 2,500 TPS purge engine, and deploying UIDAI-compliant OVSE in 7 calendar days.\"")
                        .build(),

                Award.builder()
                        .title("Rising Star Award")
                        .organization("Digitap.AI")
                        .year("2024")
                        .badge("🏆 TOP 1% IMPACT (2024)")
                        .icon("award")
                        .highlightMetric("Top 1% Engineering Impact")
                        .savageReason("\"Conferred for untangling high-liability legacy architecture across eSign, DigiLocker, and VKYC, reducing latency from 30s to sub-50ms and completely eliminating agent allocation bottlenecks for marquee enterprise clients like BharatPe and Mpokket.\"")
                        .build(),

                Award.builder()
                        .title("98%+ Unit Test Code Coverage Champion")
                        .organization("Merck Group")
                        .year("2022 – 2023")
                        .badge("🛡️ 98% TEST COVERAGE")
                        .icon("shield-check")
                        .highlightMetric("98%+ JUnit / Mockito Coverage")
                        .savageReason("\"Established rigorous unit and integration test standards at Merck Group, writing defensive test suites with JUnit and Mockito to achieve 98%+ code coverage and eliminate production regression escapes.\"")
                        .build()
        );
    }

    public List<String> getRoastQuotes() {
        return List.of(
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
        );
    }

    public List<ArchitectureDecisionRecord> getArchitectureDecisionRecords() {
        return List.of(
                ArchitectureDecisionRecord.builder()
                        .id("ADR-001")
                        .title("Synchronous Virtual Threads (Java 25) Over Reactive WebFlux")
                        .status("ACCEPTED & PRODUCTION VERIFIED")
                        .date("Q1 2024")
                        .context("FinTech core gateways handle thousands of concurrent transactions while waiting on blocking downstream TSP APIs (UIDAI, eMudhra, DigiLocker). Spring WebFlux (Project Reactor) previously introduced significant cognitive overhead, fragmented stack traces during P0 incidents, and thread-local tracing context loss.")
                        .decision("Standardize on Java 25 Virtual Threads ('Executors.newVirtualThreadPerTaskExecutor()') with standard synchronous Spring Boot 3 blocking APIs instead of reactive WebFlux.")
                        .consequences("Completely eliminated callback hell and reactive operator debugging. Synchronous stack traces point to the exact line of failure during P0 triage. Memory footprint remained ultra-lean (~32MB baseline heap) with 4,000+ concurrent requests.")
                        .tags(List.of("Java 25", "Virtual Threads", "Structured Concurrency", "Throughput"))
                        .badgeColor("sky")
                        .build(),

                ArchitectureDecisionRecord.builder()
                        .id("ADR-002")
                        .title("Distributed Redis Mutex ('SET NX EX 30s') vs MySQL Row Locking")
                        .status("ACCEPTED & PRODUCTION VERIFIED")
                        .date("Q2 2024")
                        .context("In multi-signer eSign and high-volume payment callbacks, duplicate webhooks or rapid client double-clicks triggered concurrent threads attempting to update the same contract state. Traditional 'SELECT ... FOR UPDATE' caused lock contention and connection pool exhaustion at 1,500+ TPS.")
                        .decision("Enforce distributed locking via Redis 'SET key value NX EX 30' (Redlock pattern) at the API gateway ingress before any database transaction begins.")
                        .consequences("100% of duplicate concurrent requests are rejected in sub-millisecond time (<1ms) with 409 Conflict before touching MySQL. Database connection pool utilization dropped from 88% to 18%, eliminating all transaction deadlocks.")
                        .tags(List.of("Redis Mutex", "Distributed Locking", "Idempotency", "MySQL 8.0"))
                        .badgeColor("emerald")
                        .build(),

                ArchitectureDecisionRecord.builder()
                        .id("ADR-003")
                        .title("Zero-Disk In-Memory Pre-Flight PDF Streaming via PDFBox 3.x")
                        .status("ACCEPTED & PRODUCTION VERIFIED")
                        .date("Q3 2024")
                        .context("In the legacy contract signing pipeline, multi-megabyte PDFs were written to container disk, validated asynchronously, and uploaded to S3. Under burst traffic, container EBS/overlay2 disk I/O saturated, causing container evictions and mid-journey crashes.")
                        .decision("Transition 100% of PDF processing to direct in-memory byte buffers using Apache PDFBox 3.x. Validate page count, coordinate boundaries, and corruption at initial HTTP multipart upload before session creation.")
                        .consequences("Completely eliminated mid-signing failure rate (0% mid-flow drops). Reduced overall signing completion latency by 500ms by bypassing disk I/O entirely. Container disk utilization remained flat at 0%.")
                        .tags(List.of("Apache PDFBox", "In-Memory Streaming", "Zero Disk I/O", "Pre-Flight Validation"))
                        .badgeColor("purple")
                        .build(),

                ArchitectureDecisionRecord.builder()
                        .id("ADR-004")
                        .title("Dual-Database Gateway Routing for Zero-Downtime 150 TPS Schema Migration")
                        .status("ACCEPTED & PRODUCTION VERIFIED")
                        .date("Q1 2025")
                        .context("Upgrading the DigiLocker and eSign databases required altering core transaction schemas across tens of millions of records. Maintenance downtime windows were strictly rejected by banking clients (24x7 SLA).")
                        .decision("Implement an application-level dual-write and shadow-read layer with Redis feature flags, combined with a multi-threaded cursor-based background backfill engine ('WHERE id > last_seen_id LIMIT 1000').")
                        .consequences("Successfully migrated millions of production records at 150 TPS with 0 seconds of user-facing downtime. Verified 100% data integrity between old and new tables using asynchronous checksum verification before the atomic cutover.")
                        .tags(List.of("Database Migration", "Zero Downtime", "Dual Write", "Shadow Reads"))
                        .badgeColor("amber")
                        .build()
        );
    }

    public List<IncidentRca> getIncidentRcas() {
        return List.of(
                IncidentRca.builder()
                        .id("RCA-001")
                        .title("The 409 Conflict Cascade Under Flash-Sale Multi-Signer Traffic")
                        .severity("P0 - CRITICAL (RESOLVED)")
                        .impact("3.8% of concurrent signature requests during high-volume merchant campaign threw intermittent 500 errors.")
                        .rootCause("Simultaneous dual-party signature completion webhooks triggered concurrent 'SELECT ... FOR UPDATE' rows on the same parent contract, causing MySQL InnoDB lock wait timeouts ('Lock wait timeout exceeded; try restarting transaction').")
                        .mitigation("Deployed emergency Redis distributed lock at gateway level ('SET NX EX 30s') to serialize access per contract ID, instantly rejecting twin requests with 409 Conflict and a 500ms client backoff header.")
                        .permanentGuardrail("Enforced distributed idempotency keys generated from SHA-256(signerId + documentId + timestamp_bucket), shifting conflict detection from DB engine to Redis in 0.8ms.")
                        .mttr("14 mins")
                        .financialImpact("₹0 Financial Loss & 0 Duplicate Debits")
                        .techKeys(List.of("MySQL InnoDB", "Redis Mutex", "Deadlock Prevention", "State Machine"))
                        .build(),

                IncidentRca.builder()
                        .id("RCA-002")
                        .title("Downstream Bank TSP Connection Starvation & Pool Saturation")
                        .severity("P0 - CRITICAL (RESOLVED)")
                        .impact("eSign callback latency spiked from 45ms to 18,000ms as an upstream certifying authority (TSP) experienced national degradation.")
                        .rootCause("Upstream TSP degraded without timing out cleanly, holding outbound HTTP client connection threads open for up to 60s. Incoming traffic exhausted the gateway thread pool.")
                        .mitigation("Applied an aggressive 3.5s circuit breaker timeout on all outbound TSP sockets with automatic fallback to secondary certifying authority.")
                        .permanentGuardrail("Migrated outbound HTTP client to Java 25 Virtual Threads with thread-isolated bulkheads and adaptive exponential backoff with jitter. Even when the upstream hangs, internal gateway memory and threads remain unaffected.")
                        .mttr("22 mins")
                        .financialImpact("99.99% Availability Preserved across Failover")
                        .techKeys(List.of("Virtual Threads", "Circuit Breaker", "Resilience4j", "Bulkhead Isolation"))
                        .build(),

                IncidentRca.builder()
                        .id("RCA-003")
                        .title("AWS S3 3,500 RPS Bucket Partition Throttling During 2,500 TPS Purge")
                        .severity("P0 - CRITICAL (RESOLVED)")
                        .impact("High-velocity compliance document purge engine hit AWS S3 '503 SlowDown' responses during batch deletion of expired contracts.")
                        .rootCause("All purge keys were stored with sequential date prefixes ('/2023/11/06/...'), concentrating 2,500 deletes/second onto a single AWS S3 internal partition, which exceeds S3's single-prefix threshold of 3,500 requests/sec.")
                        .mitigation("Temporarily throttled purge concurrency while maintaining live compliance thresholds.")
                        .permanentGuardrail("Re-architected key generation with a 4-character deterministic hash prefix ('md5(document_id)[0:4] + \"/\" + date + \"/\" + document_id'), distributing writes and deletes across 65,536 distinct S3 partitions. Purge engine now cruises at 2,500 TPS with 0 AWS throttling.")
                        .mttr("35 mins")
                        .financialImpact("0 Live Ingress Degradation")
                        .techKeys(List.of("AWS S3", "Partition Sharding", "2,500 TPS Purge", "High Throughput"))
                        .build()
        );
    }
}
