$(document).ready(function(){
//Game object
var triviaGame = {

//Array for question and answers
	qAndA:[{
		question: "What is the only body system that is not working when you are born?",
			ans1: "Skeletal System",
            ans2: "Excretory System",
            ans3: "Reproductive System",                 
			ans4: "Digestive System",          
			imgUrl: "./assets/images/baby.jpg"},
	   {
	   	question: "How many years does puberty take?",
			ans1: "3",
			ans2: "5",
			ans3: "6",
			ans4: "8",
			imgUrl: "./assets/images/8.png"},
		{
	   	question: "How many sperm do males make each second?",
			ans1: "100",
			ans2: "1,000",
			ans3: "50,000",
			ans4: "1,000,000",
			imgUrl: "./assets/images/1000.jpg"},
	   {
	   	question: "What is the first thing that determines if you are male or female?",
			ans1: "Hormones",
			ans2: "Chromosomes",
			ans3: "Genitalia",
			ans4: "Progesterone",
            imgUrl: "./assets/images/chromo.png"},
       {
        question: "What is the most effective form of birth control:",
            ans1: "Testosterone",
            ans2: "Intrauterine device",
            ans3: "Abstinence",
            ans4: "Netflix",
            imgUrl: "./assets/images/Happy_condoms.jpg"},
		{
		question: "Who is the only person that can tell you if you have an STI (sexually transmitted infection) or not?",
		    ans1: "You",
		    ans2: "Me",
		    ans3: "Doctor",
		    ans4: "A mirror",
			imgUrl: "./assets/images/doc2.jpg"}],

	correctAnswers: ['Reproductive System', '8', '1,000', 'Chromosomes', 'Abstinence','Doctor'],//array to hold correct answers
	userAnswers: [],

	questionCount: 0,
	beginInt: 0,

	timer: 30,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberSkipped: 0,

	beginGame: function(){	
		if(triviaGame.questionCount == triviaGame.qAndA.length){
			triviaGame.gameFinished();
			triviaGame.timer = 30;
		} else {
			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 30;
				$('#time').html(triviaGame.timer); 
			}
			$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
			$('button.answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
			$('button.answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
			$('button.answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
			$('button.answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);

			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);
		}
    },
    
// Count down timer 
	countDown: function(){
		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer == 0){
			triviaGame.oufOfTime();
		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
			triviaGame.answersCorrect();
		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){
            triviaGame.answersWrong();
		}
	},
// If user input is correct
	answersCorrect: function(){
		if(newImg != ""){
			$('#pic').empty();
		}
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');
		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
    },
    
// If user is incorrect
	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
    },
    
// If user out of time 
	oufOfTime: function(){
		if(newImg != ""){
			$('#pic').empty();
		}
		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');
		$('#pic').append(newImg);
        
        triviaGame.numberSkipped++;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.questionCount++;	
    },
    
// Restart function
	restart: function(){
		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("30");
		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberSkipped = 0;
    },
    
//Game Over and DOM reset
	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();
		$('#gameComplete').css('display', 'block');
		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#skipped span').html(triviaGame.numberSkipped);
		triviaGame.timer = 30;
	}
};

// Begin the Game
	$('#begin').on('click', function(){
		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(triviaGame.beginGame);
    });
    
// Options on click for user 
	$('.answers').on('click', function(){
		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;
    });
    
// User wants to restart
	$('#restartPlaceholder').on('click', function(){
		triviaGame.restart();		
	});
});