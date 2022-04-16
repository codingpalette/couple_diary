import React from 'react'
import { Content } from './styles'
import Button from '../Button'

export type SelectContainerBoxProps = {
  title: string
  okEvent: any
  okText: string
  okTextType: 'primary' | 'secondary' | 'tertiary'
  loading?: boolean
  closeEvent: any
  closeText: string
}

const SelectContainerBox = ({
  title,
  okEvent,
  okText,
  okTextType,
  loading,
  closeEvent,
  closeText,
}: SelectContainerBoxProps) => {
  return (
    <>
      <Content>
        <p>{title}</p>
        <span className="line" />
        <div className="button_box">
          <Button theme="tertiary" onClick={closeEvent}>
            {closeText}
          </Button>
          <Button theme={okTextType} onClick={okEvent} loading={loading}>
            {okText}
          </Button>
        </div>
      </Content>
    </>
  )
}

export default SelectContainerBox
