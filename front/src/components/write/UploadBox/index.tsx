import React, { useCallback, useRef } from 'react'
import { UploadContent } from './styles'

const UploadBox = () => {
  const inputRef = useRef<any>(null)

  // 배경이미지 추가
  const onClickUploadImageInput = useCallback(() => {
    inputRef.current.click()
  }, [inputRef.current])

  return (
    <>
      <UploadContent onClick={onClickUploadImageInput} />
      <input ref={inputRef} id="attach-file" type="file" accept="image/*" hidden />
    </>
  )
}

export default UploadBox
