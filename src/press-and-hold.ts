/**
 * 
 */

export default class PressAndHold {

    private sensitivity: number = 500;
    private timeoutID: number = 0;
    private didOccur: boolean = false;

    public constructor(sensitivity: number) {
        this.sensitivity = sensitivity;
    }

    // start the timer
    public press(): void {
        this.didOccur = false;
        this.timeoutID = setTimeout(() => { this.didOccur = true }, this.sensitivity);
    }

    public release(): boolean {
        clearTimeout(this.timeoutID);
        return this.didOccur;
    }

}