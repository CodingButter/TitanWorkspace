import { useState } from "react"
import classNames from "classnames"
export enum SplitterDirection {
  HORIZONTAL,
  VERTICAL
}

export interface SplitterProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  direction: SplitterDirection.HORIZONTAL | SplitterDirection.VERTICAL
  isDragging: boolean
  hide?: boolean
}

const Splitter = ({ id = "drag-bar", direction, isDragging, hide, ...props }: SplitterProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={classNames(
        hide && "hidden",
        "splitter",
        "flex justify-center items-center bg-neutral-800 p-0 hover:p-1",
        direction === SplitterDirection.HORIZONTAL ? "w-full" : "h-full"
      )}>
      <div
        id={id}
        data-testid={id}
        tabIndex={0}
        className={classNames(
          "p-[1px] z-40 flex justify-center ites-center transition-all duration-200 shrink-0 bg-neutral-100 hover:p-[3px] rounded-md",
          direction === SplitterDirection.HORIZONTAL ? "w-24 cursor-row-resize" : "h-24 cursor-col-resize",
          (isDragging || isFocused) && "bg-brand-300"
        )}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}

export default Splitter
