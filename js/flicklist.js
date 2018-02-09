

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "f44bca6b49d111cb5dca5bad5dbc7e14" //MY api key
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;

			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
	var sectionBrowseList = $("#section-browse ul");
	var sectionWatchList = $("#section-watchlist ul");

	// clear everything from both lists
	sectionBrowseList.children().remove();
	sectionWatchList.children().remove();
	
	// for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie){
		sectionWatchList.append($("<li>" + movie + "</li>"));
	});
  
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// insert a list item into the <ul> in the browse section
	  sectionBrowseList.append($("<li>" + movie.title + "</li>"));
		
		// the list item should include a button that says "Add to Watchlist"
		var aButton = $("<button>Add to watchlist</button>");
		sectionBrowseList.append(aButton);
	 
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		aButton.click(function(){
			model.watchlistItems.push(movie.title);
			render();
		});
	});
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

