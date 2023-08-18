import MeshComponent, { MeshComponentProps } from '@systems/Component/Components/MeshComponent';
import RigidBodyComponent, { RigidBodyComponentProps } from '@systems/Component/Components/RigidBodyComponent';
import ScriptComponent, { ScriptComponentProps } from '@systems/Component/Components/ScriptComponent';
import TransformComponent, { TransformComponentProps } from '@systems/Component/Components/TransformComponent';

export const Components = {
    MeshComponent,
	RigidBodyComponent,
	ScriptComponent,
	TransformComponent
}

export type ComponentPropsMap = {
	MeshComponent: MeshComponentProps,
	RigidBodyComponent: RigidBodyComponentProps,
	ScriptComponent: ScriptComponentProps,
	TransformComponent: TransformComponentProps
}

export type ComponentTypesMap = {
	MeshComponent: MeshComponent,
	RigidBodyComponent: RigidBodyComponent,
	ScriptComponent: ScriptComponent,
	TransformComponent: TransformComponent
}

export type ComponentProp = ComponentPropsMap[keyof ComponentPropsMap]
export type ComponentType = ComponentTypesMap[keyof ComponentTypesMap]

