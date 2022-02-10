const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

let userCount = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    userCount++;
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('disconnect', () => {
        userCount--;
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

});

server.listen(3000, () => {
    console.log('listening on *:3000');
});