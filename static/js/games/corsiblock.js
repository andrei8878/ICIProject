const path = window.location.pathname.split("/");
const game_id = path[2];


//Selectori
const gamewindowH1 = document.getElementById("gamewindow-h1");
const gamewindow_playuiStart = document.getElementById("gamewindow_playuiStart")
const gameplay_Container = document.getElementById("gamewindow-playuiPlay");
const gamewindow_p = document.getElementById("gamewindow-p");
const feedback = document.getElementById("feedback");
const feedback_h1 = document.getElementById("feedback-h1")
const playuiStart_panel = document.getElementById("playuiStart-panel");
const playuiStart_panel_level = document.getElementById("playuiStart-panel-level");
const playuiStart_panel_timer = document.getElementById("playuiStart-panel-timer");
const gamewindow_gameOver = document.getElementById("gamewindow-gameOver");
const gameOver_score = document.getElementById("gameOver-score");
const gameOver_bestScore = document.getElementById("gameOver-bestscore");
const gameOver_timer = document.getElementById("gameOver-timer");

const gameOver_buttonRetry = document.getElementById("gameOver-retry");
gameOver_buttonRetry.addEventListener("click",replayGame);
//Variabile
let currentSeq = [];         // secventa curenta a jocului
let playerSeq = [];          // secventa curenta a jucatorului
let playerSeqtime = [];      // secventa de timp per level
let cells = [];              // celulele matricei jocului
let level = 2;               // Incepem de la level 2, pentru ca nu are sens sa incepem de la 1 (Platos 1:2)
let startTime; 
let isPlaying = false;       // default
let gameStart = true;        // default
let runTimer = false;        // default
let timerReqId;
let timestr = "";
let accumulatedTime = 0;     // timpul acumulat 
let previousNumber = -1;     // Default
let highlightDuration = 800; // 800ms -> duratia animatiei
let highlightNextCell = 200; // 200ms  -> duratia intre animatii per cell
let gameScore = 0;           // scorul jocului
let bestScore;        // bestscore , setat default cu -999
let currentIndex = 0;        
let minutes;
let seconds;
let mSeconds;
//Functie prin care actualizam celulele la inceputul jocului 
function updateCells(container){
    let htmlcode= ""; //string


    // For loop ce adauga in htmlcode urmatorul string ce creeaza o celula in mod dinamic.
    for(let i=0;i<9;i++){
        htmlcode += `<div class="gamewindow-cell" id="c${i}" style="display:flex;justify-content:center;align-items:center;color:white;font-size: 40px;">${i}</div>`;
    }
    // Adaugam in container noul htmlcode actualizat.
    container.innerHTML = htmlcode;    
    
    //Bagam celulele in cells[] folosind id-u acestora creat dinamic. 
    for(let i=0;i<9;i++){
        cells[i] = document.getElementById(`c${i}`);
    }
    //Pentru fiecare celula adaugam un event listener ce serveste ca si buton de tip click
    cells.forEach(cell =>{
        cell.addEventListener("click",handlePlayerClicks)
    })
}


//Functie ce genereaza secventa pt. fiecare level
function generateSequence(){
    let randomNumber;
    if (gameStart){ // Verificam daca este inceputul jocului , daca este atunci alegem primele doua celule
        for(let i=1;i<=level;i++){
            // atribuim lui randomNumber o valoare random 
            randomNumber = Math.floor(Math.random() * 8) + 1;
            //verificam daca valoarea a fost atribuita si verificam daca valoarea atribuita sa nu fie egala cu cea trecuta
            if(randomNumber && randomNumber != previousNumber){
                currentSeq.push(randomNumber);
                previousNumber = randomNumber;
            }else if(randomNumber == previousNumber){ // daca valoarea atribuita este aceeasi cu cea trecuta , atunci stergem o iteratie
                i--;
            }
        }
        startTimer();
        runTimer = true;
        gameStart = false;
    }else if (currentSeq.length < level){
        randomNumber = Math.floor(Math.random() * 8) + 1;
        if(randomNumber && randomNumber != previousNumber){
            currentSeq.push(randomNumber);
            previousNumber = randomNumber;
        }else{
            let randomtwo = randomNumber;
            while(randomtwo === randomNumber){
                randomtwo = Math.floor(Math.random()* 8)+1;
            }
            randomNumber = randomtwo;
            currentSeq.push(randomNumber);
            previousNumber = randomNumber;
        }
    }

}

async function showSequence(){
    stopTimer();
    await new Promise(timer => setTimeout(timer,200));
    gamewindowH1.textContent = "Wait...";
    gamewindowH1.style.color = "#e83c4a";
    isPlaying = false;
    for(let i=0;i<currentSeq.length;i++){
        console.log("Cell:"+currentSeq[i]);
        const cell = document.getElementById(`c${currentSeq[i]}`);
        if (cell){
            cell.classList.add("highlight");
            await new Promise(timer => setTimeout(timer,highlightDuration));
            cell.classList.remove("highlight");
            await new Promise(timer => setTimeout(timer,highlightNextCell));
        }
    }
    gamewindowH1.textContent = "Your turn...";
    gamewindowH1.style.color = "#5ee098";
    isPlaying = true;
    startTimer();
}

function handlePlayerClicks(cellEvent){
    if(!isPlaying) return;

    console.log("[DEBUG] player pressed cell : "+cellEvent.target.id)
    cellEvent.target.classList.add("highlight2");
    setTimeout(() => {
        cellEvent.target.classList.remove("highlight2")
    }, 200);
    const clickedCell = cellEvent.target;
    if(clickedCell.id === `c${currentSeq[currentIndex]}` && playerSeq.length <= currentSeq.length){
        playerSeq[currentIndex] = currentSeq[currentIndex];
        currentIndex++;
        if(currentSeq.length === playerSeq.length){
            console.log("[DEBUG] nivel finalizat");
            level++;
            let timem = performance.now() - startTime; // timpul scurs per nivel
            console.log("timem:"+timem);
            let timeBonus = Math.max(0,(level*1200)- timem);
            gameScore += (level*100) + Math.floor(timeBonus / 10);
            playerSeqtime.push({level:level,time:timem});
            playuiStart_panel_level.textContent = `Level: ${level}`;
            handleFeedback(true);
            stopTimer();
            setTimeout(() => {
                startGame();
            }, 1000);
        }
    }else if(clickedCell != `c${currentSeq[currentIndex]}` && playerSeq.length <= currentSeq.length){
        handleFeedback(false);
        stopTimer();
        setTimeout(() => {
            handleGameOver();
        }, 1000);
    }else{
        isPlaying = false;
    }
  
}

function startTimer(){
    if(runTimer) return;
    runTimer = true;
    startTime = performance.now();
    updateTimer();
}
function stopTimer(){
    if(!runTimer) return;
    runTimer = false;
    cancelAnimationFrame(timerReqId);
    const elapsedLevel = performance.now() - startTime;
    accumulatedTime += elapsedLevel;

}

function updateTimer(){
    if(!isPlaying) return;
    const elapsedLevel = performance.now() - startTime; // Timpul care s-a scurs per nivel
    const elapsed = accumulatedTime + elapsedLevel; // timpul care s-a scurs
    minutes = Math.floor(elapsed/60000);
    seconds = Math.floor((elapsed%60000)/1000);
    mSeconds = Math.floor((elapsed%1000)/10);
    timestr =`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}.${String(mSeconds).padStart(2,"0")}`;
    playuiStart_panel_timer.textContent= "Timer: " + timestr;
    timerReqId = requestAnimationFrame(updateTimer);
}

function resetTimer(){
    stopTimer();
    accumulatedTime = 0;
    playuiStart_panel_timer.textContent = "Timer: 00:00.00";
}
function startGame(){
    playerSeq = [];
    currentIndex = 0;
    generateSequence();
    showSequence();
}

function resetGame(){
    currentSeq = [];
    playerSeq = [];
    playerSeqtime = [];
    level = 2; 
    isPlaying = false;
    gameStart = true;
    previousNumber = -1; // Default
    gameScore = 0;
    currentIndex = 0;
}

function handleGameOver(){
    console.log("[DEBUG] failed the level");
    gamewindow_gameOver.style.display = "flex";
    gameplay_Container.style.display = "none";
    gamewindowH1.style.display= "none";
    gamewindow_p.style.display = "none";
    playuiStart_panel.style.display = "none";
    gameOver_score.textContent = gameScore.toString();
    gameOver_timer.textContent = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}.${String(mSeconds).padStart(2,"0")}`;
    console.log("Level: " + level);
    if(gameScore>bestScore){bestScore = gameScore;} 
    sendDataBackend();
    resetGame();
    resetTimer();
}

function replayGame(){
    gamewindow_gameOver.style.display = "none";
    gameplay_Container.style.display = "grid";
    gamewindowH1.style.display= "flex";
    gamewindow_p.style.display = "flex";
    playuiStart_panel.style.display = "flex";
    resetGame();
    resetTimer();
    playuiStart_panel_level.textContent = "Level: " + level;
    initGame(gameplay_Container);
}

async function handleFeedback(status){
    feedback.style.display = "flex";
    feedback.style.backgroundColor = (status)? "rgba(96, 246, 138, 0.89)":"rgba(246, 96, 96, 0.83)";
    feedback_h1.textContent = (status)? "SUCCESS!" : "FAILED!";
    await new Promise(timer => setTimeout(timer,1000));
    feedback.style.display = "none";
}

function sendDataBackend(){
    fetch(`/api/save`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game_id:game_id,
            game_score:gameScore,
            best_score:bestScore,
            playerSeqtime:playerSeqtime,
            timestr:timestr
        })
    })
    .then(response => response.json())
    .then(data =>{
        console.log('[FLASK] R:',data);
        if(data.status === "newbest"){
            gameOver_bestScore.textContent = data.best_score;
        }
    })
    .catch((error) => {
        console.error('[FETCH] Error:',error);
    });
}

function resetDataBackend(){
    fetch('/api/reset',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game_id:game_id,
        })
    })
    .then(response=> response.json())
    .then(data => {
        console.log('[FLAS] R:',data);
        if(data.status === "success"){
            gameOver_bestScore.textContent = data.best_score;
        }
    })
    .catch((error)=>{
        console.error('[FETCH] Error:',error);
    });
}


export function initGame(container){
    updateCells(container);
    startGame();
}