
export default class MouseManager {
    private static instance: MouseManager
    private static listeners: { [key in MOUSE_ACTION]: ((e?: MouseEvent) => void)[] }
    static buttons: boolean[] = []
    static dragging: boolean = false
    static pressed: boolean = false
    static x: number = 0
    static y: number = 0
    static dx: number = 0
    static dy: number = 0
    static wheel: number = 0
    static wheelDelta: number = 0
    constructor() {

        document.addEventListener(MOUSE_ACTION.DOWN, (e: MouseEvent) => {
            MouseManager.pressed = true;
            const { button } = <{ button: MOUSE_BUTTON }>e;
            MouseManager.buttons[button] = true;
            this.emit(MOUSE_ACTION.DOWN, e)
        });

        document.addEventListener(MOUSE_ACTION.UP, (e: MouseEvent) => {
            MouseManager.pressed = false;
            const { button } = <{ button: MOUSE_BUTTON }>e;
            MouseManager.buttons[button] = false;
            this.emit(MOUSE_ACTION.UP, e)
        });

        document.addEventListener(MOUSE_ACTION.MOVE, (e: MouseEvent) => {
            if (MouseManager.isPressed(MOUSE_BUTTON.LEFT)) MouseManager.dragging = true;
            MouseManager.x = e.clientX;
            MouseManager.y = e.clientY;
            MouseManager.dx = e.movementX;
            MouseManager.dy = e.movementY;
            this.emit(MOUSE_ACTION.MOVE)
        });

        document.addEventListener('wheel', (e: WheelEvent) => {
            MouseManager.wheel = e.deltaY;
            MouseManager.wheelDelta = e.deltaY - MouseManager.wheel;
            this.emit(MOUSE_ACTION.MOVE, e)
        });

    }

    on(event: MOUSE_ACTION, listener: (e?: MouseEvent) => void): void {
        MouseManager.listeners[event].push(listener)
    }

    emit(event: MOUSE_ACTION, e?: MouseEvent): boolean {
        return MouseManager.listeners[event].some(listener => {
            listener(e)
            return true
        })
    }

    static isPressed(button: MOUSE_BUTTON): boolean {
        return MouseManager.buttons[button];
    }

    static isPressedAny(buttons: MOUSE_BUTTON[]): boolean {
        return buttons.some(button => MouseManager.isPressed(button))
    }

    static isPressedAll(buttons: MOUSE_BUTTON[]): boolean {
        return buttons.every(button => MouseManager.isPressed(button))
    }

    static isPressedOnly(buttons: MOUSE_BUTTON[]): boolean {
        return MouseManager.isPressedAll(buttons) && Object.keys(MouseManager.buttons).length === buttons.length;
    }

    static isPressedExcept(buttons: MOUSE_BUTTON[]): boolean {
        return !buttons.some(button => MouseManager.isPressed(button))
    }

    static isPressedExceptOnly(buttons: MOUSE_BUTTON[]): boolean {
        return MouseManager.isPressedExcept(buttons) && Object.keys(MouseManager.buttons).length === buttons.length;
    }

    static isPressedExceptAny(buttons: MOUSE_BUTTON[]): boolean {
        return !buttons.every(button => MouseManager.isPressed(button))
    }

    static isPressedExceptAll(buttons: MOUSE_BUTTON[]): boolean {
        return !buttons.some(button => MouseManager.isPressed(button))
    }

    static Get(): MouseManager {
        if (MouseManager.instance) return MouseManager.instance
        MouseManager.instance = new MouseManager()
        return MouseManager.instance
    }
}