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

//OMDB Specific Variables
var movieName = input;
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";



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
    request(bandsURL, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);

            console.log("You searched for " + input + ",and the soonest event coming up is: " + "\n" +
                "Venue Name: " + (data[0].venue.name) + "\n" +
                "Venue Location: " + (data[0].venue.city) + "\n" +
                "Event Date: " + (data[0].datetime));
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

        console.log("Artist Name: " + (artistInfo[0].artists[0].name) + " \n" +
            "Click Here For More: " + (artistInfo[0].external_urls) + " \n" +
            "Album Name: " + (artistInfo[0].album.name));
    });
}

//OMDB Function Definition
function movieThis() {
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {

            // var dateToConvert = moment((JSON.parse(body).Released)).format("MMM Do YY");
            // console.log(dateToConvert);

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("LIRI SUPER SPECIAL MOVIE DATABASE MANAGER" + "\n" +
                "Movie Title: " + (JSON.parse(body).Title) + "\n" +
                "Release Year: " + (JSON.parse(body).Released) + "\n" +
                "IMDB Rating: " + (JSON.parse(body).imdbRating) + "\n" +
                "Rotten Tomatoes Rating: " + (JSON.parse(body).Ratings) + "\n" +
                "Production Country: " + (JSON.parse(body).Country) + "\n" +
                "Film Language: " + (JSON.parse(body).Language) + "\n" +
                "Plot: " + (JSON.parse(body).Plot) + "\n" +
                "Actors: " + (JSON.parse(body).Actors));
        }
    });
}