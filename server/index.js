import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

// import routes
import users from './routes/users';
import auth from './routes/auth';


let app = express();

// webpack config
const compiler = webpack(webpackConfig);

// body parser middleware
app.use(bodyParser.json());

// routes
app.use('/api/users', users);
app.use('/api/auth', auth);


// webpack middleware to creating JS bundle
app.use(webpackMiddleware(compiler));

// webpack hot reload
app.use(webpackHotMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

// serving index.html from server to client
app.get('/*', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, './index.html'));
});

// server listening on localhost on port 3000
app.listen(3000, () => console.log('Running on localhost:3000'));