/**
 * 
 */

import { tCoordinates, tSwipeDirection } from "./custom.js";

export default class Swipe {

    // px distance threshold; distance above SENSITIVITY is considered a swipe
    static DISTANCE_SENSITIVITY = 50;

    // angle in radians; threshold at which a direction is declared as up, down, left, right (or left as none)
    static DIRECTION_SENSITIVITY = 0.3;

    private coordinates: tCoordinates;
    private previousCoordinates: tCoordinates;

    // pass by REFERENCE not value
    public constructor(coordinates: tCoordinates) {
        this.coordinates = coordinates;
        this.previousCoordinates = coordinates;
    }

    // value not reference
    public get from(): tCoordinates {
        return { ...this.previousCoordinates };
    }

    // value not reference
    public get to(): tCoordinates {
        return { ...this.coordinates };
    }

    public get distance(): number {
        return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
    }

    // {to} - {from} to set origin to 0,0 on the div element
    get angle(): number {
        return Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
    }

    // tbc
    get direction(): tSwipeDirection {

        const up = Math.PI * 2;
        const right = Math.PI / 2;
        const down = Math.PI;
        const left = Math.PI * 1.5;

        // up
        if (this.angle > up - Swipe.DIRECTION_SENSITIVITY && this.angle < Swipe.DIRECTION_SENSITIVITY) return 'up';

        // right
        if (this.angle > right - Swipe.DIRECTION_SENSITIVITY && this.angle < right + Swipe.DIRECTION_SENSITIVITY) return 'right';

        // down
        if (this.angle > down - Swipe.DIRECTION_SENSITIVITY && this.angle < down + Swipe.DIRECTION_SENSITIVITY) return 'down';

        // left
        if (this.angle > left - Swipe.DIRECTION_SENSITIVITY && this.angle < left + Swipe.DIRECTION_SENSITIVITY) return 'left';

        return 'none';

    }

    public press(): void {
        // VALUE not reference
        this.previousCoordinates = { ...this.coordinates };
    }

    public release(): boolean {
        return this.distance > Swipe.DISTANCE_SENSITIVITY;
    }

    private get dx(): number {
        return this.previousCoordinates.x - this.coordinates.x
    }

    private get dy(): number {
        return this.previousCoordinates.y - this.coordinates.y
    }

}