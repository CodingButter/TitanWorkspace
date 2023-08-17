import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function Publish({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="Publish"
      description="Move the selected object(s) in the world"
      order={12}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-upload"></i>
    </ToolButton>
  )
}
