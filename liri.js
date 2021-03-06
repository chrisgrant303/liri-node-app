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
            "Click Here For More: " + (JSON.stringify(artistInfo[0].external_urls)) + " \n" + //I tried to remove the "spotify" from the console print but was unable
            "Album Name: " + (artistInfo[0].album.name));
    });
}

function movieThis() {
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {

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

//Do What I Say Function Definition
function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var content = data.split(",");

        var consoleCommand = content[0].split('* ').join('');
        var consoleInput = content[1];

        console.log(consoleCommand);
        console.log(consoleInput);
    }) // I'm so close to figuring out how to call the Spotify function from here but am not quite there yet!!
}; 