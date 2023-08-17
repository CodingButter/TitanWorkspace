import * as Tools from "@app/components/buttons/toolbuttons"
import Button from "@app/components/buttons/Button"
import classNames from "classnames"
const Toolbar = () => {
  return (
    <div
      id="Toolbar"
      className="flex flex-col bg-neutral-200 justify-evenly items-center text-2xl h-[calc(100vh_-_45px)] font-bold grow shrink-0">
      <button
        title="Titan Engine Home"
        style={{ order: -1 }}
        className={classNames(
          "p-0",
          "font-bold hover:bg-brand-200 w-14 h-14 flex justify-center items-center text-2xl bg-brand-400"
        )}>
        <a className="w-14 h-14 flex justify-center items-center p-0" href="#">
          <img
            className="w-full h-full aspect-square object-fit"
            src="/images/icons/Titan200x200.png"
          />
        </a>
      </button>
      <Tools.Translate />
      <Tools.Rotate />
      <Tools.Scale />
      <Tools.Resize />
      <Tools.LocalWorld />
      <Tools.Snap />
      <Tools.Focus />
      <Tools.Undo />
      <Tools.Redo />
      <Tools.SpriteGenerator />
      <Tools.CodeEditor />
      <Tools.Publish />
      <Tools.Help />
      <Tools.Controls />
      <Tools.Feedback />
      <Tools.Settings />
    </div>
  )
}
export default Toolbar
