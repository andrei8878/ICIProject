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