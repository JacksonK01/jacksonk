import Bridge from './Bridge.js'

class BridgeManager {
    constructor(engine) {
        //List of all bridges
        this.bridges = []
        //This top variable will be used to treat this.bridges like a stack
        this.top = -1;
        this.engine = engine;

        //Constant value for where the bridges's y is (The bridges's y is the very top part)
        let player = engine.player;
        this.y = player.y + player.height - 9;
    }

    createBridge(x) {
        let width = 6;

        if(this.top <= -1) {
            this.bridges.push(new Bridge(x, this.y, width, 0))
            this.top = 0;
        } else if(this.top >= 0 && !this.bridges[this.top].isGrowing) {
            this.bridges.push(new Bridge(x, this.y, width, 0))
            this.top++;
        }

    }

    alertStopGrowing() {
        this.bridges[this.top].stopGrowing();
    }

    getDistanceToWalk() {
        return this.bridges[this.top].getLengthAfterRotate();
    }

    forEach(action) {

        this.bridges.forEach((bridge) => {
            action(bridge)
        })

    }

    update() {
        this.bridges.forEach((bridge) => {
            bridge.update()
        })
    }

    draw(ctx) {
        ctx.save()

        this.bridges.forEach((bridge) => {
            bridge.draw(ctx)
        })

        ctx.restore()
    }
}

export default BridgeManager