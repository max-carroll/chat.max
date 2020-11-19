import bodyParser from 'body-parser';
import express from 'express';
import {Server, Socket } from 'socket.io';

const app = express();
const io = new Server();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/messages', (req: any, res: any) => {
  res.send(`I received your GET request. This is what you sent me: ${req.body.post}`);
})

// messages
app.post('/api/messages', (req: any, res: any) => {
  
  const {message} = req.body

  io.emit("MessageReceived", message)
  
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);


})

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

io.on("connection", function(socket: Socket) {
  console.log("a user connected");
});






