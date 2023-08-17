import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"
import useTools from "@app/hooks/useTools"

export default function Redo({ ...rest }: ButtonProps) {
  const { historyIndex, history } = useTools()
  return (
    <ToolButton
      label="Redo"
      description="Move the selected object(s) in the world"
      order={9}
      className={"bg-neutral-500 text-neutral-200"}
      disabled={historyIndex === history.length - 1 || history.length === 0}
      {...rest}>
      <i className="fa-solid fa-redo"></i>
    </ToolButton>
  )
}
