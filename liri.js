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

var bandsURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp&date=2018-08-25%2C2018-09-01"

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
            console.log(data);
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
        var artistInfo = data.tracks.items;

        console.log("Artist Name: " + (artistInfo[0].artists[0].name))
        console.log;
        console.log(artistInfo[0].external_urls)
        console.log(artistInfo[0].album.name);


    });
}

//OMDB Function Definition
function movieThis() {

}