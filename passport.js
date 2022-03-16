const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('./models/user');
const bcrypt = require('bcryptjs');

// Local Strategy used for initial log in
// NOTE: "done" is an internal passport method, taking in the parameters (err, user, info)
passport.use(new LocalStrategy((username, password, done) => {
    // Check if username & password matches in database
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) { return done(err); }
            if (res) { return done(null, user, { message: 'Logged in successfully.' }); }
            else { return done(null, false, { message: 'Incorrect password.' }); }
        });
    });
}));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts token from authorization header with the scheme "bearer"
    secretOrKey: 'jwt_secret' // The secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature
};

// Jwt Strategy used for validating token on specific routes
passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    return done(null, jwt_payload);
    /*
    // (Optional) Find the user in database if needed
    return User.findById(jwt_payload.user._id)
    .then(user => { return done(null, user); })
    .catch(err => { return done(err); });
    */
}));