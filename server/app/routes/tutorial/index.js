'use strict';
var VIDEOS = require('./videos.json');
//var gitHubFile = require('../../../hello.html')

var router = require('express').Router();
module.exports = router;

router.get('/videos', function (req, res) {
    res.send(VIDEOS);
});