// Array for buttons which will be passed in as values
var buttons = ["James Bond", "Indiana Jones", "Jason Bourne", "Han Solo",
    "Ethan Hunt"];

makeButton();

function makeButton() {
    // Clear any other buttons on the page
    $(".button-section").empty();
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

$("btn").on("click", function () {
    $(".giph-section").empty();
});

// Click event listener
$(document).on("click", "button", function () {
    $(".giph-section").empty();

    var giphySearch = $(this).attr("searchTerm")
    var giphySearchURL = "http://api.giphy.com/v1/gifs/search?q=" +
        giphySearch + "&api_key=GEpLlvx43Yy5aSTYLfGZcsH4pkPInlxp&limit=12";

    $.ajax({
        url: giphySearchURL,
        method: "GET"
    })
        .then(function (response) {
            var ajaxResponse = response.data;
            for (var i = 0; i < ajaxResponse.length; i++) {
                // Make a new div
                var newGiph = $("<div>");
                newGiph.attr("id", "imageDiv")
                // and make a new image
                var buttonImage = $("<img>");
                // give the image source the STILL url
                buttonImage.attr("src", ajaxResponse[i].images.fixed_height_still.url);
                // Still URL to facilitate animation
                buttonImage.attr("giphStill", ajaxResponse[i].images.fixed_height_still.url);
                // Moving URL to facilitate animation
                buttonImage.attr("giphPlay", ajaxResponse[i].images.fixed_height.url);
                // State so  that animated/still can be tracked
                buttonImage.attr("giphState", "still");
                // add image to newGiph div
                newGiph.prepend(buttonImage);
                // and write newGiph div to the DOM
                $(".giph-section").append(newGiph);
            }
        });
})

// $(document).on("click", "img", function () {
//     var state = $(this).attr("giphState");
//     console.log(state);
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("giphPlay"));
//         $(this).attr("giphState", "play");
//     }
//     else {
//         $(this).attr("src", $(this).attr("giphStill"));
//         $(this).attr("giphState", "still");
//     }
// });

$(document).on("click", "img", function () {
    var state = $(this).attr("giphState");
    if (state === "still") {
        $(this).attr("src", $(this).attr("giphPlay"));
        $(this).attr("giphState", "play");
        limit();
    };
});
function limit() {
    setTimeout(function () {
        var state = $(this).attr("giphState");
        console.log(state);
        $(this).attr("src", $(this).attr("giphStill"));
        $(this).attr("giphState", "still");
        console.log(state);
        console.log("working");
    }, 2000)
};

$("#add_Giphy_button").on("click", function (event) {
    event.preventDefault();
    var newGiphSearch = $("#giph-input").val().trim();
    buttons.push(newGiphSearch);
    makeButton();
});
