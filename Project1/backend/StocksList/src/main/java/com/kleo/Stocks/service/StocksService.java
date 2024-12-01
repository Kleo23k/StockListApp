package com.kleo.Stocks.service;

import com.kleo.Stocks.model.Stocks;
import com.kleo.Stocks.repository.StocksRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StocksService {
    @Autowired
    private StocksRepo repo;

    // Save all stocks with the original index assigned
    public void saveAllStocks(List<Stocks> stocksList) {
        for (int i = 0; i < stocksList.size(); i++) {
            Stocks stock = stocksList.get(i);
            stock.setOriginalIndex((long) i);  // Assign the original index
        }
        repo.saveAll(stocksList);  // Save to the database
    }

    // Find stocks by sector with pagination (originalIndex already saved)
    public Page<Stocks> findBySector(String Sector, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        // Fetch filtered and paginated data directly from the repository
        return repo.findBySector(Sector, pageable);
    }

    public List<Stocks> searchStocks(String query) {
        return repo.searchStocks(query);
    }
}
