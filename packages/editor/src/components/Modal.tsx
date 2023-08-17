import React from 'react'
import { useSpring, animated } from 'react-spring'
import classNames from 'classnames'
export interface ModalType extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  closeModal: () => void
  closed: boolean
  show: boolean
  setShow: (show: boolean) => void
}

export default function Modal({ closeModal, closed, show, setShow, children, ...rest }: ModalType) {
  const modalStyles = useSpring({
    config: { velocity: 0.003, mass: 0.7, tension: 500, friction: 24 },
    to: !closed
      ? async (next) => {
          setShow(true)
          await next({ opacity: 1, scaleY: 1 })
        }
      : async (next) => {
          await next({ opacity: 0, scaleY: 0 })
          setShow(false)
        },
    from: !closed ? { opacity: 0, scaleY: 0 } : { opacity: 1, scaleY: 1 }
  })

  return (
    <div
      {...rest}
      className={classNames(
        "w-full h-full flex flex-col justify-center items-center gap-4",
        !show ? 'z-[-100]' : 'z-[100]',
        "top-0 left-0 absolute",
        closed ? 'bg-none' : 'bg-neutral-900 opacity-90' )}
    >
      <button aria-label="close" onClick={closeModal} className="text-white w-full h-full absolute top-0 left-0" />
      <animated.div style={modalStyles} className="z-[50]">
        {children}
      </animated.div>
    </div>
  )
}
