import bodyParser from 'body-parser';

var app = require('express')();
var cors = require('cors')
var http = require('http').createServer(app);
var io = require('socket.io')(http, {cors: {origin: "*"}});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: "http://localhost:3000"}))

type user = {username: string}
var users : Array<user> = []

io.on('connection', () => console.log('a user connected'));
http.listen(5001, () => console.log('listening on *:5001'));


app.get('/api/messages', (req: any, res: any) => {
  res.send(`I received your GET request. This is what you sent me: ${req.body.post}`);
})

app.post('/api/join', (req: any, res: any) => {
  const {username} = req.body

  if (!users.some(u=> u.username === username)) {
    users.push({username})
  }
  io.emit("UserJoined", users) 
  res.send(users)
})

app.post('/api/messages', (req: any, res: any) => {
  const {message, username} = req.body
  io.emit("MessageReceived", {text: message, username})  
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
})