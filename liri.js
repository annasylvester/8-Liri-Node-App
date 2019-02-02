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
            break;
    }
}

// // Concert this Function (Calls bands in town API)
// function getConcertInfo(parameter) {

//     concertArtist = "";

//     // If there isnt an artist requested
//     if (parameter === undefined) {
//         console.log("Oops! You need to include an artist to search concerts they might have near you.")
//     } else {
//         concertArtist = parameter;
//     }

//     // Bands in town query
//     let queryURL = "https://rest.bandsintown.com/artists/" + concertArtist + "/events?app_id=codingbootcamp";

//     //Axios request
//     axios.get(queryUrl).then(
//         function (response) {
//             console.log("Release Year: " + response.data.Year);
//         }
//     );
// }


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
        log("Artist(s): " + artists);
        log("Song: " + data.tracks.items[0].name);
        log("Preview Link : " + data.tracks.items[0].preview_url)
        log("Album: " + data.tracks.items[0].album.name);
    });
}

// OMDB Function (concert-this)
function getMovieInfo(parameter) {
    let movieName = parameter;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl)
        .then(function (response) {

            // Logs Movie data
            log("Title: " + response.data.Title)
            log("Release Year: " + response.data.Year);
            log("IMDB rating: " + response.data.imdbRating)
            log("Rotten Tomatoes rating: " + response.data.tomatoMeter)
            log("Country produced in: " + response.data.Country)
            log("Language produced in: " + response.data.Language)
            log("Plot of movie: " + response.data.Plot)
            log("Actors in movie: " + response.data.Actors)
        })

        .catch(function (error) {
            log("Error occured getting OMDB data: " + error)
        })
}

