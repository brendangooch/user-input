/**
 * 
 */

import { dispatchCustom } from "@brendangooch/utils";
import type { tCoordinates } from "./index.js";
import { BasePointerEvent } from "./base-pointer-event.js";

export class TapEvent extends BasePointerEvent {

    private pressed: boolean = false;
    private pressedAt: tCoordinates;

    public press(): void {
        this.pressed = true;
        this.pressedAt = { ...this.coords };
    }

    // can give a little distance leighway on pressedAt - coords
    public release(): void {
        if (this.pressed && this.pressedAt.x === this.coords.x && this.pressedAt.y === this.coords.y) {
            this.pressed = false;
            this.queue.push('tap');
        }
    }

    public dispatch(): void {
        dispatchCustom<tCoordinates>('tap-pointer', { ...this.coords });
    }

}