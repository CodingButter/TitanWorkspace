import Entity from "@titan/Scene/Entity";
import Scene from "@app/titan/Scene/Scene";
import Script from "@titan/Core/ScriptingAPI/Script"
import ScriptComponent from "@titan/Scene/Component/ScriptComponent";
import BaseClass from "@titan/BaseClass";
import TransformComponent from "@titan/Scene/Component/TransformComponent";

export default class TTN extends BaseClass {
    scriptComponentId!: string;
    public static scripts: Map<string, string> = new Map<string, string>();
    public static scriptIntances: Map<string, Script> = new Map<string, Script>();
    createScript!: (scriptName: string, script: string) => Script;
    constructor(scriptComponent: ScriptComponent) {
        super(scriptComponent.entity)
        this.scriptComponentId = scriptComponent.id;
    }
    createEntity(name:string): Entity | undefined {
        const entity = <Entity>this.scene?.createEntity();
        entity.name = name;
        entity.runtime = true;
        const transformComponent = <TransformComponent>this.scene?.getComponent<TransformComponent>(TransformComponent, entity.id);
        transformComponent.runtime = true
        return entity;
    }

    get scriptComponent(): ScriptComponent | undefined {
        return Scene.getCurrentScene().getComponentById<ScriptComponent>(ScriptComponent, this.scriptComponentId)
    }

    set scriptComponent(scriptComponent: ScriptComponent) {
        this.scriptComponentId = scriptComponent.id;
    }
}