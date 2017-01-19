// Grab the data from keys.js. Then store the keys in a variable.
var keys = require("./keys.js");
var data = keys.twitterKeys;
var Twitter = require('twitter');
var Spotify = require('spotify');
var input = process.argv[2];
var input_title = process.argv[3];

var client = new Twitter({
    consumer_key: data.consumer_key,
    consumer_secret: data.consumer_secret,
    access_token_key: data.access_token_key,
    access_token_secret: data.access_token_secret
});

switch (input) {
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        spotify(input_title);
        break;
    case "movie-this":
        console.log("movie-this");
        break;
}

// twitter function that grabs and displays 20 recent tweets from my account
function twitter() {
    client.get('statuses/user_timeline', { user_id: 'deokpyo', count: 20 }, function (error, tweets, response) {
        if (error) throw error;
        for (i in tweets) {
            console.log("My tweet: " + tweets[i].text, "Created at: " + tweets[i].created_at);
        }
    });
}

// spotify function to search and display information about the song title given
function spotify(title) {
    Spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // object reference
        var album = data.tracks.items;
        for (i in album) {
            var artists = [];
            // loop for multiple artists
            for (name in album[i].artists){
                artists.push(" " + album[i].artists[name].name);
            }
            console.log("Artist(s): " + artists, "| Title: " + album[i].name, "| Preview Link: " + album[i].preview_url, "| Album: " + album[i].album.name);
        }
    });
}

