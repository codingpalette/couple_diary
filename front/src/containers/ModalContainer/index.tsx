import React, { useEffect, useState } from 'react'
import { Container } from './styles'

export type ModalContainerProps = {
  children: React.ReactNode
  isActive: boolean | undefined
  closeEvent?: (e?: React.MouseEvent<HTMLDivElement>) => void
  maxWidth: string
}

const ModalContainer = ({ children, isActive, closeEvent, maxWidth }: ModalContainerProps) => {
  const [closed, setClosed] = useState(true)

  useEffect(() => {
    document.body.style.overflowY = isActive ? 'hidden' : 'initial'
    let timeoutId: NodeJS.Timeout
    if (isActive) {
      timeoutId = setTimeout(() => {
        setClosed(false)
      }, 200)
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true)
      }, 200)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isActive])

  if (!isActive && closed) return null

  return (
    <>
      <Container isActive={isActive} maxWidth={maxWidth}>
        <div className="modal_back" onClick={closeEvent} />
        <div className="content">{children}</div>
      </Container>
    </>
  )
}

export default ModalContainer
