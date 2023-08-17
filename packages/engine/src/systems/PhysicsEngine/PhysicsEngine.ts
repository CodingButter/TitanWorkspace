import CANNON from "cannon"
import BaseClass from "@titan/BaseClass"
export default class PhysicsEngine extends BaseClass {
  fixedTimeStep: number = 1.0 / 60.0
  world: CANNON.World = new CANNON.World()
  constructor() {
    super()
    //Do stuff
  }
  addBody(body: CANNON.Body) {
    this.world.addBody(body)
  }
  update(delta: number) {
    this.world.step(this.fixedTimeStep, delta, 3)
  }
}
