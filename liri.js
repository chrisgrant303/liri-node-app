// Script Initializations
require("dotenv").config();
require("./keys.js");

var fs = require("fs");
var request = require("request");
var moment = require("moment");

// Defining variables to extract information from the command line inputs and then save it
var command = process.argv[2];
var input = process.argv[3];

var bandsURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

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

// Bands in Town Function Definition
function concertThis() {
    console.log(bandsURL);
    request(bandsURL, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body).venue);
        }
    });
}

//Spotify Function Definition
function spotifyThisSong() {

}