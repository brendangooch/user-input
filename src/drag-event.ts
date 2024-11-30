/**
 * 
 */

import { dispatchCustom } from "@brendangooch/utils";
import { BasePointerEvent } from "./base-pointer-event.js";
import type { tCoordinates } from "./index.js";

export class DragEvent extends BasePointerEvent {

    private pressed: boolean = false;
    private moved: boolean = false;

    public press(): void {
        this.pressed = true;
    }

    public release(): void {
        if (this.moved) this.queue.push('end-drag');
        this.pressed = false;
        this.moved = false;
    }

    public move(): void {
        if (this.pressed) {
            this.queue.push('drag');
            this.moved = true;
        }
    }

    public dispatch(): void {
        dispatchCustom<tCoordinates>('drag-pointer', { ...this.coords });
    }

    public dispatchEndDrag(): void {
        dispatchCustom<tCoordinates>('drag-pointer-end', { ...this.coords });
    }

}