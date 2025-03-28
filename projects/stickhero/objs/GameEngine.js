import StickHeroPlayer from "./StickHeroPlayer.js";
import Phases from "./Phases.js";

class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")

        this.windowWidth = canvas.width;
        this.windowHeight = canvas.height;

        this.player = new StickHeroPlayer(this);
        this.platforms = [];


        //USES ENUM FROM PHASES OBJECT
        this.currentPhase = Phases.WAITING;

        window.addEventListener('keydown', (event) => {
            if(this.currentPhase === Phases.WAITING) {
                alert('pressed space')
                this.currentPhase = Phases.STRETCHING
            }
        })

        window.addEventListener('keydown', (event) => {
            if(this.currentPhase === Phases.STRETCHING) {
                alert("let go of space")
                this.currentPhase = Phases.TURNING
            }
        })

    }

    update() {
        this.player.x = this.windowWidth/2
        this.player.y = this.windowHeight/2

        switch (this.currentPhase) {
            case Phases.WAITING: {
                return
            }
            case Phases.STRETCHING: {

            }

        }
    }

    draw() {
        this.context.clearRect(0, 0, this.windowWidth, this.windowHeight)

        this.player.draw(this.context)
    }

    gameLoop() {
        this.update()
        this.draw()
    }
}

export default GameEngine