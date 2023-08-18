import { Vec3 } from '@utils/Matrix';
import Component, { ComponentProps } from '@systems/Component/Component';

export interface TransformComponentProps extends ComponentProps {
    position?: { x: number, y: number, z: number };
    rotation?: { x: number, y: number, z: number };
    scale?: { x: number, y: number, z: number };
}

export default class TransformComponent extends Component {
    position: Vec3 = new Vec3();
    rotation: Vec3 = new Vec3();
    scale: Vec3 = new Vec3(1, 1, 1);
    constructor({ position, rotation, scale }: TransformComponentProps = {}) {
        super();
        position && this.position.set(position.x, position.y, position.z);
        rotation && this.rotation.set(rotation.x, rotation.y, rotation.z)
        scale && this.scale.set(scale.x, scale.y, scale.z)
    }
    loadState(state: any) {
        super.loadState(state)
        this.position = new Vec3(state.position.x, state.position.y, state.position.z);
        this.rotation = new Vec3(state.rotation.x, state.rotation.y, state.rotation.z);
        this.scale = new Vec3(state.scale.x, state.scale.y, state.scale.z);
    }
}