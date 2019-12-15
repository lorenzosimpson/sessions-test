const express = require('express')
const server = express();
const session = require('express-session')
const apiRouter = require('./api-router/api-router')
const cors = require('cors')
const helmet = require('helmet')

server.use(express.json());
server.use(helmet())

const sessionConfig = {
    name: 'sandy',
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false, // only set cookies over https. Server will not send back a cookie over http.
    },
    httpOnly: false,
    resave: true,
    saveUninitialized: false
}

server.use(session(sessionConfig))
server.use(cors())
server.use('/api', apiRouter)


module.exports = server;