package com.kleo.Stocks.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class YahooFinanceService {

    @Value("${yahoo.api.key}")
    private String apiKey; // Injected from application.properties

    private final WebClient webClient;

    public YahooFinanceService(WebClient.Builder webClientBuilder) {
        String yahooURL = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/";
        this.webClient = webClientBuilder.baseUrl(yahooURL).build();
    }

    public Mono<String> fetchQuotes(String symbol) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("market/v2/get-quotes")
                        .queryParam("region", "US")
                        .queryParam("symbols", symbol)
                        .build()
                )
                .header("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
                .header("x-rapidapi-key", apiKey)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> fetchNews(String symbol) {
        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("news/v2/list")
                        .queryParam("region", "US")
                        .queryParam("snippetCount", "8")
                        .queryParam("s", symbol)
                        .build()
                )
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
                .header("x-rapidapi-key", apiKey)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> fetchScores(String symbol) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("stock/get-esg-scores")
                        .queryParam("symbol", symbol)
                        .queryParam("region", "US")
                        .queryParam("lang", "en-US")
                        .build()
                )
                .header("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
                .header("x-rapidapi-key", apiKey)
                .retrieve()
                .bodyToMono(String.class);
    }
}
