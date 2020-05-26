$(document).ready(function(){

    const {username , room } = Qs.parse(location.search,{
        ignoreQueryPrefix: true
    });

    // console.log(username,room);

    $(function (){
        
        // var socket = io('/game');
        var socket = io();
        // console.log(username,room);

        socket.emit('joinRoom',{username,room})

        var id = $('body').attr('id');

        if (id == "chat") {
            
            // $( "#message" ).keypress(function() {
            //     console.log( "press" );
            //     socket.emit('typing',username);
            //   });

             

           
            // alert('form');
            var ids = $('form').attr('id');

            if (ids == 'cht') {
                $('form').submit((e)=> {
 
                    // prevent reload
                      e.preventDefault() 
                      
                      var message = $('#message').val();
                      // console.log(message);
                       const regex_nick = /^\/nick+\s+\w+$/g;
                       const regex_list = /^\/list$/g;
                       const regex_create = /^\/create+\s+\w+$/g;
                       const regex_delete = /^\/delete+\s+\w+$/g;
                       const regex_part = /^\/part+\s+\w+$/g;
                       const regex_users = /^\/users$/g;
                       const regex_msg = /^\/msg+\s+\w+\s+[\w\s]+$/g;
          
                    //   var command=[];
                        var command_create  = message.match(regex_create);
                        //   console.log(command_create);
                          if (command_create) {
                              var commandSplit = command_create[0].split(" ");
                              var room = commandSplit[1];

                              socket.emit('roomCreated', room)  

                          }

                          var command_delete  = message.match(regex_delete);
                          // console.log(command);
                          if (command_delete) {
                              var commandSplit = command_delete[0].split(" ");
                              var room = commandSplit[1];

                              socket.emit('roomDeleted', room)  

                          }

                          var command_users  = message.match(regex_users);
                          // console.log(command);
                          if (command_users) {
                              
                              socket.emit('roomUsers', room)  

                          }
                           
                          socket.emit('cmessage', $('#message').val());
                          // clean the input
                          $('#message').val('');
                          // return false;
          
                  });
      
            }
          
            
        }
        //outside the form

          // create meassages
          socket.on('message', (msg) => {
            $('#messages').append($('<li>').html(msg))
            });

            
        // socket.on('room', (room))

          socket.on('roomCreated', (room) => {
            //   alert(room); 
            $('#room').append($('<option>', {
                            value: room,
                            text: room
                        })); 
                });

          socket.on('roomDeleted', (room) => {
            //   alert(room); 
            $(`#room option[value=${room}]`).remove();
            // $(room).parent().remove();

                });

            // socket.on('typing', (data)=>{
            //     alert('o')
            //     $('#message').val = '<p><em>'+data+ 'is typing a message ... </em></p>'
            // })
            
      });


 });