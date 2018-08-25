// Script Initializations
require('dotenv').config()
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

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
            var data = JSON.parse(body);

            for (var key of data.keys()) {
                console.log(key)
            }
        }
    });
}

//Spotify Function Definition
function spotifyThisSong() {

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artistName = data.tracks;
        console.log(artistName);
    });
}