import Component from "@titan/Scene/Component/Component"
import TransformComponent from "@titan/Scene/Component/TransformComponent"
import MeshComponent from "@titan/Scene/Component/MeshComponent"
import BaseClass from "@titan/BaseClass"
import Scene from "@titan/Scene/Scene"
import Components from "@titan/Scene/Component/Components"
import { Vec3 } from "@titan/Core/Utils/Matrix"

export default class Entity extends BaseClass {
  transform: TransformComponent
  constructor(scene: Scene) {
    super(undefined, scene)
    this.transform = new TransformComponent()
    this.addComponent(this.transform)
  }

  static createComponent<T extends Partial<Component>>(
    componentName: string,
    ...args: ConstructorParameters<new (...args: any) => T>
  ): T {
    const component = new Components[componentName](...args) as T
    return component
  }

  get position() {
    return this.transform.position
  }

  set position(position: Vec3) {
    this.transform.position.x = position.x
    this.transform.position.y = position.y
    this.transform.position.z = position.z
  }

  get rotation() {
    return this.transform.rotation
  }

  set rotation(rotation: Vec3) {
    this.transform.rotation.x = rotation.x
    this.transform.rotation.y = rotation.y
    this.transform.rotation.z = rotation.z
  }

  get scale() {
    return this.transform.scale
  }

  set scale(scale: Vec3) {
    this.transform.scale.x = scale.x
    this.transform.scale.y = scale.y
    this.transform.scale.z = scale.z
  }

  get mesh() {
    this.scene.getComponent(MeshComponent, this.id)
  }

  addComponent<T extends Partial<Component>>(component: T): T {
    component.entity = this
    component.runtime = component.entity.runtime
    if (this.hasComponent<T>(component)) {
      console.assert(
        false,
        `Component ${component.constructor.name} already exists on entity ${this.name}`
      )
    } else {
      this.scene?.addComponent<T>(component)
    }
    return component
  }

  getComponent<T extends Partial<Component>>(componentClass: ComponentClass): T | undefined {
    return this.scene?.getComponent<T>(typeof componentClass, this.id)
  }

  getComponentById<T extends Partial<Component>>(
    componentClass: ComponentClass,
    componentId: string
  ): T | undefined {
    return this.scene?.getComponentById<T>(componentClass, componentId)
  }

  hasComponent<T extends Partial<Component>>(componentClass: T): boolean {
    return this.getComponent<T>(componentClass) !== undefined
  }

  removeComponent<T extends Partial<Component>>(componentClass: T): void {
    this.scene?.removeComponent<T>(componentClass, this.id)
  }

  get components(): Component[] {
    return this.scene?.getComponentsByEntityId(this.id) || []
  }

  loadState(state: any) {
    super.loadState(state)
  }
}
