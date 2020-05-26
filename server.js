const path = require('path')
const express = require('express');
const http =  require('http');
const socket = require('socket.io');
const port = 5000;

var app = express();
var server = http.Server(app);
var io = socket(server);
 
var users = []; 
var rooms = []
var id 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.use(express.static(path.join(__dirname,'public'))); 

// connection au server
io.on('connection', (socket) => {

  socket.on('joinRoom',({username,room}) =>{

    // get id when user is connected
            let id = socket.id

    //  push all user into array
         users.push({username,room,id});
         // console.log('username is: '+ username);   
      
         socket.join(room)
 
         socket.emit('message',' welcome to '+room)

 
         io.to(room).emit('message', username +' is connected to the chat')

         socket.emit('message','Bonjour everybody')

  
         socket.on('cmessage', (msg) => {      
           console.log('message: ' + msg); 
           io.to(room).emit('message',msg);
           
         }); 

       socket.emit('room',room);

      //  socket.on('typing', username=> {
      //   //  console.log('sss');
         
      //   // io.emit('typing', username);
      // });


    socket.on('roomCreated', (room)=>{

      var found = rooms.find(element => element = room);

      if (found !== room) {
        rooms.push(room);
        // console.log(rooms);

        io.emit('message' ,'A new channel is created')

        io.emit('roomCreated',room);
      }else{

        socket.emit('message' ,' channel already exist')
      }
    
    })  
    
    socket.on('roomDeleted', (room)=>{

      var found = rooms.find(element => element = room);

      if (room === found) {
        // console.log('del');
        const index = rooms.indexOf(found);
        if (index > -1) {
          rooms.splice(index, 1);
        }

        io.emit('message' ,`The ${found} channnel has been deleted`)

      }
      // console.log(rooms);
      
      io.emit('roomDeleted',room);

    })

    // socket.on('roomUsers',(room)=>{

      // console.log(room);

    //   var ros = io.sockets.clients(room).length;

    //   // console.log(ros);
    //   // const userCount = io.sockets.clients(roomName).length

      
      

    // })
     
         
  })  
  // console.log(users); 
      socket.on('disconnect', () => {  
        // console.log('ko');     
        io.emit('message',`An user has disconnected`)  
      }); 
      // console.log('a user connected');
            
  });

    

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})