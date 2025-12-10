document.addEventListener("DOMContentLoaded",()=>{
    getDataBackend("All"); // afisam pe toate la refresh
    const cardscontainer = document.getElementById("page2-infoCards");
    const buttons = document.querySelectorAll(".category-button");
    let previous_button;
    buttons.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            e.preventDefault();
            if(btn != previous_button){
                if(previous_button != null){
                    previous_button.classList.remove("category-button-selected");
                }
                btn.classList.add("category-button-selected");
                previous_button = btn;
            }
            console.log(btn.id);
            getDataBackend(btn.id);
        });
    });

    function handleCards(data){
        let new_data = Object.entries(data)
        let htmlcode = "";
        new_data.forEach(([key,gameData])=>{
            htmlcode+=`
            <div class="page2-card" id="page2-card">
                <div class="overlay" id="overlay"></div>
                <div class="category-card"><h1>${gameData.genre}</h1></div>
                <div class="card-button" id="card-button">
                    <a href="/game/${key}"><h1>Play Now</h1></a>
                </div>
                <img src="/static/images/game_${(gameData.status != 'Ready') ? 'workinprogress' : key}.jpg">
                <div class="card-info">
                    <h1 class="page2-cardText" id="page2-cardText">${gameData.name}</h1>
                    <p class="page2-cardDesc" id="page2-cardDesc">${gameData.description}</p>
                </div>
            </div>
            `;
        });
        cardscontainer.innerHTML = htmlcode;
    }
    function getDataBackend(genre){
        fetch('/api/games',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_genre:genre,
            })
        })
        .then(response=> response.json())
        .then(data => {
            console.log('[FLASK] R:',data);
            if(data.status === "success"){
                handleCards(data.return);
            }else if(data.status === "failed"){
                handleCards(data.return);
            }
        })
        .catch((error)=>{
            console.error('[FETCH] Error:',error);
        });
    }


})
