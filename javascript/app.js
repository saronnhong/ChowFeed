// Search Button Protocol
$("#searchButton").on("click", function (event) {
    // search recipe (food2fork)
    var searchTerm = $("#searchFood").val();
    var API_Key = "2e49e2c85c1e845bbc21c3ea12d350f7";
    var queryURL = "https://www.food2fork.com/api/search?key=" + API_Key + "&q=" + searchTerm + "&page=1";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#results").text(JSON.stringify(response));
    });

    // search Yelp for restauratn

    queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="+ searchTerm + "&location=sandiego&sort_by=rating";

    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer k5B2o56mcAHxciwOt2ZfMkycA27iEJXTcgKa4Nl4dgJsMC1dfeD- az31R - 2U_qhHAn91iU_hVcb75hVFDFq8y7kslgCTTW_CAuAc_c2XvRdsZj10800YMCu8VX75XHYx',
        },
        method: "GET"
    }).then(function (response) {
            for (var i = 0; i < 10; i++)
                console.log(response);
            console.log(response.businesses[i].name);
            console.log(response.businesses[i].image_url);
            console.log(response.businesses[i].url);   //url to Yelp
    });
    
 });

