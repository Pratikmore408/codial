const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');


const User = require('../models/user');

// tell pasport to create a new strategy for google login 
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
},

async function(accessToken, refreshToken, profile, done){
// find user
try{
    let user = await User.findOne({email: profile.emails[0].value});

    if(user){
        return done(null, user);
    }else{
        user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
        });
        return done(null, user);
    }
}catch(error){
    console.log("Error in passport google strategy file",error);
}
}

));

module.exports = passport;