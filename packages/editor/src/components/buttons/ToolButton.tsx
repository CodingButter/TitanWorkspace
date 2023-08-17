import classNames from "classnames"
import Button, { ButtonProps } from "@app/components/buttons/Button"
import useTools from "@app/hooks/useTools"

export interface ToolButtonProps extends ButtonProps {
  label: string
  description: string
  order: number
}

const ToolButton = ({
  className,
  label,
  description,
  order,
  children,
  disabled,
  onClick,
  ...rest
}: ToolButtonProps) => {
  const { activeTool, setActiveTool } = useTools()

  const click = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActiveTool(label)
    onClick?.(event)
  }

  return (
    <Button
      title={`${label}\n${description}`}
      style={{ order }}
      size="lg"
      className={classNames(
        "hover:bg-neutral-550 w-full h-full flex justify-center items-center text-2xl",
        className
      )}
      active={activeTool === label}
      onClick={click}
      disabled={disabled}
      {...rest}>
      {children}
    </Button>
  )
}

export default ToolButton
