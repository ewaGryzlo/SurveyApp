const path = require('path');
const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey');

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

module.exports = router;