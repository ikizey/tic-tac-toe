import http from 'node:http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
// app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (client) => connectionHandler(client, io));

const PORT = 3001;
server.listen(PORT, () => {
  console.info('Server is running on port: ' + PORT);
});
