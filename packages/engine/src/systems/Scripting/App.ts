import BaseClass from "@app/titan/BaseClass"
import Entity from "@titan/Scene/Entity"
import Scene from "@titan/Scene/Scene"
export default class APP extends BaseClass {
    constructor(entity: Entity) {
        super(entity)
    }
    get root(): Scene {
        return <Scene>this.scene
    }
}