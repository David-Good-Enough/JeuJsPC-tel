// canvas1 = document.getElementById("snake");
// parent = canvas1.parentNode;

// const newCanvas = document.createElement("canvas");
// newCanvas.id = "snake";
// newCanvas.width = 400;
// newCanvas.height = 400;

// function removeCanvas() {
//     canvas1 = document.getElementById("snake");
//     parent = canvas1.parentNode;
//     canvas1.remove()
// }

// function displayCanvasSnake() {
//     parent.appendChild(newCanvas);
// }

function isResolutionOK () {
        let tab = [];
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        tab[0] = windowWidth;
        tab[1] = windowHeight;
        // console.log( "Browser Window: width: " + windowWidth + ", height: " + windowHeight + ".");
        return tab;

}

function startJeu() {
    let window = [];
    let jeuDodge = false;
    let jeuRocket = false;
    // .style.src = "../js/lib/p5min.js";
    setInterval(function() {
        window = isResolutionOK();

        var headElement = document.head;
        headElement.innerHTML = '';

        console.log(window);
        if (window[0] <= 500 && window[1] <= 900 && !jeuRocket) {
            
            jeuRocket = true;
            for(i=0; i<4; i++){
                let script = document.createElement('script');
                script.type = 'text/javascript';
                switch (i) {
                    case 0 :
                        script.src = '../js/lib/p5min.js';
                        document.head.appendChild(script);
                    case 1 :
                        script.src = '../js/rocketEscape/RocketEscape.js'
                        document.head.appendChild(script);
                    case 2 :
                        script.src = '../js/rocketEscape/Rocket.js'
                        document.head.appendChild(script);
                    case 3 :
                        script.src = '../js/rocketEscape/Wall.js'
                        document.head.appendChild(script);
                }
        
            }
        }
        
        
    }, 500);
}