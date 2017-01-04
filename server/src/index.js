import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// import routes
import users from './routes/users';
import auth from './routes/auth';
import category from './routes/category';
import board from './routes/board';


let app = express();

// body parser middleware
app.use(bodyParser.json());

// routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/board', board);

// server listening on localhost on port 8080
app.listen(8080, () => console.log('Running on localhost:8080'));