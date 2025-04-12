class StickHeroPlayer {
    constructor(engine) {
        this.engine = engine;

        this.speed = 4;
        this.x = 60;
        this.y = 0;

        this.width = 50
        this.height = 50

        this.img = new Image();
        this.img.src = './assets/dino.png'

        this.isWalking = false;
        this.locationX = 0;

        this.delayCounter = 0;
        this.delayBeforeWalk = 0;
    }

    //Location to walk to and delay for before start walking
    //Can only ever walk right (Not really a need to walk left
    walkTo(locationX, delay) {
        if(this.isWalking) {
            return
        }

        this.isWalking = true;
        this.locationX = locationX;
        this.delayBeforeWalk = delay;
    }

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
        this.y++;
    }

    draw(context) {
        context.save();

        context.drawImage(this.img, 0, 0, 25, 25, this.x, this.y, this.width, this.height)

        context.restore();
    }

    update() {
        this.walkUpdate()
    }
}

export default StickHeroPlayer