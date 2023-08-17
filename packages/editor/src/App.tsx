import { useEffect, useState,useRef} from "react"
import useLocalStorage from "@app/hooks/useLocalStorage"
import Splitter, {SplitterDirection} from "@app/components/Splitter"
import classNames from "classnames"
import { useResizable } from "react-resizable-layout"
import useModal from "@app/hooks/useModal"
import Hierarchy from "@app/components/Hierarchy"
import FileMenu from "@app/components/FileMenu"
import Toolbar from "@app/components/Toolbar"
import Titan from "@app/Titan"
import Providers from "@app/providers"

const maxPanelSize = 300
function App() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { Modal } = useModal()
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])
  const [hierarchyExpanded, setHierarchyExpanded] = useLocalStorage("hierarchyExpanded", true)
  const [hierarchyPosition, setHierarchyPosition] = useLocalStorage("hierarchyPosition", 250)
  const [inspectorPosition, setInspectorPosition] = useLocalStorage("inspectorPosition", 250)
  const [assetManagerPosition, setAssetManagerPosition] = useLocalStorage(
    "assetManagerPosition",
    250
  )
  const {
    isDragging: isHierarchyDragging,
    endPosition: hierarchyEndPosition,
    position: hierarchyDragPosition,
    separatorProps: hierarchyDragBarProps,
  } = useResizable({
    axis: "x",
    min: 275,
    max: windowSize[0] * 0.3 > maxPanelSize ? windowSize[0] * 0.3 : maxPanelSize,
    initial: hierarchyPosition,
  })

  const {
    isDragging: isInspectorDragging,
    endPosition: inpectorEndPosition,
    position: inspectorDragPosition,
    separatorProps: inspectorDragBarProps,
  } = useResizable({
    axis: "x",
    max: windowSize[0] * 0.3 > maxPanelSize ? windowSize[0] * 0.3 : maxPanelSize,
    min: 275,
    reverse: true,
    initial: inspectorPosition,
  })

  const {
    isDragging: isAssetManagerDragging,
    endPosition: assetManagerEndPosition,
    position: assetManagerDragPosition,
    separatorProps: assetManagerDragBarProps,
  } = useResizable({
    axis: "y",
    min: 150,
    max: windowSize[1] * 0.3 > maxPanelSize ? windowSize[1] * 0.3 : maxPanelSize,
    initial: assetManagerPosition,
    reverse: true,
  })

  useEffect(() => {
    setHierarchyPosition(hierarchyExpanded ? hierarchyDragPosition | 0 : 74)
  }, [hierarchyEndPosition, setHierarchyPosition, hierarchyExpanded, hierarchyDragPosition])

  useEffect(() => {
    setInspectorPosition(inpectorEndPosition | 0)
  }, [inpectorEndPosition, setInspectorPosition])

  useEffect(() => {
    setAssetManagerPosition(assetManagerEndPosition | 0)
  }, [assetManagerEndPosition, setAssetManagerPosition])

  useEffect(() => {
    const resized = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", resized)
    return () => {
      window.removeEventListener("resize", resized)
    }
  }, [])
  return (
    <Providers canvasRef={canvasRef}>
    <div
      className={
        "w-screen h-screen justify-center items-center overflow-clip flex flex-col relative"
      }>
      <FileMenu />
      <div className="w-full h-full absolute left-1/2 -top-1/2 m-auto">
        <div className="absolute w-full h-full -left-1/2 top-1/2">
          <Titan canvasRef={canvasRef} />
        </div>
      </div>
      <div className={"flex h-full w-full flex-col text-neutral-100 relative z-20"}>
        <div className={"flex grow"}>
          <div
            className={classNames(
              hierarchyExpanded ? "bg-neutral-600" : "bg-neutral-700",
              " shrink-0 flex items-start justify-start h-full overflow-hidden z-20",
              isHierarchyDragging ? "dragging" : ""
            )}
            style={{ width: hierarchyExpanded ? hierarchyDragPosition | 0 : 84 }}>
            <div className="flex justify-start items-start w-16">
              <Toolbar />
            </div>
            <div className="flex justify-start items-start w-full">
              <Hierarchy expanded={hierarchyExpanded} setExpanded={setHierarchyExpanded} />
            </div>
          </div>
          <Splitter
            id="HierarchySplitter"
            direction={SplitterDirection.VERTICAL}
            hide={!hierarchyExpanded}
            isDragging={isHierarchyDragging}
            {...hierarchyDragBarProps}
          />
          <div className={"flex flex-col grow shrink-0 justify-center items-center"}>
            <div className={"grow flex justify-center items-center w-full"}></div>
            <Splitter
              id="AssetManagerSplitter"
              direction={SplitterDirection.HORIZONTAL}
              isDragging={isAssetManagerDragging}
              {...assetManagerDragBarProps}
            />
            <div
              className={classNames(
                "bg-neutral-400 shrink-0 grid place-items-center w-full",
                isAssetManagerDragging ? "dragging" : ""
              )}
              style={{ height: assetManagerDragPosition | 0 }}>
              Asset Manager
            </div>
          </div>
          <Splitter
            id="InpsectorSplitter"
            direction={SplitterDirection.VERTICAL}
            isDragging={isInspectorDragging}
            {...inspectorDragBarProps}
          />
          <div
            className={classNames(
              "bg-neutral-400 shrink-0 grid place-items-center z-20 relative",
              isInspectorDragging ? "dragging" : ""
            )}
            style={{ width: inspectorDragPosition | 0 }}>
            Inspector
          </div>
        </div>
        <div className="z-20 bg-neutral-650 flex justify-start items-start p-2 py-0 text-[12px] font-thin text-neutral-300">
          Actions Panel
        </div>
        {Modal && Modal}
      </div>
      </div>
      </Providers>
  )
}

export default App
