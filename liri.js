// Grab the data from keys.js. Then store the keys in a variable.
var keys = require("./keys.js");
var data = keys.twitterKeys;

// reference to require commands
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require("request");
var fs = require("fs");

// reference to input data
var input_data = process.argv;
var input_command = process.argv[2];
var input_title = process.argv[3];

// reference to date and twitter account
var time = new Date();
var client = new Twitter({
    consumer_key: data.consumer_key,
    consumer_secret: data.consumer_secret,
    access_token_key: data.access_token_key,
    access_token_secret: data.access_token_secret
});

// for song and movie title with multiple words
if (input_data.length > 4) {
    for (i = 4; i < input_data.length; i++) {
        input_title += " " + input_data[i];
    }
    console.log(input_title);
}

// write the date and user command to the file
var command = "-------------LOGGED DATA: " + time + "-------------" + "\n" + "USER COMMAND: " + input_command;
logfile(command);

// switch to case by user input command
switch (input_command) {
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        // if no title was given, then use default title
        if (input_data.length < 4) {
            var input_title = "The Sign";
        }
        spotify(input_title);
        break;
    case "movie-this":
        // if no title was given, then use default title
        if (input_data.length < 4) {
            var input_title = "Mr. Nobody";
        }
        movie(input_title);
        break;
    case "do-what-it-says":
        doit();
        break;
};

// twitter function that grabs and displays 20 recent tweets from my account
function twitter() {
    client.get('statuses/user_timeline', { user_id: 'deokpyo', count: 20 }, function (error, tweets, response) {
        if (error) throw error;
        for (i in tweets) {
            // make reference to output to be used for console display and to store into log.txt
            var output = "My tweet: " + tweets[i].text + " | Created at: " + tweets[i].created_at;
            console.log(output);
            logfile(output);
        }
    });
};

// spotify function to search and display information about the song title given
function spotify(title) {
    Spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // object reference
        var album = data.tracks.items;
        // if title is default
        if (title === "The Sign") {
            for (i in album) {
                if (album[i].artists[0].name === "Ace of Base") {
                    // make reference to output to be used for console display and to store into log.txt
                    var output = "Artist(s): " + album[i].artists[0].name + " | Title: " + album[i].name + " | Preview Link: " + album[i].preview_url + " | Album: " + album[i].album.name
                    console.log(output);
                    logfile(output);
                }
            }
        }
        else {
            for (i in album) {
                var artists = [];
                // loop for multiple artists
                for (name in album[i].artists) {
                    // for output format purpose
                    if (artists.length = 0) {
                        artists.push(album[i].artists[name].name);
                    }
                    else {
                        artists.push(" " + album[i].artists[name].name);
                    }
                }
                // make reference to output to be used for console display and to store into log.txt
                var output = "Artist(s): " + artists + " | Title: " + album[i].name + " | Preview Link: " + album[i].preview_url + " | Album: " + album[i].album.name
                console.log(output);
                logfile(output);
            }
        }

    });
};

// movie function to run a request to the OMDB API with the movie specified
function movie(title) {
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json&tomatoes=true";
    //request(queryUrl, function(error, response, body) {});
    request({ url: queryUrl, json: true }, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // make reference to output to be used for console display and to store into log.txt
            var output = 'Movie Title: ' + body.Title + '\n' + 'Year Released: ' + body.Year + '\n' + 'IMDB Rating: ' + body.imdbRating + '\n' + 'Country: ' + body.Country + '\n' + 'Language: ' + body.Language + '\n' + 'Plot: ' + body.Plot + '\n' + 'Actors: ' + body.Actors + '\n' + 'Rotten Tomatoes Rating: ' + body.tomatoRating + '\n' + 'Rotten Tomatoes URL: ' + body.tomatoURL;
            console.log(output);
            logfile(output);
        }
    });

}

// function takes the text inside of random.txt and then use it to call one of LIRI's commands
function doit() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        // remove quotes in the string
        var title = dataArr[1].replace(/^"(.*)"$/, '$1')
        spotify(title);
    });
}

// function appends the output data to log.txt file
function logfile(data) {
    var text = data + "\n"
    var textFile = "log.txt";
    fs.appendFile(textFile, text, function (err) {
        if (err) {
            console.log(err);
        }
    });
}
