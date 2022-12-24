import http from 'node:http';
import express from 'express';
import cors from 'cors';

const PORT = 3001;

const app = express();
app.use(cors());
const server = http.createServer(app);
server.listen(PORT, () => {
  console.info('Server is running on port: ' + PORT);
});
