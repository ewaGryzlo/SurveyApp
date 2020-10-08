const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/example', (req, res, next) => {
<<<<<<< HEAD
    res.render('example', {
        path: '/example',
        isAuthenticated: req.session.isLoggedIn
    });
});

=======
    res.render('index', {
        path: '/example'
    });
});




>>>>>>> 88ef58257706174692e5344938894e04b0ef851b
module.exports = router;