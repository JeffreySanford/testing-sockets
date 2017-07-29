var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  // res.sendFile(__dirname + '/index.css');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  console.log(socket.id + " logged in.");

  socket.on('disconnect', function() {
    console.log('user disconnected');
    console.log(socket.id + " logged off.");

  });
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});