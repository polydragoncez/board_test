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
const global_message = []
io.on('connection', function(socket){
    socket.on('message', function(data){
	    global_message.push({
	    	author: data.author,
	    	email: data.email,
	    	time: data.time,
	    	content: data.content
	    })
	    console.log(global_message)
	    io.emit('message', global_message)
    });
    socket.on('disconnect', function () {

    });
});

app.get("/", function(req, res){
    res.render('index', {
        title: 'hello, world!'
    });
});

app.post("/", function(req, res){
    // res.render('index', {
    //     title: 'hello, world!'
    // });
    io.emit('message','data123');
    res.render('index', {
        title: 'hello, world!'
    });
});


server.listen(3000);