import Game from "./objs/Game.js";

let canvas = document.getElementById('game');

let run = new Game(canvas);

function loop() {
    run.gameLoop()
    requestAnimationFrame(loop)
}

loop()