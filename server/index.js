 
var app = require('express')();
// var cookieParser = require("cookie") 
var http = require('http').Server(app);
 
var io = require('socket.io')(http);
 
const cookieParser = require('socket.io-cookie-parser');
 
io.use(cookieParser());

 

var port = process.env.PORT || 8000;
 
 
 
 

// Event 'uncaughtException'
process.on('uncaughtException', (error) => {
  // fs.writeSync(process.stderr.fd, error);
  console.error( "******error*******");
  console.error(error);
});

app.get('/', (req, res) => {
 res.redirect("/login"); 

});

app.get('/login', (req, res) => {
  res.status(200).json({message:"Connected to login"});

});

app.get('/chat', (req, res) => {
  res.status(200).json({message:"Connected to chat"});

});

io.on('connection', function (socket) {

   
 
  socket.on('typing', async (data) => {
    data.u_id = socket.user.uId ; 
    socket.broadcast.to(u_s[data.curr_f_id]).emit('typing', data);
 
  });

  socket.on('not-typing', async (data) => {
    data.u_id = socket.user.uId ; 
    socket.broadcast.to(u_s[data.curr_f_id]).emit('not-typing', data);

  });

 

  socket.on('send-message', async (data) => {
  
  
    try{ 

      socket.broadcast.emit('message', data);

    }
    catch (err){ 
 
      console.error( err )  ; 
    }

  });

 
 
  
});

 
http.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('listening on *:' + port);
});
 

// // sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// socket.join('some-unique-room-name'); // Do this for both users you want to chat with each other
// socket.broadcast.to('the-unique-room-name').emit('message', 'blah'); // Send a message to the chat room.