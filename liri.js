//const keys = require('./keys.js');
//const fs = require('fs');


switch (process.argv[2]) {
    case 'my-tweets':
        day = "Sunday";
        break;
    case 'spotify-this-song':
        day = "Monday";
        break;
    case 'movie-this':
        day = "Tuesday";
        break;
    case 'do-what-it-says':
        day = "Wednesday";
        break;
    default:
        console.log('not a valid comment');
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