export default class KeyboardInput {
    private static instance: KeyboardInput
    private static KEYS: { [key in KEY]?: boolean } = {}
    private static listeners: { [key in KEYBOARD_ACTION]: ((key: KEY) => void)[] } = {
        [KEYBOARD_ACTION.KEYDOWN]: [],
        [KEYBOARD_ACTION.KEYUP]: [],
    }
    constructor() {

        document.addEventListener(KEYBOARD_ACTION.KEYDOWN, (e: KeyboardEvent) => {
            const key: KEY = <KEY>e.key;
            KeyboardInput.KEYS[key] = true;
            this.emit(KEYBOARD_ACTION.KEYDOWN, key)
        });

        document.addEventListener(KEYBOARD_ACTION.KEYUP, (e: KeyboardEvent) => {
            const key: KEY = <KEY>e.key;
            KeyboardInput.KEYS[key] = false;
            this.emit(KEYBOARD_ACTION.KEYUP, key)
        });

    }

    emit(event: KEYBOARD_ACTION, key: KEY): boolean {
        return KeyboardInput.listeners[event].some(listener => {
            listener(key)
            return true
        })
    }

    on(event: KEYBOARD_ACTION, listener: (key?: KEY) => void): any {
        KeyboardInput.listeners[event].push(listener)
    }

    static onKeyPress(key: KEY, listener: (key?: KEY) => void): any {
        KeyboardInput.get().on(KEYBOARD_ACTION.KEYDOWN, (e?: KEY) => {
            if (e === key) listener()
        })
    }

    static onKeyRelease(key: KEY, listener: (key?: KEY) => void): any {
        KeyboardInput.get().on(KEYBOARD_ACTION.KEYUP, (e?: KEY) => {
            if (e === key) listener()
        })
    }

    static isPressed(key: KEY): boolean {
        return KeyboardInput.KEYS[key] || false;;
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
    static get(): KeyboardInput {
        if (KeyboardInput.instance) return KeyboardInput.instance
        KeyboardInput.instance = new KeyboardInput()
        return KeyboardInput.instance
    }
}
