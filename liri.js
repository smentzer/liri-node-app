require("dotenv").config();

var keys = require("./keys.js");
var axios = require(".axios");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var omdb = require('omdb');
var omdb = new omdb(keys.omdb)

var bit_js = require('bit_js');
var bit_js = new bits_js(keys.bits_js)


var moment = require('moment');

var command = process.argv[2];

// NPM module used to access OMDB API.
var request = require("request");
// NPM module used to read the random.txt file.
var fs = require("fs");


//hi i dnt know whats happening 
//things i want to happen 
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }


