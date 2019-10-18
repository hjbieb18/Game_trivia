$(document).ready(function(){


    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  const api = 'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=boolean'

  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: 'The music group Daft Punk got their name from a negative review they recieved.',
      q2: 'The music video to The Buggles "Video Killed the Radio Star" was the first music video to broadcast on MTV.' ,
      q3: 'Eurobeat is primarily an Italian genre of music.',
      q4: 'American rapper Dr. Dre actually has a Ph.D. doctorate.',
      q5: 'The alternative rock band, They Might Be Giants, released their album "Flood" in 1990',
      q6: 'The song "Stronger Than You" is a single by Estelle, who played Garnet in Steven Universe.',
      q7: 'A Saxophone is a brass instrument.',
      q8: 'Daft Punk originated in France.',
      q9: 'Scatman Johns real name was John Paul Larkin.',
      q10: 'The 2011 movie "The Adventures of Tintin" was directed by Steven Spielberg.'
    },
    options: {
      q1: ['true','false'],
      q2: ['true','false'],
      q3: ['true','false'],
      q4: ['true','false'],
      q5: ['true','false'],
      q6: ['true','false'],
      q7: ['true','false'],
      q8: ['true','false'],
      q9: ['true','false'],
      q10: ['true','false']
    },
    answers: {
      q1: 'true',
      q2: 'true',
      q3: 'true',
      q4: 'false',
      q5: 'true',
      q6: 'true',
      q7: 'false',
      q8: 'true',
      q9: 'true',
      q10: 'true'
    },
    
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
    
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      
      
      trivia.nextQuestion();
      
    },
 
    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
    
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        $('#start').show();
      }
      
    },
    guessChecker : function() {
      
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Wrong Answer! '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();  
    }
  }
  
