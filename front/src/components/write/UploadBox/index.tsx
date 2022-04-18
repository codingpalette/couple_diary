import React, { useCallback, useRef } from 'react'
import { UploadContent } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

export type UploadBoxProps = {
  inputRef: any
  onFileChange?: React.ChangeEventHandler
}

const UploadBox = ({ inputRef, onFileChange }: UploadBoxProps) => {
  // const inputRef = useRef<any>(null)

  // 배경이미지 추가
  const onClickUploadImageInput = useCallback(() => {
    inputRef.current.click()
  }, [inputRef.current])

  return (
    <>
      <UploadContent onClick={onClickUploadImageInput}>
        <FontAwesomeIcon icon={faImages} size="3x" />
      </UploadContent>
      <input ref={inputRef} id="attach-file" type="file" accept="image/*" hidden onChange={onFileChange} />
    </>
  )
}

export default UploadBox
