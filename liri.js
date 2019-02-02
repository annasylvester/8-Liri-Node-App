const log = console.log;

// Instructions to User
log("After 'node liri.js', try typing one of the following commands:");
log("1. concert-this 'artist/band name'");
log("2. spotify-this-song 'song name'");
log("3. movie-this 'movie name'")
log("4. do-what-it-says")

// REQUIRES //

// DOTENV require
require("dotenv").config();
// Axios require
let axios = require("axios");
// FS require
let fs = require("fs");

// Spotify Request
const keys = require('./keys');
const Spotify = require('node-spotify-api')
let spotify = new Spotify(keys.spotify)


// Action requested from user
let argument = process.argv[2];
let parameter = process.argv[3];

// Calls function to make app work
searchStuff(argument, parameter);

// General function for app to work
function searchStuff(argument, parameter) {

    // Switches up the first input from user to call different functions
    switch (argument) {

        // Calls the Bands in Town function
        case "concert-this":
            getConcertInfo(parameter);
            break;

            // Calls the Spotify function
        case "spotify-this-song":
            getSpotifyInfo(parameter);
            break;

            // Calls the Axios OMDB function
        case "movie-this":
            getMovieInfo(parameter);
            break;

            // Calls the Do what it says function - which runs spotify function from the random.txt document
        case "do-what-it-says":
            getDoWhatItSays(parameter);
            break;
    }
}

// // Concert this Function (Calls bands in town API)
function getConcertInfo(parameter) {
    if (parameter === undefined) {
        artist = "";
        log("------------------");
        log("Oops! You have to include an artist to look up to see if they have concerts near you.")
        log("------------------");
    } else {
        artist = parameter;
    }

    artist = parameter;
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
        .then(function (response) {

            // Logs Movie data
            log("------------------");
            log("Next Concert:")
            log("Venue: " + response.data[0].venue.name);
            log("Location: " + response.data[0].venue.country + ", " + response.data[0].venue.region + ", " + response.data[0].venue.city);
            log("Date: " + response.data[0].datetime);
            log("------------------");
            log("Coming up:")
            log("Venue: " + response.data[1].venue.name);
            log("Location: " + response.data[1].venue.country + ", " + response.data[1].venue.region + ", " + response.data[1].venue.city);
            log("Date: " + response.data[1].datetime);
            log("------------------");
            log("Coming up:")
            log("Venue: " + response.data[2].venue.name);
            log("Location: " + response.data[2].venue.country + ", " + response.data[2].venue.region + ", " + response.data[2].venue.city);
            log("Date: " + response.data[2].datetime);
            log("------------------");
        })

        .catch(function (error) {
            log("Error occured getting BandsInTown data: " + error)
        })
};

// Spotify Function (spotify-this-song)
function getSpotifyInfo(parameter) {
    if (parameter === undefined) {
        songTitle = "The Sign Ace of Base";
    } else {
        songTitle = parameter;
    }
    spotify.search({
        type: 'track',
        query: songTitle
    }, function (err, data) {
        if (err) {
            return log('Error occurred getting Spotify data: ' + err);
        }

        let artistsArray = data.tracks.items[0].album.artists;
        let artistsNames = [];

        for (var i = 0; i < artistsArray.length; i++) {
            artistsNames.push(artistsArray[i].name);
        }
        let artists = artistsNames.join(", ");

        // Logs Spotify Data
        log("------------------");
        log("Artist(s): " + artists);
        log("Song: " + data.tracks.items[0].name);
        log("Preview Link : " + data.tracks.items[0].preview_url)
        log("Album: " + data.tracks.items[0].album.name);
        log("------------------");
    });
};

// OMDB Function (concert-this)
function getMovieInfo(parameter) {

    if (parameter === undefined) {
        movieName = "Mr. Nobody";
    } else {
        movieName = parameter;
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=True&apikey=trilogy";

    axios.get(queryUrl)
        .then(function (response) {

            // Logs Movie data
            log("------------------");
            log("Title: " + response.data.Title);
            log("Release Year: " + response.data.Year);
            log("IMDB rating: " + response.data.imdbRating);
            log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            log("Country produced in: " + response.data.Country);
            log("Language produced in: " + response.data.Language);
            log("Plot of movie: " + response.data.Plot);
            log("Actors in movie: " + response.data.Actors);
            log("------------------");
        })

        .catch(function (error) {
            log("Error occured getting OMDB data: " + error);
        });
}

function getDoWhatItSays(parameter) {
    fs.readFile('random.txt', "utf8", function (error, data) {

        if (error) {
            return display("Error occured getting info from random.txt");
        }

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {

            var songcheck = dataArr[1].trim().slice(1, -1);
            getSpotifyInfo(songcheck);
        }

    });

};

