# Stocks Market Web App

This project displays a ranked list of companies by various financial metrics such as Market Cap, EBITDA, and more. 
The app allows users to search and filter stocks by name or sector and view detailed stock information, including news, quotes, ESG scores, and more. 
Additionally, the app features dynamic charts that change based on selected metrics like Revenue, Net Income, and other financial metrics.
The backend is built using Java Spring Boot and provides RESTful APIs for the frontend to fetch data. The app combines a Java-powered backend with a frontend built using HTML, CSS, and JavaScript. 
Mock data is served using json-server, with integration for additional APIs such as Yahoo Financials and Alpha Vantage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Data Sources](#data-sources)
- [Dependencies](#dependencies)
- [Tools](#Tools)



## Installation

1. **Clone the repository and change directory:**
   ```bash
   git clone https://github.com/Kleo23k/StockListApp.git
   cd StockListApp
   
2. **Ensure you have Node.js installed. Install json-server globally**:
   ```bash
   npm install -g json-server

3. **If you encounter an error related to PowerShell's execution policy while running json-server, temporarily adjust the policy by running:**
   ```bash
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   
4. **Start the JSON Server to simulate the backend API with the provided `companies.json` file:**
   ```bash
   cd Project1/frontend/stocks
   json-server --watch companies.json

5. **Set up the backend:**
   - Install Java JDK 11+: Download and install from Oracle's website.
   - Install Maven: Ensure it's added to your PATH. Verify the installation.
   ```bash
   mvn -v
     
6. **Navigate to the backend directory and build the backend application using Maven:**
   ```bash
   cd Project1/backend\StocksList
   mvn clean install

7. **Start the Spring Boot application:**
   ```bash
   mvn spring-boot:run

8. **Open `stocks.html`:**
   - If you are using Visual Studio Code, right-click on `stocks.html` and select **Open with Live Server**. 



## Usage
  - The backend provides RESTful APIs that power the frontend.
  - The app fetches data from the mock server (json-server), external APIs, and the Spring Boot backend.
  - Navigate through pages using the "Next" and "Previous" buttons to explore more companies.
  - Use the search bar to filter stocks by company name or ticker.
  - Click on a company name to see more detailed information about the stock, such as ESG scores, news, and charts.

  
## Features
  - View and Rank Stocks: Browse companies ranked by various financial metrics (Market Cap, EBITDA, Revenue Growth).
  - Search: Quickly search for companies by name or ticker.
  - Interactive Charts: Visualize key financial metrics with dynamic charts that update based on net income, employees, or revenue.
  - Pagination: Navigate through multiple pages of stock data.
  - Sector Filter: Filter companies by business sector.
  - Sortable Columns: Sort companies by market cap, employees, or revenue growth.
  - Backend APIs: RESTful APIs are created using Java Spring Boot to serve stock data and interact with the frontend.

  
## Data Sources
The stock data is sourced from the companies.json file and served via json-server but more data is sourced from external APIS like Yahu Financials and Alpha Vantage.

## Tools
  - json-server: A simple, mock REST API server.
  - Bootstrap: Frontend CSS framework for styling.
  - Numeral.js: JavaScript library for formatting numbers.
  - Chart.js: Library for rendering interactive charts.
  - Java, Spring Boot, Maven.


