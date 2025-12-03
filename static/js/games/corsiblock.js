const gamewindowH1 = document.getElementById("gamewindow-h1");
const gamewindow_playuiStart = document.getElementById("gamewindow_playuiStart")
const gameplay_Container = document.getElementById("gamewindow-playuiPlay");

let currentSeq = [];
let playerSeq = [];
let cells = [];
let level = 2; // Incepem de la level 2, pentru ca nu are sens sa incepem de la 1 (Platos 1:2)
let isPlaying = false;
let gameStart = true;
let previousNumber = -1; // Default
let highlightDuration = 800; // 800ms -> duratia animatiei
let highlightNextCell = 200; // 200ms  -> duratia intre animatii per cell
let gameScore = 0;
let bestScore = -999;
let currentIndex = 0;
let ok = true;

function updateCells(container){
    let htmlcode= "";
    for(let i=0;i<9;i++){
        htmlcode += `<div class="gamewindow-cell" id="c${i}" style="display:flex;justify-content:center;align-items:center;color:white;font-size: 40px;">${i}</div>`;
    }
    
    container.innerHTML = htmlcode;    
    for(let i=0;i<9;i++){
        cells[i] = document.getElementById(`c${i}`);
    }
    cells.forEach(cell =>{
        cell.addEventListener("click",handlePlayerClicks)
    })
}



function generateSequence(){
    let randomNumber;
    if (gameStart){
        for(let i=1;i<=level;i++){
            randomNumber = Math.floor(Math.random() * 8) + 1;
            if(randomNumber && randomNumber != previousNumber){
                currentSeq.push(randomNumber);
                previousNumber = randomNumber;
            }else if(randomNumber == previousNumber){
                i--;
            }
        }
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
}

function handlePlayerClicks(cellEvent){
    if(!isPlaying) return;
    // Trebuie sa adaugam un eventlistener pentru fiecare celula.
    
    console.log("[DEBUG] player-ul a apasat butonul: "+cellEvent.target.id)
    cellEvent.target.classList.add("highlight2");
    setTimeout(() => {
        cellEvent.target.classList.remove("highlight2")
    }, 200);
    const clickedCell = cellEvent.target;
    if(clickedCell.id === `c${currentSeq[currentIndex]}` && playerSeq.length <= currentSeq.length){
        playerSeq[currentIndex] = currentSeq[currentIndex];
        currentIndex++;
        gameScore++;
        if(currentSeq.length === playerSeq.length){
            console.log("[DEBUG] nivel finalizat");
            level++;
            startGame();
        }
    }else if(clickedCell != `c${currentSeq[currentIndex]}` && playerSeq.length <= currentSeq.length){
        gameScore = currentIndex;
        handleGameOver(gameScore);
    }else{
        isPlaying = false;
    }
  
}

function startGame(){
    playerSeq = [];
    currentIndex = 0;
    generateSequence();
    showSequence();
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
    console.log("[DEBUG] failed the level");
    gamewindow_playuiStart.style.display = "flex";
    gameplay_Container.style.display = "none";
    console.log("Level: " + level);
    resetGame();
}


export function initGame(container){
    updateCells(container);
    startGame();
}