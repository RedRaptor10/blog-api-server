const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Log In
exports.logIn = [
    // Validate and sanitize fields
    body('username', 'Username required.').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password required.').trim().isLength({ min: 1 }).escape(),

    // Process Log In
    (req, res, next) => {
        // Extract the validation errors from request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({ username: req.body.username, errors: errors.array() });
        } else {
            // Authenticate with database (NOTE: {session: false} is passed so that the user isn't saved in the session.)
            passport.authenticate('local', {session: false}, (error, user, info) => {
	        if (error || !user) {
	            return res.status(400).json({ user, error, info });
	        }

	        // Log the user in
	        req.login(user, {session: false}, (error) => {
	            if (error) { res.json(error); }
	            // Generate a signed JSON web token with the contents of the user object (NOTE: Access user info via req.user.info)
	            const token = jwt.sign({info: user}, 'jwt_secret', { expiresIn: '5m' });
	            return res.json({ user, token });
	        });
            })(req, res);
        }
    }
];