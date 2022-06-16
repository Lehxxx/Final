
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

class digitalClock{
    constructor(element){
        this.element = element;
        console.log(this.element);
    }

    start(){
        this.update();

        setInterval(() => {
            this.update();
        }, 500);


    }

        update(){
            const parts = this.getTimeParts();
            const minuteFormatted = parts.minute.toString().padStart(2, "0");
            const timeFormatted = parts.hour +":" + minuteFormatted ;
            const amPm = parts.isAm ? "AM" : "PM";

            this.element.querySelector(".clock-time").textContent = timeFormatted;
            this.element.querySelector(".clock-amPm").textContent = amPm;
        }

        getTimeParts(){
            const now = new Date();

            return{
                hour: now.getHours() % 12 || 12,
                minute: now.getMinutes(),
                isAm: now.getHours() < 12
            };
        }

    
}

const clockElement = document.querySelector(".clock");
const clockObject = new digitalClock(clockElement);
console.log(clockObject.getTimeParts());


let seconds = 0;
let interval = null;
time = "";
clockObject.start();

stopWatchtimer();
reset();

//stop watch

//declaration
 
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

 lapNum = document.getElementById("lapNum");



//even listen
startBtn.addEventListener('click', start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

//function
function stopWatchtimer(){
    const timeee = document.querySelector('.watch .timer');
    seconds++;

    
    console.log();

    //format time 
    let hrss = Math.floor(seconds / 3600);
    let minss = Math.floor((seconds - (hrss * 3600)) / 60);
    let secss = seconds % 60;
   
    if (secss < 10) secss = '0' + secss;
    if (minss < 10) minss = '0' + minss;
    if (hrss < 10) hrss = '0' + hrss;
    
    time = hrss + ":" + minss + ":" + secss;
   
    timeee.innerText = time;
    

}



function start(){
    if(interval){
        return
        
    }
    
    interval = setInterval(stopWatchtimer, 1000);
    



}
function stop(){
    clearInterval(interval);
    interval = null;
}
function reset(){
    const timeee = document.querySelector('.watch .timer');
    stop();
    seconds = 0;
    timeee.innerText = "00:00:00";
    lapNum.innerText = "";
}
lapNum.innerText = "";
function lap(){
    
    
    lapNum.innerText += time + " , ";

}


//timer
const stopTimer = document.getElementById("timer__btn timer__btn--control timer__btn--reset");
const endTime = document.getElementById('display__end-time');
const buttons = document.querySelectorAll('[data-time]');

stopTimer.addEventListener('click', stopTimerBtn);
 countdown = null;
 
function timer(secondz){
    const now = Date.now();
    const then = now + secondz * 1000;
    displayTimeLeft(secondz);
    console.log({now, then});

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
        console.log(secondsLeft);

    }, 1000);
}

function displayTimeLeft(secondz) {
    
    const timerDisplay = document.getElementById('timer__part timer__part--minutes');
    const minutes = Math.floor(secondz / 60);
    const remainderSeconds = secondz % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    if(display != "NaN:NaN"){
        timerDisplay.innerText = display;
    }
    
  }
  function stopTimerBtn(){
    const timerDisplay = document.getElementById('timer__part timer__part--minutes');
    timerDisplay.innerText = "";
    display = "";
    window.location = window.location.href;

  }
  
  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  
  function startTimer() {
    const secondz = parseInt(this.dataset.time);
    timer(secondz);
  }
  
  buttons.forEach(button => button.addEventListener('click', startTimer));
  document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minz = this.minutes.value;
    console.log(minz);
    timer(minz * 60);
    this.reset();
  });

