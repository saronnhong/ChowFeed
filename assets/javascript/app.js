//  to get data from localStorage

//    var data = localStorage.getItem("recipeList");
 //   recipeList = JSON.parse(data);
  


function buildRecipeQueryURL(searchStr) {
     var queryURL = "https://www.food2fork.com/api/search?";
  
    var queryParams = { "key": "2a996bdd7f224360d3b46f891e23fc2e" };
    queryParams.q = searchStr;
    queryParams.page = 1;

    console.log($.param(queryParams));
    return queryURL + $.param(queryParams);
}

function buildYelpQueryURL(searchStr, limit = -1) {
     var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";

    var queryParams = { "term": searchStr };
    queryParams.location = "san diego";
    queryParams.sort_by = "rating";

    if (limit>0) {
        queryParams.limit = limit;
    }


    console.log($.param(queryParams));
    return queryURL + $.param(queryParams);
}

// Search Button Protocol
$("#search-food-form").on("submit", function (e) {
    e.preventDefault();
    localStorage.clear();
    var searchTerm = $("#searchFood").val();
    
    var queryURL = buildRecipeQueryURL( searchTerm );
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var recipeResponse = JSON.parse(response);
        var recipeResults = [];
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
        localStorage.setItem("recipeList", JSON.stringify(recipeResults));
    }); 

    queryURL = buildYelpQueryURL( searchTerm );
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer k5B2o56mcAHxciwOt2ZfMkycA27iEJXTcgKa4Nl4dgJsMC1dfeD-az31R-2U_qhHAn91iU_hVcb75hVFDFq8y7kslgCTTW_CAuAc_c2XvRdsZj10800YMCu8VX75XHYx',
        },
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var restaurantResults = [];
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
          // save to local storage

        
        localStorage.setItem("restaurantList", JSON.stringify(restaurantResults));

    });

});

function getTrendyRecipes() {
    var queryURL = buildRecipeQueryURL( "" );
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
            $(".recipe"+ (i+1)).attr("recipe-id", recipe.id);
            $("#card-recipe-img"+ (i+1)).attr("src",recipe.image_url);
            $("#card-recipe-title"+ (i+1)).text(recipe.title);

        }
    });
}

function getTrendyRestaurants() {
    var queryURL = buildYelpQueryURL( "trendy restaurant", 4 );
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer k5B2o56mcAHxciwOt2ZfMkycA27iEJXTcgKa4Nl4dgJsMC1dfeD-az31R-2U_qhHAn91iU_hVcb75hVFDFq8y7kslgCTTW_CAuAc_c2XvRdsZj10800YMCu8VX75XHYx',
        },
        method: "GET"
    }).then(function (response) {
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
            $(".restaurant"+ (i+1)).attr("restaurant-id", restaurant.id);
            $("#card-rest-img"+ (i+1)).attr("src",restaurant.image_url);
            $("#card-rest-title"+ (i+1)).text(restaurant.name);
        }
    });
}

$(".card").on("click", function() {
    console.log("click img");
    console.log($(this).attr("recipe-id"));
    localStorage.setItem("restaurantId", $(this).attr("restaurant-id"));
    localStorage.setItem("recipeId", $(this).attr("recipe-id"));
    window.location.href = "recipe.html";
});

getTrendyRestaurants();
//getTrendyRecipes();