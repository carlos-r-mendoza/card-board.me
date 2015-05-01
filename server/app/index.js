'use strict';
var path = require('path');
var express = require('express');
var app = express();
module.exports = app;
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

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));


/*
    This middleware will catch any URLs resembling a file extension
    for example: .js, .html, .css
    This allows for proper 404s instead of the wildcard '/*' catching
    URLs that bypass express.static because the given file does not exist.
*/
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
//     var information;


//     github.authenticate({
//     type: "basic",
//     username: '',
//     password: ''
// });

//     github.user.get({
//     // optional:
//     // headers: {
//     //     "cookie": "blahblah"
//     // },
//     user: "carlos-r-mendoza"
// }, function(err, info) {
//     console.log(info);
//     //res.json(info);
// });

    //res.send();

    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res) {
    // console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
