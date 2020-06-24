const Survey = require('../models/Surveys');

exports.getAddSurvey = (req, res, next) => {
    res.render('ankiety2', {
        pageTitle:'Add Survey',
        path: '/survey2',
        editing: false,

    });
};

exports.postAddSurvey = (req, res, next) => {
    console.log(req.body);
    res.status(200).send("ok");
    const title = req.body.title;
    const question = req.body.question;
    const answer = req.body.answer;
    const survey = {
        title: title,
        question: question,
        answer: answer
    };
     new Survey(survey)
    .save()
         .then(result =>{
            console.log('Created Survey');

        })
        .catch(err =>{
            console.log(err);
        });

};
