//Global Variables that store the value at the end of the program. 

var autoScore = 0;  
var leftCommunityPoints = 0;
var leftCommunityString = "";
var inAllianceString = "";
var highlightedButtons = {};

const questions = ["team", "match", "speaker", "amp", "ranking"];

//Get value of clicked buttons from html and assign similar values to variables - leftCommunity() and inAlliance()
//The call to updateTotalScore() in leftCommunity(), addition(), and subtraction is needed to calculate total auto score correctly
//Used ternary operators for leftCommunity() and inAlliance() instead of using if blocks. Both have same functionality but ternary looks cleaner
//Only use ternary when there are two possible vals. This means when there are 3 or more buttons in one section on the website, it will be hard to use ternary

function leftCommunity(element){
    //Assigns two points if robot leaves community section
    leftCommunityPoints = element.includes("yes") === true ? 2:0;
    leftCommunityString = element.includes("yes") === true ? "Yes": "No";
    updateTotalScore();
}

function inAlliance(element){inAllianceString = element.includes("yes") === true ? "Yes": "No";}

function addition(element) {
    document.getElementById(element.id + "input").value = parseInt(document.getElementById(element.id + "input").value) + 1;
    updateTotalScore();
}

function subtraction(element) {
    document.getElementById(element.id + "input").value = parseInt(document.getElementById(element.id + "input").value) - 1;
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
    qrCodeString += inAllianceString + "|" + leftCommunityString + "|" + autoScore;

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), qrCodeString);
}
