import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// import routes
import users from './routes/users';
import auth from './routes/auth';
import board from './routes/board';


let app = express();

// body parser middleware
app.use(bodyParser.json());

// routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/board', board);

// serving index.html from server to client
app.get('/*', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, './index.html'));
});

// server listening on localhost on port 8080
app.listen(8080, () => console.log('Running on localhost:8080'));