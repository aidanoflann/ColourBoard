const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    request.statusCode = 200;
    response.end('Hello, World!');
});

server.listen(port, hostname, () => {console.log("Server started on port: " + port)});