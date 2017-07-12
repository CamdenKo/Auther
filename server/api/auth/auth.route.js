var router = require('express').Router();
const User = require('../users/user.model')
const passport = require('passport')

router.get('/me', (req,res,next) => {
  res.send(req.user)
})

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '879879331233-e7el8qr9nq2su09al3r7iq9mhhue58cf.apps.googleusercontent.com',
    clientSecret: 'Rib3t363zkaESyDuPtYvqGJ-',
    callbackURL: 'http://localhost:8080/api/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
      console.log('---', 'in verification callback', profile, '---');
      var info = {
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos ? profile.photos[0].value : undefined
      };
      User.findOrCreate({
        where: { googleId: profile.id },
        defaults: info
      })
      .spread(function (user) {
        done(null, user);
      })
      .catch(done);
    })
);

passport.serializeUser(function(user,done){
  done(null,user.id)
})

passport.deserializeUser(function(id,done){
  User.findOne({where: {
    id
  }})
  .then(
    user => done(null,user)
  )
  .catch(err => done(err))
})
router.get('/google', passport.authenticate('google', { scope: 'email' }))

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

module.exports = router
