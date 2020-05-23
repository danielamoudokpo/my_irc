const path = require('path')
const express = require('express');
const http =  require('http');
const socket = require('socket.io');
const port = 5000;

var app = express();
var server = http.Server(app);
var io = socket(server);
 
var users = []; 
var id 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.use(express.static(path.join(__dirname,'public'))); 

// connection au server
io.on('connection', (socket) => {

  socket.on('joinRoom',({username,room}) =>{
    // console.log(username,room);
              // when user is connected
    let id = socket.id
                 //  push all user into array
        users.push({username,room,id});
        // console.log('username is: '+ username);  

        // console.log(users); 
        // // user = users.toString();
        console.log(users);     
        // console.log(users[0].room);
        console.log( users.length );

        console.log(room);
        
        socket.join(room)

        io.to(room).emit('message',' welcom to '+room)

        socket.emit('message', username +' is connected to the chat')

        socket.on('cmessage', (msg) => {      
          console.log('message: ' + msg); 
          io.to(room).emit('message',msg);
        });   
  }) 
      console.log('a user connected');
       
      socket.on('disconnect', (room) => {  
        // console.log(user);     
        io.emit('message',`An user has disconnected`)  
      });
          
  });

    

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})