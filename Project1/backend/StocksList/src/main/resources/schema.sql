--CREATE TABLE STOCKS (
--    Exchange VARCHAR(255),
--    Symbol VARCHAR(255) PRIMARY KEY,
--    Shortname VARCHAR(255),
--    Longname VARCHAR(255),
--    Sector VARCHAR(255),
--    Industry VARCHAR(255),
--    Currentprice DOUBLE,
--    Marketcap BIGINT,
--    Ebitda BIGINT,
--    Revenuegrowth DOUBLE,
--    City VARCHAR(255),
--    State VARCHAR(255),
--    Country VARCHAR(255),
--    Fulltimeemployees INT,
--    Longbusinesssummary TEXT,
--    Weight DOUBLE,
--    logoUrl VARCHAR(255)
--);
--CREATE TABLE STOCKS (
--    symbol VARCHAR(255) PRIMARY KEY,
--    exchange VARCHAR(255),
--    shortname VARCHAR(255),
--    longname VARCHAR(255),
--    sector VARCHAR(255),
--    industry VARCHAR(255),
--    currentprice DOUBLE,
--    marketcap BIGINT,
--    ebitda BIGINT,
--    revenuegrowth DOUBLE,
--    city VARCHAR(255),
--    state VARCHAR(255),
--    country VARCHAR(255),
--    fulltimeemployees INT,
--    longbusinesssummary TEXT,
--    weight DOUBLE,
--    logoUrl VARCHAR(255)
--);


DROP TABLE IF EXISTS STOCKS;

CREATE TABLE STOCKS (
    symbol VARCHAR(255) PRIMARY KEY,
    shortname VARCHAR(255),
    sector VARCHAR(255),
    industry VARCHAR(255),
    currentprice DOUBLE,
    marketcap BIGINT,
    ebitda BIGINT,
    revenuegrowth DOUBLE,
    city VARCHAR(255),
    state VARCHAR(255),
    fulltimeemployees INT,
    logoUrl VARCHAR(255)
);


