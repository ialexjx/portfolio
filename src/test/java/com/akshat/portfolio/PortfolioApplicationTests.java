package com.akshat.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.containsString;

@SpringBootTest
@AutoConfigureMockMvc
class PortfolioApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void contextLoads() {
    }

    @Test
    void indexPageRendersSuccessfullyWithShortAF() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("ShortAF (ScaleLink)")))
                .andExpect(content().string(containsString("scalelink-url-shortener.onrender.com")))
                .andExpect(content().string(containsString("Guava Bloom Filter")));
    }

    @Test
    void labPageRendersSuccessfullyWithADR004() throws Exception {
        mockMvc.perform(get("/lab"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("ADR-004")))
                .andExpect(content().string(containsString("ShortAF")));
    }
}
