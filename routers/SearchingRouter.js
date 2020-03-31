var express = require('express');
var router = express.Router();
var SearchingController = require('../controller/SearchingController')

router.route('/search')
    .get(SearchingController.call)
    .post();

module.exports = router;