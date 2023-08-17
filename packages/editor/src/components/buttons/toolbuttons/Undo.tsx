import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"
import useTools from "@app/hooks/useTools"

export default function Undo({ ...rest }: ButtonProps) {
  const { historyIndex } = useTools()
  return (
    <ToolButton
      label="Undo"
      description="Move the selected object(s) in the world"
      order={8}
      className={"bg-neutral-500 text-neutral-200"}
      disabled={historyIndex === 0}
      {...rest}>
      <i className="fa-solid fa-undo"></i>
    </ToolButton>
  )
}
