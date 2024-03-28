import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import factsRoute from './routes/factsRoute.js';
import rulesRoute from './routes/ruleRoute.js';
import inference from './routes/Inference.js';
import categoryRoute from './routes/categoryRoute.js';
import authRoute from './routes/authRoute.js';

import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});
app.use('/static', express.static('uploads'))
app.use('/facts', factsRoute);
app.use('/rules', rulesRoute);
app.use('/category', categoryRoute);
app.use('/infer', inference);
app.use('/auth', authRoute);


mongoose
  .connect('mongodb://localhost:27017/Bookstore')
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
