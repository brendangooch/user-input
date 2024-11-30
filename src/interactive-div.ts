/**
 * 
 */

export class InteractiveDiv {

    private div: HTMLDivElement;
    private width: number;
    private height: number;

    public constructor(width: number, height: number, id: string) {
        this.width = width;
        this.height = height;
        this.loadDiv(id);
    }

    public get element(): HTMLDivElement {
        return this.div;
    }

    public getX(actualX: number): number {
        return this.offsetX(actualX) / this.scaleX;
    }

    public getY(actualY: number): number {
        return this.offsetY(actualY) / this.scaleY;
    }

    private loadDiv(id: string): void {
        if (document.getElementById(id) === undefined) throw new Error(`no div with id ${id} in your html file`);
        this.div = <HTMLDivElement>document.getElementById(id);
        this.div.style.position = 'absolute';
        this.div.style.width = 'inherit';
        this.div.style.height = 'inherit';
    }

    private offsetX(actualX: number): number {
        return actualX - this.div.offsetLeft;
    }

    private offsetY(actualY: number): number {
        return actualY - this.div.offsetTop;
    }

    private get scaleX(): number {
        return this.div.scrollWidth / this.width;
    }

    private get scaleY(): number {
        return this.div.scrollHeight / this.height;
    }

}