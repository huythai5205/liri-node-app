const keys = require('./keys.js');
const inquirer = require('inquirer');
const request = require('request');
const fs = require('fs');

inquirer.prompt({
    type: 'list',
    name: 'userPick',
    message: 'What would you like?',
    choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
}).then((data) => {
    switch (data.userPick) {
        case 'my-tweets':
            getTweets();
            break;
        case 'spotify-this-song':
            inquirer.prompt({
                type: 'input',
                name: 'songName',
                message: "what's the song name?"
            }).then(getSong);
            break;
        case 'movie-this':
            inquirer.prompt({
                type: 'input',
                name: 'movieName',
                message: "what's the movie name?"
            }).then(getMovie);
            break;
        case 'do-what-it-says':
            readFile();
            break;
        default:
            console.log('not a valid command');
    }
});

function getMovie(data) {
    (!data.movieName ? data.movieName = 'Mr.+Nobody' : data.movieName);
    request("http://www.omdbapi.com/?t=" + data.movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let oMovie = JSON.parse(body);
            let string = `
            Movie title:            ${oMovie.Title}
            Year:                   ${oMovie.Year}
            IMDB Rating:            ${oMovie.imdbRating}
            Rotten Tomatoes Rating: ${ oMovie.Ratings[1].Value}
            Language:               ${oMovie.Language}
            Plot:                   ${oMovie.Plot}
            Actors:                 ${oMovie.Actors}
            `;
            console.log(string);
            writeFile(string);
        }
    });
}

function getSong(data) {
    (!data.movieName ? data.songName = 'The+Sign%20artist:Ace+of+Base' : data.songName);
    keys.spotify.search({
        type: 'track',
        query: data.songName,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let string = `
        Artist:         ${data.tracks.items[0].artists[0].name}
        Song's Name:    ${data.tracks.items[0].name}
        Preview link:   ${data.tracks.items[0].preview_url}
        Album name:     ${data.tracks.items[0].album.name}
        `;
        console.log(string);
        writeFile(string);
    });
}

function getTweets() {
    let params = {
        screen_name: 'kennythai85',
        count: 20
    };

    keys.twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            let string = '';
            for (let tweet of tweets) {
                string += `This tweet: ${tweet.text}. Was created at ${tweet.created_at}
                `;
            }
            console.log(string);
            writeFile(string);
        } else {
            console.log(error);
        }
    });
}

function writeFile(data) {
    fs.open('log.txt', 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                fs.appendFile('log.txt', data, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Content Added");
                    }
                });
                return;
            }

            throw err;
        }

        fs.writeFile('log.txt', data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
}

function readFile() {
    fs.open('random.txt', 'r', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('myfile does not exist');
                return;
            }
            throw err;
        }

        fs.readFile('random.txt', 'utf-8', function read(err, data) {
            if (err) {
                throw err;
            }
            getSong({
                'songName': data
            });
        });
    });
}