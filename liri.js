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
// spotify-this-song
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
  
  let queryUrl =
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
// var spotify = function() {

//      //turn on new spotify app
//      const spotify = new Spotify(spotifyKeys.spotify);

//      if (songName === undefined) {
//          songName = 'The Sign Ace of Base';
//      };
 
//     var spotifyObj = {
//         //too console log better
//         Artist: "",
//         trackName: "",
//         previewUrl: "",
//         Album: "",
//         //too console log better
//         EndDivider: ""
//       };

    



     
      
      
      




















//call the commands
switch (command) {
  case "movie-this":
    movie();
    break;
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    spotify();
    break;
  case "do-what-it-says":
    doIt();
    break;
}

// fs.readFile("random.txt", "utf8", function(error, data) {
//   if (error) {
//     console.log(error);
//   }
// });
