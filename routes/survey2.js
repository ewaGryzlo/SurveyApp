const path = require('path');
const express = require('express');
<<<<<<< HEAD
const surveyController = require('../controllers/survey2');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
// /survey2 => GET
router.get('/survey2',isAuth, surveyController.getAddSurvey);
// /survey2 => POST
router.post('/survey2', isAuth,surveyController.postAddSurvey);
=======
const Survey = require('../models/Surveys');
const surveyController = require('../controllers/survey2');
const mongoose = require('mongoose');

const router = express.Router();

// /survey2 => GET
router.get('/survey2', surveyController.getAddSurvey);
// /survey2 => POST
router.post('/survey2', surveyController.postAddSurvey);
>>>>>>> 88ef58257706174692e5344938894e04b0ef851b



module.exports = router;