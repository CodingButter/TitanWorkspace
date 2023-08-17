import { useContext } from 'react'
import { ModalContext } from '@app/providers/ModalProvider'

const useModal = () => useContext(ModalContext)
export default useModal

