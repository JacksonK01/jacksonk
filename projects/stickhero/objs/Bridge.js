import { matrixMultiply } from '../util/math.js'

class Bridge {
    static AMOUNT_ROTATE = 90;

    constructor(x1, y1, width, height) {
        this.x1 = x1;
        this.y1 = y1;

        //Goes right
        this.x2 = x1 + width;
        this.y2 = y1;

        //Goes up
        this.x3 = this.x2;
        this.y3 = this.y1 + height;

        //Goes left
        this.x4 = this.x1;
        this.y4 = this.y3;

        this.growSpeed = 2

        this.isGrowing = true;

        this.isFalling = false;
        this.degreesRotated = 0;
    }

    //This called before the bridge actually starts to rotate
    //I know it's bad..
    //TODO figure out a better way to predict where the bridge will land.
    getLengthAfterRotate() {
        this.rotate(Bridge.AMOUNT_ROTATE)
        let length = this.x4
        this.rotate(-Bridge.AMOUNT_ROTATE)
        return length
    }

    grow() {
        this.y3 -= this.growSpeed;
        this.y4 -= this.growSpeed;
    }

    stopGrowing() {
        if(!this.isGrowing) {
            return;
        }

        this.isGrowing = false;
        this.isFalling = true;
    }

    //Uses a rotation matrix to rotate the points, also theta is in degrees
    rotate(theta) {
        let radians = theta * (Math.PI / 180)

        let R = [
            [Math.cos(radians), -Math.sin(radians)],
            [Math.sin(radians), Math.cos(radians)]
        ]

        //Have to get a change of basis to have (x1, y1) as the origin to apply rotation
        let cX = this.x1
        let cY = this.y1

        let xy = [
            [this.x1 - cX, this.x2 - cX, this.x3 - cX, this.x4 - cX],
            [this.y1 - cY, this.y2 - cY, this.y3 - cY, this.y4 - cY]
        ]

        let rotated = matrixMultiply(R, xy)

        this.x1 = rotated[0][0] + cX
        this.y1 = rotated[1][0] + cY

        this.x2 = rotated[0][1] + cX
        this.y2 = rotated[1][1] + cY

        this.x3 = rotated[0][2] + cX
        this.y3 = rotated[1][2] + cY

        this.x4 = rotated[0][3] + cX
        this.y4 = rotated[1][3] + cY
    }

    update() {
        if(this.isGrowing) {
            this.grow()
        }

        if(this.isFalling && this.degreesRotated < Bridge.AMOUNT_ROTATE) {
            let theta = 2;
            this.rotate(theta);
            this.degreesRotated += theta;
        }
    }

    draw(ctx) {
        ctx.save()

        ctx.color = 'black'

        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.lineTo(this.x3, this.y3)
        ctx.lineTo(this.x4, this.y4)
        ctx.closePath()
        ctx.fill()

        ctx.restore()
    }
}

export default Bridge