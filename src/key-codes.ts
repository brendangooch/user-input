/**
 * 
 */

export class KeyCodes {

    private static KEYDOWN_CODES: string[] = [

        'Numpad0',
        'Numpad1',
        'Numpad2',
        'Numpad3',
        'Numpad4',
        'Numpad5',
        'Numpad6',
        'Numpad7',
        'Numpad8',
        'Numpad9',
        'NumpadDivide',
        'NumpadMultiply',
        'NumpadSubtract',
        'NumpadAdd',
        'NumpadEnter',

        'PageUp',
        'PageDown',
        'Home',
        'End',
        'Insert',
        'Delete',

        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',

        'Digit1',
        'Digit2',
        'Digit3',
        'Digit4',
        'Digit5',
        'Digit6',
        'Digit7',
        'Digit8',
        'Digit9',
        'Digit0',

        'KeyQ',
        'KeyW',
        'KeyE',
        'KeyR',
        'KeyT',
        'KeyY',
        'KeyU',
        'KeyI',
        'KeyO',
        'KeyP',
        'KeyA',
        'KeyS',
        'KeyD',
        'KeyF',
        'KeyG',
        'KeyH',
        'KeyJ',
        'KeyK',
        'KeyL',
        'KeyZ',
        'KeyX',
        'KeyC',
        'KeyV',
        'KeyB',
        'KeyN',
        'KeyM',

        'Enter',
        'Space',
        'Escape',
        'Backspace',
        'Comma',
        'Period',
        'Minus',
        'Equal',
        'BracketLeft',
        'BracketRight'

    ];

    private static CUSTOM_CODES: string[] = [

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
        'numpad-enter',

        'pageup',
        'pagedown',
        'home',
        'end',
        'insert',
        'delete',

        'up',
        'down',
        'left',
        'right',

        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',

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
        'm',

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

    ];

    private translated: string = '';

    public isValidKey(code: string): boolean {
        return KeyCodes.KEYDOWN_CODES.includes(code);
    }

    public isValidCustomKey(code: string): boolean {
        return KeyCodes.CUSTOM_CODES.includes(code);
    }

    public translate(code: string): string {
        this.translated = code.toLowerCase();
        this.translateNumPad();
        this.translateArrowKeys();
        this.translateNumbers();
        this.translateLetters();
        this.translateSpacebar();
        this.translateFullstop();
        this.translateBrackets();
        return this.translated;

    }

    private translateNumPad(): void {
        this.translated = this.translated.replace('numpad', 'numpad-');
    }

    private translateArrowKeys(): void {
        this.translated = this.translated.replace('arrow', '');
    }

    private translateNumbers(): void {
        this.translated = this.translated.replace('digit', '');
    }

    private translateLetters(): void {
        this.translated = this.translated.replace('key', '');
    }

    private translateSpacebar(): void {
        if (this.translated !== 'backspace') this.translated = this.translated.replace('space', 'spacebar');
    }

    private translateFullstop(): void {
        this.translated = this.translated.replace('period', 'fullstop');
    }

    private translateBrackets(): void {
        this.translated = this.translated.replace('bracketleft', 'left-bracket');
        this.translated = this.translated.replace('bracketright', 'right-bracket');
    }

}