const baseURL = "http://localhost:8080/stocks";  

const apiService = {
    async fetchStocks(page,size){
        try {
            const response = await fetch(`${baseURL}?page=${page}&size=${size}`);
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    },

    async fetchFilteredStocks(sector,page,size){
        try {
            const response = await fetch(`${baseURL}/sector?Sector=${sector}&page=${page}&size=${size}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error("error fetching filtered stocks",error)
        }
    },

    async fetchQuotes(symbol) {
        try {
            const response = await fetch(`${baseURL}/quotes?symbol=${symbol}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    },

    async fetchNews(symbol) {
        try {
            const response = await fetch(`${baseURL}/news`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ symbol })
            });
            if (!response.ok) {
                throw new Error(`Error fetching news: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },
    

    async fetchScores(symbol) {
        try {
            const response = await fetch(`${baseURL}/scores?symbol=${symbol}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    },
    
    async getTimeSeries(symbol){
        try {
            const response = await fetch(`${baseURL}/income-statement?symbol=${symbol}`)
            const data = await response.json()
            return data;
        } catch (error) {
            console.error("Error getting income-statement:",error)
        }
    }
};

export default apiService;