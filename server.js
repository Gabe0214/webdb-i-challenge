const express = require('express');


const accountRoutes = require('./data/accounts/accountRoutes')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRoutes)

server.use((err, req, res, next) => {
    res.status(500).json({
        message : "Something went wrong"
    })
})

module.exports = server;