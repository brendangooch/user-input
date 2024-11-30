/**
 * 
 */

import { dispatchCustom } from "@brendangooch/utils";
import type { tCoordinates, tEventQueue } from "./index.js";
import { BasePointerEvent } from "./base-pointer-event.js";

export class PressAndHoldEvent extends BasePointerEvent {

    private sensitivity: number;
    private timeUp: boolean = false;
    private pressedAt: tCoordinates;
    private timeoutID: ReturnType<typeof setTimeout> | null = null;

    public constructor(coords: tCoordinates, queue: tEventQueue, sensitivity: number) {
        super(coords, queue);
        this.sensitivity = sensitivity;
    }

    public press(): void {
        this.pressedAt = { ...this.coords };
        this.timeoutID = setTimeout(() => this.timeUp = true, this.sensitivity);
    }

    public release(): void {
        if (this.timeUp && this.pressedAt.x === this.coords.x && this.pressedAt.y === this.coords.y) this.queue.push('press-and-hold');
        clearTimeout(this.timeoutID!);
        this.timeoutID = null;
        this.timeUp = false;
    }

    public dispatch(): void {
        dispatchCustom<tCoordinates>('press-and-hold-pointer', { ...this.coords });
    }

}