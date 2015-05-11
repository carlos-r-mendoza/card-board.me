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


router.get('/:repoOwner/:repoName', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.get({
		user: req.params.repoOwner,
		repo: req.params.repoName,
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

router.get('/:repoOwner/:repoName/collaborators', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getCollaborators({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, repoCollaborators) {
		res.json(repoCollaborators);
	});

});

router.get('/:repoOwner/:repoName/commits', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getCommits({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, repoCommits) {
		res.json(repoCommits);
	});

});

router.get('/:repoOwner/:repoName/statsCodeFrequency', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsCodeFrequency({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, statsCodeFrequency) {
		res.json(statsCodeFrequency);
	});

});

router.get('/:repoOwner/:repoName/statsCommitActivity', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsCommitActivity({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, statsCommitActivity) {
		res.json(statsCommitActivity);
	});

});

router.get('/:repoOwner/:repoName/statsContributors', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsContributors({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, statsContributors) {
		res.json(statsContributors);
	});

});

router.get('/:repoOwner/:repoName/statsParticipation', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.repos.getStatsParticipation({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, statsParticipation) {
		res.json(statsParticipation);
	});

});


/***GETS ISSUES FOR A PARTICULAR REPO***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.getRepoIssue*/
router.get('/:repoOwner/:repoName/repo-issues', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.repoIssues({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, repoIssues) {
		res.json(repoIssues);
	});
});

/***GETS LABELS FOR A PARTICULAR REPO***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.getLabels*/

router.get('/:repoOwner/:repoName/repo-labels', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.getLabels({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, repoLabels) {
		res.json(repoLabels);
	});
});

/***GETS MILESTONES FOR A PARTICULAR REPO***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.getAllMilestones*/

router.get('/:repoOwner/:repoName/repo-milestones', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.getAllMilestones({
		user: req.params.repoOwner,
		repo: req.params.repoName
	}, function(err, repoMilestones) {
		res.json(repoMilestones);
	});
});

/***CREATES/POSTS AN ISSUE***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.create*/
router.post('/:repoOwner/:repoName/create-repo-issue', function (req, res) {

	var userToken = req.user.github.token;
	var issueTitle = req.body.title;
	var issueBody = req.body.body;
	var issueAssignee = req.body.assignee;
	var issueMilestone = req.body.milestone;
	var issueLabels = req.body.labels; 

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.create({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		title: issueTitle,
		body: issueBody,
		assignee: issueAssignee,
		milestone: issueMilestone,
		labels: issueLabels
	}, function(err, createdRepoIssue) {
		res.json(createdRepoIssue);
	});
});

/***CREATES/POSTS AN ISSUE***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.create*/
router.post('/:repoOwner/:repoName/edit-repo-issue/:issueNumber', function (req, res) {
	//console.log("ISSSUE ", req.body);
		console.log("PARAMS ", req.params);
	// console.log("Number ",req.params.issueNumber);


	var userToken = req.user.github.token;
	var issueTitle = req.body.title;
	var issueBody = req.body.body;
	var issueAssignee;
	var issueState;
	var issueMilestone;
	var issueLabels = [];
	if (typeof req.body.assignee === 'string') { issueAssignee = req.body.assignee; }
	if (typeof req.body.state === 'string') { issueState = req.body.state; }
	if (typeof req.body.milestone === 'number') { issueMilestone = req.body.milestone; }

	console.log("ISSSSMilestone", issueMilestone);

	req.body.labels.forEach(function(objLabel) {
		issueLabels.push(objLabel.name);
	});

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	console.log("issue labels", issueLabels	)

	github.issues.edit({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		number: req.params.issueNumber,
		title: issueTitle,
		body: issueBody,
		assignee: issueAssignee,
		milestone: issueMilestone,	
		state: issueState,
		labels: issueLabels
	}, function(err, editedRepoIssue) {
		console.log("RESPONSE", editedRepoIssue)
		res.json(editedRepoIssue);
	});
});

/***CREATES/POSTS AN ISSUE***/
/*More info: http://mikedeboer.github.io/node-github/#issues.prototype.create*/
router.post('/:repoOwner/:repoName/create-repo-label/:labelName', function (req, res) {

	var userToken = req.user.github.token;
	var labelName = req.body.name;
	var labelColor = req.body.color;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.createLabel({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		name: labelName,
		color: labelColor
	}, function(err, createdRepoLabel) {
		res.json(createdRepoLabel);
	});
});



