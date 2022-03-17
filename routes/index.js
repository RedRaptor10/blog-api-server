const express = require('express');
const router = express.Router();

// Controller
const indexController = require('../controllers/indexController');

// Log In
router.post('/login', indexController.logIn);

// Test (Should only be accessible if logged in)
//router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => { res.json('Accessible route as you are logged in.')});

module.exports = router;