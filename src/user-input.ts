/**
 * 
 */

import { listen, dispatch } from "@brendangooch/utils";
import { tCoordinates, tSwipeDirection } from "./custom.js";
import Swipe from "./swipe.js";
import PressAndHold from "./press-and-hold.js";
import DoubleTap from "./double-tap.js";

type tSwipeEvent = {
    from: tCoordinates;
    to: tCoordinates;
    distance: number;
    angle: number;
    direction: tSwipeDirection;
};

export default class UserInput {


    // px distance threshold; a distance above SENSITIVITY is considered a swipe
    public static SWIPE_DISTANCE_SENSITIVITY = 80;

    // angle in radians; changes tightness / looseness of swipe.direction (low = tight)
    public static SWIPE_DIRECTION_SENSITIVITY = 0.3;

    // time in MS; doubleTap occured if time between previous release and this release < SENSITIVITY
    public static DOUBLE_TAP_TIME_SENSITIVITY = 250;

    // time in MS; press and hold occured if no release before SENSITIVITY amount of time passes
    static PRESS_AND_HOLD_TIME_SENSITIVITY = 400;


    private div: HTMLDivElement;
    private width: number = 0;
    private height: number = 0;
    private coordinates: tCoordinates = { x: 0, y: 0 };
    private swipe: Swipe;
    private doubleTap: DoubleTap;
    private pressAndHold: PressAndHold;

    public constructor(atts: {
        width: number;
        height: number;
        id?: string;
        element?: HTMLDivElement;
        parent?: HTMLDivElement;
    }) {
        this.div = this.makeDiv(atts.element, atts.id);
        this.setDimensions(atts.width, atts.height);
        if (atts.parent) this.appendTo(atts.parent);
        this.addListeners();
        this.swipe = new Swipe(this.coordinates, UserInput.SWIPE_DISTANCE_SENSITIVITY, UserInput.SWIPE_DIRECTION_SENSITIVITY);
        this.doubleTap = new DoubleTap(UserInput.DOUBLE_TAP_TIME_SENSITIVITY);
        this.pressAndHold = new PressAndHold(UserInput.PRESS_AND_HOLD_TIME_SENSITIVITY);
    }

    public appendTo(parent: HTMLElement): void {
        parent.appendChild(this.div);
    }

    private makeDiv(element?: HTMLDivElement, id?: string): HTMLDivElement {
        let div: HTMLDivElement;
        if (element) div = element;
        else if (id && document.getElementById(id) && document.getElementById(id)?.nodeName === 'DIV')
            div = <HTMLDivElement>document.getElementById(id);
        else
            div = document.createElement('div');
        div.id = 'user-input';
        return div;
    }

    private setDimensions(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    private addListeners(): void {
        listen('mousedown', this.mousedown.bind(this), this.div);
        listen('mouseup', this.mouseup.bind(this), this.div);
        listen('touchstart', this.touchstart.bind(this), this.div);
        listen('touchend', this.touchend.bind(this), this.div);
    }

    private mousedown(e: MouseEvent): void {
        e.preventDefault();
        this.press(e.clientX, e.clientY);
    }

    private mouseup(e: MouseEvent): void {
        e.preventDefault();
        this.release(e.clientX, e.clientY);
    }

    private touchstart(e: TouchEvent): void {
        e.preventDefault();
        this.press(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }

    private touchend(e: TouchEvent): void {
        e.preventDefault();
        this.release(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }

    private press(x: number, y: number): void {
        this.updateCoordinates(x, y);
        this.swipe.press();
        this.pressAndHold.press();
    }

    private release(x: number, y: number): void {
        this.updateCoordinates(x, y);
        if (this.swipe.release()) this.dispatchSwipe();
        else if (this.doubleTap.release()) this.dispatchDoubleTap();
        else if (this.pressAndHold.release()) this.dispatchPressAndHold();
        else this.dispatchPress();

    }

    private dispatchSwipe(): void {
        dispatch<tSwipeEvent>('swipeEvent', {
            from: this.swipe.from,
            to: this.swipe.to,
            distance: this.swipe.distance,
            angle: this.swipe.angle,
            direction: this.swipe.direction
        });
    }

    private dispatchDoubleTap(): void {
        dispatch<tCoordinates>('doubleTapEvent', { ...this.coordinates });
    }

    private dispatchPressAndHold(): void {
        dispatch<tCoordinates>('pressAndHoldEvent', { ...this.coordinates });
    }

    private dispatchPress(): void {
        dispatch<tCoordinates>('pressEvent', { ...this.coordinates });
    }

    // remove offset + scale values
    private updateCoordinates(x: number, y: number): void {
        this.updateX(x);
        this.updateY(y);

    }

    // remove offset + scale value
    private updateX(x: number): void {
        this.coordinates.x = (x - this.div.offsetLeft) / (this.div.scrollWidth / this.width);
    }

    // remove offset + scale value
    private updateY(y: number): void {
        this.coordinates.y = (y - this.div.offsetTop) / (this.div.scrollHeight / this.height);
    }

}