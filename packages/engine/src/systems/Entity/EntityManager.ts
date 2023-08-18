import Entity from "@systems/Entity/Entity"
import Scene from "@systems/Scene/Scene"

export default class EntityManager {
    static instance: EntityManager
    private static entities: Map<UUID, Entity> = new Map<UUID, Entity>()
    constructor() { }

    static get(): EntityManager {
        if (!EntityManager.instance) EntityManager.instance = new EntityManager()
        return EntityManager.instance
    }

    static createEntity({ sceneId, entityId }: { sceneId?: UUID, entityId?: UUID }): Entity {
        const scene = sceneId ? Scene.getSceneById(sceneId) : Scene.getCurrentScene()
        const entity = new Entity({ scene })
        entity.id = entityId || entity.id
        return entity
    }

    static addEntity(entity: Entity): void {
        EntityManager.entities.set(entity.id, entity)
    }
}