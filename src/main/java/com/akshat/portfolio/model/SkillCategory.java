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
public class SkillCategory {
    private String categoryName;
    private String icon;
    private String savageRoast;
    private List<SkillItem> skills;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SkillItem {
        private String name;
        private String level; // e.g. "God Tier", "Battle Tested", "Sub-Millisecond"
        private String badge;
    }
}
