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

