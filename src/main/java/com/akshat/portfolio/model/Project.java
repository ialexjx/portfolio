package com.akshat.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private String id;
    private String title;
    private String tag;
    private String subtitle;
    private String icon;
    private String savageQuote;
    private String problemStatement;
    private String solutionAndImpact;
    private List<String> problemBullets;
    private List<String> solutionBullets;
    private List<String> techStack;
    private List<String> architectureHighlights;
    private Map<String, String> metrics;
    private String statusBadge;
    private String problemHeading;
    private String solutionHeading;
}
