const path = require('path')
const express = require('express');
const http =  require('http');
const socket = require('socket.io');
const port = 5000;

var app = express();
var server = http.Server(app);
var io = socket(server);
 
var users = []; 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.use(express.static(path.join(__dirname,'public'))); 

// connection au server
io.on('connection', (socket) => {

  socket.on('joinRoom',({username,room}) =>{
    // console.log('lp');
              // when user is connected

    socket.emit('message', username +' is connected to the chat ')

    //  push all user into array
        users.push(username);
        console.log('username is: '+ username);  

        console.log(users); 
        // user = users.toString();
        // console.log(user);     
    console.log(username);

  })
      console.log('a user connected');
      
      socket.on('message', (msg) => {      
        console.log('message: ' + msg); 
        io.emit('message',msg);
      });    


      socket.on('disconnect', () => {  
        // console.log(user);     
         io.emit('message',`An user has disconnected`)  
      });
          
  });

  // create a new chennal exp

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