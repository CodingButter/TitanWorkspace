import TTN from '@systems/Scripting/TTN'
import Component, { ComponentProps } from '@systems/Component/Component'
import Entity from '@systems/Entity/Entity'
import Script from '@systems/Scripting/Script'
import App from "@systems/Scripting/App"

export type ScriptComponentProps = ComponentProps

export default class ScriptComponent extends Component {
    __ttn: TTN
    scripts: Map<string, Script> = new Map()
    app!: App
    constructor(props: ScriptComponentProps = {}) {
        super(props)
        this.__ttn = new TTN(this)
    }
    attachCode(code: string) {
        this.app = new App(<Entity>this.entity)
        this.__ttn.createScript = (scriptName: string): Script => {
            TTN.scripts.set(scriptName, code);
            const newScript: Script = new Script(scriptName, this, code)
            this.scripts.set(scriptName, newScript)
            return newScript
        }

        // @ts-ignore
        const ttn = this.__ttn
        eval(code)
    }

    init() {
        this.scripts.forEach((script) => {
            script.init.bind(script)()
        })
    }

    update(delta: number) {
        console.log("script must have update function")
    }

    loadState(state: any) {
        super.loadState(state)
        this.__ttn = new TTN(this)
        Object.keys(state.scripts).forEach((scriptName: any) => {
            const script = state.scripts[scriptName]
            const newScript = new Script(scriptName, this, script.code)
            newScript.loadState(script)
            this.attachCode(script.code)
        })
        this.entity?.addComponent(this)
    }
}