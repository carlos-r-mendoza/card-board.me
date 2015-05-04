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