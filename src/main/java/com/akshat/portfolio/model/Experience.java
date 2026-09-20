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
public class Experience {
    private String role;
    private String company;
    private String location;
    private String period;
    private String savageSummary;
    private List<String> bulletPoints;
    private String awardBadge;
    private List<String> technologies;
}
