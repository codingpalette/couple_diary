import React from 'react'
import { Container } from './styles'

export type MapContainerProps = {
  children: React.ReactNode
}

const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  )
}

export default MapContainer
