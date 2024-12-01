import apiService from "./apiService.js";
import getSector from "./dropDownItems.js";

const prevBtn = document.getElementById("previousButton");
const nextBtn = document.getElementById("nextButton");
const tbody = document.querySelector("tbody");
const tableButtons = document.querySelectorAll("tr button")
const table = document.querySelector("table");
const numberOfCompanies = document.querySelector("#total h4:nth-of-type(1) span");
let totalMarketCap = document.querySelector("#total h4:nth-of-type(2) span");
const rankingButtons = document.querySelectorAll("#ranking-bar button");
const dynamicColumnHeader = document.getElementById("dynamicColumnHeader");

let allStocksByPage = {};
let currentPage = 0;
let itemsPerPage = 50;
let totalItems = 500; 

async function fetchPageData(page) {
    const sector = new URLSearchParams(window.location.search).get("sector");
    
    if (sector) {
        // If sector is selected, fetch data from the backend
        await fetchFilteredDataFromBackend(sector, page);
    } else {
        // If no filter is applied, fetch stocks paginated 
        await fetchStocksFromBackEnd(page);
    }
}

// Function to fetch data from the local JSON file for a specific page
async function fetchStocksFromBackEnd(page) {
    const start = page * itemsPerPage;
    let end = start + itemsPerPage - 1;

    if (end >= totalItems) {
        end = totalItems - 1;
    }

    try {
        const stocks = await apiService.fetchStocks(page,itemsPerPage)
        allStocksByPage[page] = stocks.content
        console.log(stocks);
        totalItems = stocks.totalElements;
        updateUi();
    } catch (error) {
        console.error("Error fetching data from JSON:", error);
    }
}

// Function to fetch filtered data from the backend based on sector and page
async function fetchFilteredDataFromBackend(sector,page) {

    try {
        // Fetch filtered data from the backend
        const stocks = await apiService.fetchFilteredStocks(sector,page,itemsPerPage)
        
        // if (!response.ok) {
        //     throw new Error("Failed to fetch filtered stocks data from backend");
        // }

        // Parse the JSON response from the backend
        

        // Store the filtered results in allStocksByPage for the current page
        allStocksByPage[page] = stocks.content;

        // Update the total number of items (used for pagination)
        totalItems = stocks.totalElements;

        // // Ensure the original index is included for each stock
        // allStocksByPage[page] = data.content.map(stock => {
        //     return {
        //         ...stock,
        //         originalIndex: stock.originalIndex // Ensure originalIndex is kept
        //     };
        // });

        // Update the UI with the filtered data
        updateUi();
    } catch (error) {
        console.error("Error fetching data from backend:", error);
    }
}



function updateUi(rankBy = "marketCap", sortedStocks = null) {
    const sector = new URLSearchParams(window.location.search).get("sector");
    
    let stocksToShow = sortedStocks || allStocksByPage[currentPage] || [];

    if (sector) {
        document.querySelector(".table-container").style.paddingBottom = "20px";
        if(stocksToShow.length === 0){
           table.innerHTML = `<h1>No available stocks for this page on the ${sector} sector</h1>`;
        }
        // prevBtn.style.display = "none";
        // nextBtn.style.display = "none";
    }
    
    if(window.location.pathname === "/stock-detail.html") return
    
    switch (rankBy) {
        case "marketCap":
            dynamicColumnHeader.textContent = "Market Cap";
            break;
        case "Ebitda":
            dynamicColumnHeader.textContent = "EBITDA";
            break;
        case "Employees":
            dynamicColumnHeader.textContent = "Employees";
            break;
        case "mcEbitda":
            dynamicColumnHeader.textContent = "MC/EBITDA";
            break;
        default:
            dynamicColumnHeader.textContent = "Market Cap";
    }

    numberOfCompanies.textContent = totalItems.toLocaleString();

    const totalMarketCapValue = stocksToShow.reduce((acc, { Marketcap }) => acc + Marketcap, 0);
    totalMarketCap.textContent = numeral(totalMarketCapValue).format('0.0a');

    tbody.innerHTML = "";
    stocksToShow.forEach(({ Currentprice, City, Marketcap, Revenuegrowth, Shortname, Symbol, logoUrl, Ebitda, Fulltimeemployees,originalIndex }, index) => {
        const row = document.createElement("tr");
        const growthValue = Revenuegrowth * 100;
        let dynamicColumnValue;

        switch (rankBy) {
            case "marketCap":
                dynamicColumnValue = `$${numeral(Marketcap).format('0.0a')}`;
                break;
            case "Ebitda":
                dynamicColumnValue = Ebitda ? `$${numeral(Ebitda).format("0.0a")}` : "N/A";
                break;
            case "Employees":
                dynamicColumnValue = Fulltimeemployees ? Fulltimeemployees.toLocaleString() : 'N/A';
                break;
            case "mcEbitda":
                dynamicColumnValue = Ebitda ? numeral(Marketcap / Ebitda).format('0.0') : 'N/A';
                break;
            default:
                dynamicColumnValue = `$${numeral(Marketcap).format('0.0a')}`;
        }

        row.innerHTML = `
            <th scope="row">${(currentPage * itemsPerPage) + index + 1}</th>
            <td>
                <div class="stock-info">
                    <img src="${logoUrl}" alt="${Symbol} logo" class="stock-logo"/>
                    <div class="stock-names">
                     <a class="stock-details" href="stock-detail.html?page=${currentPage}&index=${originalIndex}&symbol=${Symbol}">
                        <div>${Shortname}</div>
                        <div>${Symbol}</div>
                     </a>
                    </div>
                </div>
            </td>
            <td>${dynamicColumnValue}</td>
            <td>$${Currentprice}</td>
            <td class="revenue-growth"><span></span>${Math.abs(growthValue).toFixed(1)}%</td>
            <td>${City}</td>
        `;

        const formatedGrowth = row.querySelector(".revenue-growth");
        const span = row.querySelector("span");

        if (growthValue > 0) {
            formatedGrowth.style.color = "green";
            span.textContent = "▴";
        } else if (growthValue < 0) {
            formatedGrowth.style.color = "red";
            span.textContent = "▾";
        } else {
            formatedGrowth.style.color = "gray";
        }

        tbody.appendChild(row);
    });

    nextBtn.classList.toggle("disableButton", (currentPage + 1) * itemsPerPage >= totalItems);
    prevBtn.classList.toggle("disableButton", currentPage === 0);
}

let currentRankBy = "marketCap"; 
let currentSortColumn = null;
let isAscending = true; 

// Ranking Buttons Event Listener
rankingButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        currentRankBy = e.target.getAttribute("data-rank");
        updateUi(currentRankBy);
    });
});

// Table Buttons Event Listener
tableButtons.forEach(button => {
    button.addEventListener("click", () => {
        const columnIndex = parseInt(button.getAttribute("data-column"));
        sortTable(columnIndex);
    });
});

//Form sumbission
export function formSubmission() {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const messageInput = document.getElementById("messageInput");
    const contactForm = document.getElementById("contactForm");

    // Ensure elements exist before adding the event listener
    if (!contactForm || !nameInput || !emailInput || !messageInput) {
        console.error("One or more form elements are missing.");
        return;
    }

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form from submitting the default way

        // Create alert div (clear existing alert if any)
        let alert = document.querySelector(".alert");
        if (alert) alert.remove(); // Remove existing alert before adding new one

        alert = document.createElement("div"); // Create new alert div

        // Check if all inputs have values
        if (nameInput.value && emailInput.value && messageInput.value) {
            const formData = new FormData(contactForm); // Pass the contactForm element explicitly

            fetch("http://localhost:8080/api/submitForm", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData.entries())), // Convert form data to JSON
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.text())
            .then(data => {
                alert.innerHTML = `
                    <div class="alert alert-success">
                        <strong>You Successfully submitted the form!</strong>
                    </div>`;
                contactForm.appendChild(alert);
            })
            .catch(error => {
                console.error('Error:', error);
                alert.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>There was an error submitting the form. Please try again.</strong>
                    </div>`;
                contactForm.appendChild(alert);
            });
        } 
    });
}

formSubmission()
function sortTable(columnIndex) {
    let sortedStocks = [...allStocksByPage[currentPage]];

    if (currentSortColumn === columnIndex) {
        isAscending = !isAscending;
    } else {
        isAscending = true;
        currentSortColumn = columnIndex;
    }

    sortedStocks.sort((a, b) => {
        let value;
        switch (columnIndex) {
            case 1:
                value = (a.Shortname || '').localeCompare(b.Shortname || '');
                break;
            case 2:
                value = dynamicSorting(a, b, currentRankBy);
                break;
            case 3:
                value = a.Currentprice - b.Currentprice;
                break;
            case 4:
                value = a.Revenuegrowth - b.Revenuegrowth;
                break;
            case 5:
                value = (a.City || '').localeCompare(b.City || '');
                break;
            default:
                value = 0;
        }
        return isAscending ? value : -value;
    });
    updateUi(currentRankBy, sortedStocks); 
    sortTableIndicator(columnIndex); 
}

function dynamicSorting(a, b, rankBy) {
    let value;
    switch (rankBy) {
        case "marketCap":
            value = (a.Marketcap || 0) - (b.Marketcap || 0);
            break;
        case "Ebitda":
            value = (a.Ebitda || 0) - (b.Ebitda || 0);
            break;
        case "Employees":
            value = (a.Fulltimeemployees || 0) - (b.Fulltimeemployees || 0);
            break;
        case "mcEbitda":
            value = (a.Ebitda && b.Ebitda) ? (a.Marketcap / a.Ebitda) - (b.Marketcap / b.Ebitda) : 0;
            break;
        default:
            value = (a.Marketcap || 0) - (b.Marketcap || 0);
    }
    return value;
}

function sortTableIndicator(columnIndex) {
    const indicators = document.querySelectorAll("tr .sorting");
    indicators.forEach((indicator, index) => {
        
        
        const upArrow = indicator.querySelector("span:first-child");
        const downArrow = indicator.querySelector("span:last-child");
        if (index + 1 === columnIndex) {
            if (isAscending) {
                upArrow.style.color = "black";
                downArrow.style.color = "grey";
            } else {
                upArrow.style.color = "grey";
                downArrow.style.color = "black";
            }
        } else {
            upArrow.style.color = "grey";
            downArrow.style.color = "grey";
        }
    });
}

getSector()

async function searchStocks() {
    const input = document.getElementById('autocomplete-input');
    const resultsContainer = document.getElementById('autocomplete-results');
    
    input.addEventListener("keyup", async () => {
        const query = input.value;  // Declare query inside the event handler
        resultsContainer.innerHTML = '';

        if (query.length < 1) {
            resultsContainer.style.display = 'none';
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/stocks/search?query=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const stocks = await response.json();
            stocks.forEach(stock => {
                const item = document.createElement("a");
                item.classList.add("list-group-item", "list-group-item-action");
                item.href = `stock-detail.html?page=${currentPage}&index=${stock.originalIndex}&symbol=${stock.Symbol}`; 
                item.innerHTML = `
                    <div class="stock-info">
                        <img src="${stock.logoUrl}" alt="${stock.Symbol} logo" class="stock-logo-search"/>
                        <div class="stock-names">
                            <div>${stock.Shortname}</div>  
                            <div>${stock.Symbol}</div>    
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(item);
            });
            resultsContainer.style.display = 'block';

            document.addEventListener("click", (e) => {
                if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
                    resultsContainer.style.display = 'none';
                }
            });      
        } catch (error) {
            console.error("Failed to get stocks for searching", error);
        }
    });
}



searchStocks()
if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", showPrevPage);
    nextBtn.addEventListener("click", showNextPage);
} 

fetchPageData(currentPage);

function showNextPage() {
    if ((currentPage + 1) * itemsPerPage < totalItems) {
        currentPage++;
        fetchPageData(currentPage);
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
}

function showPrevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateUi();
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
}

export default searchStocks;
