import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';


let app = express();

// webpack middleware to creating JS bundle
app.use(webpackMiddleware(webpack(webpackConfig)));


// serving index.html from server to client
app.get('/*', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, './index.html'));
});

// server listening on localhost on port 3000
app.listen(3000, () => console.log('Running on localhost:3000'));