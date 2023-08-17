import { Children, useRef, useState, useEffect } from "react"
import classNames from "classnames"
interface DropDownProps {
  children: unknown
  label: string
}
const DropDown = ({ children, label }: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const targetRef = useRef(null)
  useEffect(() => {
    const resetCurrentDropDown = (event: MouseEvent) => {
      if (open && targetRef.current != event.target) setOpen(false)
    }
    document.addEventListener("click", resetCurrentDropDown)
    return () => {
      document.removeEventListener("click", resetCurrentDropDown)
    }
  }, [open, setOpen])
  return (
    <div className="relative">
      <button
        ref={targetRef}
        id="dropdownDefaultButton"
        data-dropdown-trigger="click"
        onClick={() => setOpen(!open)}
        data-dropdown-toggle="dropdown"
        className="hover:bg-neutral-500 hover:text-neutral-150 px-1 focus:outline-none font-medium text-center inline-flex items-center"
        type="button">
        {`${label} `}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={classNames(
          !open ? "h-0 opacity-0 invisible" : "opacity-1",
          "z-10 bg-white divide-y divide-gray-100 dark:bg-gray-700",
          "transition-all duration-500 overflow-hidden"
        )}>
        <ul
          className={classNames(
            "text-sm flex flex-col justify-start items-start absolute top-[25px] left-0 w-40 bg-neutral-300"
          )}
          aria-labelledby="dropdownDefaultButton">
          {Children.map(children, (child, index) => {
            return (
              <li
                className={classNames(
                  "hover:bg-neutral-450 hover:text-neurtal-200 text-neutral-700 w-full h-full px-2 py-1"
                )}
                key={index}>
                {child}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default DropDown
