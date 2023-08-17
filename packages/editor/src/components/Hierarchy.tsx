import classNames from "classnames"
import { useState } from "react"
import useTitanEngine from "@app/hooks/useTitanEngine"
import Entity from "@app/titan/Scene/Entity"

interface HierarchyProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const Hierarchy = ({ expanded, setExpanded }: HierarchyProps) => {
  const [selectedEntities, selectObjects] = useState<number[]>([])
  const { titan } = useTitanEngine()
  //set entities to titan scene entities convert map to array
  const [entities, setEntities] = useState<Entity[]>([])
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const selectEntity = (id: number) => {
    if (selectedEntities.includes(id)) selectedEntities.splice(selectedEntities.indexOf(id), 1)
    else selectedEntities.push(id)
    selectObjects([...selectedEntities])
  }

  const addCube = () => {
    if (titan) {
      const entity = titan.scene.createEntity()
      titan.scene.addEntity(entity)
      setEntities(() => {
        return [...titan.scene.entities.values()]
      })
    }
  }

  return (
    <div className={classNames("flex flex-col w-full h-full grow", !expanded && "bg-neutral-700")}>
      <div
        className={classNames(
          "origin-bottom-left flex justify-between items-center bg-neutral-700 h-8 w-full select-none",
          "transition-all duration-100",
          !expanded && "rotate-90 -translate-y-8"
        )}>
        <div className="flex items-center gap-4 p-1 px-1 w-full justify-between">
          <div className="flex items-center gap-2 pl-1">
            <button
              className={classNames(
                "transition-all duration-300 text-neutral-700 w-4 h-4 bg-brand-300 rounded-full flex justify-center items-center text-[12px] font-thin",
                expanded ? "rotate-0" : "-rotate-180"
              )}
              onClick={toggleExpanded}>
              <i className="fa-caret-down fa-solid" />
            </button>
            <span
              className="text-neutral-100 capitalize font-bold text-xs tracking-wider cursor-pointer"
              onClick={toggleExpanded}>
              HIERARCHY
            </span>
          </div>
          <div
            className={classNames("flex justify-center items-center gap-1", !expanded && "hidden")}>
            <button className="flex items-center justify-center rounded-sm shadow bg-neutral-600 text-[12px] p-2">
              <i className="fa-solid fa-plus" />
            </button>
            <button className="flex items-center justify-center rounded-sm shadow bg-neutral-600 text-[12px] p-2">
              <i className="fa-solid fa-plus" />
            </button>
            <button
              onClick={addCube}
              className="flex items-center justify-center rounded-sm shadow bg-neutral-600 text-[12px] p-2">
              <i className="fa-solid fa-plus" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "flex flex-col items-start justify-start w-full",
          !expanded && "hidden"
        )}>
        <ExpandableMenu title="Root">
          {entities.map((entity, index) => {
            const isSelected = selectedEntities?.includes?.(entity.id)
            return (
              <EntityItem
                key={index}
                className={"pl-2"}
                isSelected={isSelected}
                onClick={() => {
                  selectEntity(entity.id)
                }}>
                {entity.name}
              </EntityItem>
            )
          })}
        </ExpandableMenu>
      </div>
    </div>
  )
}
interface ExpandableMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  className?: string
}
const ExpandableMenu = ({ children, title, className, ...props }: ExpandableMenuProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={classNames(
        "flex flex-col w-full justify-start items-start font-thin text-sm",
        className
      )}
      {...props}>
      <button
        className="text-neutral-100 w-full capitalize text-[13px] tracking-wider hover:bg-neutral-650 text-left p-px px-1"
        onClick={() => setExpanded(!expanded)}>
        {title}:
      </button>
      <ul
        className={classNames(
          !expanded && "hidden",
          "flex flex-col w-full justify-start items-start"
        )}>
        {children}
      </ul>
    </div>
  )
}

interface EntityItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  isSelected?: boolean
}
const EntityItem = ({ children, className, isSelected, ...props }: EntityItemProps) => (
  <button
    className={classNames(
      "pl-2 text-neutral-100 w-full capitalize font-bold text-xs tracking-wider hover:bg-neutral-650 text-left px-2 py-1",
      isSelected && "bg-neutral-650",
      className
    )}
    {...props}>
    {children}
  </button>
)
export default Hierarchy
