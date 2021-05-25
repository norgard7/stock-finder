
// Lauren Code

// let newsEl = document.querySelector("#news");
// let apiKey = "8cd8f664033325a7f14a5b678865218c";

// function getNews(company) {
//     let apiUrl = `https://gnews.io/api/v4/search?q=${company}&country=us&token=sortby=relevance&token=${apiKey}`;
//     fetch(apiUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
// }


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

    console.log("getTickers functionc called") ;

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
                        } ;

                        console.log("calling addSearchToHistory")
                        addSearchToHistory(newOption.textContent, ticker) ;

                        while (recentSearches.firstChild) {
                            recentSearches.removeChild(recentSearches.firstChild);
                        } ;
                        
                        console.log("calling populateRecentSearches")
                        populateRecentSearches() ;

                        console.log("calling getStockData")
                        getStockData(ticker) ;

                    })

                    companyOptions.appendChild(newOption) ;

                }
            });   
}

//From Yahoo
// let stockData = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}$`

// let stockKey = "ef5468e116msh11c48f47b928321p18e54ajsn6d5617cd94a9"

// let symbol = "AMRN"

let companyLogo = document.getElementById("companyLogo") ;
let companyName = document.getElementById("companyName") ;
let companyDescription = document.getElementById("companyDescription") ;
let companyUrl = document.getElementById("companyUrl") ;

function getStockData(ticker) {
    console.log("getStockData function called") ;
    // let url = "https://api.polygon.io/v2/reference/tickers/AAPL?apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S" ;
    let url = `https://api.polygon.io/v1/meta/symbols/${ticker}/company?&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S` ;
    console.log(url) ;
        fetch(url)
            .then(function (response) {
                console.log(response.status);
                //  Conditional for the the response.status.
                if (response.status) {
                }
                return response.json();
            }) .then(function (data) {
                console.log(data);

                let logo = data["logo"] ;

                let name = data["name"] ;

                let description = data["description"] ;

                let url = data["url"] ;

                companyLogo.setAttribute("src", logo) ;

                companyName.textContent = name ;

                companyDescription.textContent = description ;

                companyUrl.textContent = url ;


                companyUrl.setAttribute("href", `${url}`) ; 


        }) ;

    }

//Local Storage Stuff
function initializeLocalStorage() {
    console.log("initializeLocalStorage function called") ;
    if (localStorage.getItem("stockSearchHistory") === null) {
        let searchHistoryArray = [] ;
        localStorage.setItem("stockSearchHistory", JSON.stringify(searchHistoryArray)) ;
    } else {
    populateRecentSearches() ;
    }
}

let recentSearchesDiv = document.getElementById("recentSearches") ; 

function populateRecentSearches() {
    console.log("populateRecentSearches function called") ;
    let searchHistoryArray = JSON.parse(localStorage.getItem("stockSearchHistory")) ;

        for (let i = searchHistoryArray.length -1; i>=0; i--) {

            let lastSearch = document.createElement("button") ;

            lastSearch.textContent = searchHistoryArray[i]["name"] ;

            ticker = searchHistoryArray[i]["ticker"] ;

            // console.log(lastSearch.textContent) ;

            lastSearch.setAttribute("type", "button") ;

            lastSearch.setAttribute("class", "recentSearchButton") ;

            lastSearch.setAttribute("value", ticker) ;

            lastSearch.addEventListener("click", function(event) {

                ticker = event.target.getAttribute("value")

                console.log(ticker) 
                getStockData(ticker)
            }) ;

            recentSearchesDiv.appendChild(lastSearch) ;
    }
}


function addSearchToHistory(text, ticker) {
    console.log("addSearchToHistory function called") ;

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
    console.log("clear function called") ;

    while (recentSearches.firstChild) {
    recentSearches.removeChild(recentSearches.firstChild);
}
    let searchHistoryArray = localStorage.getItem("stockSearchHistory")

    searchHistoryArray = []

    localStorage.setItem("stockSearchHistory", JSON.stringify(searchHistoryArray)) ;

    companyLogo.setAttribute("src", "")

    companyName.textContent = "" ;

    companyDescription.textContent = "" ;
    
    companyUrl.textContent = ""
}
//Chart Stuff

const labels = [
    'seven',
    'six',
    'five',
    'four',
    'three',
    'two',
    'one'
  ];
  let data = {
    labels: labels,
    datasets: [{
      label: 'Closing Stock Price for Last Seven Days',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };


  let config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
              title: {
                color: 'blue',
                display: true,
                text: 'day(s)-ago'
              }
            },
            y: {
                title: {
                  color: 'blue',
                  display: true,
                  text: 'Stock Price ($)'
                }
              }
        }
    }
    
  };

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

initializeLocalStorage() ;
// ---------------------------------------------
// Rhyce's Code End
// ---------------------------------------------
