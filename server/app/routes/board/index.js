'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var GitHubApi = require('github');

require('../../../../server/db/models/repo');
var Feature = mongoose.model('Feature');

module.exports = router;


router.get('/', function (req, res, next){

 Feature.find({})
 	.exec()
 	.then(
 		function(err, success){
 			if(err) return next(err);
 			res.send(success);
 		}); 
});

router.get('/:repoName', function (req, res) {
	Feature.findOne(req.params.featureId)
		.exec(function(err, feature){
			res.send(500);
		});


});

router.post('/:repoName', function(req, res, next){
	Feature.create(req.body).then(function(feature){
		res.json(feature);
	}, function(err){
		return next(err);
	});
});

router.put('/:repoName', function(req, res){
	Feature.find(req.body).exec().then(function(addition){
		res.send(addition);	
	}).then(null, function(){
		res.send(500);
	});
});





module.exports = router;
