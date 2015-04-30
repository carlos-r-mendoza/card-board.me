var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
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
github.user.getFollowingFromUser({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "calboy1898"
}, function(err, res) {
    console.log(res);
});