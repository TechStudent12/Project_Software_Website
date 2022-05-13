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
    document.getElementById("container").style.visibility = "visible";
    document.getElementById("gameEnd").style.cursor = "pointer";
    document.getElementById("table").style.cursor = "pointer";
    document.getElementById("gameNew").disabled = true;
    document.getElementById("gameNew").style.cursor = "no-drop";
    document.getElementById("gameEnd").disabled = false;
    document.getElementById("pauseBtn").disabled = false;
    document.getElementById("gameEnd").style.cursor = "pointer";
    document.getElementById("pauseBtn").style.cursor = "pointer";
    t = window.setInterval(function() {
        if(!isPaused && !isEnd && num === 0) {
            time++;
            if(num === 0) {
                //milisecondsLabel.innerHTML = pad(time % 60);
                secondsLabel.innerHTML = pad(parseInt((time / 60) % 60));
                minutesLabel.innerHTML = pad(parseInt((time / 60 / 60) % 60));
                hoursLabel.innerHTML = pad(parseInt((time / 60 / 60 / 60) % 60));
            }
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
var modal5 = document.getElementById("myModal5");
var modal6 = document.getElementById("myModal6");
var modal7 = document.getElementById("myModal7");
var modal8 = document.getElementById("myModal8");
var modal9 = document.getElementById("myModal9");
var modal10 = document.getElementById("myModal10");


// Get the button that opens the modal
var btn = document.getElementById("helpBtn");
var btn2 = document.getElementById("pauseBtn");
var btn3 = document.getElementById("guestAccount");
var btn4 = document.getElementById("img444");
var btn5 = document.getElementById("imgProfile");
var btn6 = document.getElementById("changeTypeStandard");
var btn7 = document.getElementById("vegasOpen");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

btn2.onclick = function() {
    modal2.style.display = "block";
    functionPause();
}

if(btn3) {
    btn3.onclick = function() {
        modal5.style.display = "block";
        functionPause();
    }
}

if(btn4) {
    btn4.onclick = function() {
        modal6.style.display = "block";
        functionPause();
    }
}

if(btn5) {
    btn5.onclick = function() {
        modal7.style.display = "block";
        functionPause();
    }
}

if(btn6) {
    btn6.onclick = function() {
        modal8.style.display = "block";
        functionPause();
    }
}

if(btn7) {
    btn7.onclick = function() {
        modal9.style.display = "block";
        functionPause();
    }
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
        modal10.style.display = "block";
    }
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
    if (event.target == modal7) {
        modal7.style.display = "none";
    }
    if (event.target == modal8) {
        modal8.style.display = "none";
    }
    if (event.target == modal9) {
        modal9.style.display = "none";
    }
    if (event.target == modal10) {
        modal10.style.display = "none";
    }
}

document.getElementById("finishedSignUp").onclick = function() {
    $.ajax({
        url: "/signup",
        method: "post",
        data: $("#login-form").serialize() + "&checkLogin=true",
        success: function(r){
            console.log(r);
        }
    });  
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
            window.location.reload();
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
        document.getElementById("ballVal").style.transform = 'translateX(0px)';
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
        if( document.getElementById("detailsDivVal")) {
            document.getElementById("detailsDivVal").style.border = '2px dashed green';
            document.getElementById("detailsDivVal").style.backgroundColor = '#63d471';
            document.getElementById("detailsDivVal").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        }
        if(document.getElementById("zero")) {
            document.getElementById("zero").style.border = '2px solid red';
            document.getElementById("zero").backgroundColor = "red";
        }
        if(document.getElementById("zeroFirstSecond")) {
            document.getElementById("zeroFirstSecond").style.border = '2px solid red';
            document.getElementById("zeroFirstSecond").backgroundColor = "red";
        }
        if(document.getElementById("zeroFirst")) {
            document.getElementById("zeroFirst").style.border = '2px solid red';
            document.getElementById("zeroFirst").backgroundColor = "red";
        }
        document.getElementById("first").style.backgroundColor = '#63d471';
        document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first").style.borderColor = 'green';
        document.getElementById("second").style.backgroundColor = '#63d471';
        document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("second").style.borderColor = 'green';
        document.getElementById("headerMain2").style.border = '2px dashed green';
        document.getElementById("headerMain2").style.backgroundColor = '#63d471';
        document.getElementById("headerMain2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first2").style.backgroundColor = '#63d471';
        document.getElementById("first2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first2").style.borderColor = 'green';
        document.getElementById("second2").style.backgroundColor = '#63d471';
        document.getElementById("second2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("second2").style.borderColor = 'green';
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
        document.getElementById("changegamelogo").src = "../Images_NotNumbers/chooseurgamered.png";
        document.getElementById("changegamelogo2").src = "../Images_NotNumbers/chooseurgamered.png";
        document.getElementById("modal-content8").style.backgroundColor = '#f2dd6e';
        document.getElementById("modal-content8").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
        document.getElementById("changegameh1").style.color = "black";
        document.getElementById("changegamep").style.color = "black";
        document.getElementById("changegameh11").style.color = "black";
        document.getElementById("changegamep1").style.color = "black";
        document.getElementById("modal-content9").style.backgroundColor = '#f2dd6e';
        document.getElementById("modal-content9").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
    }
    else if(t.value=="0") {
        t.value="1";
        console.log(t.value); 
        document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/night.jpg")';
        document.getElementById("checkbox-label").style.backgroundColor = 'black';
        document.getElementById("ballVal").style.transform = 'translateX(24px)';
        //document.getElementsByClassName("card").style.backgroundImage = 'url("../Images_NotNumbers/backDesign.jpg")';
        document.getElementById("modal-content2").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("modal-content8").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content8").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("modal-content3").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content3").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("headerMain").style.border = '2px dashed black';
        document.getElementById("headerMain").style.backgroundColor = '#7f5a83';
        document.getElementById("headerMain").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        if( document.getElementById("detailsDivVal")) {
            document.getElementById("detailsDivVal").style.border = '2px dashed black';
            document.getElementById("detailsDivVal").style.backgroundColor = '#7f5a83';
            document.getElementById("detailsDivVal").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        if(document.getElementById("zero")) {
            document.getElementById("zero").style.borderColor = 'black';
            document.getElementById("zero").style.backgroundColor = '#7f5a83';
            document.getElementById("zero").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        if(document.getElementById("zeroFirstSecond")) {
            document.getElementById("zeroFirstSecond").style.borderColor = 'black';
            document.getElementById("zeroFirstSecond").style.backgroundColor = '#7f5a83';
            document.getElementById("zeroFirstSecond").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        if(document.getElementById("zeroFirst")) {
            document.getElementById("zeroFirst").style.borderColor = 'black';
            document.getElementById("zeroFirst").style.backgroundColor = '#7f5a83';
            document.getElementById("zeroFirst").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        document.getElementById("first").style.backgroundColor = '#7f5a83';
        document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first").style.borderColor = 'black';
        document.getElementById("second").style.backgroundColor = '#7f5a83';
        document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("second").style.borderColor = 'black';
        document.getElementById("headerMain2").style.border = '2px dashed black';
        document.getElementById("headerMain2").style.backgroundColor = '#7f5a83';
        document.getElementById("headerMain2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first2").style.backgroundColor = '#7f5a83';
        document.getElementById("first2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first2").style.borderColor = 'black';
        document.getElementById("second2").style.backgroundColor = '#7f5a83';
        document.getElementById("second2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("second2").style.borderColor = 'black';
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
        document.getElementById("changegamelogo").src = "../Images_NotNumbers/chooseurgamewhite.png";
        document.getElementById("changegamelogo2").src = "../Images_NotNumbers/chooseurgamewhite.png";
        document.getElementById("modal-content8").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content8").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("changegameh1").style.color = "white";
        document.getElementById("changegamep").style.color = "white";
        document.getElementById("changegameh11").style.color = "white";
        document.getElementById("changegamep1").style.color = "white";
        document.getElementById("modal-content9").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content9").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
    }   
}
function toggleUser(valueNightOrDay, userId3) {
    console.log("Value is "+valueNightOrDay);
    console.log("Username is "+userId3);
    if(valueNightOrDay === true || valueNightOrDay === "true") {
        $.ajax({
            url: '/changeNightOrDay/'+userId3,
            type: 'POST',
            data: {
                booleanVal: false
            },
            dataType: 'json',
            success : function(data) {              
                console.log('Data: '+JSON.stringify(data));
                console.log("Response obtained. Changed to day layout.");
                document.getElementById("ballVal").style.transform = 'translateX(0px)';
                document.getElementById('inputswitch').innerHTML = '<input type="checkbox" class="checkbox" id="checkbox" aria-label="Toggle Day/Night" value="<%= user.username %>" onclick="toggleUser(\''+false+'\', \''+userId3+'\');" />';
                document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/day.jpg")';
                document.getElementById("checkbox-label").style.backgroundColor = '#3cb371';
                document.getElementById("modal-content2").style.backgroundColor = '#63d471';
                document.getElementById("modal-content2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("modal-content3").style.backgroundColor = '#63d471';
                document.getElementById("modal-content3").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("modal-content4").style.backgroundColor = '#63d471';
                document.getElementById("modal-content4").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("headerMain").style.border = '2px dashed green';
                document.getElementById("headerMain").style.backgroundColor = '#63d471';
                document.getElementById("headerMain").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                if( document.getElementById("detailsDivVal")) {
                    document.getElementById("detailsDivVal").style.border = '2px dashed green';
                    document.getElementById("detailsDivVal").style.backgroundColor = '#63d471';
                    document.getElementById("detailsDivVal").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                    document.getElementById("headerMain3").style.border = '2px dashed green';
                    document.getElementById("headerMain3").style.backgroundColor = '#63d471';
                    document.getElementById("headerMain3").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                    document.getElementById("imagesDivVal").style.border = '2px dashed green';
                    document.getElementById("imagesDivVal").style.backgroundColor = '#63d471';
                    document.getElementById("imagesDivVal").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                }
                if(document.getElementById("zero")) {
                    document.getElementById("zero").style.border = '2px solid red';
                    document.getElementById("zero").backgroundColor = "red";
                }
                if(document.getElementById("zeroFirstSecond")) {
                    document.getElementById("zeroFirstSecond").style.border = '2px solid red';
                    document.getElementById("zeroFirstSecond").backgroundColor = "red";
                }
                if(document.getElementById("zeroFirst")) {
                    document.getElementById("zeroFirst").style.border = '2px solid red';
                    document.getElementById("zeroFirst").backgroundColor = "red";
                }
                document.getElementById("first").style.backgroundColor = '#63d471';
                document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("first").style.borderColor = 'green';
                document.getElementById("second").style.backgroundColor = '#63d471';
                document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("second").style.borderColor = 'green';
                document.getElementById("headerMain2").style.border = '2px dashed green';
                document.getElementById("headerMain2").style.backgroundColor = '#63d471';
                document.getElementById("headerMain2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("first2").style.backgroundColor = '#63d471';
                document.getElementById("first2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("first2").style.borderColor = 'green';
                document.getElementById("second2").style.backgroundColor = '#63d471';
                document.getElementById("second2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
                document.getElementById("second2").style.borderColor = 'green';
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
                document.getElementById("changegamelogo").src = "../Images_NotNumbers/chooseurgamered.png";
                document.getElementById("changegamelogo2").src = "../Images_NotNumbers/chooseurgamered.png";
                document.getElementById("modal-content8").style.backgroundColor = '#f2dd6e';
                document.getElementById("modal-content8").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
                document.getElementById("changegameh1").style.color = "black";
                document.getElementById("changegamep").style.color = "black";
                document.getElementById("changegameh11").style.color = "black";
                document.getElementById("changegamep1").style.color = "black";
                document.getElementById("modal-content9").style.backgroundColor = '#f2dd6e';
                document.getElementById("modal-content9").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
                document.getElementById("modal-content10").style.backgroundColor = '#f2dd6e';
                document.getElementById("modal-content10").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
            },
            error : function(request, error) {
                alert("Request: "+JSON.stringify(request));
            }
        });
    }
    if(valueNightOrDay === false || valueNightOrDay === "false") {
        $.ajax({
            url: '/changeNightOrDay/'+userId3,
            type: 'POST',
            data: {
                booleanVal: true
            },
            dataType: 'json',
            success : function(data) {              
                console.log('Data: '+JSON.stringify(data));
                document.getElementById("ballVal").style.transform = 'translateX(24px)';
                document.getElementById('inputswitch').innerHTML = '<input type="checkbox" class="checkbox" id="checkbox" aria-label="Toggle Day/Night" value="<%= user.username %>" onclick="toggleUser(\''+true+'\', \''+userId3+'\');" />';
                console.log("Response obtained. Changed to day layout.");
                document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/night.jpg")';
                document.getElementById("checkbox-label").style.backgroundColor = 'black';
                document.getElementById("modal-content2").style.backgroundColor = '#7f5a83';
                document.getElementById("modal-content2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("modal-content3").style.backgroundColor = '#7f5a83';
                document.getElementById("modal-content3").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("modal-content4").style.backgroundColor = '#7f5a83';
                document.getElementById("modal-content4").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("headerMain").style.border = '2px dashed black';
                document.getElementById("headerMain").style.backgroundColor = '#7f5a83';
                document.getElementById("headerMain").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                if( document.getElementById("detailsDivVal")) {
                    document.getElementById("detailsDivVal").style.border = '2px dashed black';
                    document.getElementById("detailsDivVal").style.backgroundColor = '#7f5a83';
                    document.getElementById("detailsDivVal").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                    document.getElementById("headerMain3").style.border = '2px dashed black';
                    document.getElementById("headerMain3").style.backgroundColor = '#7f5a83';
                    document.getElementById("headerMain3").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                    document.getElementById("imagesDivVal").style.border = '2px dashed black';
                    document.getElementById("imagesDivVal").style.backgroundColor = '#7f5a83';
                    document.getElementById("imagesDivVal").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                }
                if(document.getElementById("zero")) {
                    document.getElementById("zero").style.borderColor = 'black';
                    document.getElementById("zero").style.backgroundColor = '#7f5a83';
                    document.getElementById("zero").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                }
                if(document.getElementById("zeroFirstSecond")) {
                    document.getElementById("zeroFirstSecond").style.borderColor = 'black';
                    document.getElementById("zeroFirstSecond").style.backgroundColor = '#7f5a83';
                    document.getElementById("zeroFirstSecond").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                }
                if(document.getElementById("zeroFirst")) {
                    document.getElementById("zeroFirst").style.borderColor = 'black';
                    document.getElementById("zeroFirst").style.backgroundColor = '#7f5a83';
                    document.getElementById("zeroFirst").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                }
                document.getElementById("first").style.backgroundColor = '#7f5a83';
                document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("first").style.borderColor = 'black';
                document.getElementById("second").style.backgroundColor = '#7f5a83';
                document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("second").style.borderColor = 'black';
                document.getElementById("headerMain2").style.border = '2px dashed black';
                document.getElementById("headerMain2").style.backgroundColor = '#7f5a83';
                document.getElementById("headerMain2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("first2").style.backgroundColor = '#7f5a83';
                document.getElementById("first2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("first2").style.borderColor = 'black';
                document.getElementById("second2").style.backgroundColor = '#7f5a83';
                document.getElementById("second2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("second2").style.borderColor = 'black';
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
                document.getElementById("changegamelogo").src = "../Images_NotNumbers/chooseurgamewhite.png";
                document.getElementById("changegamelogo2").src = "../Images_NotNumbers/chooseurgamewhite.png";
                document.getElementById("modal-content8").style.backgroundColor = '#7f5a83';
                document.getElementById("modal-content8").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("changegameh1").style.color = "white";
                document.getElementById("changegamep").style.color = "white";
                document.getElementById("changegameh11").style.color = "white";
                document.getElementById("changegamep1").style.color = "white";
                document.getElementById("modal-content9").style.backgroundColor = '#7f5a83';
                document.getElementById("modal-content9").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
                document.getElementById("modal-content10").style.backgroundColor = '#7f5a83';
                document.getElementById("modal-content10").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
            },
            error : function(request, error) {
                alert("Request: "+JSON.stringify(request));
            }
        });
    }   
}

function firstTime() {
    if(valueNightOrDay === true || valueNightOrDay === "true") {
        console.log("Response obtained. Changed to day layout.");
        document.getElementById("ballVal").style.transform = 'translateX(0px)';
        document.getElementById('inputswitch').innerHTML = '<input type="checkbox" class="checkbox" id="checkbox" aria-label="Toggle Day/Night" value="<%= user.username %>" onclick="toggleUser(\''+false+'\', \''+userId3+'\');" />';
        document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/day.jpg")';
        document.getElementById("checkbox-label").style.backgroundColor = '#3cb371';
        document.getElementById("modal-content2").style.backgroundColor = '#63d471';
        document.getElementById("modal-content2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("modal-content3").style.backgroundColor = '#63d471';
        document.getElementById("modal-content3").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("modal-content4").style.backgroundColor = '#63d471';
        document.getElementById("modal-content4").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("headerMain").style.border = '2px dashed green';
        document.getElementById("headerMain").style.backgroundColor = '#63d471';
        document.getElementById("headerMain").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        if( document.getElementById("detailsDivVal")) {
            document.getElementById("detailsDivVal").style.border = '2px dashed green';
            document.getElementById("detailsDivVal").style.backgroundColor = '#63d471';
            document.getElementById("detailsDivVal").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
            document.getElementById("headerMain3").style.border = '2px dashed green';
            document.getElementById("headerMain3").style.backgroundColor = '#63d471';
            document.getElementById("headerMain3").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
            document.getElementById("imagesDivVal").style.border = '2px dashed green';
            document.getElementById("imagesDivVal").style.backgroundColor = '#63d471';
            document.getElementById("imagesDivVal").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        }
        if(document.getElementById("zero")) {
            document.getElementById("zero").style.border = '2px solid red';
            document.getElementById("zero").backgroundColor = "red";
        }
        if(document.getElementById("zeroFirstSecond")) {
            document.getElementById("zeroFirstSecond").style.border = '2px solid red';
            document.getElementById("zeroFirstSecond").backgroundColor = "red";
        }
        if(document.getElementById("zeroFirst")) {
            document.getElementById("zeroFirst").style.border = '2px solid red';
            document.getElementById("zeroFirst").backgroundColor = "red";
        }
        document.getElementById("first").style.backgroundColor = '#63d471';
        document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first").style.borderColor = 'green';
        document.getElementById("second").style.backgroundColor = '#63d471';
        document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("second").style.borderColor = 'green';
        document.getElementById("headerMain2").style.border = '2px dashed green';
        document.getElementById("headerMain2").style.backgroundColor = '#63d471';
        document.getElementById("headerMain2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first2").style.backgroundColor = '#63d471';
        document.getElementById("first2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("first2").style.borderColor = 'green';
        document.getElementById("second2").style.backgroundColor = '#63d471';
        document.getElementById("second2").style.backgroundImage = 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        document.getElementById("second2").style.borderColor = 'green';
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
        document.getElementById("changegamelogo").src = "../Images_NotNumbers/chooseurgamered.png";
        document.getElementById("changegamelogo2").src = "../Images_NotNumbers/chooseurgamered.png";
        document.getElementById("modal-content8").style.backgroundColor = '#f2dd6e';
        document.getElementById("modal-content8").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
        document.getElementById("changegameh1").style.color = "black";
        document.getElementById("changegamep").style.color = "black";
        document.getElementById("changegameh11").style.color = "black";
        document.getElementById("changegamep1").style.color = "black";
        document.getElementById("modal-content9").style.backgroundColor = '#f2dd6e';
        document.getElementById("modal-content9").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
        document.getElementById("modal-content10").style.backgroundColor = '#f2dd6e';
        document.getElementById("modal-content10").style.backgroundImage = 'linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%)';
    }
    if(valueNightOrDay === false || valueNightOrDay === "false") {
        document.getElementById("ballVal").style.transform = 'translateX(24px)';
        document.getElementById('inputswitch').innerHTML = '<input type="checkbox" class="checkbox" id="checkbox" aria-label="Toggle Day/Night" value="<%= user.username %>" onclick="toggleUser(\''+true+'\', \''+userId3+'\');" />';
        console.log("Response obtained. Changed to night layout.");
        document.getElementById("bodyTag").style.backgroundImage = 'url("../Image_DayOrNight/night.jpg")';
        document.getElementById("checkbox-label").style.backgroundColor = 'black';
        document.getElementById("modal-content2").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("modal-content3").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content3").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("modal-content4").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content4").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("headerMain").style.border = '2px dashed black';
        document.getElementById("headerMain").style.backgroundColor = '#7f5a83';
        document.getElementById("headerMain").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        if( document.getElementById("detailsDivVal")) {
            document.getElementById("detailsDivVal").style.border = '2px dashed black';
            document.getElementById("detailsDivVal").style.backgroundColor = '#7f5a83';
            document.getElementById("detailsDivVal").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
            document.getElementById("headerMain3").style.border = '2px dashed black';
            document.getElementById("headerMain3").style.backgroundColor = '#7f5a83';
            document.getElementById("headerMain3").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
            document.getElementById("imagesDivVal").style.border = '2px dashed black';
            document.getElementById("imagesDivVal").style.backgroundColor = '#7f5a83';
            document.getElementById("imagesDivVal").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        if(document.getElementById("zero")) {
            document.getElementById("zero").style.borderColor = 'black';
            document.getElementById("zero").style.backgroundColor = '#7f5a83';
            document.getElementById("zero").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        if(document.getElementById("zeroFirstSecond")) {
            document.getElementById("zeroFirstSecond").style.borderColor = 'black';
            document.getElementById("zeroFirstSecond").style.backgroundColor = '#7f5a83';
            document.getElementById("zeroFirstSecond").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        if(document.getElementById("zeroFirst")) {
            document.getElementById("zeroFirst").style.borderColor = 'black';
            document.getElementById("zeroFirst").style.backgroundColor = '#7f5a83';
            document.getElementById("zeroFirst").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        }
        document.getElementById("first").style.backgroundColor = '#7f5a83';
        document.getElementById("first").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first").style.borderColor = 'black';
        document.getElementById("second").style.backgroundColor = '#7f5a83';
        document.getElementById("second").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("second").style.borderColor = 'black';
        document.getElementById("headerMain2").style.border = '2px dashed black';
        document.getElementById("headerMain2").style.backgroundColor = '#7f5a83';
        document.getElementById("headerMain2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first2").style.backgroundColor = '#7f5a83';
        document.getElementById("first2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("first2").style.borderColor = 'black';
        document.getElementById("second2").style.backgroundColor = '#7f5a83';
        document.getElementById("second2").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("second2").style.borderColor = 'black';
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
        document.getElementById("changegamelogo").src = "../Images_NotNumbers/chooseurgamewhite.png";
        document.getElementById("changegamelogo2").src = "../Images_NotNumbers/chooseurgamewhite.png";
        document.getElementById("modal-content8").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content8").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("changegameh1").style.color = "white";
        document.getElementById("changegamep").style.color = "white";
        document.getElementById("changegameh11").style.color = "white";
        document.getElementById("changegamep1").style.color = "white";
        document.getElementById("modal-content9").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content9").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
        document.getElementById("modal-content10").style.backgroundColor = '#7f5a83';
        document.getElementById("modal-content10").style.backgroundImage = 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)';
    }   
}

window.onload = function(event) {
    toggle();
}

function redirect() {
    window.location.href='/login'; 
    return false;
}

var openOrClose = document.getElementById("tabsForNav");
function functionOpenAndClose() {
    if (openOrClose.style.display === "block") {
        openOrClose.style.display = "none";
        document.getElementById('valBarIcon').innerHTML = '<i class="fa fa-bars"></i>'; 
    } 
    else {
        openOrClose.style.display = "block";
        document.getElementById('valBarIcon').innerHTML = '<i class="fa fa-times"></i>';
    }
}
