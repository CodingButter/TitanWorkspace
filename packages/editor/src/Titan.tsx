import { useEffect } from "react"
import useTitanEngine from "@app/hooks/useTitanEngine"
interface TitanProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const Titan = ({ canvasRef }: TitanProps) => {
  const { titanEngine } = useTitanEngine()

  useEffect(() => {
    const updateSize = () => {
      if (!titanEngine) return
      titanEngine.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", updateSize)
    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [titanEngine])
  return <canvas className="w-screen h-screen" ref={canvasRef} id="titan-canvas"></canvas>
}
export default Titan
