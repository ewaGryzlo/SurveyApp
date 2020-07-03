

const responseBodyHTML = '<input\n' +
    '                type="text"\n' +
    '                class="response__input"\n' +
    '                placeholder="Answer"\n'+
    '                value=""\n' +
    '        >';

const questionnaireBlockHTML =
    '<div class="questionAnswer-container">\n' +
    '<div class="question-container">\n' +
    '        <input\n' +
    '                type="text"\n' +
    '                id="question"\n' +
    '                class="question__input"\n' +
    '                placeholder="Question"\n' +
    '                value=""\n' +
    '        >\n' +
    '    </div>' +
    '   <div class="answers">\n' +
    '        <input\n' +
    '                type="text"\n' +
    '                class="response__input"\n' +
    '                id="response' +
    '                placeholder="Answer"\n'+
    '                value=""\n' +
    '        >\n' +

    '        <a href="#" class = "btn btn-add" onclick="addResponse(this)">+</a>\n' +
    '         <a href="#"  class = "btn btn-del" onclick="deleteResponse(this)">-</a>\n' +
    '</div>' +
    '        <a href="#"  class = "btn del-quest" onclick="deleteQuestion(this)">Delete Question</a>\n' +
    '<br/>' +
    '</div>';

const errorsList = document.getElementById('form__errors-block');
const form = document.getElementsByTagName('form')[0];
let formErrors = [];

function addQuestion() {
    let doc = document.createRange().createContextualFragment(questionnaireBlockHTML);
    form.append(doc);
}
function deleteQuestion(clickedElement){
    clickedElement.parentNode.remove();
}

function addResponse(clickedElement){

    let doc = document.createRange().createContextualFragment(responseBodyHTML);
    clickedElement.parentNode.appendChild(doc);

    /*var form = document.getElementById("myForm");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm); */


}
function deleteResponse(clickedElement){
    let doc = clickedElement.parentNode.getElementsByTagName('input');
    doc[doc.length -1].remove();
}

function getQuestionnaireForm () {
    let questionsInForm = form.getElementsByClassName('questionAnswer-container');
    let title = form.getElementsByClassName('title__input')[0].value;

    let questionsResult = [];
    for (let i = 0; i < questionsInForm.length; i++) {
        let res = getQuestionResponses(questionsInForm[i]);
        // check if validation go thru
        if (!res) {
            displayValidationErrors();
            return;
        } else {
            questionsResult.push(getQuestionResponses(questionsInForm[i]));
        }
    }

    const results = {
        questionnaireTitle: title,
        questionnaireBody: questionsResult
    };
    //result to save to database
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(results)
    };

    fetch('http://localhost:3000/survey2',options)
        .then(response => {
            if (response.status === 200) {
                alert('Dodano ankietę');
                window.location.replace("/homepage");
            } else {
                console.error(response);
            }
        })
}

function getQuestionResponses(questionContainer){
    const questionInput = questionContainer.getElementsByClassName('question__input');
    const responseInputs = questionContainer.getElementsByClassName('response__input');

    // check input with question
    if (!isBlankValidator(questionInput[0].value)) {
        questionInput[0].classList.add('response__input__error');
        return false;
    }


    let responsesForQuestion = [];

    for (let i = 0; i < responseInputs.length; i++) {
        // check input with response
        if (validateResponse(responseInputs[i])) {
            responsesForQuestion.push(responseInputs[i].value);

        } else {
            return false;
        }
    }

    return  {
        'question': questionInput[0].value,
        'responses': responsesForQuestion
    };

}

function validateResponse(question) {
    let validationResult = lengthValidator(question.value);
    // other validations...

    if (!validationResult) {
        question.classList.add('response__input__error');
        return false;
    }
    return true;
}

function lengthValidator(str) {
    if (str.length < 3) {
        formErrors.push(`Field with value ${str} is to short`);
        return false;
    }

    return true;
}

function isBlankValidator(str) {
    if (str === null || !str) {
        formErrors.push('Field is null');
        return false;
    }

    return true;
}

function displayValidationErrors() {
    for (let i = 0; i < formErrors.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = formErrors[i];
        errorsList.append(li);
    }

    formErrors = [];
}
