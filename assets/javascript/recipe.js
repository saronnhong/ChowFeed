F2F_API = [
    "bb406a742ced5a8a94ef92e03ff0b5c2",
    "2e49e2c85c1e845bbc21c3ea12d350f7",
    "394f5fbd8aa51b48b9cf6a6de815c765",
    "3ee04fcbd6e3880c4eba29a637c82104"
];

var currAPI = 0;

function displayRecipe(title, image, url) {
    $("#title").text(title);
    $("#image").html("<img src='" + image + "'>");
    //$("#ingredients").text(ingredients);
    $("#url").html("<a href='" + url + "'> Find the Steps Here</a>");
};

displayRecipe();

function showTrendyRecipe(recipeId) {
    var apiKey = F2F_API[currAPI];
    var queryURL = "https://www.food2fork.com/api/get?key=" + apiKey + "&rId=" + recipeId;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var oneRecipeResponse = JSON.parse(response);
        console.log(oneRecipeResponse);
        displayRecipe(oneRecipeResponse.recipe.title, oneRecipeResponse.recipe.image_url, oneRecipeResponse.recipe.source_url);
        //console.log(oneRecipeResponse.recipe.ingredients);
        for (var i = 0; i < oneRecipeResponse.recipe.ingredients.length; i++) {
            $("#ingredients").append("<p>" + oneRecipeResponse.recipe.ingredients[i] + "</p>");
        }
    }).catch( function(err) {
        console.log("error, key limit");
        currAPI++;
        if (currAPI < F2F_API.length) {
            console.log("next api key : " + currAPI)
            showTrendyRecipe(recipeId);
        } 
    });
}
var storedRecipe = localStorage.getItem("recipeId");
showTrendyRecipe(storedRecipe);
//showTrendyRecipe(28924);