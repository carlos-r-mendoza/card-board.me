'use strict';
var path = require('path');
var express = require('express');
var app = express();
var github = require('./routes/repo/gitHubAPI');
module.exports = app;

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

app.get('/github/:query/:language',function(req, res){
    var query=req.params.query;
    var language=req.params.language;
    github.search.repos({
        q: query,
        language: language,
        sort: "stars",
        order: "desc",
//     // optional:
//     // headers: {
//     //     "cookie": "blahblah"
//         },
//     //user: "carlos-r-mendoza"
    }, function(err, info) {
//     console.log(info);
        res.json(info);
// });

    });
});

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res) {
    console.error("ERROR IN ROUTE:", err);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// 'use strict';
// var path = require('path');
// var express = require('express');
// var app = express();
// module.exports = app;
// var GitHubApi = require("github");

// });

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
//require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
//app.use('/api', require('./routes'));


/*
    This middleware will catch any URLs resembling a file extension
    for example: .js, .html, .css
    This allows for proper 404s instead of the wildcard '/*' catching
    URLs that bypass express.static because the given file does not exist.
*/
// app.use(function (req, res, next) {

//     if (path.extname(req.path).length > 0) {
//         res.status(404).end();
//     } else {
//         next(null);
//     }

// });

// app.get('/*', function (req, res) {
// //     var information;


// //     github.authenticate({
// //     type: "basic",
// //     username: '',
// //     password: ''
// // });

// //     github.user.get({
// //     // optional:
// //     // headers: {
// //     //     "cookie": "blahblah"
// //     // },
// //     user: "carlos-r-mendoza"
// // }, function(err, info) {
// //     console.log(info);
// //     //res.json(info);
// // });

//     //res.send('<button><a href="/auth/github/" target="_self">GitHub Login</a></button>');

//     res.sendFile(app.get('indexHTMLPath'));
// });

// // Error catching endware.
// app.use(function (err, req, res) {
//     // console.error(err);
//     res.status(err.status || 500).send(err.message || 'Internal server error.');
// });

// // app.get('/search/:q/:l', function (req, res) {
// // //     var information;


// // //     github.authenticate({
// // //     type: "basic",
// // //     username: '',
// // //     password: ''
// // // });
// //     var q=req.params.q;
// //     var l=req.params.l;
// //     github.search.repos({
// //         q: q,
// //         language: l,
// //         sort: "stars",
// //         order: "asc"
// //     // optional:
// //     // headers: {
// //     //     "cookie": "blahblah"
// //     // },
// //     //user: "carlos-r-mendoza"
// // }, function(err, info) {
// //     console.log(info);
// //     res.send(info);
// // });
