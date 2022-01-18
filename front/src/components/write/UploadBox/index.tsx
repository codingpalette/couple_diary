import React, { useCallback, useRef } from 'react'
import { UploadContent } from './styles'

export type UploadBoxProps = {
  onFileChange?: React.ChangeEventHandler
}

const UploadBox = ({ onFileChange }: UploadBoxProps) => {
  const inputRef = useRef<any>(null)

  // 배경이미지 추가
  const onClickUploadImageInput = useCallback(() => {
    inputRef.current.click()
  }, [inputRef.current])

  return (
    <>
      <UploadContent onClick={onClickUploadImageInput} />
      <input ref={inputRef} id="attach-file" type="file" accept="image/*" hidden onChange={onFileChange} />
    </>
  )
}

export default UploadBox
