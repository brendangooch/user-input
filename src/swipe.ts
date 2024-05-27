/**
 * 
 */

import { tCoordinates, tSwipeDirection } from "./custom.js";

export default class Swipe {

    private static UP: number = -Math.PI / 2;
    private static DOWN: number = Math.PI / 2;

    private distanceSensitvity: number = 50;
    private directionSensitivity: number = 0.3;
    private coordinates: tCoordinates;
    private previousCoordinates: tCoordinates;

    // pass by REFERENCE not value
    public constructor(coordinates: tCoordinates, distanceSensitvity: number, directionSensitvity: number) {
        this.coordinates = coordinates;
        this.previousCoordinates = { ...coordinates };
        this.distanceSensitvity = distanceSensitvity;
        this.directionSensitivity = directionSensitvity;
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
        if (this.angle > (Swipe.UP - this.directionSensitivity) && this.angle < (Swipe.UP + this.directionSensitivity)) return 'up';
        if (this.angle > (Swipe.DOWN - this.directionSensitivity) && this.angle < (Swipe.DOWN + this.directionSensitivity)) return 'down';
        if (this.angle > (-Math.PI + this.directionSensitivity) && this.angle > (Math.PI - this.directionSensitivity)) return 'left';
        // angle could be 0
        if ((this.angle > -this.directionSensitivity && this.angle < this.directionSensitivity) || this.angle === 0) return 'right';
        return 'none';
    }

    public press(): void {
        // VALUE not reference
        this.previousCoordinates = { ...this.coordinates };
    }

    public release(): boolean {
        return this.distance > this.distanceSensitvity;
    }

    private get dx(): number {
        return this.previousCoordinates.x - this.coordinates.x
    }

    private get dy(): number {
        return this.previousCoordinates.y - this.coordinates.y
    }

}