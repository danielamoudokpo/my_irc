const express = require('express');
const http =  require('http');
const socket = require('socket.io');
const port = 5000;

var app = express();
var server = http.Server(app);
var io = socket(server);
 
var users = []; 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// connection au server
io.on('connection', (socket) => {
      // console.log('a user connected');
    var username

    var user;


        socket.on('name', (username)=>{ 
        users.push(username);
        console.log('username is: '+ username);  

        console.log(users); 
        // user = users.toString();
        // console.log(user);     
    }) 

      socket.on('message', (msg) => {      
        console.log('message: ' + msg); 
        io.emit('message',msg);
      });    


      socket.on('disconnect', () => {  
        console.log(user);     
         io.emit('message','user disconnected')  
      }); 
          
  });

//   create a new chennal exp

    // const  game = io.of('/game')

    // game.on('connection', (socket) => {
    //     socket.emit('entrance', {message: 'Welcome to the chat room!'}); 
    //     socket.emit('entrance', {message: 'Your ID is #' + socket.id}); 

    //     socket.on('adduser', function (name) {
    //         users.push(name);

    //         // attempt to clean up
    //         socket.once('disconnect', function () {
    //             var pos = users.indexOf(name);

    //             if (pos >= 0)
    //             users.splice(pos, 1);
    //         });
    //     });
    // })
    

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})