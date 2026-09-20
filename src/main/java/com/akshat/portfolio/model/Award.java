package com.akshat.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Award {
    private String title;
    private String organization;
    private String badge;
    private String year;
    private String icon;
    private String savageReason;
    private String highlightMetric;
}
