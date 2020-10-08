const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/example', (req, res, next) => {
    res.render('example', {
        path: '/example',
        isAuthenticated: req.session.isLoggedIn
    });
});

module.exports = router;