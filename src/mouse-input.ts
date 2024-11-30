/**
 * 
 */

import { listen } from "@brendangooch/utils";
import { BasePointerInput } from "./base-pointer-input.js";

export class MouseInput extends BasePointerInput {

    protected addListeners(): void {
        listen('mousedown', this.mouseDown.bind(this), this.div.element);
        listen('mouseup', this.mouseUp.bind(this), this.div.element);
        listen('mousemove', this.mouseMove.bind(this), this.div.element);
    }

    private mouseDown(e: MouseEvent): void {
        if (this.isOn) {
            e.preventDefault();
            this.input.press(e.clientX, e.clientY);
        }
    }

    private mouseUp(e: MouseEvent): void {
        if (this.isOn) {
            e.preventDefault();
            this.input.release(e.clientX, e.clientY);
        }
    }

    private mouseMove(e: MouseEvent): void {
        if (this.isOn) {
            e.preventDefault();
            this.input.move(e.clientX, e.clientY);
        }
    }

}