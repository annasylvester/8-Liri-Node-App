const log = console.log;

// Instructions to User
log("After 'node liri.js', try typing one of the following commands:");
log("1. concert-this 'artist/band name'");
log("2. spotify-this-song 'song name'");
log("3. movie-this 'movie name'")
log("4. do-what-it-says")


// DOTENV require
require("dotenv").config();


// Spotify Request
const keys = require('./keys');
const Spotify = require('node-spotify-api')
let spotify = new Spotify(keys.spotify)


// Action requested
let userRequest = process.argv[2];
let userRequestDetail = process.argv[3];

// FUnction
function searchStuff(userRequest, userRequestDetail) {

    // Switches up the first input from user to call different functions
    switch (userRequest) {

        // Calls the Bands in Town function
        case "concert-this":
            break;

            // Calls the Spotify function
        case "spotify-this-song":
            break;

            // Calls the Axios OMDB function
        case "movie-this":
            break;

            // Calls the Do what it says function - which runs spotify function from the random.txt document
        case "do-what-it-says":
            break;
    }
}


// Spotify Function
function getSpotifyInfo(songTitle) {
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
        log("Artist(s): " + artists);
        log("Song: " + data.tracks.items[0].name);
        log("Preview Link : " + data.tracks.items[0].preview_url)
        log("Album: " + data.tracks.items[0].album.name);
    });
}

getSpotifyInfo("All the Small Things");