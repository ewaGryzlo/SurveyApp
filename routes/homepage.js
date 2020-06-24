const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./poll');
const router = express.Router();

// /Homepage => GET
router.get('/', (req, res, next) => {
  res.render('Homepage', {
    path: '/'
  });
});


module.exports = router;
//exports.routes = router;

