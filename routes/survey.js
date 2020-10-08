const path = require('path');
const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey');
<<<<<<< HEAD
const isAuth = require('../middleware/is-auth');

router.get('/survey', isAuth, surveyController.getAddSurvey);
router.post('/survey', isAuth, surveyController.postAddSurvey);


=======

router.get('/survey', surveyController.getAddSurvey);
router.post('/survey', surveyController.postAddSurvey);


/*app.get('/homepage/ankiety', function (req, res) {
    var readQuiz = fs.readFileSync("data/allQuizzes.json", 'utf8');
    var jsonContent = JSON.parse(readQuiz);
    var titles = [];
    for (var i = 0; i<jsonContent.length; i++) {
        titles[i] = jsonContent[i]["title"];
    }
    res.render('ankiety',{titles: titles});
}); */

>>>>>>> 88ef58257706174692e5344938894e04b0ef851b
module.exports = router;