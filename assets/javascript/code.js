var animals = ["hampster", "sheep", "pigs", "mountain lion", "elk", "deer", "mountain goat", "moose"];

// Function rendering buttons named by the 'animals' array
function renderButtons() {

    // clear the old list, and start over
    $("#buttons-view").empty();
    // Loop throught the array, and add a button, a class named animal, 
    // setting data-name and the text to the text given by the array.
    for (idx = 0; idx < animals.length; idx++) {
        var button = $("<button>");
        button.addClass("animal");
        button.attr("data-name", animals[idx]);
        button.text(animals[idx]);
        $("#buttons-view").append(button);
    }

}

// When the user clicks on the Add an ANIMAL button... 
$("#add-animal").on("click", function() {
    // prevent the runtime from submitting the form...so we can actually run some code.
    event.preventDefault();
    // add (push) the animal name typed into the text field onto the animals array.
    // No error checking.  The user can type anything...and we don't check for duplicates.
    animals.push($("#animal-input").val().trim());
    renderButtons();

});

$("#clear").on("click", function() {
    event.preventDefault();
    $("#animal-view").empty();
})

function displayAnimalInfo() {
    //check the attr "data-name" for the animal name
    // $(this) will give us the actual button that was clicked..who knew?
    // scoping!!!!
    var animalName = $(this).attr("data-name");

    // I *could* use "random" instead of "search", but then I'd have to loop it.
    // Costly, but it might produce more varied output...
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&rating=pg&limit=7&q=" + animalName;

    // NOW that I have the animal name, I can use the previous stuff to build
    // an ajax query to get animal gifs....COOL!!!
    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response) {

            console.log(response);
            //var outString = JSON.stringify(response);
            //$("#animal-view").text(outString);
            var results = response.data;
            //console.log(results.length);
            var animalDiv = $("<div>");
            for (var i = 0; i < results.length; i++) {
                //console.log("inside the for");
                // Make a div with jQuery and store it in a variable named animalDiv.

                // Make a paragraph tag with jQuery and store it in a variable named p.
                // Getting rid of this allowed for more output per line.
                // var p = $("<p>");
                // Set the inner text of the paragraph to the rating of the image in results[i].
                //p.text(results[i].rating);
                animalDiv.append(results[i].rating);
                console.log("rating found: ", results[i].rating);
                // Make an image tag with jQuery and store it in a variable named animalImage.
                var animalImage = $("<img>");
                // Set the image's src to results[i]'s fixed_height.url.
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif");
                console.log("url added to attr: ", results[i].images.fixed_height.url);
                // Append the p variable to the animalDiv variable.
                // animalDiv.append(p);
                // Append the animalImage variable to the animalDiv variable.
                animalDiv.append(animalImage);
                // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

            };
            $("#animal-view").prepend(animalDiv);
        });
}

$(document).on("click", ".gif", function() {

    console.log("got into gif click!!!!");
    var state = $(this).attr("data-state");

    // Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});


//$(".animal").on("click"), function(){ } //this will not work for dynamically
// created items....instead, we need to use the following
// event listener for new items I add to my page...IMPORTANT!!!!
$(document).on("click", ".animal", displayAnimalInfo);

// Calling the renderButtons function to display the initial list of animals
renderButtons();

// =================================================================