import BaseEvent from './Event'

export enum BUTTON {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}

export enum ACTION {
    UP = 0,
    DOWN = 1,
    MOVE = 2
}

export default class MouseInput extends BaseEvent {
    static buttons: boolean[] = []
    static actions: boolean[] = []
    static x: number = 0
    static y: number = 0
    static dx: number = 0
    static dy: number = 0
    static wheel: number = 0
    static wheelDelta: number = 0
    constructor() {
        super()
        document.addEventListener('mousedown', (e: MouseEvent) => {
            const { button } = <{ button: BUTTON }>e;
            MouseInput.buttons[button] = true;
            MouseInput.actions[button] = ACTION.DOWN;
            this.emit('mousedown', <BUTTON>button)
        });
        document.addEventListener('mouseup', (e: MouseEvent) => {
            const { button } = <{ button: BUTTON }>e;
            MouseInput.buttons[button] = false;
            MouseInput.actions[button] = ACTION.UP;
            this.emit('mouseup', <BUTTON>button)
        });
        document.addEventListener('mousemove', (e: MouseEvent) => {
            const { button } = <{ button: BUTTON }>e;
            MouseInput.x = e.clientX;
            MouseInput.y = e.clientY;
            MouseInput.dx = e.movementX;
            MouseInput.dy = e.movementY;
            MouseInput.actions[button] = ACTION.MOVE;
            this.emit('mousemove', <BUTTON>button)
        });
        document.addEventListener('wheel', (e: WheelEvent) => {
            MouseInput.wheel = e.deltaY;
            MouseInput.wheelDelta = e.deltaY - MouseInput.wheel;
            this.emit('wheel')
        });
    }
}