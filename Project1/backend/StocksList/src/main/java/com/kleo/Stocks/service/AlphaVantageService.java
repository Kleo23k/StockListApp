package com.kleo.Stocks.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AlphaVantageService {

    @Value("${vantage.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public AlphaVantageService(WebClient.Builder webClientBuilder) {
        String baseUrl = "https://alpha-vantage.p.rapidapi.com/";
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
    }

    // Fetch time series data from Alpha Vantage API
    public Mono<String> getTimeSeries(String symbol) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/query")
                        .queryParam("symbol", symbol)
                        .queryParam("function", "INCOME_STATEMENT")
                        .queryParam("datatype", "json")
                        .build()
                )
                .header("x-rapidapi-host", "alpha-vantage.p.rapidapi.com")
                .header("x-rapidapi-key", apiKey)
                .retrieve()
                .bodyToMono(String.class);
    }
}
