package com.kleo.Stocks;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kleo.Stocks.model.Stocks;
import com.kleo.Stocks.service.StocksService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@SpringBootApplication
public class StocksApplication {

	public static void main(String[] args) {

		SpringApplication.run(StocksApplication.class, args);
	}
	@Bean
	CommandLineRunner runner(StocksService stocksService) {
		return args -> {
			// Read JSON and write to DB
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<Stocks>> typeReference = new TypeReference<List<Stocks>>() {};
			InputStream inputStream = TypeReference.class.getResourceAsStream("/data/companies.json");
			try {
				List<Stocks> stocksList = mapper.readValue(inputStream, typeReference);
				stocksService.saveAllStocks(stocksList);
				System.out.println("Stocks Saved!");
			} catch (IOException e) {
				System.out.println("Unable to save stocks: " + e.getMessage());
			}
		};
}}
