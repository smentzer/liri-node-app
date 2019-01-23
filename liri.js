require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var nodeArgs = process.argv;
var fullName = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    fullName = fullName + "+" + nodeArgs[i];
  } else {
    fullName += nodeArgs[i];
  }
}

//things i want to happen
// movie-this-
// concert-this-
// spotify-this-song-
// do-what-it-says

// movie-this
var movie = function() {
  var movieObj = {
    //too console log better
    BegDivider: "",
    Title: "",
    Year: "",
    imdbRate: "",
    rottenRate: "",
    Country: "",
    Language: "",
    Plot: "",
    Actors: "",
    //too console log better
    EndDivider: ""
  };

  //default
  if (fullName === "") {
    fullName = "Mr. Nobody";
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + fullName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    movieObj.BegDivider = "~~~~~~~~~~~~~~~~~~~~~~~~~~";
    movieObj.Title = "Title: " + response.data.Title;
    movieObj.Year = "Year: " + response.data.Year;
    movieObj.imdbRate = "IMDB Rating: " + response.data.imdbRate;
    movieObj.rottenRate =
      "Rotten Tomato Rating: " + response.data.Ratings[1].Value;
    movieObj.Country = "Production Location: " + response.data.Country;
    movieObj.Language = "Language " + response.data.Language;
    movieObj.Plot = "Plot " + response.data.Plot;
    movieObj.Actors = "Actors " + response.data.Actors;
    //too console log better
    movieObj.EndDivider = "~~~~~~~~~~~~~~~~~~~~~~~~~~";

    for (var key in movieObj) {
      console.log(movieObj[key]);
    }
  });
};

//concert-this
var concert = function() {
 
  var concertObj = {
    //too console log better
    BegDivider: "",
    Venue: "",
    VenLoc: "",
    Date: "",
    //too console log better
    EndDivider: ""
  };
  
  var queryUrl =
    "https://rest.bandsintown.com/artists/" + fullName +  "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response) {
        concertObj.BegDivider = "~~~~~~~~~~~~~~~~~~~~~~~~~~";
        concertObj.Venue = "Venue: " + response.data[i].venue.name;
        concertObj.VenLoc = "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region;
        concertObj.Date = "Date: " + moment(response.data[i].datetime).format('L')
        //too console log better
        concertObj.EndDivider = "~~~~~~~~~~~~~~~~~~~~~~~~~~";
    
        for (var key in concertObj) {
          console.log(concertObj[key]); 
        }
      });
    };


// spotify-this-song
function spotF() {
 

    if (fullName === "") {
        fullName = 'The Sign Ace of Base';
    };


    spotify.search({ type: 'track', query: fullName })
      .then(function (response) {
        console.log(response)
   

        for (var i = 0; i < response.tracks.items.length; i++) {

            console.log('~~~~~~~~~~~~~~~~~~~~~~~');
            console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
            console.log("Songs Title: " + response.tracks.items[i].name);
            console.log("Album: " + response.tracks.items[i].album.name);
            console.log("Preview Song: " + response.tracks.items[i].preview_url);
            console.log('~~~~~~~~~~~~~~~~~~~~~~~');
        }
      })
      .catch(err=> console.log(err))
}

// do-what-it-says
function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    console.log(error);
  } 

data = data.split(",")
fullName = data[1];

switch (data[0]) {
  case "spotify-this-song":
    spotF();
    break;
}
});
}  



     
      
      
      





//call the commands
switch (command) {
  case "movie-this":
    movie();
    break;
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    spotF();
    break;
  case "do-what-it-says":
    doIt();
    break;
}


