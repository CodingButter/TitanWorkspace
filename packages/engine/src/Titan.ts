import CoreEngine from "@titan/Core/Core"

export default class TitanEngine {
  private static Core: CoreEngine = CoreEngine.get()
  static destroy() {
    TitanEngine.Core.destroy();
  }
  static init(canvas: HTMLCanvasElement, width?: number, height?: number) {
    TitanEngine.Core.init(canvas, width, height);
  }
  static stop() {
    TitanEngine.Core.stop();
  }

  static setSize(width: number, height: number) {
    TitanEngine.Core.renderEngine.setSize(width, height);
  }

  static getCore() {
    return TitanEngine.Core;
  }
}


