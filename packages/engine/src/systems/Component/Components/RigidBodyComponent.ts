import Component from "@systems/Component/Component";
import { ComponentProps } from "@systems/Component/Component";

export interface RigidBodyComponentProps extends ComponentProps {
    mass?: number;
}

export default class RigidBodyComponent extends Component {
    mass = 1;
    constructor({ mass }: RigidBodyComponentProps = {}) {
        super()
        mass && (this.mass = mass);
    }
    loadState(state: any): void {
        //Do Stuff
        super.loadState(state);
    }
}