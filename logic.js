var basicFlash = require("./BasicCard.js");
var clozeFlash = require("./ClozeCard.js");
var questions = require("./questions.js").questions;

var inquirer = require("inquirer");

var fs = require("fs");

var clozeDeletedQuestions = [];

for (var i = 0; i < questions.length; i++) {
	var ques = new clozeFlash(questions[i].text, questions[i].cloze);
	clozeDeletedQuestions.push[ques];
}

var onQuestion = 0;
var rightAnswers = 0;
var wrongAnswers = 0;

function askQuestion() {
	inquirer.prompt([
	{
		type: "input",
		message: clozeDeletedQuestions[onQuestion].clozeDeleted + "\nAnswer: ",
		name: "userGuess"
	}
	]).then(function(answers) {
		console.log("\n");

		if(answers.userGuess.toLowerCase() === clozeDeletedQuestions[onQuestion].cloze.toLowerCase()) {
			console.log("Correct!");
			rightAnswers++;
		} else {
			console.log("Incorrect!");
			wrongAnswers++;
		}

		console.log(clozeDeletedQuestions[onQuestion].text);
		console.log("---------------------\n");

		if(onQuestion < clozeDeletedQuestions.length-1) {
			onQuestion++;
			askQuestion();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + rightAnswers);
			console.log('Incorrect Answers: ' + wrongAnswers);

			console.log('-------------------------------------\n');

			inquirer.prompt([
			{
				type: "confirm",
				message: "Would you like to play again?",
				name: "playAgain"
			}
			]).then(function(answers) {
				if(answers.playAgain) {
					onQuestion = 0;
					rightAnswers = 0;
					wrongAnswers = 0;

					askQuestion();
				} else {
					console.log("Thanks for playing!");
				}
			})
		}
	})
}

askQuestion();

// // Require the 'inquirer' package
// var inquirer = require('inquirer');

// // Import the flash cards constructor implementations
// var flashCards = require('./ClozeCard.js');
// // Import the full list of questions
// var questions = require('./questions.js').questions;

// // Variable that holds the cloze-deleted questions list
// var closeQuestions = [];

// // Populate the cloze-deleted questions list
// for (var i = 0; i < questions.length; i++) {
// 	var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
// 	closeQuestions.push(q);
// }

// // What question the user is currently on
// var currentQuestion = 0;
// // How many questions the user has gotten right
// var answerRight = 0;
// // How many questions the user has gotten wrong
// var answerWrong = 0;

// // askQuestion prompts the user to answer a given cloze-deleted question
// function askQuestion() {
// 	inquirer.prompt([
// 		{
// 			type: 'input',
// 			message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
// 			name: 'userGuess'
// 		}
// 	]).then(function (answers) {
// 		console.log('\n');

// 		// Check if the user has guessed correctly
// 		if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
// 			console.log('Correct!');
// 			answerRight++;
// 		} else {
// 			console.log('Incorrect!');
// 			answerWrong++;
// 		}

// 		// Show the correct answer
// 		console.log(closeQuestions[currentQuestion].full);
// 		console.log('-------------------------------------\n');

// 		// Advance to the next question
// 		if (currentQuestion < closeQuestions.length - 1) {
// 			currentQuestion++;
// 			askQuestion();
// 		} else {
// 			console.log('Game Over!');
// 			console.log('Correct Answers: ' + answerRight);
// 			console.log('Incorrect Answers: ' + answerWrong);

// 			console.log('-------------------------------------\n');

// 			// Prompt the user to play again
// 			inquirer.prompt([
// 				{
// 					type: 'confirm',
// 					message: 'Would you like to play again?',
// 					name: 'playAgain'
// 				}
// 			]).then(function (answers) {
// 				if (answers.playAgain) {
// 					// Reset the game
// 					currentQuestion = 0;
// 					answerRight = 0;
// 					answerWrong = 0;

// 					// Begin asking the questions!
// 					askQuestion();
// 				} else {
// 					// Exit the game
// 					console.log('Thanks for playing! Goodbuy!');
// 				}
// 			})
// 		}
// 	})
// }

// // Begin asking the questions!
// askQuestion();

