import { matrixMultiply } from '../util/math.js'

class Bridge {
    constructor(x1, y1, width, height) {
        this.x1 = x1;
        this.y1 = y1;

        //Width of platform
        this.x2 = x1 + width;
        this.y2 = y1 + height;

        this.isGrowing = true;
    }

    grow() {
        this.y2 -= 0.5;
    }

    stopGrowing() {
        this.isGrowing = false;
        this.rotate(90)
    }

    //Uses a rotation matrix to rotate the points, also theta is in degrees
    rotate(theta) {
        let radians = theta * (Math.PI / 180)

        let R = [
            [Math.cos(radians), -Math.sin(radians)],
            [Math.sin(radians), Math.cos(radians)]
        ]

        //Have to get a change of basis to have (x2, y1) as the origin to apply rotation
        let cX = this.x2
        let cY = this.y1

        let xy = [
            [this.x1 - cX, this.x2 - cX],
            [this.y1 - cY, this.y2 - cY]
        ]

        let rotated = matrixMultiply(R, xy)

        this.x1 = rotated[0][0] + cX
        this.y1 = rotated[1][0] + cY
        this.x2 = rotated[0][1] + cX
        this.y2 = rotated[1][1] + cY
    }

    update() {
        if(this.isGrowing) {
            this.grow()
        }
    }

    draw(ctx) {
        ctx.save()

        ctx.color = 'black'

        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x1, this.y2)
        ctx.lineTo(this.x2, this.y2)
        ctx.lineTo(this.x2, this.y1)
        ctx.closePath()
        ctx.fill()

        ctx.restore()
    }
}

export default Bridge