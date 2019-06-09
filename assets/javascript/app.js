//********************************************************/
// recipeResults object - list of recipes from food2fork
// recipeResults[i].id        : recipe id 
// recipeResutls[i].image_url : link to image url.
// recipeResults[i].title     : name of the recipe
// recipeResults[i].url       : link to the page that has the detail of that recipe.
var recipeResults = [];

//********************************************************/
// restaurantResults object - list of restaurant from Yelp
// restaurantResults[i].id        : restuarant id 
// restaurantResults[i].image_url : link to image url.
// restaurantResults[i].title     : name of the restaurant
// restaurantResults[i].url       : link to yelp page that has the detail of that restaurant.
var restaurantResults = [];

function buildRecipeQueryURL(searchStr) {
     var queryURL = "https://www.food2fork.com/api/search?";
  
    var queryParams = { "key": "bb406a742ced5a8a94ef92e03ff0b5c2" };
    queryParams.q = searchStr;
    queryParams.page = 1;
    
    console.log($.param(queryParams));
    return queryURL + $.param(queryParams);
}

function buildYelpQueryURL(searchStr) {
     var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";

    var queryParams = { "term": searchStr };
    queryParams.location = "san diego";
    queryParams.sort_by = "rating";

    console.log($.param(queryParams));
    return queryURL + $.param(queryParams);
}

// Search Button Protocol
$("#searchButton").on("click", function (event) {
    var searchTerm = $("#searchFood").val();
    
    var queryURL = buildRecipeQueryURL( searchTerm );
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var recipeResponse = JSON.parse(response);
        recipeResults = [];
        for(var i=0; i<recipeResponse.recipes.length; i++) {
            var currRecipe = recipeResponse.recipes[i];
            var recipe = {
                id : currRecipe.recipe_id,
                image_url : currRecipe.image_url,
                title : currRecipe.title,
                url : currRecipe.source_url
            };
            recipeResults.push(recipe);

        }
        // console.log(recipeResults);

    });

    queryURL = buildYelpQueryURL( searchTerm );
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer k5B2o56mcAHxciwOt2ZfMkycA27iEJXTcgKa4Nl4dgJsMC1dfeD-az31R-2U_qhHAn91iU_hVcb75hVFDFq8y7kslgCTTW_CAuAc_c2XvRdsZj10800YMCu8VX75XHYx',
        },
        method: "GET"
    }).then(function (response) {
        var restaurantResponse = response;
        restaurantResults = [];
        for(var i=0; i<response.businesses.length && i<10; i++) {
            var currRest = response.businesses[i];
            var restaurant = {
                id : currRest.id,
                image_url : currRest.image_url,
                name : currRest.name,
                url : currRest.url
            };
            restaurantResults.push(restaurant);

        }
        // console.log(restaurantResults);
    });

});

