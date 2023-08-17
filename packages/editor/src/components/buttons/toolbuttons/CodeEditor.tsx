import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function CodeEditor({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="CodeEditor"
      description="Move the selected object(s) in the world"
      order={11}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-code"></i>
    </ToolButton>
  )
}
