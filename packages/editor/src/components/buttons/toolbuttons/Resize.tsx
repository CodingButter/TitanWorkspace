import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function Resize({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="Resize"
      description="Resize the selected object(s) in the world"
      order={4}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-minimize"></i>
    </ToolButton>
  )
}
