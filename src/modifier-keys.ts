/**
 * 
 */

export class ModifierKeys {

    private ctrl = { enabled: false, pressed: false };
    private shift = { enabled: false, pressed: false };
    private alt = { enabled: false, pressed: false };

    public enableAll(): void {
        this.ctrl.enabled = true;
        this.shift.enabled = true;
        this.alt.enabled = true;
    }

    public disableAll(): void {
        this.ctrl.enabled = false;
        this.shift.enabled = false;
        this.alt.enabled = false;
    }

    public enableCtrl(): void {
        this.ctrl.enabled = true;
    }

    public enableShift(): void {
        this.shift.enabled = true;
    }

    public enableAlt(): void {
        this.alt.enabled = true;
    }

    public update(ctrl: boolean, shift: boolean, alt: boolean): void {
        this.ctrl.pressed = (this.ctrl.enabled) ? ctrl : false;
        this.shift.pressed = (this.shift.enabled) ? shift : false;
        this.alt.pressed = (this.alt.enabled) ? alt : false;
    }

    // ctrl-code-pressed / shift-code-pressed / alt-code-pressed / code-pressed
    public modify(code: string): string {
        return `${this.ctrlString}${this.shiftString}${this.altString}${code}-pressed`;
    }

    private get ctrlString(): string {
        return (this.ctrl.pressed) ? 'ctrl-' : '';
    }

    private get shiftString(): string {
        return (this.shift.pressed) ? 'shift-' : '';
    }

    private get altString(): string {
        return (this.alt.pressed) ? 'alt-' : '';
    }

}