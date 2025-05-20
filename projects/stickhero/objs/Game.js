import GameEngine from "./GameEngine.js";

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.engine = new GameEngine(canvas)
    }

    createNewGameInstance() {
        this.engine = new GameEngine(this.canvas)
    }

    gameLoop() {
        if(this.engine.shouldReset) {
            this.createNewGameInstance()
        }
        this.engine.update()
        this.engine.draw()
    }
}

export default Game