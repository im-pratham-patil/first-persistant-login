const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/user-model');


passport.use(new localStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },
    async (email, password, done) => {
        const user = await User.findOne({ email });

        if (!user)
            return done(null, false, { messgae : "Not found"});
        
        const isValid = await user.isValidPassword(password);
        if (!isValid) 
            return done(null, false, { message : "Incorrect Password "});

        return done(null, user);
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});


