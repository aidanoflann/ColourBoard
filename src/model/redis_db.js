const redis = require('redis');
const settings = require('../settings.js');

// create the redis client
// NOTE: port and host are positional arguments, entered in that order
client = redis.createClient(settings.redis_port, settings.redis_host);

// debug - log all keys
function listAllKeys(err, keys)
{
    keys.forEach(key => console.log(key));
}
client.keys('*', listAllKeys);