import React from 'react'
import { InputTag } from './styles'

export type InputProps = {
  value: string
  onChange?: React.ChangeEventHandler
  id?: string
  type: string
  placeholder: string
  disabled?: boolean
}

const Input = ({ value, onChange, id, type, placeholder, disabled }: InputProps) => {
  return (
    <>
      <InputTag value={value} onChange={onChange} id={id} type={type} placeholder={placeholder} disabled={disabled} />
    </>
  )
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  disabled: false,
}

export default Input
