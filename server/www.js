const next = require('next');
const http = require('http');
const express = require('express')();
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;

const nextApp = next({
    dev,
    dir: path.join(__dirname, '../src')
});

const handleNextRequests = nextApp.getRequestHandler();

express.get('*', (req, res) => {
    handleNextRequests(req, res)
});

nextApp.prepare().then(() => {
    const httpServer = http.createServer(express);

    httpServer.listen(port, err => {
        if (err) {
            throw err;
        }

        console.info(`> Ready on http://localhost:${port}`);
    });
});
