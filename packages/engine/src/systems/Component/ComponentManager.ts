import {
    Components,
    ComponentPropsMap,
    ComponentTypesMap,
    ComponentType,
} from "@systems/Component/ComponentTypes"

export { Components, ComponentPropsMap, ComponentTypesMap, ComponentType } from "@systems/Component/ComponentTypes"

import Entity from "@systems/Entity/Entity";
import { UUID } from "crypto";

type ComponentArray = Set<ComponentType>

export default class ComponentManager {
    private static components: ComponentArray = new Set()
    private static componentGroups: Map<string, ComponentType[]> = new Map<string, ComponentType[]>()
    static createComponent<Key extends keyof ComponentTypesMap>(componentType: Key,
        props: ComponentPropsMap[Key]): ComponentTypesMap[Key] {
        const component = <ComponentTypesMap[Key]>new Components[componentType](props)
        return component
    }

    static addComponent<T extends ComponentType>(component: T): void {
        ComponentManager.components.add(component)
    }

    static clearComponents(): void {
        ComponentManager.components.clear()
    }

    static getComponents(): ComponentArray {
        return ComponentManager.components
    }

    static getComponentsByType<Key extends keyof ComponentTypesMap>(componentType: Key): ComponentTypesMap[Key][] {
        ComponentManager.createComponentGroup(componentType, (component: ComponentType) => component.constructor.name === componentType)
        return <ComponentTypesMap[Key][]>ComponentManager.getComponentsByGroup(componentType)
    }

    static getComponentsByEntity(entity: Entity): ComponentType[] {
        return Array.from(ComponentManager.components).filter((component: ComponentType) =>
            component.entityId === entity.id
        )
    }

    static getComponentByEntity<Key extends keyof ComponentTypesMap>(componentType: Key, entityId: UUID): ComponentTypesMap[Key] | undefined {
        return <ComponentTypesMap[Key]>Array.from(ComponentManager.components.values()).find((component) =>
            component.constructor.name === componentType && component.entityId === entityId
        )
    }

    static createComponentGroup(group: string, filter: (component: ComponentType) => boolean): void {
        ComponentManager.componentGroups.set(group, Array.from(ComponentManager.components.values()).filter(filter))
    }

    static addComponentToGroup(group: string, component: ComponentType, filter?: (components: ComponentType) => boolean): void {
        if (!ComponentManager.componentGroups.has(group))
            filter && ComponentManager.createComponentGroup(group, filter)
        ComponentManager.componentGroups.get(group)?.push(component)

    }

    static getComponentsByGroup(group: string): ComponentType[] {
        return ComponentManager.componentGroups.get(group) || []
    }
}
