import Game from "./objs/Game.js";

let canvas = document.getElementById('game');

let game = new Game(canvas);

function loop() {
    game.gameLoop()
    requestAnimationFrame(loop)
}

loop()