import React from 'react'
import { InputTag } from './styles'

export type InputProps = {
  value: string
  onChange?: React.ChangeEventHandler
  id?: string
  type: string
  placeholder: string
}

const Input = ({ value, onChange, id, type, placeholder }: InputProps) => {
  return (
    <>
      <InputTag value={value} onChange={onChange} id={id} type={type} placeholder={placeholder} />
    </>
  )
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
}

export default Input
