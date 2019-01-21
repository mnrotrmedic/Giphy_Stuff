// Array for buttons which will be passed in as values
var buttons = ["Cookies", "Pies", "Pastries"];
var clickCount = 0;


makeButton();

function makeButton() {
    // Function to put buttons on page from the buttons array
    buttons.forEach(function (element) {
        // For each button
        var giphyButton = $("<button>");
        // Add Bootstrap classes for the pretty
        giphyButton.addClass("btn btn-primary btn-block")
        // Put text on the buttons
        giphyButton.text(element);
        // Give the buttons elements
        giphyButton.attr("searchterm", element);
        // Put the button with the stuff on the page
        $(".button-section").append(giphyButton);
    });
};

// Click event listener
$("button").on("click", function () {
    var giphySearch = $(this).attr("searchTerm")
    var giphySearchURL = "http://api.giphy.com/v1/gifs/search?q=" +
        giphySearch + "&api_key=GEpLlvx43Yy5aSTYLfGZcsH4pkPInlxp&limit=10";

    $.ajax({
        url: giphySearchURL,
        method: "GET"
    })
        .then(function (response) {
            var ajaxResponse = response.data;
            console.log(ajaxResponse);
            for (var i = 0; i < ajaxResponse.length; i++) {
                // Make a new div
                var newGiph = $("<div>");
                // and make a new image
                var buttonImage = $("<img>");
                // give the image source the STILL url
                buttonImage.attr("src", ajaxResponse[i].images.fixed_height_still.url);
                // add image to newGiph div
                newGiph.append(buttonImage);
                // and write newGiph div to the DOM
                $(".giph-section").append(newGiph);
            }
        });
})

    // MAYBE text box to add giphs
