import Scene from "@app/titan/Scene/Scene"

export default class Root {
    static addEntity(entity) {
        Scene.getCurrentScene().addEntity(entity)
    }
}