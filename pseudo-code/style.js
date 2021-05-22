
let newsEl = document.querySelector("#news");
let apiKey = "8cd8f664033325a7f14a5b678865218c";

function getNews(company) {
    let apiUrl = 'https://gnews.io/api/v4/search?q='+ company + '&country=us&sortby=relevance&token=' + apiKey;
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
        let description = document.createElement("p");
        let headline = document.createElement("a");
        headline.textContent = data.articles[i].title;
        headline.href = data.articles[i].url;
        headline.target="_blank";
        // populate the description
        description.textContent = data.articles[i].description;
        // div container
        articleDiv.appendChild(headline);
        articleDiv.appendChild(description);
        newsEl.appendChild(articleDiv);
    }
}


// let requestUrl = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S"


let requestTickers = "https://api.polygon.io/v2/reference/tickers?search=apple&apiKey=kYxMgr9oqrEq239cvWobO1J4q6rbXL6S" ;

//parameters
tickers = "tickers?"

stocks = "?market=stocks" 

search = "?search=microsoft"

function getApi(requestTickers) {

let companyNames = [] ;

$("#tags").autocomplete({
    source: companyNames
})


// Resolve Error Codes: Server Side Calls
// requestUrl = "https:// ..."

// function getApi(requestUrl) {
//     fetch(requestUrl)
//         .then(function (response) {
//             console.log(response.status);
//             //  Conditional for the the response.status.
//             if (response.status) {
//             }
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// }

// getApi(requestUrl);


    fetch(requestTickers)
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
                companyNames.push(tickerObject[i]["ticker"])
            }

            console.log(companyNames) ;

        });
}

getApi(requestTickers);


/* <script>
  $( function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );
  </script> */

