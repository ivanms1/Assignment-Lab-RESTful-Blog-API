const express = require('express');
const boodyParser =require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');

const posts = require('./routes/posts');
const comments = require('./routes/comments');

const app = express();

app.use(boodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

app.use('/posts', posts);
app.use('/posts/', comments);

app.listen(3000);
