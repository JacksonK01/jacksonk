import GameEngine from "./objs/GameEngine.js"

let canvas = document.getElementById('game');

let engine = new GameEngine(canvas);

function loop() {
    engine.gameLoop()
    requestAnimationFrame(loop)
}

loop()