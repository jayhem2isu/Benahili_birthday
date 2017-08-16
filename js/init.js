// some standard initializations; don't mess with these

var counter = 0,
    score = 0;

// your quiz data should go into this variable in object form -- one object per item. sample format below:

/* 

{
  "name": "Nomad's Dream",
  "type": "trek"
}

*/

var content = [
  {"question":"What is Bena's middle name?","answer":"one","one":"Faith","two":"Hope"},
  {"question":"What is her favourite colour?","answer":"one","one":"Purple","two":"Blue"},
  {"question":"What is Bena's shoe size?","answer":"one","one":"39","two":"40"},
  {"question":"What was the name of Bena's first crush?","answer":"two","one":"David","two":"David"},
  {"question":"What is Bena's dad's name?","answer":"two","one":"Itose","two":"Barnabas"},
  {"question":"What year did Bena lose her dad?","answer":"two","one":"July 26th 2002","two":"July 26th 2004"},
  {"question":"What did Bena want to be as a child?","answer":"one","one":"Tv Presenter","two":"Singer"},
  {"question":"How many videos does Bena have on her youtube channel?","answer":"one","one":"7","two":"8"},
  {"question":"When did Bena start her shameless journey?","answer":"two","one":"a","two":"b"},
  {"question":"The Man Trap","answer":"one","one":"a","two":"b"}];

// assigning the commonly accessed dom elements to variables

var $question = $('.question'),
    $one = $('.one'),
    $two = $('.two'),
    $generate = $('.generate'),
    $result = $('.results'),
    $score = $('.score'),
    $thanks = $('.thanks'),
    $options = $('.options');
    $grade = $('.grade');

var trekApp = {};

// the initial state of the quiz:
// starts off by showing the "name" value in the first item in the data object
// hides the 'next' button, results, score and 'thanks for playing' html as a default

trekApp.init = function() {
  var selection = content[counter];
  type = selection["answer"];
  $question.html(selection["question"]);
  $one.html(selection["one"]);
  $two.html(selection["two"]);
  $generate.hide();
  $result.hide();
  $score.hide();
  $thanks.hide();
  $grade.hide();
}

// the function for moving through the quiz

trekApp.generate = function() {

  // if there are still questions remaining, show the next one
  
  if (counter < content.length) {
    var selection = content[counter];
    $question.html(selection["question"]);
    $one.html(selection["one"]);
    $two.html(selection["two"]);
    type = selection["answer"];  

    $result.hide();
    $score.hide();
    $question.show();
    $options.show();

  // if there are no more questions, thank the user for playing and give the option to tweet the score
  
  } else {
    if (score == 10){
      $grade.show().append("You cheated");
    }
    else if  (score <10 && score >= 8) {
      $grade.show().append("You are in the run for best friend");
    }
    else if  (score <8 && score >= 5) {
      $grade.show().append("You try");
    }
    else if  (score <5) {
      $grade.show().append("Wow, You have failed as a friend");
    }
    $result.hide();
    $thanks.show().append(" <a href='http://twitter.com/home?status=Happy Birthday @bena_hili! I love you. I scored " + score + " out of " + counter + " in the best friend quiz' target='_blank'>Tweet your score</a>.");
  }

  $generate.hide();
}

// the event handler that determines whether the user's selection was right

$('.choice').click(function(e) {
  var chosenAnswer = e.target.id;  
  $result.show();
  $score.show();
  $question.hide();
  $options.hide();


   
  // tell the user whether they're right or wrong, and add a point to the score if they're right

  if (chosenAnswer == type) {
    $result.html("<span class='right'>That's Right!</span> You chose the right option.");
    score++;
  } else {
    $result.html("<span class='wrong'>Well Damn!</span> You chose the wrong option.");
  }
  counter++;
  $score.html("You're " + score + " for " + counter + ".");
  $generate.show();
  
});

$(document).ready(function() {
  trekApp.init();
});

$generate.on('click', function() {
  trekApp.generate();
});