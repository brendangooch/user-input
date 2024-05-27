/**
 * 
 */

export default class DoubleTap {

    private sensitivity: number = 200;
    private previousTap: number = 0;

    public constructor(sensitivity: number) {
        this.sensitivity = sensitivity;
    }

    public release(): boolean {
        const gap = Date.now() - this.previousTap;
        this.previousTap = Date.now();
        return gap < this.sensitivity;
    }

}