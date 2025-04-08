class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        //this y value will typically be the screen's height
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.save()

        ctx.color = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.height)

        ctx.restore()
    }
}

export default Platform