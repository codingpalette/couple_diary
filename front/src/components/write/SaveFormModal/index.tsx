import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { useRecoilState } from 'recoil'
import diaryState from '../../../stores/useDiaryState'
import Textarea from '../../common/Textarea'

export type SaveFormModalProps = {
  // children: React.ReactNode
  isActive?: boolean | undefined
  closeEvent?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  temporarySave?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  // maxWidth: string
}

const SaveFormModal = ({ isActive, closeEvent, temporarySave }: SaveFormModalProps) => {
  const [useDiary, setUseDiary] = useRecoilState(diaryState)
  const [closed, setClosed] = useState(true)

  useEffect(() => {
    document.body.style.overflowY = isActive ? 'hidden' : 'initial'
    let timeoutId: NodeJS.Timeout
    if (isActive) {
      timeoutId = setTimeout(() => {
        setClosed(false)
      }, 200)
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true)
      }, 200)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isActive])

  // const [location, onChangeLocation] = useInput('')

  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDiary({ ...useDiary, location: e.target.value })
  }

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUseDiary({ ...useDiary, description: e.target.value })
  }

  if (!isActive && closed) return null

  return (
    <>
      <Container isActive={isActive}>
        <div className="content_box">
          <div className="input_group">
            <h4>다이어리 주소</h4>
            <span>특수문자 제외</span>
            <span>https://커다/{useDiary.location}</span>
            <Input
              value={useDiary.location}
              onChange={onChangeLocation}
              maxLength={25}
              placeholder="다이어리 주소를 입력해 주세요."
            />
          </div>
          <div className="input_group">
            <h4>다이어리 설명</h4>
            <span>카카오톡 공유하기에서 설명글로 나올 수 있습니다.</span>
            <Textarea
              onChange={onChangeDescription}
              value={useDiary.description}
              placeholder="100 글자 이내로 적어주세요."
              maxLength={100}
            />
          </div>
          <div className="footer">
            <Button theme="tertiary" onClick={closeEvent}>
              닫기
            </Button>
            <Button theme="secondary" onClick={temporarySave}>
              임시저장
            </Button>
            <Button theme="primary">출간</Button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SaveFormModal
