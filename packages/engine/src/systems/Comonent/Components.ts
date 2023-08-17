import { ComponentProps } from "@titan/Scene/Component/Component"
import TransformComponent, { TransformComponentProps } from "@titan/Scene/Component/TransformComponent"
import RigidBodyComponent, { RigidBodyComponentProps } from "@titan/Scene/Component/RigidBodyComponent"
import ScriptComponent from "@titan/Scene/Component/ScriptComponent"
import MeshComponent, { MeshComponentProps } from "@titan/Scene/Component/MeshComponent"

const Components = {
    TransformComponent,
    RigidBodyComponent,
    ScriptComponent,
    MeshComponent
}

export default Components

export type ComponentTypes = {
    TransformComponent: TransformComponent,
    RigidBodyComponent: RigidBodyComponent,
    ScriptComponent: ScriptComponent,
    MeshComponent: MeshComponent
}

export type ComponentsProps = {
    TransformComponent: TransformComponentProps,
    RigidBodyComponent: RigidBodyComponentProps
    ScriptComponent: ComponentProps,
    MeshComponent: MeshComponentProps
}

export type ComponentsPropsMap<K extends keyof ComponentsProps = keyof ComponentsProps> = {
    [P in K]: ComponentsProps[P];
}[K];
