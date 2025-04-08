import Platform from "./Platform.js";

class PlatformManager {
    constructor(engine) {
        //List of all platforms
        this.platforms = []
        this.engine = engine;

        //Constant value for where the platform's y is (The platform's y is the very top part)
        let player = engine.player;
        this.y = player.y + player.height - 9;
    }

    addPlatform(x, width) {
        this.platforms.push(new Platform(x, this.y, width, this.engine.windowHeight))
    }

    draw(ctx) {
        ctx.save()

        this.platforms.forEach((platform) => {
            platform.draw(ctx)
        })

        ctx.restore()
    }
}

export default PlatformManager