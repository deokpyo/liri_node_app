// Grab the data from keys.js. Then store the keys in a variable.
var x = require("./keys.js");
var Twitter = require('twitter');
var data = x.twitterKeys;
var input = process.argv[2];

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
        console.log("spotify-this-song");
        break;
    case "movie-this":
        console.log("movie-this");
        break;
}

// twitter function that grabs and displays 20 recent tweets from my account
function twitter() {
    client.get('statuses/user_timeline', { user_id: 'deokpyo', count: 20 }, function (error, tweets, response) {
        if (error) throw error;
        for(i in tweets){
            console.log("My tweet: " + tweets[i].text, "Created at: " + tweets[i].created_at);
        }
    });
}
