// Global Variables
var baseAttack = 0; // original attack strength
var player; // player chosen
var opponent; // current opponent
var charArray = []; // stores characters in array
var playerSelected = false; // mark if player chosen
var opponentSelected = false; // mark if opponent chosen
var obj = document.createElement("audio");// creates spell sound when the cast spell button is clicked
    obj.src="assets/sounds/spellSound.mp3";
    obj.volume=0.50;
    obj.autoPlay=false;
    obj.preLoad=true;  


// Constructor
function Character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;
}

// Initialize all the characters
function initCharacters() {
    var harry = new Character("Harry Potter", 170, 30, 5, "./assets/images/Harry.jpg");
    var hermione = new Character("Hermione Granger", 200, 40, 20, "./assets/images/hermione.jpg");
    var ron = new Character("Ron Weasley", 130, 15, 2, "./assets/images/Ron.png");
    var ginny = new Character("Ginny Weasley", 150, 20, 7, "./assets/images/Ginny.jpg");
    charArray.push(harry, hermione, ron, ginny);
}

// Create the character cards onscreen
function characterCards(divID) {
    $(divID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(divID).append("<div style = 'background-color:#015564' />");
        $(divID + " div:last-child").addClass("card");
        $(divID + " div:last-child").append("<img style = 'background-color:#015564; border:#015564'/>");
        $(divID + " img:last-child").attr("id", charArray[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", charArray[i].pic);
        $(divID + " img:last-child").addClass("img-thumbnail");
        $(divID + " div:last-child").append(charArray[i].name + "<br>");
        $(divID + " div:last-child").append("HP: " + charArray[i].healthPoints);
        $(divID + " idv:last-child").append();

    }
}

// Update the characters pictures location on the screen (move them between divs)
function updatePics(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(toDivID).append("<img style = 'background-color:#015564; border:#015564'/>");
        $(toDivID + " img:last-child").attr("id", charArray[i].name);
        $(toDivID + " img:last-child").attr("src", charArray[i].pic);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}

// Change the view from the first screen to the second screen
function changeView() {
    $("#playerScreen").empty();
    $("#duelScreen").show();
}


$(document).ready(function () {
    $("#duelScreen").hide();
    initCharacters();
    characterCards("#game");
});

