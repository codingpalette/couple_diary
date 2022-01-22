import React from 'react'
import { ImageContainer } from './styles'

export type ImageBoxProps = {
  img: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
}

const ImageBox = ({ img, onClick }: ImageBoxProps) => {
  return (
    <>
      <ImageContainer onClick={onClick}>
        <img src={img} alt="" />
      </ImageContainer>
    </>
  )
}

export default ImageBox
