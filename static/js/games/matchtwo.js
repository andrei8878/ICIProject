const gamewindowH1 = document.getElementById("gamewindow-h1");
const gamewindow_playuiStart = document.getElementById("gamewindow_playuiStart")
const gameplay_Container = document.getElementById("gamewindow-playuiPlay");

let cells = [];
let playerSeq = [];
let level = 2; // Incepem de la level 2, pentru ca nu are sens sa incepem de la 1 (Platos 1:2)
let isPlaying = false;
let gameStart = true;
let previousNumber = -1; // Default
let highlightDuration = 800; // 800ms -> duratia animatie
let highlightNextCell = 200; // 200ms  -> duratia intre animatii per cell
let gameScore = 0;
let bestScore = -999;
let currentIndex = 0;
let index = 0;
let ok = true;
let randomObject = {
    "dragon": 0,
    "pomegrade": 0,
    "star": 0,
    "pear": 0,
    "orange": 0,
    "lemon": 0
};
let objects = [];
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
    
    console.log("Player-ul a apasat butonul: "+cellEvent.target.id)

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
        if(cell1_obj === cell2_obj){
            console.log("Correct");
        }else{
            console.log("Incorrect");
            cell1.classList.remove("flipped");
            cell2.classList.remove("flipped");
        }
        playerSeq = [];
        isPlaying = false;  
        startGame();
    },500);
}


function startGame(){
    playerSeq = [];
    currentIndex = 0;
    if(isPlaying){
        handlePlayerClicks();
    }
}

function resetGame(){
    currentSeq = [];
    playerSeq = [];
    level = 2; // Incepem de la level 2, pentru ca nu are sens sa incepem de la 1 (Platos 1:2)
    isPlaying = false;
    gameStart = true;
    previousNumber = -1; // Default
    gameScore = 0;
    bestScore = -999;
    currentIndex = 0;
    ok = true;
}

function handleGameOver(gameScore){
    console.log("Failed the game like a retard");
    gamewindow_playuiStart.style.display = "flex";
    gameplay_Container.style.display = "none";
    console.log("Level: " + level);
    resetGame();
}


export function initGame(container){
    updateCells(container);
    startGame();
}