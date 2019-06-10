
    function displayRecipe(title, image, ingredients, url){
        $("#title").text(title);
        $("#image").html("<img src='" + image + "'>");
        $("#ingredients").text(ingredients);
        $("#url").html("<a href='" + url + "'> Find the Steps</a>" );
    };

    displayRecipe("Chicken Parmesan", 
    "https://www.skinnytaste.com/wp-content/uploads/2012/09/skinny-chicken-parmigiana-550x733.jpg", "chicken", "https://www.skinnytaste.com/baked-chicken-parmesan/");

function showTrendyRecipe(recipeId) {
    var queryURL = "https://www.food2fork.com/api/get?key=2a996bdd7f224360d3b46f891e23fc2e&rId=" + recipeId;

$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
    var oneRecipeResponse = JSON.parse(response);
    console.log(response);
    console.log(oneRecipeResponse.recipe.ingredients);
    for(var i=0; i < oneRecipeResponse.recipe.ingredients.length; i++){
        $("#ingredients").append("<p>" + oneRecipeResponse.recipe.ingredients[i] + "</p>");
    }
})

}
showTrendyRecipe(35382);