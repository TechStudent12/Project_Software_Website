// Timer functions below
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
//var milisecondsLabel = document.getElementById("miliseconds");
var hoursLabel = document.getElementById("hours");
var isPaused = false;
var time = 0;

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
    render(table, playedCards);
    document.getElementById("gameEnd").style.cursor = "pointer";
    t = window.setInterval(function() {
        if(!isPaused && num === 0) {
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
    document.getElementById("container").style.visibility = "hidden";
    functionDeleteSong(num);
}
// End of timer functions.

// Below is the help button modal
// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");


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
}
// End of help button modal 

function Confirm2(title, msg, $true, $false, num) { 
    var $content =  "<div class='dialog-ovelay'>" +
                "<div class='dialog'><header>" +
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
    }
    else if(t.value=="0") {
        t.value="1";
        console.log(t.value); 
        document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/night.jpg")';
        document.getElementById("checkbox-label").style.backgroundColor = 'black';
    }
}

window.onload = function(event) {
    toggle();
}
