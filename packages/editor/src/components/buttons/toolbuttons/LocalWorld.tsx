import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function LocalWorld({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="LocalWorld"
      description="Move the selected object(s) in the world"
      order={5}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-globe"></i>
    </ToolButton>
  )
}
