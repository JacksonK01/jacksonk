class Platform {
    constructor(x, y, width, height, isInstant) {
        this.x = x;
        //this y value will typically be the screen's height
        this.y = height;
        this.width = width;
        this.height = height;

        //Y will grow to this value
        this.dy = y
        this.speed = 4

        if(isInstant) {
            this.y = y
        }
    }

    intersectsX(x) {
        return this.x <= x && x <= (this.x + this.width)
    }

    update() {
        if(this.y > this.dy) {
            this.y -= this.speed
        }
    }

    draw(ctx) {
        ctx.save()

        ctx.color = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.height)

        ctx.restore()
    }
}

export default Platform