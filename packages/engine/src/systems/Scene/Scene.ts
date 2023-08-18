import Core from "@core/Core"
import Entity from "@systems/Entity/Entity"
import BaseClass from "@core/BaseClass"
import ScriptComponent from "@systems/Component/Components/ScriptComponent"
import ComponentManager, { Components } from "@systems/Component/ComponentManager"


export default class Scene extends BaseClass {
  static scenes: Map<string, Scene> = new Map<string, Scene>()
  entities: Map<string, Entity> = new Map<string, Entity>()
  static currentScene: Scene
  constructor() {
    super()
    //this.engine = Core.get()
    Scene.scenes.set(this.id, this)
    ComponentManager.createComponentGroup('TransformComponent', (component: any) => component.constructor.name === 'TransformComponent')
    //Do Stuff
  }

  destroy() {
    //Do Stuff
    Scene.scenes.delete(this.id)
    BaseClass.names = []
  }

  init() {
    this.scriptInit()
  }

  scriptInit() {
    const scripts = ComponentManager.getComponentsByType('ScriptComponent')
    scripts.forEach((script) => {
      script.init()
    })
  }

  update(deltaTime: number) {
    //Do stuff
    ComponentManager.getComponentsByType('ScriptComponent')?.forEach((scriptComponent) => {
      scriptComponent.update(deltaTime)
    })
  }

  render() {
    //Do stuff
    ComponentManager.getComponentsByType('MeshComponent')?.forEach((meshComponent) => {
      meshComponent.render()
    })
  }

  addEntity(entity: Entity) {
    entity.scene = this
    this.entities.set(entity.id, entity)

  }


  static changeScene(sceneId: UUID) {
    Scene.currentScene = <Scene>Scene.scenes.get(sceneId)
  }

  static getCurrentScene() {
    return Scene.currentScene
  }

  static getSceneById(id: UUID): Scene | undefined {
    return Scene.scenes.get(id)
  }

  loadState(state: any) {
    Scene.scenes.set(state.id, this)

    this.entities.clear()
    Object.keys(state.entities).forEach((entityId) => {
      const entity = this.createEntity()
      entity.loadState(state.entities[entityId])
    })
    this.components.clear()
    Object.keys(state.components).forEach((componentType) => {
      const componentSet = state.components[componentType]
      componentSet.forEach((component: any) => {
        if (!Components[componentType]) return
        const componentClass = Components[componentType]
        const componentInstance = new componentClass()
        componentInstance.loadState(component)
        componentInstance.entity = this.getEntityById(component.entityId)
      })
    })
  }
}
