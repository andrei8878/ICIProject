
// Pt pagina main.html
document.addEventListener("DOMContentLoaded", ()=>{
    const navbar_Hamburger = document.getElementById("hamburger-check"); 
    const navbar_HamburgerMenu = document.getElementById("navbar-mobile-menu");
    let isPressed = false;
    const mobileQuery = window.matchMedia('(max-width:720px)');

    if(navbar_Hamburger){
        console.log("[Home] navbar_hamburger found.");
    }else{
        console.log("[Home] navbar_hamburger missing.");
    }

    navbar_Hamburger.addEventListener("click", function(e){
        isPressed = !isPressed;
        console.log("[Home] navbar_hamburger pressed , state: "+isPressed);
        if(isPressed){
            navbar_HamburgerMenu.style.display = "flex";
        }else{
            navbar_HamburgerMenu.style.display = "none";
        }
    });

    function handleResolutionChange(e){
        if(!e.matches){
            console.log("[Home] monitor res");
            isPressed = false;
            if(navbar_HamburgerMenu){
                navbar_HamburgerMenu.style.display = "none";
            }
        }else{
            console.log("[Home] phone res");
        }
    }
    mobileQuery.addEventListener("change",handleResolutionChange);

    handleResolutionChange(mobileQuery);

});




// Pt Pagina games.html si game.html

document.addEventListener("DOMContentLoaded",()=>{
    //Required
    const gamewindow_playuiStart = document.getElementById("gamewindow_playuiStart")
    const gameplay_Container = document.getElementById("gamewindow-playuiPlay");
    const startGameButton = document.getElementById("startGame");
    const gamewindow_h1 = document.getElementById("gamewindow-h1");
    const gamewindow_p = document.getElementById("gamewindow-p");
    const game_id = gameplay_Container.dataset.gameId;

    startGameButton.addEventListener("click", () => {
        console.log("Game Started");
        gamewindow_playuiStart.style.display = "none";
        gameplay_Container.style.display = "grid";
        gamewindow_h1.style.display = "flex";
        gamewindow_p.style.display = "flex";
        if (game_id){
            import(`/static/js/games/${game_id}.js`)
                .then(module => module.initGame(gameplay_Container))
                .catch(err =>{
                    console.error(err); 
                })
            
        }else{
            console.error("Failed to receive data.");
        }
    });



})