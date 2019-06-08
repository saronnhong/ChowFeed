//********************************************************/
// recipeReults object - list of recipes from food2fork
// recipeResults[i].id    : recipe id 
// recipeResutls[i].image : link to image url.
// recipeResults[i].title : name of the recipe
// recipeResults[i].url   : like to the page that has the detail of that recipe.

var recipeResults = [];


var restaurantResults = [];

// Search Button Protocol
$("#searchButton").on("click", function (event) {
    // search recipe (food2fork)
    var searchTerm = $("#searchFood").val();
    var API_Key = "bb406a742ced5a8a94ef92e03ff0b5c2";
     
    var queryURL = "https://www.food2fork.com/api/search?key=" + API_Key + "&q=" + searchTerm + "&page=1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var recipeResponse = JSON.parse(response);

        for(var i=0; i<recipeResponse.recipes.length; i++) {
            var currRecipe = recipeResponse.recipes[i];
            var recipe = {
                id : currRecipe.recipe_id,
                image : currRecipe.image_url,
                title : currRecipe.title,
                url : currRecipe.source_url
            };
            recipeResults.push(recipe);

        }
        //console.log(recipeResults);

    });

    // search Yelp for restauratn
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + searchTerm + "&location=sandiego&sort_by=rating";
/*
    //console.log(queryURL);
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer k5B2o56mcAHxciwOt2ZfMkycA27iEJXTcgKa4Nl4dgJsMC1dfeD-az31R-2U_qhHAn91iU_hVcb75hVFDFq8y7kslgCTTW_CAuAc_c2XvRdsZj10800YMCu8VX75XHYx',
        },
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++)
        console.log(response);
        console.log(response.businesses[i].name);
        console.log(response.businesses[i].image_url);
        console.log(response.businesses[i].url);   //url to Yelp

        localStorage.setItem("name", response.businesses[i].name);
        localStorage.setItem("business image URL", response.businesses[i].image_url);
        localStorage.setItem("yelp url", response.businesses[i].url);
    });
*/
});

