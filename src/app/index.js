const http = require('http');
const redis_db = require('../model/redis_db.js');

// this will be inside a Docker container, so use 0.0.0.0 instead of 127.0.0.1 loopback
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((request, response) => {
    console.log('Request received');
    request.statusCode = 200;
    let players = redis_db.getPlayers();
    response.end(JSON.stringify(players));
    console.log(players);
    console.log('Request complete');
});

server.listen(port, hostname, () => {console.log('Server started on port: ' + port)});