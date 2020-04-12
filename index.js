const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public',express.static('public'));

require('./routers/routers')(app);

console.log("IRC run on localhost:"+ 3010);

app.listen(3010);

