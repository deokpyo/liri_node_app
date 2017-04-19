# LIRI - Language Interpretation and Recognition Interface

1. `node liri.js my-tweets`
    * This will show my last 20 tweets and when they were created at in terminal/bash window.

![picture alt](./preview1.png?raw=true "Preview 1")
- - - -
2. `node liri.js spotify-this-song '<song name here>'`
    * This will show the following information about the song in your terminal/bash window.
        * Artist(s).
        * The song's name.
        * A preview link of the song from Spotify.
        * The album that the song is from.
    * If no song is provided then your program will default to "The Sign" by Ace of Base.
    
![picture alt](./preview2.png?raw=true "Preview 2")
- - - -
3. `node liri.js movie-this '<movie name here>'`
    * This will output the following information to your terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
        * Rotten Tomatoes Rating.
        * Rotten Tomatoes URL.
    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
![picture alt](./preview3.png?raw=true "Preview 3")
- - - -
4. `node liri.js do-what-it-says`
    * Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        * It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
![picture alt](./preview4.png?raw=true "Preview 4")
- - - -
5. In addition to logging the data in terminal/bash window, all logged data are saved to log.txt.