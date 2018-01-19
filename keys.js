var Twitter = require('twitter');

var twitter = new Twitter({
    consumer_key: '9qcHVDX1kEfw6ZRjlLoTYzlJ3',
    consumer_secret: 'zETnQsLcbbFAkTkcVfBc4ahjl0x3ZmKkf9grakpOaeFV9BP1Ts',
    access_token_key: '	954129768135327744-2gk7Fwqqj8hZVUsVvR79hoVkBmvm3fz',
    access_token_secret: 'kQzq5gIG72Axd2SmxnwLFaRZ3gBj2VmwKj7f3fkjBW5Zc'
});

var params = {
    screen_name: 'nodejs'
};
twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: 'fe19c0e2b0aa4d75a85ff2e40a17f122',
    secret: '487f069e143544f6b589ff02515d9865'
});

spotify.search({
    type: 'track',
    query: 'All the Small Things'
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});

module.exports = {
    twitter,
    spotify
};