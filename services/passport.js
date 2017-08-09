const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');

const db = require("../models");


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

passport.use('local-login',new LocalStrategy(
    function(username, password, done){
        db.profile.find({where: {username: username}}).then(function(user){
            console.log(user)
            if(!user){
                return done(null,false,{message:"Unknown username"})
            }
            console.log("Database PW:"+user.password)
            console.log("Entered password:"+ password);
            //Check if password is valid and return done(user) with user object if it is
            var pwMatched = bcrypt.compareSync(password,user.password);
            if(pwMatched){
                return done(null,user);
            }
            if(!pwMatched){
                return done(null,false,{message: "Wrong password"});
            }
        });
    }
));
