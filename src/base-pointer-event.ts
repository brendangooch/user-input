/**
 * 
 */

import type { tCoordinates, tEventQueue } from "./index.js";

export abstract class BasePointerEvent {

    protected coords: tCoordinates;
    protected queue: tEventQueue;

    public constructor(coords: tCoordinates, queue: tEventQueue) {
        this.coords = coords;
        this.queue = queue;
    }

    public abstract dispatch(): void;

}