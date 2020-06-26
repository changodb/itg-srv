const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var db = require('./mongo');
const cors = require('cors');


const searchRouter = require('./routes/search');

const app = express();
if (process.env.NODE_ENV === 'production') {
   var corsOrigin = 'http://my-app.heroku.com';
} else {
   var corsOrigin = 'http://localhost:3001';
}

const corsOptions = {
    origin: corsOrigin
};

const fs = require('fs')

if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}
const mongoUrl = process.env.MONGO_URL;

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
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use('/search', searchRouter);


module.exports = app;
