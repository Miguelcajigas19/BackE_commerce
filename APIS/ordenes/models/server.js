const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = 3300;
        this.paths = {
            ordenes: '/api/ordenes',
        };

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.ordenes, require('../routes/ordenes.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor funcionando en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;
