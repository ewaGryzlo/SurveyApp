var quiz;
var name = "Name";
var currentQuestion = -1;
var quizLength = 0;
var numAns = 0;
var userAnswers = [];
var titles;
var selectedQuiz = 0;
var ids;
var notificationFadeTime = 3000;

// Initial setup
$(document).ready(function() {
    $.getJSON('titlesandids')
        .done(function (data) {
            // console.log(data);
            titles = data.slice(0,data.length/2);
            ids = data.slice(data.length/2);
            if (titles === undefined) {
              //  $('#ajaxloading').text("Sorry, we cannot load the quizzes. Please reload the page to try again.");
                $('#ajaxloading').show();
                $('#reload').show();
            }
        })
        .fail(function() {
         //   $('#ajaxloading').text("Sorry, we cannot load the quizzes. Please reload the page to try again.");
            $('#ajaxloading').show();
            $('#reload').show();
        });
    $('#title').text("Ankieta");
    $('#title').hide().fadeIn("slow");
    $('#nameForm').hide().fadeIn("slow");
    $('#description').hide();
    $('#answerChoices').hide();
    $('#previousQuestion').hide();
    $('#nextQuestion').hide();
    $('#answerWarning').hide();
    $('#nameFormWarning').hide();
    $('#userTable').hide();
    $('#home').hide();
    $('#ajaxloading').hide();
    $('#backHome').hide();
    $('#quizSuccess').hide();
    $('#quizWarning').hide();
    $('#placeholderWarning').hide();
    $('#placeholderSuccess').hide();
    $('#reload').hide();
    $('#editQuiz').hide();
    $('[data-hide]').on("click", function() {
        $('#nameFormWarning').hide();
        $('#answerWarning').hide();
        $('#quizSuccess').hide();
        $('#quizWarning').hide();
        $('#placeholderWarning').hide();
        $('#placeholderSuccess').hide();
    });

    //start quiz
    document.getElementById("start_quiz").addEventListener("click", function(e) {
        // console.log("start");
        $('#editQuiz').hide();
        e.preventDefault();
        nameForm();
    });

    //create quiz
    document.getElementById("create_quiz").addEventListener("click", function(e) {
        // console.log("create");
        if ($("#createquizsubmit").length) {
            if ($('#editQuiz').is(":hidden")) {
                loadQuizToCreate();
            }
            else {
                $('#editQuiz').hide();
            }
        }
        else {
            loadQuizToCreate();
        }
        e.preventDefault();
    });




    $("#answerChoices").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#nextQuestion").click();
        }
    });

    // edit quiz
    $(".editQuizFormDiv").delegate('.editQuizAddRemoveAns', 'click', function(e) {
        var tempID = this.id;
        var tempChunks = tempID.split('-');
        var tempQuestionNum = parseInt(tempChunks[1]);
        var tempAnswerNum = parseInt(tempChunks[2]);
        // add answer
        if (tempID.length < 21) {
            if ((tempAnswerNum + 1) < 4) {
                tempAnswerNum += 1;
                $('<input>').attr({
                    type: 'radio',
                    name: 'answersr' + tempQuestionNum,
                    class: 'answersradioclass',
                    id: 'answerradiobutton-' + tempQuestionNum + '-' + tempAnswerNum
                }).appendTo('#answer' + tempQuestionNum);
                $('<input>').attr({
                    type: 'text',
                    id: 'answer-' + tempQuestionNum + '-' + tempAnswerNum,
                    class: 'form-control editanswers',
                    name: 'answers',
                    placeholder: 'wariant odpowiedzi'
                }).appendTo('#answer' + tempQuestionNum);
                $('<br>').attr({
                    id: 'br-' + tempQuestionNum + '-' + tempAnswerNum
                }).appendTo('#answer' + tempQuestionNum);
                $(this).attr("id", "editQuizAddAns-" + tempQuestionNum + '-' + tempAnswerNum);
                $('#editQuizRemoveAns-' + tempQuestionNum + '-' + (tempAnswerNum - 1)).attr("id", "editQuizRemoveAns-" + tempQuestionNum + '-' + tempAnswerNum);
            }
            else {
                $('#placeholderWarning > p > span').text("Osiągnięto maksymalną liczbę wariantów odpowiedzi");
                $('#placeholderWarning > p > span').append('&nbsp;');
                $('#placeholderWarning').show();
                $("#placeholderWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
                    $("#placeholderWarning").hide();
                });
            }
        }
        // remove answer
        else {
            // console.log("remove");
            if ((tempAnswerNum - 1) >= 1) {
                $('#answerradiobutton-' + tempQuestionNum + '-' + tempAnswerNum).remove();
                $('#answer-' + tempQuestionNum + '-' + tempAnswerNum).remove();
                $('#br-' + tempQuestionNum + '-' + tempAnswerNum).remove();
                tempAnswerNum -= 1;
                $(this).attr("id", "editQuizRemoveAns-" + tempQuestionNum + '-' + tempAnswerNum);
                $('#editQuizAddAns-' + tempQuestionNum + '-' + (tempAnswerNum + 1)).attr("id", "editQuizAddAns-" + tempQuestionNum + '-' + tempAnswerNum);
            }
            else {
                $('#placeholderWarning > p > span').text("Minimalna liczba wariantów odpowiedzi wynosi 2");
                $('#placeholderWarning > p > span').append('&nbsp;');
                $('#placeholderWarning').show();
                $("#placeholderWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
                    $("#placeholderWarning").hide();
                });
            }
        }
        e.preventDefault();
        return false;
    });

    $(".editQuizFormDiv").delegate('.removeQuestion', 'click', function(e) {
        if (($("#editQuiz > div").length) > 1) {
            var tempID = this.id;
            var tempChunks = tempID.split('-');
            var tempQuestion = tempChunks[1];
            $('#questiondiv' + tempQuestion).remove();
        }
        else {
            $('#placeholderWarning > p > span').text("Osiągnięto maksymalną liczbę możliwych pytań");
            $('#placeholderWarning > p > span').append('&nbsp;');
            $('#placeholderWarning').show();
            $("#placeholderWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
                $("#placeholderWarning").hide();
            });
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    });

    $('#titlesDropdown').change(function() {
        $('#editQuiz').hide();
    });

    // submit edited quiz
    $("#editQuizForm").on('click', '#editquizsubmit', function(e) {
        let tablicaPytan = [];
        e.preventDefault();
        var radioChecked = true;
        var textInput = true;
        $("#editQuiz > div").each(function(x) {
            tablicaPytan.push(
                {
                    "id": x.nazwa_pytania,
                    "questions": [

                    ]
                }
            );
            var tempID = $(this).attr('id');
            var tempQuestionNum = parseInt(tempID.substring(11));
            if(!$("input:radio[name='answersr" + tempQuestionNum + "']").is(":checked")){
                radioChecked = false;
                return false;
            }
        });

        $(':text').not(document.getElementById("firstName")).each(function() {
            if(!($.trim($(this).val()).length > 0)) {
                $(this).css({ "border": '#FF0000 1px solid'});
                textInput = false;
            }
            else {
                $(this).css({ "border": '1px solid #ccc'});
            }
        });

        if (radioChecked && textInput) {

        }
        else {
            $('#placeholderWarning > p > span').append('&nbsp;');
            $('#placeholderWarning').show();
            $("#placeholderWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
                $("#placeholderWarning").hide();
            });
        }
    });

    // add question
    $("#editQuizForm").on('click', '#addQuestion', function (e) {
        var tempID = ($("#editQuiz div:last").attr('id'));
        var tempQuestionNum = parseInt(tempID.substring(6)) + 1;
        addQuestion(tempQuestionNum);
        e.preventDefault();
    });

    // submit newly created quiz
    $("#editQuizForm").on('click', '#createquizsubmit', function(e) {
        e.preventDefault();
        var radioChecked = true;
        var textInput = true;
        $("#editQuiz > div").each(function() {
            var tempID = $(this).attr('id');
            var tempQuestionNum = parseInt(tempID.substring(11));
            if(!$("input:radio[name='answersr" + tempQuestionNum + "']").is(":checked")){
                radioChecked = false;
                return false;
            }
        });

        $(':text').not(document.getElementById("firstName")).each(function() {
            if(!($.trim($(this).val()).length > 0)) {
                $(this).css({ "border": '#FF0000 1px solid'});
                textInput = false;
            }
            else {
                $(this).css({ "border": '1px solid #ccc'});
            }
        });

        if (radioChecked && textInput) {
            submitCreatedQuiz();
        }
    });
});
// After name is submitted on initial screen
function nameForm(){
    name = $('#nameForm').serializeArray()[0]["value"];
    if (name.length === 0) {
        $('#firstName').css({ "border": '1px solid #FF0000'});
        $('#nameFormWarning').show();
        $("#nameFormWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
            $("#nameFormWarning").hide();
        });
    }
    else {
        $('#firstName').css({ "border": '1px solid #ccc'});
        $('#nameFormWarning').hide();
        $('#nameForm').hide();
        $('#welcome').text("Witaj " + name + "!");
        $('#welcome').prepend('<a href="/"><img src="static/HomeIcon.png" width="38" height="38" id="homeImg" alt=""></a>');
        selectedQuiz = ids[titles.indexOf($('#titlesDropdown option:selected').text())];
        var selectedTitle = $('#titlesDropdown option:selected').text();
        $('#title').text(selectedTitle);
        document.title = selectedTitle;
        loadQuiz(selectedQuiz);
    }
}


// load target quiz json
function loadQuiz(target){
    $.getJSON('quiz/' + target)
        .done(function (data) {
            $('#ajaxloading').hide();
            $('#backHome').hide();
            $('#reload').hide();
            quiz = data;
            if (quiz["questions"] === undefined) {
                $('#ajaxloading').text("Nie można załadować ankiety. Odśwież stronę.");
                $('#ajaxloading').show();
                $('#reload').show();
                $('#backHome').show();
            }
            else {
                quizLength = quiz["questions"].length;
                $('#nextQuestion').show();
                $('#answerChoices').show();
                $('#description').text(quiz["description"]);
                $('#description').show();
                nextQuestion();
            }
        })
        .fail(function() {
            $('#ajaxloading').text("Nie można załadować ankiety. Odśwież stronę.");
            $('#ajaxloading').show();
            $('#reload').show();
            $('#backHome').show();
        })
        .always(function() {
            $('#reload').on('click', function(e){
                e.preventDefault();
                loadQuiz(target);
            });
        });
}

function loadQuizToCreate() {
    $('#editQuiz').empty();
    $('<label>').attr({
        for: 'titleLabel',
        id: 'titleLabel'
    }).appendTo('#editQuiz');
    $('<br>').appendTo('#editQuiz');
    $('<input>').attr({
        type: 'text',
        id: 'title',
        name: 'title',
        class: 'form-control',
        placeholder: "Nazwa ankiety"
    }).appendTo('#editQuiz');
    $('<br>').appendTo('#editQuiz');

    $('<label>').attr({
        for: 'descriptionLabel',
        id: 'descriptionLabel'
    }).appendTo('#editQuiz');

    $('<br>').appendTo('#editQuiz');
    $('<input>').attr({
        type: 'text',
        id: 'surveyDescription',
        class: 'form-control',
        placeholder: "Opis ankiety"
    }).appendTo('#editQuiz');
    $('<br>').appendTo('#editQuiz');

    for (var i = 0; i < 1; i++) {
        if (i === 0) {
            var tempQuestionNum = 0;
            var defaultNumOfAnswers = 1; //2 answers
            $('<div>').attr({
                class: 'container',
                id: 'questiondiv'+tempQuestionNum,
                name: 'questions'
            }).appendTo("#editQuiz");
            $('<label>').attr({
                for: 'Questions'+tempQuestionNum,
                id: 'Questions'+tempQuestionNum
            }).appendTo('#questiondiv'+tempQuestionNum);
            $("#Questions"+tempQuestionNum).text("Pytanie "+(tempQuestionNum+1));
            $('<input>').attr({
                type: 'text',
                id: 'question'+tempQuestionNum,
                name: 'questions',
                class: 'form-control',
                placeholder: "Pytanie"
            }).appendTo('#questiondiv'+tempQuestionNum);
            $('<br>').appendTo('#questiondiv'+tempQuestionNum);
            $('<label>').attr({
                for: 'answerLabel'+tempQuestionNum,
                id: 'answerLabel'+tempQuestionNum,
                class: 'answerLabel'
            }).appendTo('#questiondiv'+tempQuestionNum);
            $("#answerLabel"+tempQuestionNum).text("Warianty odpowiedzi:");
            $('<button>').attr({
                id: 'editQuizAddAns-'+tempQuestionNum+'-'+(defaultNumOfAnswers),
                class: 'btn btn-success editQuizAddAns editQuizAddRemoveAns'
            }).appendTo('#questiondiv'+tempQuestionNum);
            $("#editQuizAddAns-"+tempQuestionNum+'-'+(defaultNumOfAnswers)).text("+");
            $('<button>').attr({
                id: 'editQuizRemoveAns-'+tempQuestionNum+'-'+(defaultNumOfAnswers),
                class: 'btn btn-danger editQuizRemoveAns editQuizAddRemoveAns'
            }).appendTo('#questiondiv'+tempQuestionNum);
            $("#editQuizRemoveAns-"+tempQuestionNum+'-'+(defaultNumOfAnswers)).text("—");
            $('<br>').appendTo('#questiondiv'+tempQuestionNum);
            $('<br>').appendTo('#questiondiv'+tempQuestionNum);
            $('<div>').attr({
                class: 'container',
                id: 'answer'+tempQuestionNum,
                name: 'answers'
            }).appendTo('#questiondiv'+tempQuestionNum);
            for (var a = 0; a < defaultNumOfAnswers+1; a++) {
                $('<input>').attr({
                    type: 'radio',
                    name: 'answersr'+tempQuestionNum,
                    class: 'answersradioclass',
                    id: 'answerradiobutton-'+tempQuestionNum+'-'+a
                }).appendTo('#answer' + tempQuestionNum);
                $('<input>').attr({
                    id: 'answer-'+tempQuestionNum+'-'+a,
                    type: 'text',
                    class: 'form-control editanswers',
                    name: 'answers',
                    placeholder: "wariant odpowiedzi"
                }).appendTo('#answer' + tempQuestionNum);
                $('<br>').attr({
                    id: 'br-'+tempQuestionNum+'-'+a
                }).appendTo('#answer' + tempQuestionNum);
            }
            $('<br>').appendTo('#questiondiv'+tempQuestionNum);


        }
        else {
            var tempID = ($("#editQuiz div:last").attr('id'));
            var tempQuestionNum = parseInt(tempID.substring(6)) + 1;
            addQuestion(tempQuestionNum);
        }
    }
    $('<button>').attr({
        id: 'addQuestion',
        class: 'btn btn-success'
    }).appendTo('#editQuiz');
    $("#addQuestion").text("Dodaj pytanie");
    $('<br>').appendTo('#editQuiz');
    $('<br>').appendTo('#editQuiz');
    $('<input>').attr({
        type: 'submit',
        id: 'createquizsubmit',
        class: 'btn btn-warning',
        text: 'Submit'
    }).appendTo('#editQuiz');
    $('#editQuiz').show();
}

function addQuestion(tempQuestionNum) {
    var defaultNumOfAnswers = 1; //2 answers
    if (($("#editQuiz > div").length) < 25) {
        $('<div>').attr({
            class: 'container',
            id: 'questiondiv'+tempQuestionNum,
            name: 'questions'
        }).insertAfter("#questiondiv" + (tempQuestionNum-1));
        $('<label>').attr({
            for: 'Questions'+tempQuestionNum,
            id: 'questionlabel'+tempQuestionNum
        }).appendTo('#questiondiv'+tempQuestionNum);
        $("#questionlabel"+tempQuestionNum).text("Pytanie "+(tempQuestionNum+1));
        $('<button>').attr({
            id: 'removeQuestion-'+tempQuestionNum,
            class: 'btn btn-danger removeQuestion'
        }).appendTo('#questiondiv'+tempQuestionNum);
        $("#removeQuestion-"+tempQuestionNum).text("Usuń pytanie");
        $('<input>').attr({
            type: 'text',
            id: 'questionContent'+tempQuestionNum,
            name: 'questions',
            class: 'form-control',
            placeholder: "Pytanie"
        }).appendTo('#questiondiv'+tempQuestionNum);
        $('<br>').appendTo('#questiondiv'+tempQuestionNum);
        $('<label>').attr({
            for: 'answerLabel'+tempQuestionNum,
            id: 'answerLabel'+tempQuestionNum,
            class: 'answerLabel'
        }).appendTo('#questiondiv'+tempQuestionNum);
        $("#answerLabel"+tempQuestionNum).text("Warianty odpowiedzi:");
        $('<button>').attr({
            id: 'editQuizAddAns-'+tempQuestionNum+'-'+(defaultNumOfAnswers),
            class: 'btn btn-success editQuizAddAns editQuizAddRemoveAns'
        }).appendTo('#questiondiv'+tempQuestionNum);
        $("#editQuizAddAns-"+tempQuestionNum+'-'+(defaultNumOfAnswers)).text("+");
        $('<button>').attr({
            id: 'editQuizRemoveAns-'+tempQuestionNum+'-'+(defaultNumOfAnswers),
            class: 'btn btn-danger editQuizRemoveAns editQuizAddRemoveAns'
        }).appendTo('#questiondiv'+tempQuestionNum);
        $("#editQuizRemoveAns-"+tempQuestionNum+'-'+(defaultNumOfAnswers)).text("—");
        $('<br>').appendTo('#questiondiv'+tempQuestionNum);
        $('<br>').appendTo('#questiondiv'+tempQuestionNum);
        $('<div>').attr({
            class: 'container',
            id: 'answer'+tempQuestionNum,
            name: 'answers'
        }).appendTo('#questiondiv'+tempQuestionNum);
        for (var a = 0; a < defaultNumOfAnswers+1; a++) {
            $('<input>').attr({
                type: 'radio',
                name: 'answersr'+tempQuestionNum,
                class: 'answersradioclass',
                id: 'answerradiobutton-'+tempQuestionNum+'-'+a
            }).appendTo('#answer' + tempQuestionNum);
            $('<input>').attr({
                id: 'answer-'+tempQuestionNum+'-'+a,
                type: 'text',
                class: 'form-control editanswers',
                name: 'answers',
                placeholder: "Wariant odpowiedzi"
            }).appendTo('#answer' + tempQuestionNum);
            $('<br>').attr({
                id: 'br-'+tempQuestionNum+'-'+a
            }).appendTo('#answer' + tempQuestionNum);
        }
    }
    else {
        $('#placeholderWarning > p > span').text("Cannot add question - reached maximum number of questions!");
        $('#placeholderWarning > p > span').append('&nbsp;');
        $('#placeholderWarning').show();
        $("#placeholderWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
            $("#placeholderWarning").hide();
        });
    }
}

function submitCreatedQuiz(){
    var tempTitle = $("#titleInput").val();
    var tempQuizDescription = $("#descriptionInput").val();
    var tempJSON = {
        "id": 0,
        "title": tempTitle,
        "description": tempQuizDescription,
        "questions": []
    };
    var divSize = $("#editQuiz > div").length;
    $("#editQuiz > div").each(function() {
        var tempID = $(this).attr('id');
        var tempQuestionNum = parseInt(tempID.substring(11));
        var tempAnswers = [];
        $("#answer"+tempQuestionNum+ " .editanswers").each(function(){
            tempAnswers.push($(this).val());
        });

        tempJSON["questions"].push(tempQuestion);
    });
    $.ajax({
        type:"POST",
        url: "quiz",
        data: JSON.stringify(tempJSON),
        timeout: 2000,
        contentType: "application/json; charset=utf-8",
        beforeSend: function(){
            // console.log ("BEFORE EDIT QUIZ SEND");
        },
        complete: function() {
            // console.log ("COMPLETE EDIT QUIZ LOADING");
        },
        success: function(data){
            // console.log("edited quiz sent");
            $('#editQuiz').hide();
            $('#placeholderSuccess > p > span').text("Quiz has been updated!");
            $('#placeholderSuccess > p > span').append('&nbsp;');
            $('#placeholderSuccess').show();
            $("#placeholderSuccess").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
                $("#placeholderSuccess").hide();
            });
        },
        fail: function(){
            // console.log("EDIT QUIZ FAILED");
        }
    });
}

// Show questions and answers
function generateQA (){
    $('#questionNumber').text("Pytanie " + (currentQuestion+1)).hide().fadeIn();
    $('#question').text(quiz["questions"][currentQuestion]["text"]).hide().fadeIn();
    numAns = quiz["questions"][currentQuestion]["answers"].length;
    // if answered already
    if (currentQuestion < userAnswers.length) {
        $('input[name="answers"][id="' + userAnswers[currentQuestion][2] + '"]').prop('checked',true);
        for (var i = 0; i < numAns; i++) {
            $('#b' + i).show();
            $('#' + i).fadeIn();
            // answer choices radio button labels
            var aID = "label[for=" + i + "]";
            $(aID).fadeIn();
            $(aID).html(quiz["questions"][currentQuestion]["answers"][i]).hide().fadeIn();
        }
        // hide excess answer choices
        for (var a = numAns; a<7; a++) {
            $('#b' + a).fadeOut();
            $('#' + a).fadeOut();
            var labelID = "label[for=" + a + "]";
            $(labelID).fadeOut();
        }
    }
    // if hasn't been answered before //tu wysweitla odp z pliku json
    else {
        // uncheck answers
        $('input[name="answers"]').prop('checked',false);
        for (var i = 0; i < numAns; i++) {
            $('#b' + i).show();
            $('#' + i).fadeIn();
            // answer choices radio button labels
            var aID = "label[for=" + i + "]";
            $(aID).fadeIn();
            $(aID).html(quiz["questions"][currentQuestion]["answers"][i]).hide().fadeIn();
        }
        // hide excess answer choices
        for (var a = numAns; a<7; a++) {
            $('#b' + a).fadeOut();
            $('#' + a).fadeOut();
            var labelID = "label[for=" + a + "]";
            $(labelID).fadeOut();
        }

    }

    if (currentQuestion === 0) {
        $('#previousQuestion').hide();
    }
    else {
        $('#previousQuestion').show();
    }
}

function back(){
    if (currentQuestion <= 0) {
        $('#previousQuestion').hide();
    }
    else {
        currentQuestion--;
        if (currentQuestion <= 0) {
            $('#previousQuestion').hide();
        }
        generateQA();
        var pCheckedAnswer = userAnswers[currentQuestion][2];
        $('input[name="answers"][id="' + pCheckedAnswer + '"').prop('checked',true);
    }
}


// Go to next question in quiz
function nextQuestion() {
    // Before end of quiz
    if (currentQuestion<quizLength-1) {
        // if one of the quiz questions
        if (currentQuestion > -1) {
            // if no answer is checked
            if (!$("input[name='answers']").is(':checked')){
                $('#answerWarning').show();
                $("#answerWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
                    $("#answerWarning").hide();
                });
                if (currentQuestion === 0) {
                    $('#previousQuestion').hide();
                }
                else {
                    $('#previousQuestion').show();
                }
            }
            // if an answer is checked
            else {
                $('#answerWarning').hide();
                if (currentQuestion === 0) {
                    $('#previousQuestion').hide();
                }
                else {
                    $('#previousQuestion').show();
                }
                whichChecked();
                currentQuestion+=1;
                generateQA();
            }
        }
        // if before first question of quiz
        else {
            $('#previousQuestion').hide();
            currentQuestion+=1;
            generateQA();
        }
    }

    // End of quiz
    else {
        // Check last question of quiz
        // if answer is not checked
        if (!$("input[name='answers']").is(':checked')){
            $('#answerWarning').show();
            $("#answerWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
                $("#answerWarning").hide();
            });
        }
        // if an answer is checked
        else {
            $('#answerWarning').hide();
            whichChecked();// Display end of quiz screen
            $('#welcome').hide();
            $('#questionNumber').hide();
            $('#question').hide();
            $('#previousQuestion').hide();
            $('#nextQuestion').hide();
            $('#answerChoices').hide();
            $('#images').hide();
            $('#home').show();

        }
    }
}