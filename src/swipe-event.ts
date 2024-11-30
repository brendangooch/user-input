/**
 * 
 */

import type { tCoordinates, tEventQueue, tSwipeDirection, tSwipeEvent } from "./index.js";
import { dispatchCustom } from "@brendangooch/utils";
import { BasePointerEvent } from "./base-pointer-event.js";
import { distanceBetween, radsToDegrees, Vector2D } from '@brendangooch/maths';

export class SwipeEvent extends BasePointerEvent {

    private static DIRECTION_SENSITIVITY_DEGREES: number = 12;

    private sensitivity: number;
    private previous: tCoordinates;

    public constructor(coords: tCoordinates, queue: tEventQueue, sensitivity: number) {
        super(coords, queue);
        this.sensitivity = sensitivity;
    }

    public press(): void {
        this.previous = { ...this.coords };
    }

    public release(): void {
        if (distanceBetween(this.coords.x, this.coords.y, this.previous.x, this.previous.y) > this.sensitivity) this.queue.push('swipe');
    }

    public dispatch(): void {
        dispatchCustom<tSwipeEvent>('swipe-pointer', {
            from: { x: this.from.x, y: this.from.y },
            to: { x: this.to.x, y: this.to.y },
            angle: this.angle,
            distance: this.distance,
            direction: this.direction
        });
    }

    private get from(): Vector2D {
        return new Vector2D(this.previous.x, this.previous.y);
    }

    private get to(): Vector2D {
        return new Vector2D(this.coords.x, this.coords.y);
    }

    private get angle(): number {
        return this.to.subtract(this.from).angle
    }

    private get distance(): number {
        return this.to.distanceTo(this.from);
    }

    private get direction(): tSwipeDirection {
        const degrees = radsToDegrees(this.angle);
        if (degrees > -SwipeEvent.DIRECTION_SENSITIVITY_DEGREES && degrees < SwipeEvent.DIRECTION_SENSITIVITY_DEGREES) return 'right';
        if (degrees > 180 - SwipeEvent.DIRECTION_SENSITIVITY_DEGREES || degrees < -180 + SwipeEvent.DIRECTION_SENSITIVITY_DEGREES) return 'left';
        if (degrees > -90 - SwipeEvent.DIRECTION_SENSITIVITY_DEGREES && degrees < -90 + SwipeEvent.DIRECTION_SENSITIVITY_DEGREES) return 'up';
        if (degrees > 90 - SwipeEvent.DIRECTION_SENSITIVITY_DEGREES && degrees < 90 + SwipeEvent.DIRECTION_SENSITIVITY_DEGREES) return 'down';
        return 'none';
    }





}