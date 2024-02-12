var autoScore = 0;  
var leftCommunityPoints = 0;
var leftCommunityString = "";
var inAllianceString = "";
var whereInCommunityString = "";
var startWithNoteString = "";
var highlightedButtons = {};

const questions = ["team", "match", "speaker", "amp", "ranking", "work", "comment"]


function leftCommunity(element){
    leftCommunityPoints = element.includes("yes") === true ? 2:0;
    leftCommunityString = element.includes("yes") === true ? "Yes": "No";
    updateTotalScore();
}

function inAlliance(element){inAllianceString = element.includes("yes") === true ? "Yes": "No";}

function startWithNote(element){startWithNoteString = element.includes("yes") === true ? "Yes": "No";}

function whereInCommunity(element){
    if (element.includes("left")){whereInCommunityString = "Left"}
    else if (element.includes("middle")){whereInCommunityString = "Middle"}
    else{whereInCommunityString = "Right"}
}


function addition(element) {
    document.getElementById(element.id + "input").value = parseInt(document.getElementById(element.id + "input").value) + 1;
    updateTotalScore();
}

function subtraction(element) {
    document.getElementById(element.id + "input").value = parseInt(document.getElementById(element.id + "input").value) - 1;
    updateTotalScore();
}

function updateTotalScore() {
    var speakerScore = parseInt(document.getElementById("speakerinput").value) * 5;
    var ampScore = parseInt(document.getElementById("ampinput").value) * 2;

    autoScore = speakerScore + ampScore + leftCommunityPoints;
    document.getElementById("totalAutoScore").innerText = autoScore;
}

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

    var qrArray = qrCodeString.split("|");
    qrArray.splice(2, 0, inAllianceString);
    qrArray.splice(3, 0, whereInCommunityString);
    qrArray.splice(4,0,startWithNoteString);
    qrArray.splice(5, 0, leftCommunityString);
    qrArray.splice(8,0,autoScore);

    qrCodeString = qrArray.join("|");

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), qrCodeString);
}
