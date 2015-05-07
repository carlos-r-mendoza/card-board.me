'use strict';

var router = require('express').Router();
var GitHubApi=require('github');


module.exports = router;

var github = new GitHubApi({
// required
version: "3.0.0"
//optional
// debug: true,
// protocol: "https",
// host: "api.github.com", // should be api.github.com for GitHub
// pathPrefix: "/api/v3", // for some GHEs; none for GitHub
// timeout: 5000,
// headers: {
//     "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
// }
});

router.get('/repos/collaborators', function (req, res){
    
 var userGitHub = req.user.github.username;
 var userToken = req.user.github.token;

 github.authenticate({
    type: "oauth",
    token: userToken
 });
    
 github.repos.getCollaborators({
     user: userGitHub,
     repo: "project_management_tool"
 }, function(err, collaborators) {
     res.send(collaborators);
 });
    
});




router.get('/repo/:repoName', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.get({
		 	user: userGitHub,
	 		repo: req.params.repoName
	}, function(err, repoInfo){
		res.json(repoInfo);
	})

// github.repos.getFromUser({
// 		user: userGitHub,
// 		type: "all"
// 	}, function(err, userRepos) {

// 		//res.json(userRepos);

// 		// console.log(userRepos[0].name);
		
// 		userRepos.map(function(repo, index){



// 			//var repoName = repo.name;
// 			repo.collaborators = [];


// 			github.repos.getCollaborators({
			
// 			user: userGitHub,
// 			repo: req.params.repoName
			
// 			}, function(err, repoCollaborators) {
// 				var collaboratorsUserName = [];

// 				repoCollaborators.map(function(collaborator){
// 					repo.collaborators.push(collaborator.login);
			
	

// 				});
				
// 				if(index === userRepos.length-1) {

// 					res.json(userRepos);
// 				}
			
			
// 			});
		

// 		});




// 	});
	
});

router.get('/repo/:repoName/collaborators', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getCollaborators({
		user: userGitHub,
		repo: req.params.repoName
	}, function(err, repoCollaborators) {
		res.json(repoCollaborators);
	});

});

router.get('/repo/:repoName/commits', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getCommits({
		user: userGitHub,
		repo: req.params.repoName
	}, function(err, repoCommits) {
		res.json(repoCommits);
	});

});

router.get('/repo/:repoName/statsCodeFrequency', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsCodeFrequency({
		user: userGitHub,
		repo: req.params.repoName
	}, function(err, statsCodeFrequency) {
		res.json(statsCodeFrequency);
	});

});

router.get('/repo/:repoName/statsCommitActivity', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsCommitActivity({
		user: userGitHub,
		repo: req.params.repoName
	}, function(err, statsCommitActivity) {
		res.json(statsCommitActivity);
	});

});

router.get('/repo/:repoName/statsContributors', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsContributors({
		user: userGitHub,
		repo: req.params.repoName
	}, function(err, statsContributors) {
		res.json(statsContributors);
	});

});

router.get('/repo/:repoName/statsParticipation', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsParticipation({
		user: userGitHub,
		repo: req.params.repoName
	}, function(err, statsParticipation) {
		res.json(statsParticipation);
	});

});


/***GETS ISSUES FOR A PARTICULAR REPO***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.getRepoIssue*/
router.get('/:repoName/repo-issues', function (req, res) {

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.repoIssues({
		user: userGitHub,
		repo: req.params.repoName
	}, function(err, repoIssues) {
		res.json(repoIssues);
	});
});

/***CREATES/POSTS AN ISSUE***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.create*/
router.post('/:repoName/create-repo-issue', function (req, res) {

	console.log("AT route/create-repo-issue", req.body);

	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;
	var issueTitle = req.body.title;
	var issueBody = req.body.body;
	var issueAssignee;
	var issueMilestone;
	var issueLabels;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.create({
		user: userGitHub,
		repo: req.params.repoName,
		title: issueTitle,
		body: issueBody
	}, function(err, createdRepoIssue) {
		res.json(createdRepoIssue);
	});
});




