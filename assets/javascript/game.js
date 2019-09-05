// Author: Macy Corbin
// Portfolio: http://www.macy-corbin.com
// GitHub: https://github.com/MacyCorbin

// Global Variables
var baseAttack = 0; // original attack strength
var player; // player chosen
var opponent; // current opponent
var charArray = []; // stores characters in array
var playerSelected = false; // mark if player chosen
var opponentSelected = false; // mark if opponent chosen
var spellSound = document.createElement("audio");// creates spell sound when the cast spell button is clicked
    spellSound.src="assets/sounds/spellSound.mp3";
    spellSound.volume=0.50;
    spellSound.autoPlay=false;
    spellSound.preLoad=true; 


// Constructor
function Character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;
}

// Increase the attack strength (this attack strength + original attack strength)
Character.prototype.increaseAttack = function () {
    this.attackPower += baseAttack;
};

// Performs an attack
Character.prototype.attack = function (Obj) {
    Obj.healthPoints -= this.attackPower;
    $("#message").html("You attacked " +
        Obj.name + " for " + this.attackPower + " damage points.");
    this.increaseAttack();
};

// Performs a counter attack
Character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttackPower;
    $("#message").append("<br>" + this.name + " counter attacked you for " + this.counterAttackPower + " damage points.");
};

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

// "Save" the original attack value
function setBaseAttack(Obj) {
    baseAttack = Obj.attackPower;
}

// Checks if character is alive
function isAlive(Obj) {
    if (Obj.healthPoints > 0) {
        return true;
    }
    return false;
}

// Checks if the player has won
function isWinner() {
    if (charArray.length == 0 && player.healthPoints > 0)
        return true;
    else return false;
}

$(document).on("click", "img", function () {
    // Stores the opponent the user has clicked on in the opponent variable and removes it from the charArray
    if (playerSelected && !opponentSelected && (this.id != player.name)) {
        for (var j = 0; j < charArray.length; j++) {
            if (charArray[j].name == (this).id) {
                opponent = charArray[j]; // sets opponent
                charArray.splice(j, 1);
                opponentSelected = true;
                $("#message").html("Click the button to cast spell!");
            }
        }
        $("#opponentDiv").append(this); // appends the selected opponent to the opponent div 
        $("#opponentDiv").addClass("animated zoomInRight");
        $("#opponentDiv").append("<br>" + opponent.name);
        $("#opponentHealthDiv").append("HP: " + opponent.healthPoints);
        $("#opponentHealthDiv").addClass("animated zoomInRight");
    }
    // Stores the character the user has clicked on in the player variable and removes it from charArray
    if (!playerSelected) {
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name == (this).id) {
                player = charArray[i]; // sets current player
                setBaseAttack(player);
                charArray.splice(i, 1);
                playerSelected = true;
                changeView();
                $("#message").html("Pick an opponent to duel!");
            }
        }
        updatePics("#game", "#opponentLeft");
        $("#playerDiv").append(this); // appends the selected player to the div
        $("#playerDiv").addClass("animated zoomIn");
        $("#playerDiv").append(player.name);
        $("#playerHealthDiv").append("HP: " + player.healthPoints);
        $("#playerHealthDiv").addClass("animated zoomIn");
    }

});



$(document).ready(function () {
    $("#duelScreen").hide();
    initCharacters();
    characterCards("#game");
    
});

