export default class Display {
    public canvas: HTMLCanvasElement;
    private _title!: string;
    private _width!: number;
    private _height!: number;
    constructor(title = "Titan", canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas;
        this.title = title;
        this.width = width;
        this.height = height;
    }


    get title(): string {
        return this._title
    }
    set title(title: string) {
        document.title = title;
        this._title = title;
    }

    get width(): number {
        return this._width
    }
    set width(width: number) {
        this.canvas.width = width
        this._width = width;
    }

    get height(): number {
        return this._height
    }
    set height(height: number) {
        this.canvas.height = height;
        this._height = height;
    }


}