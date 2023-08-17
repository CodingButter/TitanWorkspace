import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function Focus({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="Focus"
      description="Move the selected object(s) in the world"
      order={7}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-eye"></i>
    </ToolButton>
  )
}
