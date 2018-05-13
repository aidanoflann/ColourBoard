const redis = require('redis');
const settings = require('../settings.js');

// create the redis client
// NOTE: port and host are positional arguments, entered in that order
client = redis.createClient(settings.redis_port, settings.redis_host);

function getPlayers()
// read the entire redis db and generate a list of Player models with their up-to-date logins, etc.
// This is an expensive operation, the output of which should be cached
{
    // TODO watch

    // generate an object mapping each colour to their Player object
    let players = {};
    client.keys('user:*', (err, keys) => {
        keys.forEach((key) => {
            let username = key.split(':')[1];
            console.log('Generating Player model for ' + username + ' using key: ' + key + '.');
            client.hget(key, 'colour', (err, colour) => {
                console.log(colour);
            });
            players[username] = new Player(username, "#00000");
            console.log(players[username]);
        })
    });

    // now update the login history of each Player
    client.lrange('entries', 0, -1, (err, entries) => {
        entries.forEach((entry) => {
            entry_obj = JSON.parse(entry);
            if (entry_obj.colour_to in entries) {

            }
            else
            {
                throw Error('U dun fuckd up');
            }
        })
    });

    // TODO apply
}


class Player
{
    constructor(username, colour)
    {
        this.username = username;  //string
        this.colour = colour;  //string (hash)

        this.currentlyLoggedIn = false;  //bool
        this.logins = [];  //array<Login>
    }

    AddLogin(login, logout) {
        this.logins.push(new Login(login, logout));
    }

}
class Login
{
    constructor(login, logout)
    {
        this.login = login;  // Datetime
        this.logout = logout; // Datetime
    }
}

module.exports = {getPlayers};