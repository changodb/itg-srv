const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var db = require('./mongo');
const cors = require('cors');


const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000'
};

const fs = require('fs')

const credsPath = './creds.json';
const parsed = JSON.parse(fs.readFileSync(credsPath, 'UTF-8'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
// Make our db accessible to our router
app.use(function(req, res, next){
    db.connect(parsed.mongoUrl, next);
});

app.use('/', indexRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
