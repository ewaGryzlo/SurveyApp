const path = require('path');
const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey');
const isAuth = require('../middleware/is-auth');

router.get('/survey', isAuth, surveyController.getAddSurvey);
router.post('/survey', isAuth, surveyController.postAddSurvey);


module.exports = router;