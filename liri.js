// Script Initializations
require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var request = require("request");
var moment = require("moment");


// Defining variables to extract information from the command line inputs and then save it
var command = process.argv[2];
var input = process.argv[3];

// Defining what functions should be run using switch/case - relevant to the command line inputs
switch (command) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}



