import { Vec3 } from '@titan/Core/Utils/Matrix';
import Component, { ComponentProps } from '@titan/Scene/Component/Component';

export interface TransformComponentProps extends ComponentProps {
    position?: Vec3;
    rotation?: Vec3;
    scale?: Vec3;
}

export default class TransformComponent extends Component {
    position: Vec3;
    rotation: Vec3;
    scale: Vec3;
    constructor({ position, rotation, scale }: TransformComponentProps = {}) {
        super();
        this.position = position || new Vec3;
        this.rotation = rotation || new Vec3();
        this.scale = scale || new Vec3(1, 1, 1);
    }
    loadState(state: any) {
        super.loadState(state)
        this.position = new Vec3(state.position.x, state.position.y, state.position.z);
        this.rotation = new Vec3(state.rotation.x, state.rotation.y, state.rotation.z);
        this.scale = new Vec3(state.scale.x, state.scale.y, state.scale.z);
        this.entity?.addComponent(this)
    }
}