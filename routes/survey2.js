const path = require('path');
const express = require('express');
const Survey = require('../models/Surveys');
const surveyController = require('../controllers/survey2');
const mongoose = require('mongoose');

const router = express.Router();

// /survey2 => GET
router.get('/survey2', surveyController.getAddSurvey);
// /survey2 => POST
router.post('/survey2', surveyController.postAddSurvey);



module.exports = router;