/**
 * 
 */

export default class PressAndHold {

    // time in MS; press and hold occured if no release before SENSITIVITY amount of time passes
    static TIME_SENSITIVITY = 300;

    private timeoutID: number = 0;
    private didOccur: boolean = false;

    // start the timer
    public press(): void {
        this.didOccur = false;
        this.timeoutID = setTimeout(() => { this.didOccur = true }, PressAndHold.TIME_SENSITIVITY);
    }

    public release(): boolean {
        clearTimeout(this.timeoutID);
        return this.didOccur;
    }

}