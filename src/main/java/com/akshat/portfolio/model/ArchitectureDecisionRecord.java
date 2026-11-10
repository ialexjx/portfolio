package com.akshat.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArchitectureDecisionRecord {
    private String id;              // e.g., "ADR-001"
    private String title;           // e.g., "Java 25 Virtual Threads over Reactive WebFlux"
    private String status;          // e.g., "ACCEPTED & PRODUCTION VERIFIED"
    private String date;            // e.g., "Q1 2024"
    private String context;         // Background & problem statement
    private String decision;        // What was chosen and why
    private String consequences;    // Measurable results & eliminated cognitive tax
    private List<String> tags;      // ["Java 25", "Virtual Threads", "Concurrency"]
    private String badgeColor;      // "emerald", "sky", "purple", "amber"
}
