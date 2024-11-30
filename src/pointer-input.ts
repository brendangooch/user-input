/**
 * 
 */

import type { tCoordinates, tEventQueue, tPointerEvent } from "./index.js";
import { SwipeEvent } from "./swipe-event.js";
import { DragEvent } from "./drag-event.js";
import { PressAndHoldEvent } from "./press-and-hold-event.js";
import { DoubleTapEvent } from "./double-tap-event.js";
import { InteractiveDiv } from "./interactive-div.js";
import { MouseInput } from "./mouse-input.js";
import { TouchInput } from "./touch-input.js";
import { TapEvent } from "./tap-event.js";
import { dispatchCustom } from "@brendangooch/utils";

export class PointerInput {

    public static PRESS_AND_HOLD_SENSITIVITY: number = 500;
    public static DOUBLE_TAP_SENSITIVITY: number = 250;
    public static SWIPE_SENSITIVITY: number = 50;

    private div: InteractiveDiv;
    private mouse: MouseInput;
    private touch: TouchInput;
    private tap: TapEvent;
    private swipe: SwipeEvent;
    private drag: DragEvent;
    private pressAndHold: PressAndHoldEvent;
    private doubleTap: DoubleTapEvent;
    private coords: tCoordinates = { x: 0, y: 0 };
    private eventQueue: tEventQueue = [];
    private filteredQueue: tEventQueue = [];
    private enabled: tPointerEvent[] = [];

    public constructor(width: number, height: number, id: string = 'user-input') {
        this.div = new InteractiveDiv(width, height, id);
        this.mouse = new MouseInput(this, this.div);
        this.touch = new TouchInput(this, this.div);
        this.tap = new TapEvent(this.coords, this.eventQueue);
        this.swipe = new SwipeEvent(this.coords, this.eventQueue, PointerInput.SWIPE_SENSITIVITY);
        this.drag = new DragEvent(this.coords, this.eventQueue);
        this.pressAndHold = new PressAndHoldEvent(this.coords, this.eventQueue, PointerInput.PRESS_AND_HOLD_SENSITIVITY);
        this.doubleTap = new DoubleTapEvent(this.coords, this.eventQueue, PointerInput.DOUBLE_TAP_SENSITIVITY);
    }

    public turnOn(): void {
        this.mouse.turnOn();
        this.touch.turnOn();
    }

    public turnOff(): void {
        this.mouse.turnOff();
        this.touch.turnOff();
    }

    public enableAll(): PointerInput {
        this.enabled.push('move');
        this.enabled.push('tap');
        this.enabled.push('swipe');
        this.enabled.push('drag');
        this.enabled.push('end-drag');
        this.enabled.push('press-and-hold');
        this.enabled.push('double-tap');
        return this;
    }

    public disableAll(): PointerInput {
        this.enabled.length = 0;
        return this;
    }

    public enable(name: tPointerEvent): void {
        if (!this.enabled.includes(name)) this.enabled.push(name);
        if (name === 'drag') this.enabled.push('end-drag');
    }

    public disable(name: tPointerEvent): void {
        this.enabled = this.enabled.filter(evt => evt !== name);
        if (name === 'drag') this.enabled = this.enabled.filter(evt => evt !== 'end-drag');
    }

    public press(x: number, y: number): void {
        this.updateCoordinates(x, y);
        this.tap.press();
        this.drag.press();
        this.pressAndHold.press();
        this.swipe.press();
    }

    public release(x: number, y: number): void {
        this.updateCoordinates(x, y);
        this.tap.release();
        this.drag.release();
        this.pressAndHold.release();
        this.doubleTap.release();
        this.swipe.release();
        this.dispatchEvents();

    }

    public move(x: number, y: number): void {
        this.updateCoordinates(x, y);
        this.eventQueue.push('move');
        this.drag.move();
        this.dispatchEvents();
    }


    private updateCoordinates(x: number, y: number): void {
        this.coords.x = this.div.getX(x);
        this.coords.y = this.div.getY(y);
    }

    private dispatchEvents(): void {
        this.filterEvents();
        this.filteredQueue.forEach(name => {
            switch (name) {
                case 'move':
                    this.dispatchMove();
                    break;
                case 'tap':
                    this.tap.dispatch();
                    break;
                case 'swipe':
                    this.swipe.dispatch();
                    break;
                case 'drag':
                    this.drag.dispatch();
                    break;
                case 'end-drag':
                    this.drag.dispatchEndDrag();
                    break;
                case 'press-and-hold':
                    this.pressAndHold.dispatch();
                    break;
                case 'double-tap':
                    this.doubleTap.dispatch();
                    break;
            }
        });
        this.eventQueue.length = 0;
        this.filteredQueue.length = 0;
    }

    private filterEvents(): void {
        this.filteredQueue = [...this.eventQueue];
        this.removeDisabled();
        this.removeMoveOnDrag();
        this.removeTapOnPressAndHold();
        this.removeTapOnDoubleTap();
    }

    private removeDisabled(): void {
        this.filteredQueue = this.filteredQueue.filter(name => this.enabled.includes(name));
    }

    private removeMoveOnDrag(): void {
        if (this.filteredQueue.includes('drag')) this.filteredQueue = this.filteredQueue.filter(name => name !== 'move');
    }

    private removeTapOnPressAndHold(): void {
        if (this.filteredQueue.includes('press-and-hold')) this.filteredQueue = this.filteredQueue.filter(name => name !== 'tap');
    }

    private removeTapOnDoubleTap(): void {
        if (this.filteredQueue.includes('double-tap')) this.filteredQueue = this.filteredQueue.filter(name => name !== 'tap');
    }

    private dispatchMove(): void {
        dispatchCustom<tCoordinates>('move-pointer', { ...this.coords });
    }

}