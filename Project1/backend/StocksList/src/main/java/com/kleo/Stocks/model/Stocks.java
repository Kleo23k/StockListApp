package com.kleo.Stocks.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Stocks {

    @Id
    @JsonProperty("Symbol")
    private String symbol;

    @JsonProperty("Shortname")
    private String shortname;

    @JsonProperty("Sector")
    private String sector;

    @JsonProperty("Industry")
    private String industry;

    @JsonProperty("Currentprice")
    private double currentprice;

    @JsonProperty("Marketcap")
    private long marketcap;

    @JsonProperty("Ebitda")
    private long ebitda;

    @JsonProperty("Revenuegrowth")
    private double revenuegrowth;

    @JsonProperty("City")
    private String city;

    @JsonProperty("State")
    private String state;


    @JsonProperty("Fulltimeemployees")
    private int fulltimeemployees;


    @JsonProperty("logoUrl")
    private String logoUrl;

    private Long originalIndex;

    // Default constructor
    public Stocks() {}

    // Constructor with all fields
    public Stocks( String symbol, String shortname, String sector, String industry,
                  double currentprice, long marketcap, long ebitda, double revenuegrowth, String city,
                  String state,int fulltimeemployees,
                  String logoUrl) {

        this.symbol = symbol;
        this.shortname = shortname;
        this.sector = sector;
        this.industry = industry;
        this.currentprice = currentprice;
        this.marketcap = marketcap;
        this.ebitda = ebitda;
        this.revenuegrowth = revenuegrowth;
        this.city = city;
        this.state = state;
        this.fulltimeemployees = fulltimeemployees;
        this.logoUrl = logoUrl;
    }

    // Getters

    public String getSymbol() {
        return symbol;
    }

    public String getShortname() {
        return shortname;
    }

    public String getSector() {
        return sector;
    }

    public String getIndustry() {
        return industry;
    }

    public double getCurrentprice() {
        return currentprice;
    }

    public long getMarketcap() {
        return marketcap;
    }

    public long getEbitda() {
        return ebitda;
    }

    public double getRevenuegrowth() {
        return revenuegrowth;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public int getFulltimeemployees() {
        return fulltimeemployees;
    }



    public String getLogoUrl() {
        return logoUrl;
    }

    public Long getOriginalIndex() {
        return originalIndex;
    }

    public void setOriginalIndex(Long originalIndex) {
        this.originalIndex = originalIndex;
    }

}
