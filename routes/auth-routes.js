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
            db.profile.findOne({
                'where': {
                    'linkedin_id': req.user.id
                }
            }).then(function(user) {
                if (user) {
                    res.redirect('/');
                } else {
                    res.redirect('/linkedin-signup');
                }
            });
        }
    );

    app.post('/login',passport.authenticate('local-login',{
        successRedirect: "/",
        failureRedirect:"/login",
        failureFlash: "wrong"
    }));
};
