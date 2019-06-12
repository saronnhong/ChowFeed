function showRestaurant(restaurantId) {
    queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + restaurantId;
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer k5B2o56mcAHxciwOt2ZfMkycA27iEJXTcgKa4Nl4dgJsMC1dfeD-az31R-2U_qhHAn91iU_hVcb75hVFDFq8y7kslgCTTW_CAuAc_c2XvRdsZj10800YMCu8VX75XHYx',
        },
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        
        $("#title").text(response.name);
        $("#image").html("<img src='" + response.image_url + "'>");
        $("#details").html("<p>Address: "+response.location.display_address+"</p>");
        $("#details").append("<p>Phone Number: "+response.display_phone+"<p>");
        $("#details").append("<p>Rating: "+response.rating+"<p>");
        $("#details").append("<p>Review Count: "+response.review_count+"<p>");
        // $("#details").append("<p>Yelp URL: "+response.url+"<p>");
        $("#details").append("<a href='" + response.url +"'>Click to Read the Yelp Reviews</a>");
        });
        // save to local storage
    };
var storedRestaurant = localStorage.getItem("restaurantId");
showRestaurant(storedRestaurant);