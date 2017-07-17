var fs = require("fs");

var basicFlash = function(front,back) {
	this.front = front;
	this.back = back;
	this.generate = function() {
		var questions = {
			front: this.front,
			back: this.back,
			form: "basic",
		};

		fs.appendFile("log.txt", JSON.stringify(questions) + ';', "utf8", function(error) {
			if(error) {
				console.log(error);
			}
		});
	};
}

module.exports = basicFlash;