var express = require('express');
var router = express.Router();
var SearchingController = require('../controller/SearchingController')

router.route('/')
    .get(SearchingController.call)
    .post();

module.exports = router;