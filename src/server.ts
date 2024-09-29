import app from '../src/app';
import debug from 'debug';
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000

const server = http.createServer(app);

server.listen(port);
server.on('error', errorTreatment);
server.on('listening', runningException);
console.log('Running on port ' + port);



function errorTreatment(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' é necessário ter privilégios avançados');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' já está sendo usado');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function runningException() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr!.port;
    debug('Listening' + bind);
}


export default server;