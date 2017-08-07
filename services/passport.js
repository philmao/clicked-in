const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const keys = require('../config/keys');


// passport.use(new GoogleStrategy({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: '/auth/google/callback'
// }, (accessToken, refreshToken, profile, done) => {
//     console.log(accessToken);
//     console.log(refreshToken);
//     console.log(profile);
//     console.log(done);
// }));

passport.use(new LinkedInStrategy({
    consumerKey: keys.linkedinClientID,
    consumerSecret: keys.linkedinClientSecret,
    callbackURL: '/auth/linkedin/callback',
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'summary', 'picture-urls::(original)', 'public-profile-url']
}, (accessToken, refreshToken, profile, done) => {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);

    // asynchronous verification, for effect...
    process.nextTick(function() {

        return done(null, profile);
    });
}))
