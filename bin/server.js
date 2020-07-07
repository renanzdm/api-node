'use strict'

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening',onListening);
console.log('Deu tudo certo' + port);

function normalizePort(value) {
    const port = parseInt(value, 10);

    if (isNaN(port)) {
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return false;

}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;

        default:
            break;
    }

}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'String' ? 'pipe' + addr : 'port' + addr.port;
    debug('Listening on' + bind);

}