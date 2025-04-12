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

        let startingY = 390;
        let startingX = 50;

        this.player = new StickHeroPlayer(this);
        this.player.x = startingX
        this.player.y = startingY;

        this.platformManager = new PlatformManager(this)
        this.platformManager.generateStartingPlatform(startingX)
        this.generateNextPlatforms()

        this.bridgeManager = new BridgeManager(this);


        //USES ENUM FROM PHASES OBJECT
        this.currentPhase = Phases.WAITING;

        window.addEventListener('keydown', (event) => {
            if(event.code !== 'Space') {
                return;
            }
            if(this.currentPhase === Phases.WAITING) {
                this.currentPhase = Phases.STRETCHING
                console.log('keydown')
            }

        })

        window.addEventListener('keyup', (event) => {
            if(event.code !== 'Space') {
                return;
            }
            if(this.currentPhase === Phases.STRETCHING) {
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
            case Phases.WALKING: {
                this.walkingPhase()
                break
            }
            case Phases.FALLING: {
                this.fallingPhase()
                break
            }
        }
        this.bridgeManager.update()
        this.player.update()
    }

    stretchPhase() {
        this.bridgeManager.createBridge(this.player.x + this.player.width)
    }

    turningPhase() {
        this.bridgeManager.alertStopGrowing()
        this.currentPhase = Phases.WALKING;
    }

    walkingPhase() {

        // if(!this.player.isWalking) {
        //     let platform = this.platformManager.getTopPlatform();
        //     //Made it to platform
        //     if(platform.x <= this.player.x <= (platform.x + platform.width)) {
        //         this.currentPhase = Phases.WAITING
        //     }
        //     //Didnt make it
        //     else {
        //         this.currentPhase = Phases.FALLING
        //     }
        // }

        if(!this.player.isWalking) {
            this.currentPhase = Phases.WAITING
        }

        let seconds = 2;
        let FPS = 60;
        this.player.walkTo(this.bridgeManager.getDistanceToWalk() - (this.player.width / 2), seconds * FPS)
        console.log(this.bridgeManager.getDistanceToWalk())
    }

    fallingPhase() {
        this.player.fall()
    }

    generateNextPlatforms() {
        let distance = this.windowWidth - 200;
        let width = 50 + ((Math.random() * 100) * 1.5)

        this.platformManager.addPlatform(distance, width)
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