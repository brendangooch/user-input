/**
 * 
 */

export default class DoubleTap {

    // time in MS; doubleTap occured if time between previous press and this release < SENSITIVITY
    public static TIME_SENSITIVITY = 60;

    private previousTap: number = 0;

    public release(): boolean {
        const didOccur = Date.now() - this.previousTap < DoubleTap.TIME_SENSITIVITY;
        this.previousTap = Date.now();
        return didOccur;
    }


}