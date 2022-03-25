// Timer functions below
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
//var milisecondsLabel = document.getElementById("miliseconds");
var hoursLabel = document.getElementById("hours");
var isPaused = false;
var isEnd = false;
var time = 0;

document.getElementById("myModal3").style.display = 'block';

// Pause function for timer.
function functionPause() {
    isPaused = true;
}

// Resume function for timer
function functionResume() {
    isPaused = false;
}

// Padding for innerHTML text.
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// New game function for timer. Start timer when user press newGame button.
var t;
function newGame(num) {
    reset(table);
    render(table, playedCards);
    play(table);
    document.getElementById("gameEnd").style.cursor = "pointer";
    document.getElementById("table").style.cursor = "pointer";
    t = window.setInterval(function() {
        if(!isPaused && !isEnd && num === 0) {
            time++;
            if(num === 0) {
                //milisecondsLabel.innerHTML = pad(time % 60);
                secondsLabel.innerHTML = pad(parseInt((time / 60) % 60));
                minutesLabel.innerHTML = pad(parseInt((time / 60 / 60) % 60));
                hoursLabel.innerHTML = pad(parseInt((time / 60 / 60 / 60) % 60));
            }
            document.getElementById("gameNew").disabled = true;
            document.getElementById("gameNew").style.cursor = "no-drop";
            document.getElementById("gameEnd").disabled = false;
            document.getElementById("pauseBtn").disabled = false;
            //document.getElementById("resumeBtn").disabled = false;
            document.getElementById("gameEnd").style.cursor = "pointer";
            document.getElementById("pauseBtn").style.cursor = "pointer";
            //document.getElementById("resumeBtn").style.cursor = "pointer";
            document.getElementById("container").style.visibility = "visible";
        }
    }, 10);
} 

// New game function for timer. End timer when user press endGame button.
function endGame(num) {
    isEnd = true;
    functionDeleteSong(num);
}
// End of timer functions.

// Below is the help button modal
// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");


// Get the button that opens the modal
var btn = document.getElementById("helpBtn");
var btn2 = document.getElementById("pauseBtn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

btn2.onclick = function() {
    modal2.style.display = "block";
    functionPause();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
        isPaused = false;
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
        modal4.style.display = "block";
    }
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}
// End of help button modal 

function Confirm2(title, msg, $true, $false, num) { 
    var $content =  "<div class='dialog-ovelay'>" +
                "<div class='dialog' id='dialog'><header>" +
                    " <center><h3><img src='../logos/logo.png' style='width: 100px; height: 100px;'><br>" + title + " </h3></center> " +
                "</header>" +
                "<div class='dialog-msg'>" +
                    " <center><p> " + msg + " </p></center> " +
                "</div>" +
                "<footer>" +
                    "<center><div class='controls'>" +
                        " <button class='doAction' id='btnDoAction'>" + $true + "</button> " +
                        " <button class='cancelAction' id='btnCancelAction'>" + $false + "</button> " +
                    "</div></center>" +
                "</footer>" +
            "</div>" +
        "</div>";
    $('body').prepend($content);
    $('.doAction').click(function () {
        document.getElementById("gameNew").style.cursor = "pointer";
        if(num === 1) {
            isEnd = false;
            clearInterval(t);
            time = 0;
            //milisecondsLabel.innerHTML = "00";
            secondsLabel.innerHTML = "00";
            minutesLabel.innerHTML = "00";
            hoursLabel.innerHTML = "00";
            document.getElementById("gameNew").disabled = false;
            document.getElementById("gameNew").style.cursor = "pointer";
            document.getElementById("gameEnd").disabled = true;
            document.getElementById("gameEnd").style.cursor = "no-drop";
            document.getElementById("pauseBtn").style.cursor = "no-drop";
            //document.getElementById("resumeBtn").style.cursor = "no-drop";
            document.getElementById("pauseBtn").disabled = true;
            //document.getElementById("resumeBtn").disabled = true;
            document.getElementById("container").style.visibility = "hidden";
            $('.dialog-ovelay').remove();
        }
    });
    $('.cancelAction').click(function () {
        isEnd = false;
        $('.dialog-ovelay').remove();
    });
}

function functionDeleteSong(num) {
    Confirm2("Confirm Your Request", "Hold your cards! Do you want to end this game?", 'Yes', 'Cancel', num);
}

function toggle() {
    var t = document.getElementById("checkbox");
    if(t.value == "1") {
        t.value="0";
        console.log(t.value); 
        document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/day.jpg")';
        document.getElementById("checkbox-label").style.backgroundColor = '#3cb371';
        //document.getElementsByClassName("card").style.backgroundImage = 'url("https://bfa.github.io/solitaire-js/img/card_back_bg.png")';
        document.getElementById("modal-content2").style.backgroundColor = '#63d471';
        document.getElementById("modal-content2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("modal-content3").style.backgroundColor = '#63d471';
        document.getElementById("modal-content3").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("headerMain").style.border = '2px dashed green';
        document.getElementById("headerMain").style.backgroundColor = '#63d471';
        document.getElementById("headerMain").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first").style.backgroundColor = '#63d471';
        document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first").style.borderColor = 'green';
        document.getElementById("second").style.backgroundColor = '#63d471';
        document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("second").style.borderColor = 'green';
        document.getElementById("third").style.backgroundColor = '#63d471';
        document.getElementById("third").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("third").style.borderColor = 'green';
        document.getElementById("fourth").style.backgroundColor = '#63d471';
        document.getElementById("fourth").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("fourth").style.borderColor = 'green';
        document.getElementById("fifth").style.backgroundColor = '#63d471';
        document.getElementById("fifth").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("fifth").style.borderColor = 'green';
        document.getElementById("sixth").style.backgroundColor = '#63d471';
        document.getElementById("sixth").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("sixth").style.borderColor = 'green';
        document.getElementById("seventh").style.backgroundColor = '#63d471';
        document.getElementById("seventh").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("seventh").style.borderColor = 'green';
    }
    else if(t.value=="0") {
        t.value="1";
        console.log(t.value); 
        document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/night.jpg")';
        document.getElementById("checkbox-label").style.backgroundColor = 'black';
        //document.getElementsByClassName("card").style.backgroundImage = 'url("../Images_NotNumbers/backDesign.jpg")';
        document.getElementById("modal-content2").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("modal-content3").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content3").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("headerMain").style.border = '2px dashed black';
        document.getElementById("headerMain").style.backgroundColor = '#7f5a83';
        document.getElementById("headerMain").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first").style.backgroundColor = '#7f5a83';
        document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first").style.borderColor = 'black';
        document.getElementById("second").style.backgroundColor = '#7f5a83';
        document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("second").style.borderColor = 'black';
        document.getElementById("third").style.backgroundColor = '#7f5a83';
        document.getElementById("third").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("third").style.borderColor = 'black';
        document.getElementById("fourth").style.backgroundColor = '#7f5a83';
        document.getElementById("fourth").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("fourth").style.borderColor = 'black';
        document.getElementById("fifth").style.backgroundColor = '#7f5a83';
        document.getElementById("fifth").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("fifth").style.borderColor = 'black';
        document.getElementById("sixth").style.backgroundColor = '#7f5a83';
        document.getElementById("sixth").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("sixth").style.borderColor = 'black';
        document.getElementById("seventh").style.backgroundColor = '#7f5a83';
        document.getElementById("seventh").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("seventh").style.borderColor = 'black';
    }   
}

window.onload = function(event) {
    toggle();
}
