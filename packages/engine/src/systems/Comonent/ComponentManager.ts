import Components, { ComponentsPropsMap, ComponentTypes } from "@titan/Scene/Component/Components";
import Entity from "../Entity";

type ComponentType = ComponentTypes[keyof ComponentTypes]
type ComponentArray = ComponentType[]

export default class ComponentManager {
    private static components: ComponentArray = []

    static createComponent<Key extends keyof ComponentTypes>(componentType: Key,
        props: ComponentsPropsMap<Key>): ComponentTypes[Key] {

        const component = <ComponentTypes[Key]>new Components[componentType](props)
        return component

    }

    static addComponent<T extends ComponentType>(component: T) {
        ComponentManager.components.push(component)
    }

    static getComponents(): ComponentArray {
        return ComponentManager.components
    }

    static getComponentsByType<Key extends keyof ComponentTypes>(componentType: Key): ComponentTypes[Key][] {
        return <ComponentTypes[Key][]>ComponentManager.components.filter((component) =>
            component.constructor.name === componentType
        )
    }

    static getComponentsByEntity(entity: Entity): ComponentArray {
        return ComponentManager.components.filter((component: ComponentType) =>
            component.entity === entity
        )
    }
}
