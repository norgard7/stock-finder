
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

    // console.log(requestTickers1) ;

    let companyNames = [] ;

    let companies = []

    // let companyObj = {
    //     "company": {
    //         "ticker": "",
    //         "name": ""
    //     }
    // }


 

    // $("#tags").autocomplete({
    //     source: companyNames
    // })

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

                // for (let i=0; i < tickerObject.length; i++) {
                //     companyNames.push(tickerObject[i]["ticker"])
                // }

                // console.log(companyNames) ;

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

                for (let i=0; i< companies.length; i++) {
                    let newOption = document.createElement("h3") ;

                    let ticker = companies[i]["ticker"] ;
    
                    let name = companies[i]["name"] ;

                    newOption.textContent = `(${ticker}) ${name}`

                    companyOptions.appendChild(newOption) ;

                }

            


            });


        
}


function getStockData() {

}



















//---------------------------------------------
// Rhyce's Code End
//---------------------------------------------

