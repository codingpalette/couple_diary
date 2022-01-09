import React from 'react'
import { Container } from './styles'

export type MainContainerProps = {
  children: React.ReactNode
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  )
}

export default MainContainer
