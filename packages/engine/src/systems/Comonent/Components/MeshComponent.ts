import * as THREE from 'three'
import Component, { ComponentProps } from "@titan/Scene/Component/Component"

export interface MeshComponentProps extends ComponentProps {
    geometry?: THREE.BufferGeometry,
    material?: THREE.Material
}

export default class MeshComponent extends Component {

    mesh: THREE.Mesh
    material: THREE.Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    geometry: THREE.BufferGeometry = new THREE.BoxGeometry(1, 1, 1)

    constructor({ geometry, material }: MeshComponentProps = {}) {
        super()
        geometry && (this.geometry = geometry)
        material && (this.material = material)
        this.mesh = new THREE.Mesh(geometry, material)
    }

    loadState(state) {
        super.loadState(state)
        this.geometry = new THREE.BufferGeometry()
    }

    render() {
        if (!this.entity) return
        this.mesh.position.set(this.entity.position.x, this.entity.position.y, this.entity.position.z)
        this.mesh.rotation.set(this.entity.rotation.x, this.entity.rotation.y, this.entity.rotation.z)
        this.mesh.scale.set(this.entity.scale.x, this.entity.scale.y, this.entity.scale.z)
    }
}