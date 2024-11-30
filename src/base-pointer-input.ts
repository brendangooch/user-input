/**
 * 
 */

import { InteractiveDiv } from "./interactive-div.js";
import { PointerInput } from "./pointer-input.js";

export abstract class BasePointerInput {

    protected isOn: boolean = true;
    protected div: InteractiveDiv;
    protected input: PointerInput;

    public constructor(pointerInput: PointerInput, div: InteractiveDiv) {
        this.input = pointerInput;
        this.div = div;
        this.addListeners();
    }

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    protected abstract addListeners(): void;

}