var fs = require("fs");

var clozeFlash = function(text, cloze) {

    var lowerCaseText = text.toLowerCase();
    var lowerCaseCloze = cloze.toLowerCase();

    if (!lowerCaseText.includes(lowerCaseCloze)) {
        console.log("Error: Cloze is not found within full text -- <" + cloze + ">");
        return;
    }
    
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = text.replace(cloze, '_____');
    this.generate = function() {
        var questions = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            form: "cloze"
        };
        fs.appendFile("log.txt", JSON.stringify(questions) + ';', "utf8", function(error) {
            // if there is an error, log the error
            if (error) {
                console.log(error);
            }
        });
    };
}

module.exports = ClozeFlashcard;
