import TTN from '@app/titan/Core/ScriptingAPI/TTN'
import Component, { ComponentProps } from '@titan/Scene/Component/Component'
import Entity from '@titan/Scene/Entity'
import Script from '@titan/Core/ScriptingAPI/Script'
import App from "@titan/Core/ScriptingAPI/App"

export default class ScriptComponent extends Component {
    __ttn: TTN
    scripts: Map<string, Script> = new Map()
    app!: App
    constructor(props: ComponentProps = {}) {
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