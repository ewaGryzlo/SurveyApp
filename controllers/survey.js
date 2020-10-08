const Survey = require('../models/Surveys');


exports.getAddSurvey = ('/survey', (req, res, next) => {
    res.render('ankiety', {
        pageTitle:'Add Survey',
        path: '/survey',
<<<<<<< HEAD
        editing: false,
       isAuthenticated: req.session.isLoggedIn
=======
        editing: false
>>>>>>> 88ef58257706174692e5344938894e04b0ef851b
    });
});

exports.postAddSurvey = ('/survey', (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const Questions = req.body.Questions;
    const questionContent = req.body.questionContent;
    const answer = req.body.answer;

    const survey = new Survey ({
        title:title,
        description: description,
        questions: Questions,
        questionContent: questionContent,
        answer: answer
    });
    survey
        .save()
        .then(result =>{
            console.log('Created Survey');
            res.redirect('/survey');
        })
        .catch(err =>{
            console.log(err);
        });
});
