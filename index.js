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
const validate = require('./src/validate')
io.on('connection', function(socket){
	socket.on('message', function(data){
		console.log(validate.validate_time(data.time))
		if (validate.validate_email(data.email)) {
			if (validate.validate_time(data.time)) {
				global_message.push({
					author: data.author || 'author',
					email: data.email || 'email',
					time: data.time || new Date(),
					content: data.content || 'content'
				})
				io.emit('message', global_message)
			}else {
				io.emit('validError', 'Time Format Error.')
			}
		}else {
			io.emit('validError', 'Email Format Error.')
		}
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