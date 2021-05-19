// JS Markup

// Mark const to declare no future change

// Resolve Error Codes: Server Side Calls
requestUrl = "https:// ..."

function getApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            console.log(response.status);
            //  Conditional for the the response.status.
            if (response.status) {
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

getApi(requestUrl);