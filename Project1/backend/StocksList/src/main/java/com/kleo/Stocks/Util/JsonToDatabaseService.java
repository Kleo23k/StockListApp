//package com.kleo.Stocks.Util;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.kleo.Stocks.model.Stocks;
//import com.kleo.Stocks.repository.StocksRepo;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.List;
//
//@Service
//public class JsonToDatabaseService {
//
//    @Autowired
//    private StocksRepo repo;
//
//    @PostConstruct
//    public void loadDataFromJson() throws IOException {
//        try {
//            // Print debug information about the resource path
//            var resource = getClass().getClassLoader().getResource("companies.json");
//            if (resource == null) {
//                throw new IOException("File not found: companies.json");
//            }
//
//            File jsonFile = new File(resource.getFile());
//
//            ObjectMapper objectMapper = new ObjectMapper();
//            List<Stocks> stocksList = objectMapper.readValue(jsonFile, new TypeReference<List<Stocks>>() {});
//
//            // Save the list to the database
//            repo.saveAll(stocksList);
//            System.out.println("Data loaded and saved to database.");
//        } catch (IOException e) {
//            // Log the error in the PostConstruct method for debugging
//            System.err.println("Error loading data from JSON: " + e.getMessage());
//            e.printStackTrace();
//            throw e; // Re-throw to allow Spring to handle it
//        }
//    }
//
//}
