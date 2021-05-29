let newsEl = document.querySelector("#news");
let stockInfoEl = document.querySelector("#stockInfo");
let apiKey = "8cd8f664033325a7f14a5b678865218c";

// created a function to fetch api
function getStock(company){
    // Added the concatination of + company + default from yahoo finance
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=" + company + "&region=US", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-key": "bd4556767fmsh940acdc2512cbe8p14bf60jsncce8acab51ba",
		    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	    }
    })
    .then(response => {
        console.log(response);
        // added the below line
        return response.json();
    })
    .catch(err => {
	    console.error(err);
    })
    // add the below .then to run function
    .then(function (data) {
        console.log(data);
        stockInfo(data);
    })
}

// created a function to grab the important stock info
function stockInfo(data){
    stockInfoEl.innerHTML="";
    //current price
    let price = document.createElement("p");
    let currentPrice = data.financialData.currentPrice.fmt;
    price.textContent = `Current Price: $${currentPrice}`;
    //day price range
    let dayRange = document.createElement("p");
    let dayHigh = data.summaryDetail.dayHigh.fmt;
    let dayLow = data.summaryDetail.dayLow.fmt;
    dayRange.textContent = `Today's Price Range: $${dayLow} to $${dayHigh}`;
    // year price range
    let yearRange = document.createElement("p");
    let yearHigh = data.summaryDetail.fiftyTwoWeekHigh.fmt;
    let yearLow = data.summaryDetail.fiftyTwoWeekLow.fmt;
    yearRange.textContent = `The Year's Price Range: $${yearLow} to $${yearHigh}`;
    //how much company is worth
    let mktCap = document.createElement("p");
    let marketCap = data.price.marketCap.fmt;
    mktCap.textContent = `Market Cap: $${marketCap}`;
    //price earnings ratio: price/earnings
    let peRatio = document.createElement("p");
    let trailingPE = data.summaryDetail.trailingPE.fmt;
    if(!trailingPE) {
        trailingPE = 0;
    }
    peRatio.textContent = `PE Ratio: ${trailingPE}`;
    //dividends per year/current price
    let divYield = document.createElement("p");
    let dividend = data.summaryDetail.dividendYield.fmt;
    if(!dividend) {
        dividend = "no dividend";
    }
    divYield.textContent = `Dividend Yield: ${dividend}`;
    console.log(dividend);
    // display stock info in html
    stockInfoEl.appendChild(price);
    stockInfoEl.appendChild(dayRange);
    stockInfoEl.appendChild(yearRange);
    stockInfoEl.appendChild(mktCap);
    stockInfoEl.appendChild(peRatio);
    stockInfoEl.appendChild(divYield);
}


function getNews(company) {

    let apiUrl = `https://gnews.io/api/v4/search?q=${company}&country=us&sortby=relevance&token=${apiKey}`;

    
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        displayNews(data);
    });
}
    

function displayNews(data) {
    newsEl.innerHTML = "";
    for(let i =0; i < 3; i++){
        let articleDiv = document.createElement("div");
        articleDiv.classList.add("newsCard");
        let textDiv= document.createElement("div");
        let description = document.createElement("p");
        let headline = document.createElement("a");
        let image = document.createElement("img");
        headline.textContent = data.articles[i].title;
        headline.href = data.articles[i].url;
        headline.target="_blank";
        // populate the description/content of article, it lets you know how many characters are still available to read.
        description.textContent = data.articles[i].content;
        image.src = data.articles[i].image;
        // div container
        textDiv.appendChild(headline);
        textDiv.appendChild(description);
        articleDiv.appendChild(image);
        articleDiv.appendChild(textDiv);
        newsEl.appendChild(articleDiv);
    }
}


//---------------------------------------------
// Rhyce's Code Start
//---------------------------------------------
// Begin Modal JS
// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// End Modal JS

// let requestUrl = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S"
// let requestTickers = `https://api.polygon.io/v2/reference/tickers?&market=stocks&search=microsoft&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S` ;


let options = document.getElementById("companyOptions") ;
let inputEl ;
let searchInput ;

document.getElementById("searchButton").addEventListener("click", function() {

    options.removeAttribute("class") ;

    inputEl = document.getElementById("searchInput") ;
    console.log(inputEl.value)
    searchInput = inputEl.value

    console.log(searchInput) ;

    let requestTickers1 = `https://api.polygon.io/v2/reference/tickers?sort=ticker&search=${searchInput}&perpage=50&page=1&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S`

    console.log(requestTickers1)

    getTickers(requestTickers1);
})

//api parameters
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
                if (response.status === 404) {
                    // alert("Sorry, no response, please try again") ;
                    modal.style.display = "block";
                }

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

                let companyOptions = document.getElementById("companyOptions") ;

                //Show Options
                for (let i=0; i< companies.length; i++) {
                    let newOption = document.createElement("button") ;

                    let ticker = companies[i]["ticker"] ;
    
                    let name = companies[i]["name"] ;

                    newOption.textContent = `(${ticker}) ${name}`

                    newOption.setAttribute("class", "clarifyChoice") ;

                    newOption.classList.add("optionButton") ;

                    newOption.setAttribute("value", ticker)

                    newOption.addEventListener("click", function() {

                        inputEl.value = "" ;

                        options.setAttribute("class", "hide") ;

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
                        getStock(ticker); 
                        getNews(ticker);

                    })

                    companyOptions.appendChild(newOption) ;

                }
            });   
}

let companyLogo = document.getElementById("companyLogo") ;
let companyName = document.getElementById("companyName") ;
let companyDescription = document.getElementById("companyDescription") ;
let companyUrl = document.getElementById("companyUrl") ;

function getStockData(ticker) {
    console.log("getStockData function called") ;
    let url = `https://api.polygon.io/v1/meta/symbols/${ticker}/company?&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S` ;
    console.log(url) ;
        fetch(url)
            .then(function (response) {
                console.log(response.status);
                //  Conditional for the the response.status.
                if (response.status === 404) {
                    // alert("Sorry, no response, please try again") ;
                    modal.style.display = "block";
                }
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

            lastSearch.setAttribute("type", "button") ;

            lastSearch.setAttribute("class", "recentSearchButton") ;

            lastSearch.classList.add("optionButton")

            lastSearch.setAttribute("value", ticker) ;

            lastSearch.addEventListener("click", function(event) {

                ticker = event.target.getAttribute("value")

                console.log(ticker) 
                getStockData(ticker)
                getStock(ticker) 
                getNews(ticker)
               
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

// const labels = [
//     'seven',
//     'six',
//     'five',
//     'four',
//     'three',
//     'two',
//     'one'
//   ];
//   let data = {
//     labels: labels,
//     datasets: [{
//       label: 'Closing Stock Price for Last Seven Days',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     }]
//   };


//   let config = {
//     type: 'line',
//     data,
//     options: {
//         scales: {
//             x: {
//               title: {
//                 color: 'blue',
//                 display: true,
//                 text: 'day(s)-ago'
//               }
//             },
//             y: {
//                 title: {
//                   color: 'blue',
//                   display: true,
//                   text: 'Stock Price ($)'
//                 }
//               }
//         }
//     }
    
//   };

//   var myChart = new Chart(
//     document.getElementById('myChart'),
//     config
//   );

initializeLocalStorage() ;


// fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=AAPL&region=US", {
// 	"method": "GET",
//     // "mode": "no-cors",
// 	"headers": {
// 		"x-rapidapi-key": "ef5468e116msh11c48f47b928321p18e54ajsn6d5617cd94a9",
// 		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
// 	}
// })
// .then(response => {
//     return response.json();
// }).then (data => {console.log(data);})
// .catch(err => {
// 	console.error(err);
// });
// ---------------------------------------------
// Rhyce's Code End
// ---------------------------------------------
