//<reference path="../types/*" />
import Scene from "@app/titan/Scene/Scene"
import RenderEngine from "@titan/Renderer/Renderer"
import PhysicsEngine from "@titan/PhysicsEngine/PhysicsEngine"


export default class Core {
    static instance: Core
    scene!: Scene
    renderEngine!: RenderEngine
    physicsEngine!: PhysicsEngine
    running = false
    init(canvas: HTMLCanvasElement, width = 800, height = 600) {
        this.scene = new Scene()
        Scene.changeScene(this.scene.id)
        //this.scene.loadState(myCode)
        this.renderEngine = new RenderEngine("Titan Engine", canvas, width, height)
        this.physicsEngine = new PhysicsEngine()
        this.run();
    }

    destroy() {
        this.scene.destroy();
    }

    public run() {
        if (this.running) return
        this.running = true
        this.scene.init()
        this.update(Date.now())
        this.render()
    }

    public stop() {
        this.running = false
    }

    private update(prevTime: number) {
        if (!this.running) return
        const time = Date.now()
        const delta = prevTime ? (time - prevTime) / 1000 : 0
        this.physicsEngine.update(delta)
        this.scene.update(delta)
        setTimeout(() => {
            this.update(time)
        }, 0)
    }

    private render() {
        if (!this.running) return
        this.scene.render()
        this.renderEngine.render()
        requestAnimationFrame(this.render.bind(this))
    }

    public static get(): Core {
        if (!Core.instance) {
            Core.instance = new Core()
        }
        return Core.instance
    }

}
