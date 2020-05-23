$(document).ready(function(){

    const {username , room } = Qs.parse(location.search,{
        ignoreQueryPrefix: true
    });

    console.log(username,room);


    $(function () {
        
        // var socket = io('/game');
        var socket = io();
        console.log(username,room);

        socket.emit('joinRoom',{username,room})
        
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
            const regex_users = /^\/users+\s+\w+$/g;
            const regex_msg = /^\/msg+\s+\w+\s+[\w\s]+$/g;

            var command=[]
            // const regex = /([nick])+\s+\w+/g;
            var command = message.match(regex_create);
            console.log(command);
            // var commandSplit = command[0].split(" ");
            // console.log(commandSplit[1]);

            socket.emit('cmessage', $('#message').val());
            // clean the input
            $('#message').val('');
                return false;
        });

        //outside the form

          // create meassages
          socket.on('message', (msg) => {
            $('#messages').append($('<li>').html(msg))
            });
    
            
      });



 });