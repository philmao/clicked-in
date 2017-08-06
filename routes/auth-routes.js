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
                    'linkedinId': req.user.id
                },
                'defaults': {
                    'name': req.user.displayName,
                    'img_url': req.user._json.pictureUrl,
                    'title': req.user._json.headline,
                    'about': req.user._json.summary,
                    'linkedin_url': req.user._json.publicProfileUrl,
                    'github_url': 'www.github.com',
                    'personal_url': 'www.profile.com',
                    'linkedinId': req.user.id
                }
            });
            console.log(req);
            res.redirect('/');
        }
    );
};
