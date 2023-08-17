import Display from "@titan/Renderer/Display"
import * as THREE from "three"

export default class RenderEngine {
  display: Display
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera | THREE.OrthographicCamera
  constructor(title: string, canvas: HTMLCanvasElement, width: number, height: number) {
    this.display = new Display(title, canvas, width, height)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.display.width / this.display.height,
      0.1,
      1000
    )
    this.camera.position.z = 5
    this.renderer = new THREE.WebGLRenderer({ canvas: this.display.canvas })
    this.renderer.setSize(this.display.width, this.display.height)
  }

  addEntity(mesh: THREE.Mesh) {
    console.log({ mesh })
    this.scene.add(mesh)
  }

  createCamera({
    fov,
    aspect,
    near,
    far,
  }: {
    fov: number
    aspect: number
    near: number
    far: number
  }) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  setSize(width: number, height: number) {
    this.display.width = width
    this.display.height = height
    this.renderer.setSize(width, height)
    if (this.camera instanceof THREE.PerspectiveCamera) {
      const cam = <THREE.PerspectiveCamera>this.camera
      cam.aspect = width / height
      this.camera.updateProjectionMatrix()
    }
  }
}
