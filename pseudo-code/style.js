let newsEl = document.querySelector("#news");
let apiKey = "8cd8f664033325a7f14a5b678865218c";

function getNews(company) {
    let apiUrl = 'https://gnews.io/api/v4/search?q='+ company + '&country=us&token=sortby=relevance&token=' + apiKey;
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}




// JS Markup

// Mark const to declare no future change

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