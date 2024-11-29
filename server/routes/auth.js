// routes/auth.js
const router = require('express').Router();
const passport = require('passport');

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication, redirect to your frontend or send user data.
    res.redirect('http://localhost:3000'); // Adjust this to your frontend URL
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000'); // Adjust this to your frontend URL
});

// Get current user
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;