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
router.get('/:repoOwner/:repoName/repo-issues', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.repoIssues({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		state: "all",
		per_page: 100
	}, function(err, repoIssues) {
		res.json(repoIssues);
	});
});

/***GETS LABELS FOR A PARTICULAR REPO***/
router.get('/:repoOwner/:repoName/repo-labels', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.getLabels({
		user: req.params.repoOwner,
		repo: req.params.repoName,
	}, function(err, repoLabels) {
		res.json(repoLabels);
	});
});

/***GETS MILESTONES FOR A PARTICULAR REPO***/
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
router.post('/:repoOwner/:repoName/create-repo-issue', function (req, res) {

	github.authenticate({
	    type: "oauth",
	    token: req.user.github.token
	});


	github.issues.create({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		title: req.body.title,
		body: req.body.body,
		assignee: req.body.assignee,
		milestone: req.body.milestone,
		labels: req.body.labels
	}, function(err, createdRepoIssue) {
		res.json(createdRepoIssue);
	});
});

/***CREATES/POSTS AN ISSUE***/
router.post('/:repoOwner/:repoName/edit-repo-issue/:issueNumber', function (req, res) {

	var userToken = req.user.github.token;
	var issueTitle = req.body.title;
	var issueBody = req.body.body;
	var issueAssignee;
	var issueState;
	var issueMilestone;
	var issueLabels = [];
	// if (typeof req.body.assignee === 'string') { issueAssignee = req.body.assignee; }
	// if (typeof req.body.state === 'string') { issueState = req.body.state; }
	// if (typeof req.body.milestone === 'number') { issueMilestone = req.body.milestone; }

	// req.body.labels.forEach(function(objLabel) {
	// 	issueLabels.push(objLabel.name);
	// });

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

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

/***CREATES/POSTS A REPO LABEL***/
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

/***EDIT REPO LABEL***/
router.post('/:repoOwner/:repoName/edit-repo-label/:labelName', function (req, res) {
    
	var userToken = req.user.github.token;
	var labelName = req.body.name;
	var labelColor = req.body.color;

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

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.updateLabel({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		name: labelName,
		color: labelColor
	}, function(err, updatedRepoLabel) {
		console.log(updatedRepoLabel)
		res.json(updatedRepoLabel);
	});
});

/***CREATES/POSTS AN ISSUE***/
router.post('/:repoOwner/:repoName/create-repo-milestone/:milestoneTitle', function (req, res) {

	var userToken = req.user.github.token;
	var milestoneTitle = req.body.title;
	var milestoneState = req.body.state;
	var milestoneDescription = req.body.description;
	var milestoneDueDate = req.body.due_on;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.createMilestone({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		title: milestoneTitle,
		state: milestoneState,
		description: milestoneDescription,
		due_on: milestoneDueDate
	}, function(err, createdRepoMilestone) {
		res.json(createdRepoMilestone);
	});
});

/***GET COMMENTS ON AN ISSUE***/
router.get('/:repoOwner/:repoName/repo-issue-comments/:issueNumber', function (req, res) {

	var userToken = req.user.github.token;

	github.authenticate({
	    type: "oauth",
	    token: userToken
	});

	github.issues.getComments({
		user: req.params.repoOwner,
		repo: req.params.repoName,
		number: req.params.issueNumber
	}, function(err, issueComments) {
		res.json(issueComments);
	});
});



