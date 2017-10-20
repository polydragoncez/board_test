const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express()
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))



const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', function(socket){
    socket.on('message', function(data){
        console.log(data)
    	//io.emit('message','data');
    });
    socket.on('disconnect', function () {

    });
});

app.get("/", function(req, res){
    res.render('index', {
        title: 'hello, world!'
    });
});


server.listen(3000);