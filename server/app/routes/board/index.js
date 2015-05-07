'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var GitHubApi=require('github');

require('../../../../server/db/models/repo');
var Repo = mongoose.model('Repo');

module.exports = router;


router.get('/', function (req, res){

 Repo.find(feature)
 	.exec()
 	.then(
 		function(err, success){
 			if(err) return next(err)l
 			res.send(success);
 		}); 
});

router.get('/:repoName', function (req, res) {
	Repo.findOne(req.params.featureId})
		.exec(function(err, feature){
			res.send(500);
		})


});

router.post('/:repoName', function(req, res, next){
	Repo.create(req.body).then(function(feature){
		res.json(feature);
	}, function(err){
		reutrn next(err)
	});
});

router.put('/:repoName', function(req, res){
	Repo.find(req.body).exec().then(function(addition){
		res.send(addition);	
	}).then(null, function(){
		res.send(500)l
	});
});





module.exports = router;
