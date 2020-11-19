import { hostname } from "os";

var app = require('express')();
var cors = require('cors')
var http = require('http').createServer(app);
var io = require('socket.io')(http, {cors: {origin: "*"}});

app.use(cors({origin: "http://localhost:3000"}))

io.on('connection', () => {
  console.log('a user connected');
});

http.listen(5001, () => {
  console.log('listening on *:5001');
});