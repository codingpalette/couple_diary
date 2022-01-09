import React from 'react'
import { CardBox } from './styles'

export type CardProps = {
  children: React.ReactNode
  title: string
  // isActive: boolean
  // closeEvent?: (e?: React.MouseEvent<HTMLDivElement>) => void
  // maxWidth: string
}

const Card = ({ children, title }: CardProps) => {
  return (
    <>
      <CardBox>
        <h1>{title}</h1>
        <div className="card_body">{children}</div>
      </CardBox>
    </>
  )
}

export default Card
