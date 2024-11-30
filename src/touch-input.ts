/**
 * 
 */

import { listen } from "@brendangooch/utils";
import { BasePointerInput } from "./base-pointer-input.js";

export class TouchInput extends BasePointerInput {

    protected addListeners(): void {
        listen('touchstart', this.touchStart.bind(this), this.div.element);
        listen('touchend', this.touchEnd.bind(this), this.div.element);
        listen('touchmove', this.touchMove.bind(this), this.div.element);
    }

    private touchStart(e: TouchEvent): void {
        if (this.isOn) {
            e.preventDefault();
            this.input.press(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    }

    private touchEnd(e: TouchEvent): void {
        if (this.isOn) {
            e.preventDefault();
            this.input.release(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    }

    private touchMove(e: TouchEvent): void {
        if (this.isOn) {
            e.preventDefault();
            this.input.move(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    }

}