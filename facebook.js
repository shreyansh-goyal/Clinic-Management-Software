var passport = require('passport');
FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: '1747174132050401',
    clientSecret: 'a2d2e7964f99b3e6ed992ee545cd7da3',
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));