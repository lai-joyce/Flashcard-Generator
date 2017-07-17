var fs = require("fs");

var clozeFlash = function(text, cloze) {
    // this.text = text;
    // this.cloze = cloze;
    // this.clozeDeleted = text.replace(cloze, '_____');

    var lowerCaseText = text.toLowerCase();
    var lowerCaseCloze = cloze.toLowerCase();

    if (!lowerCaseText.includes(lowerCaseCloze)) {
        console.log("Error: Cloze is not found within full text -- <" + cloze + ">");
        return;
    }

    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = text.replace(cloze, '_____');
    // this.generate = function() {
    //     var questions = {
    //         text: this.text,
    //         cloze: this.cloze,
    //         clozeDeleted: this.clozeDeleted,
    //         form: "cloze"
    //     };
    //     fs.appendFile("log.txt", JSON.stringify(questions) + ';', "utf8", function(error) {
    //         // if there is an error, log the error
    //         if (error) {
    //             console.log(error);
    //         }
    //     });
    // };
}

module.exports = clozeFlash;

// // BasicCard constructor takes two arguments: front and back.
// // These values represent the text appearing on the front and the back of the created flash card.
// exports.BasicCard = function(front, back) {
//     this.front = front;
//     this.back = back;
// }

// // ClozeCard constructor takes two arguments: text and cloze.
// // These values represent the full text and the cloze-deleted portion of the flashcard text.
// exports.ClozeCard = function(text, cloze) {
//     // Convert the incoming strings to lower case
//     var textToLower = text.toLowerCase();
//     var clozeToLower = cloze.toLowerCase();

//     // Confirm that the cloze statement appears within the complete text
//     if (!textToLower.includes(clozeToLower)) {
//         console.log('ERROR: cloze-deletion does not appear within full text -- <' + cloze + '>');
//         return;
//     }

//     this.full = text;
//     this.cloze = cloze;
//     this.partial = text.replace(cloze, '...');
// }
