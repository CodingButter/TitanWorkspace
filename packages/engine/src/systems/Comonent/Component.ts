
import BaseClass, { BaseClassProps } from "@app/titan/BaseClass";
export type ComponentProps = BaseClassProps
export default class Component extends BaseClass {
    constructor({ entity }: ComponentProps = {}) {
        super({ entity })
    }

    init() {
        //OVERRIDE
    }

    update(delta: number) {
        //OVERRIDE
    }
    render() {
        //OVERRIDE
    }

    loadState(state: any) {
        //OVERRIDE
        super.loadState(state)
    }
}