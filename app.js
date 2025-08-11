var createError = require('http-errors');  //import createError
var express = require('express'); //import express
var path = require('path'); //import path
var cookieParser = require('cookie-parser'); //import cookie parser
var logger = require('morgan'); //import logger
var indexRouter = require('./routes/index'); //import index router
var usersRouter = require('./routes/users');  //import users router
var app = express(); //create express app

app.set('views', path.join(__dirname, 'views')); //engine setup
app.set('view engine', 'ejs'); //set up view 
app.use(logger('dev')); //log requests 
app.use(express.json()); //parse JSON data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); //connect for public files
app.use('/', indexRouter); //router for index
app.use('/users', usersRouter); //router for users
app.use(function(err, req, res, next) {
    console.error(err.message); // error to console
    res.status(500).send({ error: err.message }); // JSON error response, internal error
});



module.exports = app;
