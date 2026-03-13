const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
        methods:['post','get']
    }
});
const port =3000;

let users = {}



io.on('connection', (socket) => { 
    console.log(socket.id)
    socket.on("user:joined",(username)=>{
        console.log(username);
        users[socket.id] = username;
        console.log(users);
        io.emit("message",{type:"system", msg:`${username} has joined`})
    })
    socket.on("sendmessage",(msg)=>{
        io.emit("message",{type:users[socket.id], msg:msg})
    })
 });

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});