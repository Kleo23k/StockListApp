package com.kleo.Stocks.controller;

//import com.kleo.Stocks.Util.JsonToDatabaseService;
import com.kleo.Stocks.model.Stocks;
import com.kleo.Stocks.service.AlphaVantageService;
import com.kleo.Stocks.service.StocksService;
import com.kleo.Stocks.service.YahooFinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/stocks")
public class StockController {
    @Autowired
    private StocksService service;
    @Autowired
    private YahooFinanceService yahooService;
    @Autowired
    private AlphaVantageService vantageService;
//    @Autowired
//    private JsonToDatabaseService jsonToDatabaseService;


    @GetMapping("/sector")
     public Page<Stocks> findBySector(@RequestParam String Sector,@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "50") int size){
        return service.findBySector(Sector,page,size);
    }

    @GetMapping("/search")
    public List<Stocks> searchStocks(@RequestParam String query){
        return service.searchStocks(query);
    }

    @GetMapping("/quotes")
    public Mono<String> fetchQuotes(@RequestParam  String symbol){
        return yahooService.fetchQuotes(symbol);
    }

    @GetMapping("/scores")
    public Mono<String> fetchScores(@RequestParam String symbol){
        return yahooService.fetchScores(symbol);
    }

    @PostMapping("/news")
    public Mono<String> fetchNews(@RequestParam String symbol){
        return yahooService.fetchNews(symbol);
    }

    @GetMapping("/income-statement")
    public Mono<String> getIncomeStatement(@RequestParam String symbol) {
        return vantageService.getTimeSeries(symbol);
    }
}
