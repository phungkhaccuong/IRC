var express = require('express');
var router = express.Router();
var search = require('../controller/searchController')


router.route('/')
    .get(search.listUserAssets)
    .post();