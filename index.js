const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./routers/routers')(app);

console.log("IRC run on localhost:"+ 3001);

app.listen(3001);

