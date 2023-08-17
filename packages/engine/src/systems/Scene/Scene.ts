import Core from "@titan/Core/Core"
import Entity from "@titan/Scene/Entity"
import BaseClass from "@titan/BaseClass"
import Component from "@titan/Scene/Component/Component"
import Components from "@titan/Scene/Component/Components"
import ScriptComponent from "@titan/Scene/Component/ScriptComponent"
import MeshComponent from "@app/titan/Scene/Component/MeshComponent"

export default class Scene extends BaseClass {
  static scenes: Map<string, Scene> = new Map<string, Scene>()
  entities: Map<string, Entity> = new Map<string, Entity>()
  components: Map<string, Set<Component>> = new Map<string, Set<Component>>()
  static currentScene: Scene
  constructor() {
    super()
    //this.engine = Core.get()
    Scene.scenes.set(this.id, this)
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
    const scripts = this.getComponents<ScriptComponent>(ScriptComponent)
    scripts.forEach((script) => {
      script.init()
    })
  }

  getComponents<T extends Partial<Component>>(componentClass: ComponentClass): Set<T> {
    return (
      <Set<T>>(
        this.components.get(
          typeof componentClass == "string" ? componentClass : componentClass.name
        )
      ) || new Set<T>()
    )
  }

  getComponentById<T extends Partial<Component>>(
    componentClass: ComponentClass,
    componentId: string
  ): T | undefined {
    const components = this.getComponents<T>(componentClass)
    return [...components].find((component) => component.id === componentId)
  }

  getComponent<T extends Partial<Component>>(
    componentClass: ComponentClass,
    entityId: string
  ): T | undefined {
    const components = this.getComponents<T>(componentClass)
    return [...components].find((component) => (<BaseClass>component)?.entityId === entityId)
  }

  removeComponent<T extends Partial<Component>>(component: T, entityId: string) {
    if (typeof component == "string") {
      component = <T>this.getComponent<T>(component, entityId)
    }
    if (component) {
      const componentSet = this.components.get(component.constructor.name)
      if (componentSet) {
        componentSet.delete(<Component>component)
      }
    }
  }

  update(deltaTime: number) {
    //Do stuff
    ;[...this.entities.values()].forEach((entity) => {
      entity.position.z += 0.5 * deltaTime
      //console.log(entity.position.z)
    })
  }

  render() {
    //Do stuff
    this.getComponents<MeshComponent>(MeshComponent)?.forEach((meshComponent) => {
      meshComponent.render()
    })
  }

  createEntity() {
    const entity = new Entity(this)
    const mesh = Entity.createComponent("MeshComponent")
    entity.addComponent(mesh)
    return entity
  }

  addEntity(entity: Entity) {
    entity.scene = this
    this.entities.set(entity.id, entity)
    Core.get().renderEngine.addEntity(entity.mesh)
    //console.log(JSON.stringify(this, null, 4))
  }

  addComponent<T extends Partial<Component>>(component: T) {
    component.scene = this
    let componentSet: Set<Component> | undefined = this.components.get(component.constructor.name)
    if (!componentSet) {
      componentSet = new Set([component]) as Set<Component>
      this.components.set(component.constructor.name, componentSet)
    } else {
      componentSet.add(component as Component)
    }
  }

  getEntityById(id: string): Entity {
    return <Entity>this.entities.get(id)
  }

  getEntityByName(name: string): Entity | undefined {
    return [...this.entities.values()].find((entity) => entity.name === name)
  }

  getComponentsByEntityId(entityId: string): Component[] {
    const componentsByType = <Component[][]>(
      ([...this.components.values()].map((componentSet) =>
        [...componentSet].filter((component) => component.entity.id === entityId)
      ) || [])
    )
    return componentsByType.reduce((a, b) => a.concat(b), [])
  }

  static changeScene(sceneId: string) {
    Scene.currentScene = <Scene>Scene.scenes.get(sceneId)
  }

  static getCurrentScene() {
    return Scene.currentScene
  }

  static getSceneById(id: string): Scene | undefined {
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
      })
    })
  }
}
