//Timer functions below
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
//var milisecondsLabel = document.getElementById("miliseconds");
var hoursLabel = document.getElementById("hours");
var isPaused = false;
var time = 0;

//Pause function for timer.
function functionPause() {
    isPaused = true;
}

//Resume function for timer
function functionResume() {
    isPaused = false;
}

//Padding for innerHTML text.
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//New game function for timer. Start timer when user press newGame button.
var t;
function newGame(num) {
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
            document.getElementById("resumeBtn").disabled = false;
            document.getElementById("gameEnd").style.cursor = "pointer";
            document.getElementById("pauseBtn").style.cursor = "pointer";
            document.getElementById("resumeBtn").style.cursor = "pointer";
        }
    }, 10);
} 

//New game function for timer. End timer when user press endGame button.
function endGame(num) {
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
        document.getElementById("resumeBtn").style.cursor = "no-drop";
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("resumeBtn").disabled = true;
    }
}

// Below is the help button modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("helpBtn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// End of help button modal 