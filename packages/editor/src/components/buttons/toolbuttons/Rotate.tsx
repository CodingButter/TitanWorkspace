import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function Rotate({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="Rotate"
      description="Rotate the selected object(s) in the world"
      order={2}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-rotate"></i>
    </ToolButton>
  )
}
