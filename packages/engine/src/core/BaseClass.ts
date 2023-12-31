import { v4 as uuid4 } from "uuid"
import Scene from "@systems/Scene/Scene"
import Entity from "@systems/Entity/Entity"

export interface BaseClassProps {
    entity?: Entity,
    scene?: Scene
}

// @ts-ignore
Map.prototype.toJSON = function () {
    return <object>Array.from(this.entries() || []).reduce((obj: any, [key, val]: [string, any]) => {
        obj[key] = val
        return obj
    }, {})
}

// @ts-ignore
Set.prototype.toJSON = function () {
    return <any[]>[...this].filter((value) => value.toJSON() !== undefined)
}

export default class BaseClass {
    static names: string[] = []
    id: UUID = <UUID>uuid4()
    name: string = this.constructor.name
    sceneId?: UUID
    entityId?: UUID
    runtime = false
    __scene: Scene | undefined
    __entity: Entity | undefined
    constructor({ entity, scene }: BaseClassProps = {}) {
        this.scene = scene || entity?.scene
        this.entity = entity
        this.runtime = entity?.runtime || false
        this.name = `${this.name} ${BaseClass.names.filter(name => name.includes(this.name)).length + 1}`
        BaseClass.names.push(this.name)
    }
    get scene(): Scene | undefined {
        return this.__scene
    }

    set scene(scene: Scene | undefined) {
        this.sceneId = scene?.id
        this.__scene = scene
    }

    get entity(): Entity | undefined {
        return this.__entity
    }

    set entity(entity: Entity | undefined) {
        this.entityId = entity?.id
        this.__entity = entity
    }
    toJSON(): object | undefined {
        if (this.runtime)
            return

        Object.keys(this).forEach((key: string) => {
            if (key.startsWith("__")) {
                // @ts-ignore
                delete this[key]
            }
        })
        const jsonObject = { className: this.constructor.name, ...this }
        return jsonObject
    }
    loadState(state: any) {
        this.name = state?.name
        this.id = state.id;
        this.scene = Scene?.getSceneById(state.sceneId)
        this.entity = this.scene?.getEntityById(state.entityId)
    }
}