const passport = require('passport');
var db = require('../models');

module.exports = app => {
    // app.get('/auth/google', passport.authenticate('google', {
    //     scope: ['profile', 'email']
    // }));

    app.get('/auth/linkedin', passport.authenticate('linkedin'));


    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', {
            failureRedirect: '/'
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            db.profile.findOrCreate({
                'where': {
                    'linkedin_id': req.user.id
                },
                'defaults': {
                    'name': req.user.displayName,
                    'img_url': req.user._json.pictureUrls.values[0],
                    'title': req.user._json.headline,
                    'about': req.user._json.summary,
                    'linkedin_url': req.user._json.publicProfileUrl,
                    'github_url': 'www.github.com',
                    'personal_url': 'www.profile.com',
                    'linkedin_id': req.user.id
                }
            });
            console.log(req);
            res.redirect('/');
        }
    );

    app.post('/login',passport.authenticate('local-login',{
        successRedirect: "/myprofile",
        failureRedirect:"/login",
        failureFlash: "wrong"
    }));
};
