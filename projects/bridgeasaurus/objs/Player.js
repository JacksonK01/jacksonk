import Phases from "./Phases.js";

class Player {
    static COOLDOWN = 10
    static FRAME_WIDTH = 24

    constructor(engine) {
        this.engine = engine;

        this.speed = 4;
        this.x = 60;
        this.y = 0;

        this.width = 50
        this.height = 50

        this.img = new Image();
        this.img.src = './assets/dino.png'

        this.isFalling = false;

        this.isWalking = false;
        this.locationX = 0;

        this.delayCounter = 0;
        this.delayBeforeWalk = 0;

        //For animations
        this.idleCounter = 0
        this.walkingCounter = 0
        this.fallingCounter = 0
    }

    //Location to walk to and delay for before start walking
    //Can only ever walk right (Not really a need to walk left
    walkTo(locationX, delay) {
        if(this.isWalking || this.x === locationX) {
            return
        }

        this.isWalking = true;
        this.locationX = locationX;
        this.delayBeforeWalk = delay;
    }

    //isWalking is not turning off
    walkUpdate() {
        if(!this.isWalking) {
            return;
        }

        if(this.delayCounter <= this.delayBeforeWalk) {
            this.delayCounter++;
            return;
        }

        if(this.x >= this.locationX) {
            this.isWalking = false;
            this.delayCounter = 0;
            this.delayBeforeWalk = 0;
            return;
        }

        this.x += this.speed;
    }

    fall() {
        this.y += this.speed;
        this.isFalling = true
    }

    drawIdleAnimation(context) {
        this.idleCounter++
        if(this.idleCounter >= 80) {
            this.idleCounter = 0
        }

        if(this.idleCounter <= 65) {
            context.drawImage(this.img, 0, 0, 24, 25, this.x, this.y, this.width, this.height)
        } else {
            context.drawImage(this.img, Player.FRAME_WIDTH * 2, 0, 25, 25, this.x, this.y, this.width, this.height)
        }
    }

    drawWalkAnimation(context) {
        this.walkingCounter++
        if(this.walkingCounter >= 20) {
            this.walkingCounter = 0
        }

        if(this.walkingCounter <= 10) {
            context.drawImage(this.img, Player.FRAME_WIDTH * 5, 0, 24, 25, this.x, this.y, this.width, this.height)
        } else {
            context.drawImage(this.img, Player.FRAME_WIDTH * 6, 0, 25, 25, this.x, this.y, this.width, this.height)
        }
    }

    drawFallingAnimation(context) {
        this.fallingCounter++
        if(this.fallingCounter >= 30) {
            this.fallingCounter = 0
        }

        if(this.fallingCounter <= 10) {
            context.drawImage(this.img, Player.FRAME_WIDTH * 14, 0, 25, 25, this.x, this.y, this.width, this.height)
        } else if(this.fallingCounter <= 20) {
            context.drawImage(this.img, Player.FRAME_WIDTH * 15, 0, 25, 25, this.x, this.y, this.width, this.height)
        } else {
            context.drawImage(this.img, Player.FRAME_WIDTH * 16, 0, 25, 25, this.x, this.y, this.width, this.height)
        }
    }

    draw(context) {
        context.save();

        if(this.isWalking && !(this.delayCounter <= this.delayBeforeWalk)) {
            this.drawWalkAnimation(context)
        } else if (this.isFalling) {
            this.drawFallingAnimation(context)
        } else if(this.engine.currentPhase === Phases.STRETCHING) {
            context.drawImage(this.img, Player.FRAME_WIDTH, 0, 25, 25, this.x, this.y, this.width, this.height)
            console.log('STRETCH')
        } else {
            this.drawIdleAnimation(context)
        }

        context.restore();
    }

    update() {
        this.walkUpdate()
    }
}

export default Player