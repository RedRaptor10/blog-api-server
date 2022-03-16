const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Controller
const indexController = require('../controllers/indexController');

// Index
router.get('/', indexController.index);

// Log In
router.post('/login', function (req, res, next) {
    // Authenticate with database (NOTE: {session: false} is passed so that the user isn't saved in the session.)
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                user: user,
                error: err,
                info
            });
        }

        // Log the user in
        req.login(user, {session: false}, (err) => {
            if (err) { res.json(err); }
            // Generate a signed JSON web token with the contents of the user object (NOTE: Access user info via req.user.info)
            const token = jwt.sign({info: user}, 'jwt_secret', { expiresIn: '60s' });
            return res.json({ user, token });
        });
    })(req, res);
});

// Test (Should only be accessible if logged in)
router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => { res.json('Accessible route as you are logged in.')});

module.exports = router;