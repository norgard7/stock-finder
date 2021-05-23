


let newsEl = document.querySelector("#news");
let apiKey = "8cd8f664033325a7f14a5b678865218c";

function getNews(company) {
    let apiUrl = `https://gnews.io/api/v4/search?q=${company}&country=us&token=sortby=relevance&token=${apiKey}`;
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}


//---------------------------------------------
// Rhyce's Code Start
//---------------------------------------------

// let requestUrl = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S"



// let requestTickers = `https://api.polygon.io/v2/reference/tickers?&market=stocks&search=microsoft&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S` ;


// let searchInput = ""

document.getElementById("searchButton").addEventListener("click", function() {
    let inputEl = document.getElementById("searchInput") ;
    console.log(inputEl.value)
    let searchInput = inputEl.value

    console.log(searchInput) ;

    let requestTickers1 = `https://api.polygon.io/v2/reference/tickers?sort=ticker&search=${searchInput}&perpage=50&page=1&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S`

    console.log(requestTickers1)

    getTickers(requestTickers1);
})

//parameters
tickers = "tickers?"

stocks = "?market=stocks" 

search = "?search=microsoft"

function getTickers(requestTickers1) {

    let companies = []

        fetch(requestTickers1)
            .then(function (response) {
                console.log(response.status);
                //  Conditional for the the response.status.
                if (response.status) {
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                let tickerObject = data["tickers"]

                for (let i=0; i < tickerObject.length; i++) {
                    let companyObj = {
                        "ticker": "",
                        "name": ""
                    }

                    companyObj["ticker"] = tickerObject[i]["ticker"]
                    companyObj["name"] = tickerObject[i]["name"]
                    companies.push(companyObj)
                }

                console.log(companies) ;

                let companyOptions = document.getElementById("putCompanyOptionsHere") ;

                //Show Options
                for (let i=0; i< companies.length; i++) {
                    let newOption = document.createElement("button") ;

                    let ticker = companies[i]["ticker"] ;
    
                    let name = companies[i]["name"] ;

                    newOption.textContent = `(${ticker}) ${name}`

                    newOption.setAttribute("class", "clarifyChoice") ;

                    newOption.setAttribute("value", ticker)

                    newOption.addEventListener("click", function() {

                        while (companyOptions.firstChild) {
                            companyOptions.removeChild(companyOptions.firstChild);
                        }

                        addSearchToHistory(newOption.textContent, ticker) ;

                        clear() ;
                        populateRecentSearches() ;

                        // getStockData(ticker) ;

                    })

                    companyOptions.appendChild(newOption) ;

                }
            });   
}

//From Yahoo
// let stockData = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}$`

// let stockKey = "ef5468e116msh11c48f47b928321p18e54ajsn6d5617cd94a9"

// let symbol = "AMRN"

function getStockData() {
    // let url = "https://api.polygon.io/v2/reference/tickers/AAPL?apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S" ;
    let url = "https://api.polygon.io/v1/meta/symbols/AAPL/company?&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S" ;

        fetch(url)
            .then(function (response) {
                console.log(response.status);
                //  Conditional for the the response.status.
                if (response.status) {
                }
                return response.json();
            }) .then(function (data) {
                console.log(data);

        }) ;

    }




getStockData() ;

//Local Storage Stuff
function initializeLocalStorage() {
    if (localStorage.getItem("stockSearchHistory") === null) {
        let searchHistoryArray = [] ;
        localStorage.setItem("stockSearchHistory", JSON.stringify(searchHistoryArray)) ;
    } else {
    populateRecentSearches() ;
    }
}

let recentSearchesDiv = document.getElementById("recentSearches") ; 

function populateRecentSearches() {
    let searchHistoryArray = JSON.parse(localStorage.getItem("stockSearchHistory")) ;

        for (let i = searchHistoryArray.length -1; i>=0; i--) {

            let lastSearch = document.createElement("button") ;

            lastSearch.textContent = searchHistoryArray[i]["name"] ;

            ticker = searchHistoryArray[i]["ticker"] ;

            console.log(lastSearch.textContent) ;

            lastSearch.setAttribute("type", "button") ;

            lastSearch.setAttribute("class", "recentSearchButton") ;

            lastSearch.addEventListener("click", function() {
                getStockData(ticker)
            }) ;

            recentSearchesDiv.appendChild(lastSearch) ;
    }
}

initializeLocalStorage() ;

function addSearchToHistory(text, ticker) {

    let storageObj = {
        "name": "",
        "ticker": ""
    }

    let searchHistoryArray = JSON.parse(localStorage.getItem("stockSearchHistory")) ;

    storageObj["name"] = text ;
    storageObj["ticker"] = ticker ;

    searchHistoryArray.push(storageObj) ;

    localStorage.setItem("stockSearchHistory", JSON.stringify(searchHistoryArray)) ;
}
 
let clearRecentSearches = document.getElementById("clearRecentButton")
clearRecentSearches.addEventListener("click", function(){
    clear() ;
})

////
function clear() {

    while (recentSearches.firstChild) {
    recentSearches.removeChild(recentSearches.firstChild);
}
    let searchHistoryArray = localStorage.getItem("stockSearchHistory")

    searchHistoryArray = []

    localStorage.setItem("stockSearchHistory", JSON.stringify(searchHistoryArray)) ;
}
    ////
// ---------------------------------------------
// Rhyce's Code End
// ---------------------------------------------
