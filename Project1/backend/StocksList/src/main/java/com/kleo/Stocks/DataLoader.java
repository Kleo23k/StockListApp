//package com.kleo.Stocks;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.kleo.Stocks.model.Stocks;
//import com.kleo.Stocks.repository.StocksRepo;
//import com.fasterxml.jackson.core.type.TypeReference;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.List;
//
//@Component
//public class DataLoader implements CommandLineRunner {
//
//    private final ObjectMapper objectMapper;
//    private final StocksRepo repo;
//
//    public DataLoader(ObjectMapper objectMapper, StocksRepo repo) {
//        this.objectMapper = objectMapper;
//        this.repo = repo;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        // Load JSON data from the classpath
//        try (InputStream inputStream = getClass().getResourceAsStream("/data/companies.json")) {
//            if (inputStream == null) {
//                throw new IllegalArgumentException("File not found! Check the path.");
//            }
//            // Deserialize JSON into a List of Stocks objects
//            List<Stocks> stocksList = objectMapper.readValue(inputStream, new TypeReference<List<Stocks>>() {});
//
//            // Save all stocks into the repository
//            repo.saveAll(stocksList);
//        } catch (IOException e) {
//            throw new RuntimeException("Couldn't read JSON file: " + e);
//        }
//    }
//}
