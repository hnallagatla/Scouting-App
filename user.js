var autoScore = 0;  
var communityPoints = 0;
var highlightedButtons = {};
const questions = ["team", "match", "alliance", "wherecommunity", "leftcommunityno", "leftcommunityyes", "speaker", "amp", "totalautoscore", "ranking", "work", "comment"]


function leftCommunity(element){
    if (element.substring(13,16) === "yes") {communityPoints = 2;} 
    else{ communityPoints =0;}

   updateTotalScore();
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

    autoScore = speakerScore + ampScore + communityPoints;
    document.getElementById("totalautoscoreinput").innerText = autoScore;
}

function highlightButton(sectionId, button) {
    var currentHighlightedButton = highlightedButtons[sectionId];

    if (currentHighlightedButton) {currentHighlightedButton.classList.remove('highlighted');}

    button.classList.add('highlighted');

    highlightedButtons[sectionId] = button;
}

function getInputValue(element) {
    if (element === "alliance" || element === "wherecommunity" || element === "leftcommunityno" || element === "leftcommunityyes") {
        var selectedButton = highlightedButtons[element];
        return selectedButton ? selectedButton.innerText : "hello";
    } else {return document.getElementById(element + "input").value;}
}


function generateQRCode() {
    let qrCodeString = "";
    for (i = 0; i < questions.length; i++) {
        qrCodeString += getInputValue(questions[i]) + "|";
    }

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), qrCodeString);
}
