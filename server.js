const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname + '/public')));

const io = require('socket.io')(server);
io.on('connection', function(socket){
    socket.on('newuser',function(username){
        socket.broadcast.emit('update' + username + 'join the conversation');
    });

    socket.on('exituser',function(username){
        socket.broadcast.emit('update' + username + 'exit from conversation');
    });

    socket.on('chat',function(message){
        socket.broadcast.emit('chat' , message);
    });
});

server.listen(5000 , ()=>{
    console.log("Server is listening on 5000");
});