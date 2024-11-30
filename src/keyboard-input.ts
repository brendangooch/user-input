/**
 * handles keydown event in a javascript application, dispatching new custom key press events
 */

import { listen, dispatch } from "@brendangooch/utils";
import { KeyCodes } from "./key-codes.js";
import { ModifierKeys } from "./modifier-keys.js";

export class KeyboardInput {

    public static THROTTLE: number = 200;

    private isOn: boolean = true;
    private codes: KeyCodes = new KeyCodes();
    private modifiers: ModifierKeys = new ModifierKeys();
    private throttled: boolean = false;
    private keyDownCode: string = '';
    private customCode: string = '';
    private eventName: string = '';
    private enabled: string[] = [];

    public constructor() {
        listen('keydown', this.keydown.bind(this));
    }

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public enableAll(): KeyboardInput {
        this.enableNumpadKeys();
        this.enableNavigationKeys();
        this.enableAlphanumericKeys();
        this.enable([
            'enter',
            'spacebar',
            'escape',
            'backspace',
            'comma',
            'fullstop',
            'minus',
            'equal',
            'left-bracket',
            'right-bracket'
        ]);
        return this;
    }

    // return this?
    public enable(customCodes: string[]): KeyboardInput {
        this.enabled = this.enabled.concat(customCodes.filter(code => this.codes.isValidCustomKey(code) && !this.enabled.includes(code)));
        return this;
    }

    public disable(customCodes: string[]): KeyboardInput {
        this.enabled = this.enabled.filter(code => !customCodes.includes(code));
        return this;
    }

    public enableModifiers(): void {
        this.modifiers.enableAll();
    }

    public disableModifiers(): void {
        this.modifiers.disableAll();
    }

    public enableCtrlKey(): KeyboardInput {
        this.modifiers.enableCtrl();
        return this;
    }

    public enableShiftKey(): KeyboardInput {
        this.modifiers.enableShift();
        return this;
    }

    public enableAltKey(): KeyboardInput {
        this.modifiers.enableAlt();
        return this;
    }

    // enable navigation (arrows + cursor keys)
    public enableNavigationKeys(): KeyboardInput {
        this.enableArrowKeys();
        this.enableCursorKeys();
        return this;
    }

    public enableArrowKeys(): KeyboardInput {
        this.enable([
            'up',
            'down',
            'left',
            'right'
        ]);
        return this;
    }

    // enable cursor keys (pageup, pagedown, home, end, insert, delete)
    public enableCursorKeys(): KeyboardInput {
        this.enable([
            'pageup',
            'pagedown',
            'home',
            'end',
            'insert',
            'delete'
        ])
        return this;
    }

    // enable alphanumeric (numbers + letters)
    public enableAlphanumericKeys(): KeyboardInput {
        this.enableNumbers();
        this.enableLetters();
        return this;
    }

    public enableNumpadKeys(): KeyboardInput {
        this.enable([
            'numpad-0',
            'numpad-1',
            'numpad-2',
            'numpad-3',
            'numpad-4',
            'numpad-5',
            'numpad-6',
            'numpad-7',
            'numpad-8',
            'numpad-9',
            'numpad-divide',
            'numpad-multiply',
            'numpad-subtract',
            'numpad-add',
            'numpad-enter'
        ]);
        return this;
    }

    public enableLetters(): KeyboardInput {
        this.enable([
            'q',
            'w',
            'e',
            'r',
            't',
            'y',
            'u',
            'i',
            'o',
            'p',
            'a',
            's',
            'd',
            'f',
            'g',
            'h',
            'j',
            'k',
            'l',
            'z',
            'x',
            'c',
            'v',
            'b',
            'n',
            'm'
        ]);
        return this;
    }

    public enableNumbers(): KeyboardInput {
        this.enable([
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '0'
        ])
        return this;
    }

    private keydown(e: KeyboardEvent): void {
        this.keyDownCode = e.code;
        if (this.canProcess) {
            e.preventDefault();
            this.modifiers.update(e.ctrlKey, e.shiftKey, e.altKey);
            this.customCode = this.codes.translate(this.keyDownCode);
            this.eventName = this.modifiers.modify(this.customCode);
            this.dispatchEvent();
            this.throttle();
        }
    }

    private get canProcess(): boolean {
        return this.isOn && !this.throttled && this.codes.isValidKey(this.keyDownCode);
    }

    private get canDispatch(): boolean {
        return this.codes.isValidCustomKey(this.customCode) && this.enabled.includes(this.customCode);
    }

    private dispatchEvent(): void {
        if (this.canDispatch) dispatch(this.eventName);
    }

    private throttle(): void {
        this.throttled = true;
        setTimeout(() => {
            this.throttled = false;
        }, KeyboardInput.THROTTLE);
    }

}