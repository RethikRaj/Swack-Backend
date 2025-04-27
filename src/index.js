import express from 'express';
import { StatusCodes } from 'http-status-codes';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routers/apiRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }) );

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'pong' });
});

app.use('/api',apiRouter);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
  connectDB();
});
