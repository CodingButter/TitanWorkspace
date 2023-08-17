import BaseEvent from "./Event";

export default class KeyboardInput extends BaseEvent {
    private static KEYS: { [key: string]: boolean } = {}
    constructor() {
        super()
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            KeyboardInput.KEYS[e.key] = true;
            this.emit('keydown', <KEY>e.key)
        });
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            KeyboardInput.KEYS[e.key] = false;
            this.emit('keyup', <KEY>e.key)
        });
    }
    emit(event: string, key: KEY): boolean {
        return super.emit(event, key)
    }
    on(event: string, listener: (key: KEY) => void): any {
        return super.on(event, listener)
    }

    static isPressed(key: KEY): boolean {
        return KeyboardInput.KEYS[key];
    }
    static isPressedAny(keys: KEY[]): boolean {
        return keys.some(key => KeyboardInput.isPressed(key))
    }
    static isPressedAll(keys: KEY[]): boolean {
        return keys.every(key => KeyboardInput.isPressed(key))
    }
    static isPressedOnly(keys: KEY[]): boolean {
        return KeyboardInput.isPressedAll(keys) && Object.keys(KeyboardInput.KEYS).length === keys.length;
    }
    static isPressedExcept(keys: KEY[]): boolean {
        return !keys.some(key => KeyboardInput.isPressed(key))
    }
    static isPressedExceptOnly(keys: KEY[]): boolean {
        return KeyboardInput.isPressedExcept(keys) && Object.keys(KeyboardInput.KEYS).length === keys.length;
    }
    static isPressedExceptAny(keys: KEY[]): boolean {
        return !keys.every(key => KeyboardInput.isPressed(key))
    }
    static isPressedExceptAll(keys: KEY[]): boolean {
        return !keys.some(key => KeyboardInput.isPressed(key))
    }

}

export enum KEY {
    ALT = "Alt",
    ALT_GRAPH = "AltGraph",
    CAPS_LOCK = "CapsLock",
    CONTROL = "Control",
    FN = "Fn",
    FN_LOCK = "FnLock",
    HYPER = "Hyper",
    META = "Meta",
    NUM_LOCK = "NumLock",
    SCROLL_LOCK = "ScrollLock",
    SHIFT = "Shift",
    SUPER = "Super",
    SYMBOL = "Symbol",
    SYMBOL_LOCK = "SymbolLock",
    ENTER = "Enter",
    TAB = "Tab",
    SPACE = " ",
    ARROW_DOWN = "ArrowDown",
    ARROW_LEFT = "ArrowLeft",
    ARROW_RIGHT = "ArrowRight",
    ARROW_UP = "ArrowUp",
    END = "End",
    HOME = "Home",
    PAGE_DOWN = "PageDown",
    PAGE_UP = "PageUp",
    F1 = "F1",
    F2 = "F2",
    F3 = "F3",
    F4 = "F4",
    F5 = "F5",
    F6 = "F6",
    F7 = "F7",
    F8 = "F8",
    F9 = "F9",
    F10 = "F10",
    F11 = "F11",
    F12 = "F12",
    F13 = "F13",
    F14 = "F14",
    F15 = "F15",
    F16 = "F16",
    F17 = "F17",
    F18 = "F18",
    F19 = "F19",
    F20 = "F20",
    SOFT1 = "Soft1",
    SOFT2 = "Soft2",
    SOFT3 = "Soft3",
    SOFT4 = "Soft4",
    DECIMAL = "Decimal",
    Key11 = "Key11",
    Key12 = "Key12",
    MULTIPLY = "Multiply",
    ADD = "Add",
    CLEAR = "Clear",
    DIVIDE = "Divide",
    SUBTRACT = "Subtract",
    SEPARATOR = "Separator",
    NUMERIC_0 = "0",
    NUMERIC_1 = "1",
    NUMERIC_2 = "2",
    NUMERIC_3 = "3",
    NUMERIC_4 = "4",
    NUMERIC_5 = "5",
    NUMERIC_6 = "6",
    NUMERIC_7 = "7",
    NUMERIC_8 = "8",
    NUMERIC_9 = "9",
}

