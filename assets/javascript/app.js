function buildRecipeQueryURL(searchStr) {
    var queryURL = "https://www.food2fork.com/api/search?";
    var queryParams = { "key": "bb406a742ced5a8a94ef92e03ff0b5c2" };

    var queryParams = { "key": "705ea316cb21958e2336fa872f878f61" };
    queryParams.q = searchStr;
    queryParams.page = 1;

    //console.log($.param(queryParams));
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

    //console.log($.param(queryParams));
    return queryURL + $.param(queryParams);
}

var pageRecipe = 0;
function populateRecipes(keyword) {
    var queryURL = buildRecipeQueryURL(keyword);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
        localStorage.setItem("recipeList", response);
        pageRecipe = 0;
        displayRecipes();
    });
}

var page = 0;
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
        //console.log(response);
        localStorage.setItem("restList", JSON.stringify(response));
        page = 0;
        displayRestaurants();
    });
}

$("#search-food-form").on("submit", function (e) {
    e.preventDefault();

    var searchKey = $("#searchFood").val();

    populateRecipes(searchKey);
    populateRestaurants(searchKey);
    $("#result-restaurant-header").text("Restaurants found...");
    $("#result-recipe-header").text("Recipes found...");
});

$(".card-img-top").on("click", function() {
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
populateRestaurants("trendy restaurant");
populateRecipes("");

function displayRestaurants() {
    var restListToUse = localStorage.getItem("restList");
    var restObj = JSON.parse(restListToUse);
    console.log(page + " " + restObj.businesses.length);
    for (var i = page, j = 1; i < page + 4; i++ , j++) {
        $(".restaurant" + (j)).attr("restaurant-id", restObj.businesses[i].id);
        $("#card-rest-img" + (j)).attr("src", restObj.businesses[i].image_url);
        $("#card-rest-title" + (j)).text(restObj.businesses[i].name);
    }
    page += 4;
    if (page >= restObj.businesses.length) {
        page = 0;
    } else if ((page + 4) > restObj.businesses.length) {
        page = 0;
    }
}

function displayRecipes() {

    var recipeListToUse = localStorage.getItem("recipeList");
    var recipeObj = JSON.parse(recipeListToUse);

    console.log("recipe num : " + recipeObj.recipes.length);
    for (var i = pageRecipe, j = 1; i < pageRecipe + 4; i++ , j++) {
        $(".recipe" + (j)).attr("recipe-id", recipeObj.recipes[i].recipe_id);
        $("#card-recipe-img" + (j)).attr("src", recipeObj.recipes[i].image_url);
        $("#card-recipe-title" + (j)).text(recipeObj.recipes[i].title);
    }
    pageRecipe += 4;
    if (pageRecipe >= recipeObj.recipes.length) {
        pageRecipe = 0;
    } else if ((pageRecipe + 4) > recipeObj.recipes.length) {
        pageRecipe = 0;
    }
}

$("#nextButtonRest").on("click", function () {
    $("#nextButtonRest").attr("numHold", page);
    displayRestaurants();
});


$("#nextButtonRecipe").on("click", function () {
    $("#nextButtonRest").attr("numHold", pageRecipe);
    displayRecipes();
});