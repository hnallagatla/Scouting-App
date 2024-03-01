//Global Variables that store the value at the end of the program. 

var autoScore = 0;  
var leftCommunityPoints = 0;
var leftCommunityString = "";
var inAllianceString = "";
var coopertitionString = "";
var completethrowstring = "";
var parkingstring =  "";
var trapscorestring = "";
var whereonchainstring = "";
var highlightedButtons = {};

const questions = ["team", "match", "speaker", "amp", "ranking", "speaker2", "amp2", "cycle", "hang"];

//Get value of clicked buttons from html and assign similar values to variables - leftCommunity() and inAlliance()
//The call to updateTotalScore() at the end of most of these methods is needed to calculate total auto score correctly
//Used ternary operators for leftCommunity() and inAlliance() instead of using if blocks. Both have same functionality but ternary looks cleaner
//Only use ternary when there are two possible vals. This means when there are 3 or more buttons in one section on the website, it will be hard to use ternary

function leftCommunity(element){
    //Assigns two points if robot leaves community section
    leftCommunityPoints = element.includes("yes") === true ? 2:0;
    leftCommunityString = element.includes("yes") === true ? "Yes": "No";
    updateTotalScore();
}

function inAlliance(element){inAllianceString = element.includes("yes") === true ? "Yes": "No";}

function coopertition(element) { coopertitionString = element.includes("yes") === true ? "Yes" : "No"; }

function completeThrow(element) {completethrowstring = element.includes("yes") === true ? "Yes": "No";}

function parking(element) {parkingstring = element.includes("yes") === true ? "Yes": "No";}

function trapScore(element) {trapscorestring = element.includes("yes") === true ? "Yes": "No";}

function whereOnChain(element) {
    if (element.includes("left")) {whereonchainstring = "Left";}
    else if (element.includes("right")) {whereonchainstring = "Right";}
    else {whereonchainstring = "Didn't";}
}

function subtraction(element) {
    document.getElementById(element.id + "input").value = parseInt(document.getElementById(element.id + "input").value) - 1;
    updateTotalScore();
}

function addition(element) {
    document.getElementById(element.id + "input").value = parseInt(document.getElementById(element.id + "input").value) + 1;
    updateTotalScore();
}

//Goes through questions array and sets all values back to zero. Calls updateTotalScore() to change total score field on website to 0. 
function clearForm(){
    for (i = 0; i < questions.length; i++) document.getElementById(questions[i] + "input").value = 0;
    updateTotalScore();
}

//Unhighlights buttons. IMPORTANT: Does not change whether or not button has been actually clicked. Only changes Frontend(CSS)
//Sets leftCommunityPoints to zero and calls updateTotalScore() to reset points for leaving community back to 0. 
function unhighlightButtons(){
    var buttons = document.querySelectorAll('.general-button, .num-button');
    buttons.forEach(function(button) {
        button.classList.remove('highlighted');
    });
    leftCommunityPoints = 0;
    updateTotalScore();
}

//Changes the total score of auto dynamically on the website as user presses buttons
function updateTotalScore() {
    var speakerScore = parseInt(document.getElementById("speakerinput").value) * 5;
    var ampScore = parseInt(document.getElementById("ampinput").value) * 2;

    autoScore = speakerScore + ampScore + leftCommunityPoints;
    document.getElementById("totalAutoScore").innerText = autoScore;
}

//highlights a button when pressed and unhighlights it when another button of the same section is pressed
//To change the color the button gets highglighted to, go the user.css and alter rgb values of .highlighted block
function highlightButton(sectionId, button) {
    var currentHighlightedButton = highlightedButtons[sectionId];
    if (currentHighlightedButton) {currentHighlightedButton.classList.remove('highlighted');}
    button.classList.add('highlighted');
    highlightedButtons[sectionId] = button;
}   

function getInputValue(element) {
    var inputVal = document.getElementById(element + "input").value;
    return inputVal;
}

function generateQRCode() {
    let qrCodeString = "";
    for (i = 0; i < questions.length; i++) {qrCodeString += getInputValue(questions[i]) + "|";}

    //Using same QR Code logic of seperating all values with a pipe("|")
    //Concatenating values to qrCodeString var simiilar to how it is done in for loop
    qrCodeString += inAllianceString + "|" + leftCommunityString + "|" + autoScore + "|" + coopertitionString + "|" + completethrowstring + "|" + parkingstring + "|" + whereonchainstring + "|" + trapscorestring;

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), qrCodeString);
}


