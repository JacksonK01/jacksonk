import Platform from "./Platform.js";

class PlatformManager {
    constructor(engine) {
        //List of all platforms
        this.platforms = []
        this.top = -1;
        this.engine = engine;

        //Constant value for where the platform's y is (The platform's y is the very top part)
        let player = engine.player;
        this.y = player.y + player.height - 9;
    }

    addPlatform(x, width) {
        if(this.top <= -1) {
            this.top = 0;
        } else if(this.top >= 0) {
            this.top++;
        }

        this.platforms.push(new Platform(x, this.y, width, this.engine.windowHeight))
    }

    generateStartingPlatform(x) {
        this.addPlatform(x, 100)
    }

    //Used to determine the distance to the next platform
    getTopPlatform() {
        return this.platforms[this.top];
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