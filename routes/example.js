const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/example', (req, res, next) => {
    res.render('index', {
        path: '/example'
    });
});




module.exports = router;