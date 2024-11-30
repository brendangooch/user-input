/**
 * package barrel file
 */

export type tCoordinates = { x: number, y: number };
export type tPointerEvent = 'move' | 'tap' | 'swipe' | 'drag' | 'end-drag' | 'press-and-hold' | 'double-tap';
export type tEventQueue = tPointerEvent[];
export type tSwipeDirection = 'none' | 'left' | 'right' | 'up' | 'down';
export type tSwipeEvent = {
    from: tCoordinates;
    to: tCoordinates;
    angle: number;
    distance: number;
    direction: tSwipeDirection;
};

export { PointerInput } from "./pointer-input.js";
export { KeyboardInput } from "./keyboard-input.js";
export { InputHandler } from "./input-handler.js";