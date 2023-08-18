import BaseClass from "@core/BaseClass"
import Entity from "@systems/Entity/Entity"
import Scene from "@systems/Scene/Scene"

export default class APP extends BaseClass {
    constructor(entity: Entity) {
        super(entity)
    }
    get root(): Scene {
        return <Scene>this.scene
    }
}