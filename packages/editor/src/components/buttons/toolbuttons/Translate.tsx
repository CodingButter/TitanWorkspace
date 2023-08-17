import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

export default function Translate({ ...rest }: ButtonProps) {
  const click = () => {
    /* Do some Translate stuff */
  }

  return (
    <ToolButton
      label="Translate"
      description="Move the selected object(s) in the world"
      order={1}
      onClick={click}
      className={"bg-neutral-500 text-neutral-250"}
      {...rest}>
      <i className="fa-solid fa-up-down-left-right"></i>
    </ToolButton>
  )
}
