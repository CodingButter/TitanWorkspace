import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function SpriteGenerator({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="SpriteGenerator"
      description="Move the selected object(s) in the world"
      order={10}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-paint-roller"></i>
    </ToolButton>
  )
}
