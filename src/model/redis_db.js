const redis = require('redis');
const settings = require('../settings.js');
const {PlayerList, Player, Login} = require('./models.js');

// create the redis client
// NOTE: port and host are positional arguments, entered in that order
client = redis.createClient(settings.redis_port, settings.redis_host);

// cache of player list
_playerList = new PlayerList([]);

function initPlayerList()
{
    return new Promise((resolve, reject) => {
        // fetch all user keys, based on the 'user:' prefix
        client.keys('user:*', (err, player_keys) => {
            // early out if there are no new users
            if(player_keys.length === _playerList.totalPlayers)
            {
                console.log('Skipping initiation of player list, already have ' + _playerList.totalPlayers + ' players.');
                resolve();
                return
            }

            // iterate over each player key, and generate a new Player model if required
            player_keys.forEach((player_key, index) => {
                let username = player_key.split(':')[1];
                client.hget(player_key, 'colour', (err, fetched_colour) => {
                    if (!_playerList.HasPlayer(fetched_colour))
                    {
                        console.log('Generating Player model for ' + username + ' using key: ' + player_key + '.');
                        _playerList.AddPlayer(new Player(username, fetched_colour));
                    }
                });
            });
            resolve();
        });
    });
}

function getPlayers()
// read the entire redis db and generate a list of Player models with their up-to-date logins, etc.
// This is an expensive operation, the output of which should be cached
{
    // TODO watch
    return new Promise((resolve, reject) => {
        if (_playerList.totalPlayers > 0)
        {
            // TODO: some way to add latest entries if there are new ones...
            resolve(_playerList);
            return
        }
        // init first as this will update the models (and expects them to be initialised already)
        initPlayerList().then(() => {
            // now update the login history of each Player
            client.lrange('entries', 0, -1, (err, entries) => {
                // TODO check here what the difference between _playerList.totalLogins and entries.length is
                let previousPlayerModel = null;
                entries.forEach((entry, index) => {
                    let entryObj = JSON.parse(entry);
                    let playerModel = _playerList.GetPlayer(entryObj['colour-to']);
                    let logTime = entryObj.time;

                    if (previousPlayerModel)
                    {
                        // add a LOGOUT for the PREVIOUS user...
                        previousPlayerModel.AddLogout(logTime);
                    }

                    if (playerModel) {
                        console.log('Found entry for ' + playerModel.username);
                        // ...and add a LOGIN for the CURRENT user
                        playerModel.AddLogin(logTime);
                        if (index === entries.length - 1)
                        {
                            playerModel.currentlyLoggedIn = true;
                        }
                    }
                    else
                    {
                        console.error('ERROR: colour ' + entryObj['colour_to'] +
                            ' found in entries but not Players. Skipping...');
                    }
                    previousPlayerModel = playerModel;
                })
                resolve(_playerList);
            });
        });
    });
    // TODO exec
}

module.exports = {getPlayers};