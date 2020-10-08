const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./poll');
const router = express.Router();

// /Homepage => GET
router.get('/', (req, res, next) => {
  res.render('Homepage', {
<<<<<<< HEAD
    path: '/',
    pageTitle:'Home',
    isAuthenticated: req.session.isLoggedIn,
    //csrfToken: req.csrfToken()

=======
    path: '/'
>>>>>>> 88ef58257706174692e5344938894e04b0ef851b
  });
});


module.exports = router;
<<<<<<< HEAD

=======
//exports.routes = router;
>>>>>>> 88ef58257706174692e5344938894e04b0ef851b

