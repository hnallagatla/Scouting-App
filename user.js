var autoScore = 0;  
var communityPoints = 0;
var highlightedButtons = {};


function leftCommunity(element){
    if (element.substring(13) === "Yes") {communityPoints = 2;} 
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
    document.getElementById("totalAutoScore").innerText = autoScore;
}

function highlightButton(sectionId, button) {
    var currentHighlightedButton = highlightedButtons[sectionId];

    if (currentHighlightedButton) {currentHighlightedButton.classList.remove('highlighted');}

    button.classList.add('highlighted');

    highlightedButtons[sectionId] = button;
}
