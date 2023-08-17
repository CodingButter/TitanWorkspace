import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function Settings({ ...rest }: ButtonProps) {

  const click = () => {
  }

  return (
    <ToolButton
      label="Settings"
      description="Move the selected object(s) in the world"
      order={16}
      onClick={click}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-cog"></i>
    </ToolButton>
  )
}
