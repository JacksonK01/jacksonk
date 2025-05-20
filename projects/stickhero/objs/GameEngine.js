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

        this.score = 0

        let startingY = 390;
        let startingX = 50;

        this.startX = startingX

        this.player = new StickHeroPlayer(this);
        this.player.x = startingX
        this.player.y = startingY;

        this.platformManager = new PlatformManager(this)
        this.platformManager.generateStartingPlatform(startingX)
        this.generateNextPlatform()

        this.bridgeManager = new BridgeManager(this);

        //This is for the walking phase, when the player object is told to walk
        this.hasPlayerWalked = false

        this.shouldReset = false;


        //USES ENUM FROM PHASES OBJECT
        this.currentPhase = Phases.WAITING;

        window.addEventListener('keydown', (event) => {
            if(event.code !== 'Space') {
                return;
            }
            if(this.currentPhase === Phases.WAITING) {
                this.currentPhase = Phases.STRETCHING
                console.log('keydown')
            } else if(this.currentPhase === Phases.FALLING) {
                this.reset()
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
            case Phases.TRANSITIONING: {
                this.transitionPhase()
                break
            }
        }
        this.bridgeManager.update()
        this.player.update()
        this.platformManager.update()
    }

    stretchPhase() {
        this.bridgeManager.createBridge(this.player.x + this.player.width)
    }

    turningPhase() {
        this.bridgeManager.alertStopGrowing()
        this.currentPhase = Phases.WALKING;
    }

    //walkTo keeps turning isWalking to true
    walkingPhase() {
        let seconds = 2;
        let FPS = 60;

        if(!this.hasPlayerWalked) {
            let walkTo = this.bridgeManager.getDistanceToWalk()
            let platform = this.platformManager.getTopPlatform()

            if(platform.intersectsX(walkTo)) {
                walkTo = platform.x + (platform.width / 2) - (this.player.width / 2)
            }

            this.player.walkTo(walkTo, seconds * FPS)
            this.hasPlayerWalked = true
        }

        if(!this.player.isWalking) {
            let platform = this.platformManager.getTopPlatform();

            //Made it to platform
            if(platform.intersectsX(this.player.x)) {
                this.currentPhase = Phases.TRANSITIONING
                this.generateNextPlatform()
                this.score++
                this.hasPlayerWalked = false;
            }
            //Didnt make it
            else {
                this.currentPhase = Phases.FALLING
            }
        }
    }

    fallingPhase() {
        this.player.fall()
    }

    //Offsets platforms and player
    transitionPhase() {
        if(this.player.x > this.startX) {
            let speed = 3

            this.player.x -= speed

            this.platformManager.forEach((platform) => {
                platform.x -= speed
            })

            this.bridgeManager.forEach((bridge) => {
                bridge.x1 -= speed
                bridge.x2 -= speed
                bridge.x3 -= speed
                bridge.x4 -= speed
            })
        } else {
            this.currentPhase = Phases.WAITING
        }
    }

    generateNextPlatform() {
        const minGap = 100;
        // const maxGap = this.windowWidth - 200;
        const maxGap = 300;
        const minWidth = 55;
        const maxWidth = 120;

        const difficultyFactor = Math.min(this.score * 1.05, 1);

        const gap = minGap + (maxGap - minGap) * difficultyFactor * Math.random();
        const width = maxWidth - (maxWidth - minWidth) * difficultyFactor * Math.random();

        const lastPlatform = this.platformManager.getTopPlatform();
        const startX = lastPlatform.x + lastPlatform.width + gap;

        this.platformManager.addPlatform(startX, width);
    }


    drawScore() {
        this.context.save()

        this.context.font = '30px Arial';
        this.context.fillStyle = 'black';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Score: ' + this.score, this.windowWidth / 2,this.windowHeight / 12);

        this.context.restore()
    }

    drawBackground() {
        this.context.save()

        const gradient = this.context.createLinearGradient(0, 0, 0, this.windowHeight);
        gradient.addColorStop(0, '#FF5E62');
        gradient.addColorStop(0.5, '#FFA07A');
        gradient.addColorStop(1, '#FFE29F');

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.windowWidth, this.windowHeight);

        // Draw sun
        const sunX = this.windowWidth - 100;
        const sunY = this.windowHeight - 150;
        const sunRadius = 60;

        this.context.beginPath();
        this.context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        this.context.fillStyle = '#FFD700';
        this.context.fill();

        this.context.fillStyle = '#2e1f27';
        this.context.fillRect(0, this.windowHeight - 50, this.windowWidth + 10, 50);

        this.context.restore()
    }

    drawLose() {
        this.context.save()

        this.context.font = '30px Arial';
        this.context.fillStyle = 'black';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        let text = 'You Fell!\nScore: ' + this.score + '\nPress Space to try again'

        let y = 40

        this.context.fillText('You Fell!', this.windowWidth / 2,this.windowHeight / 3);
        this.context.fillText('Score: ' + this.score, this.windowWidth / 2,(this.windowHeight / 3) + y);
        this.context.fillText('Press Space to try again', this.windowWidth / 2,(this.windowHeight / 3) + (y * 2));

        this.context.restore()
    }

    reset() {
        this.shouldReset = true
    }

    draw() {
        this.drawBackground()
        this.platformManager.draw(this.context)
        this.bridgeManager.draw(this.context)
        this.player.draw(this.context)

        if(this.currentPhase === Phases.FALLING) {
            this.drawLose()
        } else {
            this.drawScore()
        }
    }
}

export default GameEngine