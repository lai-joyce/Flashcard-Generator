var basicFlash = require("./BasicCard.js");
var clozeFlash = require("./ClozeCard.js");
var questions = require("./questions.js").questions;

var inquirer = require("inquirer");

var fs = require("fs");

var clozeDeletedQuestions = [];

for (var i = 0; i < questions.length; i++) {
	var ques = new clozeFlash(questions[i].text, questions[i].cloze);
	clozeDeletedQuestions.push(ques);
}

var onQuestion = 0;
var rightAnswers = 0;
var wrongAnswers = 0;

// function startQuestion() {
	inquirer.prompt([
	{
		name: "userInput"
		message: "Would you like to add card or play game?",
		type: "list",
		choices: [{
			name: "create card"
		}, {
			name: "play game"
		}]
	}
	]).then(function(answer) {
		if(answer.userInput === "create card") {
			createCard();
		} else {
			askQuestion();
		}
	});
// }

function createCard() {
	inquirer.prompt([
	{
		name: "version",
		type: "list",
		message: "Would you like to create a basic card or cloze card?",
		choices: [{
			name: "basic card"
		}, {
			name: "cloze card"
		}]
	}
	]).then(function(answer) {
		if(answer.version === "basic card") {
			inquirer.prompt([
			{
				name: "front",
				message: "What is the question?",
				validate: function(input) {
					if(input === " ") {
						console.log("Please enter a question.");
						return false;
					} else {
						return true;
					}
				}
			}, {
				name: "back",
				message: "What is the answer?",
				validate: function(input) {
					if(input === " ") {
						console.log("Please enter an answer.");
						return false;
					} else {
						return true;
					}
				}
			}
			]).then(function(answer) {
				var newBasicCard = new basicFlash(answer.front,answer.back);
				newBasicCard.generate();
				startQuestion();
			});
			
		} else {
			inquirer.prompt([
			{
				name: "text",
				message: "What is the complete text?",
				validate: function(input) {
					if(input === " ") {
						console.log("Please enter the complete text.");
						return false;
					} else {
						return true;
					}
				}

			}, {
				name: "cloze",
				message: "What is the cloze text?",
				validate: function(input) {
					if(input === " ") {
						console.log("Please enter the cloze text.");
						return false;
					} else {
						return true;
					}
				}

			}
			]).then(function(answer) {
				var text = answer.text;
				var cloze = answer.cloze;
				if(text.includes(cloze)) {
					var newClozeCard = new clozeFlash(text,cloze);
					newClozeCard.generate();
					startQuestion();
				} else {
					console.log("The cloze portion is not in your sentence. Try again.");
					createCard();
				}
			});
		}
	});
}

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

// startQuestion();

