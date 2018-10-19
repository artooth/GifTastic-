// DATA
let showButtons = ["Coffee", "Milk", "Wine", "Beer"];

// FUNCTIONS
function showImages() {
  $("#show-images").empty();
  let input = $(this).attr("data-name");
}
//buttons

function workingButtons() {
  console.log("workingbuTTONS fired!");

  $("#show-buttons").empty();

  for (let j = 0; j < showButtons.length; j++) {
    let newButton = $("<button>");
    newButton.attr("class", "btn btn-default beverages");
    newButton.attr("data-name", showButtons[j]);
    newButton.text(showButtons[j]);
    $("#show-buttons").append(newButton);
  }
}

// LOGIC FLOW
workingButtons();

$(document).on("click", ".beverages", function() {
  let beverage = $(this).attr("data-name");
  let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    beverage +
    "&api_key=npASTmqhSgwgFQ7646n3IcDGikuRWxu7&limit=10";
  //   console.log("QUERY URL: ", queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (let i = 0; i < response.data.length; i++) {
      let displayDiv = $("<div>");
      displayDiv.addClass("holder");

      let image = $("<img>");
      image.attr("src", response.data[i].images.fixed_height.url);
      image.attr("data-still", response.data[i].images.fixed_height_still.url);
      image.attr("data-animate", response.data[i].images.fixed_height.url);
      image.attr("data-state", "still");
      image.attr("class", "gif");
      displayDiv.append(image);

      let rating = response.data[i].rating;
      let pRating = $("<p>").text("Rating : " + rating);
      displayDiv.append(pRating);

      $("#show-images").append(displayDiv);
    }
  });
});

$(document).on("click", "#submitButton", function() {
  let input = $("#user-input")
    .val()
    .trim();
  //   form.reset();
  workingButtons.push(input);

  workingButtons();

  return false;
});
