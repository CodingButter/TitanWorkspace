import DropDown from "@app/components/DropDown"

const FileMenu = () => {
  return (
    <div className="z-[500] h-[25px] w-screen bg-neutral-700 text-neutral-300 flex justify-start items-center gap-2 relative">
      <DropDown label="File">
        <button className={"block"}>New Project</button>
        <button className={"block"}>Open Project</button>
        <button className={"block"}>Save Project</button>
        <button className={"block"}>Import Project</button>
        <button className={"block"}>Export Project</button>
        <button className={"block"}>Properties</button>
      </DropDown>
      <DropDown label="Edit">
        <button className={"block"}>New Project</button>
        <button className={"block"}>Open Project</button>
        <button className={"block"}>Save Project</button>
        <button className={"block"}>Import Project</button>
        <button className={"block"}>Export Project</button>
        <button className={"block"}>Properties</button>
      </DropDown>
      <DropDown label="View">
        <button className={"block"}>New Project</button>
        <button className={"block"}>Open Project</button>
        <button className={"block"}>Save Project</button>
        <button className={"block"}>Import Project</button>
        <button className={"block"}>Export Project</button>
        <button className={"block"}>Properties</button>
      </DropDown>
    </div>
  )
}

export default FileMenu
