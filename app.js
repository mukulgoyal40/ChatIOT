var express=require('express');
var socket=require('socket.io');
var Sentiment = require('sentiment');
var sentiment = new Sentiment()

var port = process.env.PORT || 4000;
var app=express();
var server=app.listen(port,function(){
    console.log('listening to request on port 4000')
});
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
}

app.use(allowCrossDomain);
// serve static files
app.use(express.static('public'));

//Socket setup
//socket is a function which takes which server we want to work with
var io=socket(server);

//socket.io is listening for a connection
io.on('connection',function(socket){
    console.log('Made socket connection',socket.id);

    //listening for event
    socket.on('chat',function(data){
        //refering to all socket
        let result = sentiment.analyze(data)
    console.log(data,result)
    });

});
