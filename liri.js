require("dotenv").config();

var keys = require("./keys.js");
var axios = require(".axios");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var moment = require('moment');

var request = require('request');

var command = process.argv[2];
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var fs = require("fs");


//hi i dnt know whats happening 

