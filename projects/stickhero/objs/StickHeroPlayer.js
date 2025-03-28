class StickHeroPlayer {
    constructor(engine) {
        this.engine = engine;

        this.speed = 4;
        this.x = 0;
        this.y = 0;

        this.width = 50
        this.height = 50

        this.img = new Image();
        this.img.src = './assets/dino.png'

        this.sticks = [];
    }

    draw(context) {
        context.save();

        context.drawImage(this.img, 0, 0, 25, 25, this.x, this.y, this.width, this.height)

        context.restore();
    }

    createBridge() {

    }
}

export default StickHeroPlayer