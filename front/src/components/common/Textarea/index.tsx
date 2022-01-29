import React from 'react'
import { TextareaTag } from './styles'

export type TextareaProps = {
  value: string
  onChange: any
  placeholder?: string
  maxLength?: number
  height: string
}

const Textarea = ({ value, onChange, placeholder, maxLength, height }: TextareaProps) => {
  return (
    <>
      <TextareaTag value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} height={height} />
    </>
  )
}

Textarea.defaultProps = {
  height: '100px',
}

export default Textarea
