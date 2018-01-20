const keys = require('./keys.js');
//const fs = require('fs');


switch (process.argv[2]) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
    default:
        console.log('not a valid comment');
}

function getTweets() {
    let params = {
        screen_name: 'kennythai85',
        count: 20
    };

    keys.twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let tweet of tweets) {
                console.log(tweet.text);
            }
            console.log(tweets[0].text);
        } else {
            console.log(error);
        }
    });
}

function writeFile() {
    fs.open('random.txt', 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                fs.appendFile('random.txt', 'faggagda', function (err) {
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

        fs.writeFile('random.txt', 'Hello Node.js', (err) => {
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

        fs.readFile('random.txt', function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;
        });
    });
}