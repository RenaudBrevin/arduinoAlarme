const http = require('http');
const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const port = 3000;

const io = new Server(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(cors());

app.post('/send_data', (req, res) => {
  console.log("Received data: " + JSON.stringify(req.body));
  io.emit("received_data", req.body);
  res.json({ message: "Data received" });
});

io.on('connection', (socket) => {
  console.log('User connected');

});

httpServer.listen(port, () => {
    console.log('Server started on http://localhost:3000');
});