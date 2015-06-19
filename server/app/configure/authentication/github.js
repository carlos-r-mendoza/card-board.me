'use strict';
var path = require('path');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');



module.exports = function (app) {

	var githubConfig = app.getValue('env').GITHUB;

	var gitHubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
	};

	var verifyCallback = function(accessToken, refreshToken, profile, done) {
		console.log("This is the PROFILE", profile);
		console.log("This is the TOKEN", accessToken);

		UserModel.findOne({ 'github.id': profile.id }, function (err, user) {
			if(err) return done(err);

			// if (user) {
   //              //console.log("at",accessToken);
   //              //user.github.token = accessToken;
   //      UserModel.update({'github.id':profile.id},{'github.token':accessToken},function(err,user){
   //        //if(err) console.log(err);
   //        //console.log("sdfsad",user);
   //        return user;
   //     });
   //      // .then(function(user){
   //      //   done(null, user);
   //      // })
			// 	//done(null, user);
			// } else {
                UserModel.create({
                    github: {
                        id: profile.id,
                		displayName: profile.displayName,
                		username: profile.username,
                		emails: profile.emails,
                		avatar: profile._json.avatar_url,
                        token: accessToken
                    }
                }).then(function (user) {
                    done(null, user);
                }, function (err) {
                    console.error('Error creating user from GitHub authentication', err);
                    done(err);
                });
            }
)};

		//});

	//};


passport.use(new GitHubStrategy(gitHubCredentials, verifyCallback));



app.get('/auth/github',
  passport.authenticate('github', { scope: ['repo', 'notifications'] }));

app.get('/auth/github/logout', function(req, res){
  
  req.logout();
  
  res.redirect('/go');
});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

};