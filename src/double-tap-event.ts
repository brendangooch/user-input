/**
 * 
 */

import { dispatchCustom } from "@brendangooch/utils";
import type { tCoordinates, tEventQueue } from "./index.js";
import { BasePointerEvent } from "./base-pointer-event.js";

export class DoubleTapEvent extends BasePointerEvent {

    private sensitivity: number;
    private lastTap: number = 0;

    public constructor(coords: tCoordinates, queue: tEventQueue, sensitivity: number) {
        super(coords, queue);
        this.sensitivity = sensitivity;
    }

    public release(): void {
        const now = Date.now();
        if (now - this.lastTap < this.sensitivity) this.queue.push('double-tap');
        this.lastTap = now;
    }

    public dispatch(): void {
        dispatchCustom<tCoordinates>('double-tap-pointer', { ...this.coords });
    }

}