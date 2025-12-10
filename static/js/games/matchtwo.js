const path = window.location.pathname.split("/");
const game_id = path[2];

const gamewindowH1 = document.getElementById("gamewindow-h1");
const gamewindow_playuiStart = document.getElementById("gamewindow_playuiStart")
const gameplay_Container = document.getElementById("gamewindow-playuiPlay");
const gameWindow_h1 = document.getElementById("gamewindow-h1");
const gamewindow_p = document.getElementById("gamewindow-p");

//Game Over
const gamewindow_gameOver = document.getElementById("gamewindow-gameOver");
const gameOver_score = document.getElementById("gameOver-score");
const gameOver_bestScore = document.getElementById("gameOver-bestscore");
const gameOver_timer = document.getElementById("gameOver-timer");
const gameOver_buttonRetry = document.getElementById("gameOver-retry");
gameOver_buttonRetry.addEventListener("click",replayGame);

const playuiStart_panel = document.getElementById("playuiStart-panel");
const playuiStart_panel_level = document.getElementById("playuiStart-panel-level");
const playuiStart_panel_timer = document.getElementById("playuiStart-panel-timer");



let cells = [];
let playerSeq = [];
let level = 0;
let tries = 0;
let currentIndex = 0;
let gameScore = 0;
let bestScore;
let eff;
let isPlaying = false;
let startTime;
let runTimer = false;
let timerReqId;
let accumulatedTime = 0;
let timestr = "";

let randomObject = {
    "dragon": 0,
    "pomegrade": 0,
    "star": 0,
    "pear": 0,
    "orange": 0,
    "lemon": 0
};
function updateCells(container){
    let htmlcode= "";
    let keys = Object.keys(randomObject);
    for(let i=0;i<12;i++){
        let object = keys[Math.floor(Math.random() * keys.length)];
        if(randomObject[object]< 2){
            htmlcode += `<div class="gamewindow-cell" id="obj${i}" data-object="${object}" style="display:flex;justify-content:center;align-items:center;color:white;font-size: 40px;"><img src="/static/images/matchtwo_asset/${object}.png" class="tile-image"></div>`;
            randomObject[object]++;
        }else{
            i--;
        }
    }
    container.innerHTML = htmlcode;
    
    for(let i=0;i<12;i++){
        cells[i] = document.getElementById(`obj${i}`);
    }
    
    cells.forEach(cell =>{
        cell.addEventListener("click",handlePlayerClicks)
    })
}

function handlePlayerClicks(cellEvent){
    if(isPlaying) return;
    if(cellEvent.target.classList.contains("guessed")) return;
    console.log("[DEBUG] Player pressed cell: "+cellEvent.target.id)
    if(!isPlaying && playerSeq.length <2){
        let cell = cellEvent.target;
        if (cell){
            cell.classList.add("flipped");
            playerSeq[currentIndex++] = cell;
        }
    }

    if(playerSeq.length === 2){
        console.log("Checking tiles");
        isPlaying = true;
        checkTiles();
    }
}

function checkTiles(){
    const cell1 = playerSeq[0];
    const cell2 = playerSeq[1];
    const cell1_obj =playerSeq[0].dataset.object;
    const cell2_obj =playerSeq[1].dataset.object;
    setTimeout(()=>{
        if(cell1_obj === cell2_obj && !cell1.classList.contains("guessed") && !cell2.classList.contains("guessed")){
            console.log("Correct");
            cell1.classList.add("guessed");
            cell2.classList.add("guessed");
            tries++;
            level++;
            if(level === 6){
                isPlaying=false;
                handleGameOver();
                return;
            }
        }else{
            console.log("Incorrect");
            tries++;
            if(!cell1.classList.contains("guessed")){
                cell1.classList.remove("flipped");
            }
            if(!cell2.classList.contains("guessed")){
                cell2.classList.remove("flipped");
            }
        }
        playerSeq = [];
        isPlaying = false;  
        startGame();
    },500);
}


function startGame(){
    startTimer();
    gamewindowH1.textContent = "Find and match two tiles"
    playerSeq = [];
    currentIndex = 0;
    if(isPlaying){
        handlePlayerClicks();
    }
}

function resetGame(){
    randomObject = {
        "dragon": 0,
        "pomegrade": 0,
        "star": 0,
        "pear": 0,
        "orange": 0,
        "lemon": 0
    };
    playerSeq = [];
    level = 0; 
    isPlaying = false;
    gameScore = 0;
    currentIndex = 0;
    tries = 0;
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
    if(!runTimer) return;
    const elapsedLevel = performance.now() - startTime; // Timpul care s-a scurs per nivel
    const elapsed = accumulatedTime + elapsedLevel; // timpul care s-a scurs
    const minutes = Math.floor(elapsed/60000);
    const seconds = Math.floor((elapsed%60000)/1000);
    const mSeconds = Math.floor((elapsed%1000)/10);
    timestr = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}.${String(mSeconds).padStart(2,"0")}`;
    playuiStart_panel_timer.textContent="Timer: " + timestr;
    timerReqId = requestAnimationFrame(updateTimer);
}

function resetTimer(){
    stopTimer();
    accumulatedTime = 0;
    playuiStart_panel_timer.textContent = "Timer: 00:00.00";
}

function handleGameOver(){
    console.log("[DEBUG] Game ended.");
    stopTimer();
    gamewindow_gameOver.style.display="flex";
    gameplay_Container.style.display = "none";
    gameWindow_h1.style.display = "none";
    gamewindow_p.style.display = "none";
    playuiStart_panel.style.display = "none";
    let targetTime = level*3000; // 3sec/lvl in ms
    let trieseff = Math.max(0.1,1-(tries/(level*5)));
    let timeeff= Math.max(0.1,1-(accumulatedTime/targetTime));
    eff = (trieseff*0.7)+(timeeff*0.3);
    gameScore = Math.round(level*10250*eff);
    gameOver_score.textContent = gameScore.toString();
    gameOver_timer.textContent = timestr;
    sendDataBackend();
    resetTimer();
    resetGame();
}

function replayGame(){
    gamewindow_gameOver.style.display = "none";
    gameplay_Container.style.display = "grid";
    gamewindowH1.style.display= "flex";
    gamewindow_p.style.display = "flex";
    playuiStart_panel.style.display = "flex";
    resetGame();
    resetTimer();
    initGame(gameplay_Container);
}


function updateViewport(){
    playuiStart_panel.removeChild(playuiStart_panel_level);
    playuiStart_panel.style.height = "50px";
}


function sendDataBackend(){
    fetch('/api/save',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game_id:game_id,
            game_score:gameScore,
            best_score:bestScore,
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


export function initGame(container){
    updateCells(container);
    startTimer();
    startGame();
    updateViewport();
}