package com.kleo.Stocks.repository;

import com.kleo.Stocks.model.Stocks;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StocksRepo extends JpaRepository<Stocks,String> {

    Page<Stocks> findBySector(String sector, Pageable pageable);
    @Query("SELECT stock FROM Stocks stock WHERE " +
            "LOWER(stock.shortname) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(stock.symbol) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Stocks> searchStocks(@Param("query") String query);

}
