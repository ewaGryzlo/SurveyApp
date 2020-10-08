const path = require('path');
const express = require('express');
const surveyController = require('../controllers/survey2');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
// /survey2 => GET
router.get('/survey2',isAuth, surveyController.getAddSurvey);
// /survey2 => POST
router.post('/survey2', isAuth,surveyController.postAddSurvey);



module.exports = router;