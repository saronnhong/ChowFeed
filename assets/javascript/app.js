function buildRecipeQueryURL(searchStr) {
    var queryURL = "https://www.food2fork.com/api/search?";

    var queryParams = { "key": "394f5fbd8aa51b48b9cf6a6de815c765" };
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

    if (limit > 0) {
        queryParams.limit = limit;
    }

    console.log($.param(queryParams));
    return queryURL + $.param(queryParams);
}

function populateRecipes(keyword) {
    var queryURL = buildRecipeQueryURL(keyword);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var recipeResponse = JSON.parse(response);
        for (var i = 0; i < recipeResponse.recipes.length; i++) {
            var currRecipe = recipeResponse.recipes[i];
            $(".recipe" + (i + 1)).attr("recipe-id", currRecipe.recipe_id);
            $("#card-recipe-img" + (i + 1)).attr("src", currRecipe.image_url);
            $("#card-recipe-title" + (i + 1)).text(currRecipe.title);
        }
    });
}

// if you don't pass 'limit' when calling this function, it will return 20 restaurants in response.
function populateRestaurants(keyword, limit = -1) {
    queryURL = buildYelpQueryURL(keyword, limit);
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer k5B2o56mcAHxciwOt2ZfMkycA27iEJXTcgKa4Nl4dgJsMC1dfeD-az31R-2U_qhHAn91iU_hVcb75hVFDFq8y7kslgCTTW_CAuAc_c2XvRdsZj10800YMCu8VX75XHYx',
        },
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.businesses.length && i < 10; i++) {
            var currRest = response.businesses[i];
            $(".restaurant" + (i + 1)).attr("restaurant-id", currRest.id);
            $("#card-rest-img" + (i + 1)).attr("src", currRest.image_url);
            $("#card-rest-title" + (i + 1)).text(currRest.name);
        }
    });
}
// Search Button Protocol
// onclick='window.location.href = "results.html";'


$("#search-food-form").on("submit", function (e) {
    e.preventDefault();

    var searchKey = $("#searchFood").val();

    populateRecipes(searchKey);
    populateRestaurants(searchKey);
    $("#result-restaurant-header").text("Restaurants found...");
    $("#result-recipe-header").text("Recipes found...");
});

function getTrendyRecipes() {
    var queryURL = buildRecipeQueryURL("");
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var recipeResponse = JSON.parse(response);
        recipeResults = [];
        for (var i = 0; i < recipeResponse.recipes.length; i++) {
            var currRecipe = recipeResponse.recipes[i];
            var recipe = {
                id: currRecipe.recipe_id,
                image_url: currRecipe.image_url,
                title: currRecipe.title,
                url: currRecipe.source_url
            };

            recipeResults.push(recipe);
            $(".recipe" + (i + 1)).attr("recipe-id", recipe.id);
            $("#card-recipe-img" + (i + 1)).attr("src", recipe.image_url);
            $("#card-recipe-title" + (i + 1)).text(recipe.title);

        }
    });
}

$(".card-img-top").on("click", function () {
    console.log($(this).parent().attr("data-type"))
    if ($(this).parent().attr("data-type") === "recipe") {
        console.log("click recipe id = " + $(this).attr("recipe-id"));
        localStorage.setItem("recipeId", $(this).parent().attr("recipe-id"));
        window.location.href = "recipe.html";
    } else {
        console.log("click restaurant id = " + $(this).attr("restaurant-id"));
        localStorage.setItem("restaurantId", $(this).parent().attr("restaurant-id"));
        console.log(this);
        window.location.href = "restaurant.html";
    }

});


faveObjArrayRecipe = [];
faveObjArrayRest = [];



$(".faves").on("click", function () {
    var faveObjRest = {};
    var faveObjRecipe = {}
    // console.log($(this).parent().siblings().attr("src"));
    // console.log($(this).siblings().text());
    // console.log($(this).parent().parent().attr("restaurant-id"));
    $(this).html("<i class='fas fa-heart'></i>");
    console.log($(this).parent().parent().attr("restaurant-id"));
    console.log()
    var faveObjArrayRest = [];
    for (var i = 0; i < 3; i++) {
        if ($(this).parent().parent().attr("restaurant-id") === faveObjArrayRest[i].restaurantId) {
            return;
        }else{
            faveObjRest.image = $(this).parent().siblings().attr("src");
            faveObjRest.title = $(this).siblings().text();
            faveObjRest.restaurantId = $(this).parent().parent().attr("restaurant-id");
            faveObjArrayRest.push(faveObjRest);
            console.log(faveObjArrayRest);
            var stringedRest = JSON.stringify(faveObjArrayRest);
            localStorage.setItem("favorites", stringedRest);
        }
    }

});



$("#result-restaurant-header").text("Trendy Restaurants");
$("#result-recipe-header").text("Trendy Recipes");
populateRestaurants("trendy restaurant", 4);
// populateRecipes("");



