import React, { Children, useState, useEffect } from 'react'

interface StepProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  step: number
}

export default function MultiStep({ children, step }: StepProps) {
  const [sizes, setSizes] = useState<{ width: number; height: number }[]>([])
  const totalWidth = sizes.reduce((acc, curr) => acc + curr.width, 0)
  const styledSizes = sizes.map(({ width: w, height: h }) => ({
    width: `${w}px`,
    height: `${h}px`
  }))
  const sizeStyle = styledSizes[step] || {}
  const previousWidths = sizes.slice(0, step).reduce((acc, curr) => acc + curr.width, 0)
  const transform = `translateX(-${previousWidths || 0}px)`

  useEffect(() => {
    const resizeObservers: ResizeObserver[] = []
    const elements: HTMLElement[] = Array.from(document.querySelectorAll('.multi-step > * > *'))
    setSizes(
      elements.map((elm: HTMLElement, index) => {
        const resizeObserver = new ResizeObserver(() => {
          setSizes((currentSizes) => {
            const newSizes = [...currentSizes]
            newSizes[index] = { width: elm.offsetWidth, height: elm.offsetHeight }
            return newSizes
          })
        })
        resizeObserver.observe(elm)
        resizeObservers.push(resizeObserver)
        return {
          width: elm.offsetWidth,
          height: elm.offsetHeight
        }
      })
    )
    return () => {
      resizeObservers.forEach((observer: ResizeObserver) => {
        observer.disconnect()
      })
    }
  }, [])
  return (
    <div className="overflow-hidden transition-all flex justify-start items-end duration-500" style={sizeStyle}>
      <div
        className="multi-step transition-all duration-500 flex justify-start items-end"
        style={{ transform, width: `${totalWidth}px` }}
      >
        {Children.map(children, (child, index) => (
          <div className="flex justify-start items-end transition-all duration-500" style={styledSizes[index]}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
