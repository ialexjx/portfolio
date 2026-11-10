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
public class IncidentRca {
    private String id;               // e.g., "RCA-001"
    private String title;            // e.g., "The 409 Conflict Cascade under Flash-Sale Multi-Signer Traffic"
    private String severity;         // "P0 - CRITICAL (RESOLVED)"
    private String impact;           // e.g., "3.8% of concurrent signature requests threw mid-transaction 500s"
    private String rootCause;        // In-depth technical breakdown
    private String mitigation;       // Immediate operational fix applied
    private String permanentGuardrail; // Permanent architectural defense engineered
    private String mttr;             // e.g., "14 mins"
    private String financialImpact;  // e.g., "₹0 Lost & 0 Duplicate Debits"
    private List<String> techKeys;   // ["MySQL InnoDB", "Redis Redlock", "Deadlock Prevention"]
}
