import StickHeroPlayer from "./StickHeroPlayer.js";
import Phases from "./Phases.js";
import PlatformManager from "./PlatformManager.js";
import BridgeManager from "./BridgeManager.js";

class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")

        this.windowWidth = canvas.width;
        this.windowHeight = canvas.height;

        this.player = new StickHeroPlayer(this);

        let startingY = 200;
        this.player.y = startingY;

        this.platformManager = new PlatformManager(this)

        this.platformManager.addPlatform(this.player.x, 100);

        this.bridgeManager = new BridgeManager(this);


        //USES ENUM FROM PHASES OBJECT
        this.currentPhase = Phases.WAITING;

        window.addEventListener('keydown', (event) => {
            if(event.code !== 'Space') {
                return;
            }
            if(this.currentPhase === Phases.WAITING) {
                //alert('pressed space')
                this.currentPhase = Phases.STRETCHING
                console.log('keydown')
            }

        })

        window.addEventListener('keyup', (event) => {
            if(event.code !== 'Space') {
                return;
            }
            if(this.currentPhase === Phases.STRETCHING) {
                //alert("let go of space")
                this.currentPhase = Phases.TURNING
                console.log('keyup')
            }

        })

    }

    update() {
        switch (this.currentPhase) {
            case Phases.WAITING: {
                break
            }
            case Phases.STRETCHING: {
                this.stretchPhase()
                break
            }
            case Phases.TURNING: {
                this.turningPhase()
                break
            }
        }
        this.bridgeManager.update()
    }

    stretchPhase() {
        this.bridgeManager.createBridge(this.player.x + this.player.width)
    }

    turningPhase() {
        this.bridgeManager.alertStopGrowing()
        this.currentPhase = Phases.WAITING
    }

    draw() {
        this.context.clearRect(0, 0, this.windowWidth, this.windowHeight)

        this.platformManager.draw(this.context)
        this.bridgeManager.draw(this.context)
        this.player.draw(this.context)
    }

    gameLoop() {
        this.update()
        this.draw()
    }
}

export default GameEngine