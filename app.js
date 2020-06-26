const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var db = require('./mongo');
const cors = require('cors');


const searchRouter = require('./routes/search');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000'
};

const fs = require('fs')

const credsPath = './creds.json';
const parsed = JSON.parse(fs.readFileSync(credsPath, 'UTF-8'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
// Make our db accessible to our router
app.use(function(req, res, next){
    db.connect(parsed.mongoUrl, next);
});

// MAIN APP ROUTES
// Static files should be served from root
let _path = path.join(__dirname, 'frontend', 'build');
console.log(_path);
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use('/search', searchRouter);


module.exports = app;
