import { Vec3 } from "@utils/Matrix"
import ComponentManager from "@systems/Component/ComponentManager"
import BaseClass from "@core/BaseClass"
import Scene from "@systems/Scene/Scene"
import TransformComponent from "@systems/Component/Components/TransformComponent"

export interface EntityProps {
  scene?: Scene
}

export default class Entity extends BaseClass {
  private transform: TransformComponent
  constructor({ scene }: EntityProps = {}) {
    super({ scene: scene })
    this.transform = ComponentManager.createComponent('TransformComponent', {
      entity: this,
      scene: scene
    })
    ComponentManager.addComponent(this.transform)
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

  loadState(state: any) {
    super.loadState(state)
  }
}
