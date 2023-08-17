import Modal from '@app/components/Modal'
import React,{ createContext, useState,useEffect } from 'react'

type ModalContextType = {
  Modal: React.ReactNode
  openModal: (popup: React.ReactNode) => void
  closeModal: () => void
  closed: boolean
}

export const ModalContext = createContext<ModalContextType>({
  closed: true,
  Modal: <></>,
  openModal: () => ({}),
  closeModal: () => ({})
})


const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [closed, setClosed] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [modal,setModal] = useState<React.ReactNode>(null)
    const closeModal = () => {
    setClosed(true)
  }
  const openModal = (content: React.ReactNode) => {
    setModalContent(content)
    setClosed(false)
    }

    useEffect(() => {
        setModal(
            <Modal closed={closed} closeModal={closeModal} show={show} setShow={setShow}>
                {modalContent}
            </Modal>
        )
    }, [modalContent, closed, show])

    return <ModalContext.Provider value={{
        Modal: modal,
        closeModal,
        closed,
        openModal
    }}>{children}</ModalContext.Provider>
}

export default ModalProvider