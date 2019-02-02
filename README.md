# 8-Liri-Node-App

## Commands

### Calling the Bands In Town API
```bash
node liri.js concert-this "Band Name"
```
![Gif](gifs/concert.gif)

If no band is specified, an error message is displayed.
```bash
node liri.js concert-this
```
![Gif](gifs/concert-default.gif)

### Calling the Spotify API
```bash
node liri.js spotify-this-song "Song Title"
```
![Gif](gifs/spotify.gif)

If no song is specified, The Sign by Ace of Base is searched.
```bash
node liri.js spotify-this-song
```
![Gif](gifs/spotify-default.gif)

### Calling the OMDB API
```bash
node liri.js movie-this "Movie Title"
```
![Gif](gifs/movie.gif)

If no movie is specified, Mr. Nobody is searched.
```bash
node liri.js movie-this
```
![Gif](gifs/movie-default.gif)

### Reading the txt file and searching what is inside
```bash
node liri.js do-what-it-says
```
![Gif](gifs/dowhatitsays.gif)