// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdHLUkow7AR7k-gsVlNngKXDy3CVOIvc4",
    authDomain: "projectrecipe-a37e4.firebaseapp.com",
    databaseURL: "https://projectrecipe-a37e4.firebaseio.com",
    projectId: "projectrecipe-a37e4",
    storageBucket: "projectrecipe-a37e4.appspot.com",
    messagingSenderId: "610501463659",
    appId: "1:610501463659:web:8f24a1b3e75b84e2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();


// variable for my own recipes
var myRecipes = [];

// this event is triggered after someone push new data into the database.
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
     // Store everything into a variable.
  var rname = childSnapshot.val().name;
  var r = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;
});

// by clicking 'submit' , the new recipe will be added to firebase.  Also , will trigger "child_added" event.
$("#btn-new").on("click", function(e) {
    e.preventDefault();
    console.log("get here");
    rname = $("#recipe-name").val().trim();
    ringredients = $("#recipe-ingredients").val().trim();
    rdirections = $("#recipe-directions").val().trim();

    var newRecipe = {
        name: rname,
        ingredients: ringredients,
        directions: rdirections
      };
    
      // Uploads employee data to the database
    //   database.ref().push(newRecipe);
});

if (myRecipes.length > 0) {
    $("#new-recipe").hide();
} else {
    $("#recipe-list").hide();
}
