var SearchingRouter = require('./SearchingRouter');


module.exports = function (app) {
    app.use('/', [SearchingRouter]);
};

