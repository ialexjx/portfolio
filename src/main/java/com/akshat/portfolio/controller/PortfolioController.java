package com.akshat.portfolio.controller;

import com.akshat.portfolio.service.PortfolioDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

@Controller
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioDataService portfolioDataService;
    private final Random random = new Random();
    private final AtomicInteger roastIndex = new AtomicInteger(0);

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("name", "Akshat Jaiswal");
        model.addAttribute("titleRole", "Senior Software Engineer (SSE) & Distributed Systems Architect");
        model.addAttribute("email", "akshathrx6393@gmail.com");
        model.addAttribute("linkedin", "https://www.linkedin.com/in/ialexjx/");
        model.addAttribute("phone", "+91 9839783219");
        model.addAttribute("stats", portfolioDataService.getStats());
        model.addAttribute("projects", portfolioDataService.getProjects());
        model.addAttribute("experiences", portfolioDataService.getExperiences());
        model.addAttribute("skillCategories", portfolioDataService.getSkillCategories());
        model.addAttribute("awards", portfolioDataService.getAwards());
        model.addAttribute("roasts", portfolioDataService.getRoastQuotes());
        return "index";
    }

    @GetMapping("/lab")
    public String lab(Model model) {
        model.addAttribute("name", "Akshat Jaiswal");
        model.addAttribute("titleRole", "Senior Software Engineer (SSE) & Distributed Systems Architect");
        model.addAttribute("email", "akshathrx6393@gmail.com");
        model.addAttribute("linkedin", "https://www.linkedin.com/in/ialexjx/");
        model.addAttribute("phone", "+91 9839783219");
        model.addAttribute("stats", portfolioDataService.getStats());
        model.addAttribute("projects", portfolioDataService.getProjects());
        return "lab";
    }

    @GetMapping("/api/roasts")
    @ResponseBody
    public ResponseEntity<List<String>> getAllRoasts() {
        return ResponseEntity.ok(portfolioDataService.getRoastQuotes());
    }

    @GetMapping("/api/roast")
    @ResponseBody
    public ResponseEntity<Map<String, String>> getNextRoast() {
        var roasts = portfolioDataService.getRoastQuotes();
        int idx = Math.abs(roastIndex.getAndIncrement() % roasts.size());
        String selected = roasts.get(idx);
        return ResponseEntity.ok(Map.of(
                "roast", selected,
                "index", String.valueOf(idx + 1),
                "total", String.valueOf(roasts.size()),
                "timestamp", LocalDateTime.now().toString()
        ));
    }

    @GetMapping("/api/health")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getSystemHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "ALL_SYSTEMS_GO",
                "javaVersion", System.getProperty("java.version"),
                "architecture", "Apple-Glass Hybrid Reactive",
                "virtualThreads", "ENABLED",
                "currentTps", 150,
                "prodStatus", "BLESSED_BY_UNIT_TESTS",
                "uptime", "99.999%"
        ));
    }
}
