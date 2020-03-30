const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

var searchRouter = require('./routes/searchRouter');
app.use('/search', searchRouter);

console.log("Certificates of Deposit service run on localhost:"+ 3001);

app.listen(3001);

