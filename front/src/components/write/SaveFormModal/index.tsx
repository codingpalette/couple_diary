import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { useRecoilState } from 'recoil'
import diaryState from '../../../stores/useDiaryState'
import Textarea from '../../common/Textarea'
import fetcher from '../../../hooks/fetcher'
import { useQuery } from 'react-query'

export type SaveFormModalProps = {
  // children: React.ReactNode
  isActive?: boolean | undefined
  closeEvent?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  temporarySave?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onClickDiarySave?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  formMode: 'create' | 'diary_save' | 'diary'
  // maxWidth: string
}

const SaveFormModal = ({ isActive, closeEvent, temporarySave, formMode, onClickDiarySave }: SaveFormModalProps) => {
  const { data: userData } = useQuery('user_check', () => fetcher('/api/user/check'), {
    refetchOnWindowFocus: false,
    retry: 0,
  })
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

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDiary({ ...useDiary, title: e.target.value })
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
            <h4>???????????? ??????</h4>
            <span>???????????? ??????</span>
            <span>
              https://nyamo.co.kr/{userData.data.nickname}/{useDiary.location}
            </span>
            <Input
              value={useDiary.location}
              onChange={onChangeLocation}
              maxLength={25}
              placeholder="???????????? ????????? ????????? ?????????."
            />
          </div>
          <div className="input_group">
            <h4>???????????? ??????</h4>
            <Input
              value={useDiary.title}
              onChange={onChangeTitle}
              maxLength={20}
              placeholder="???????????? ????????? ????????? ?????????."
            />
          </div>
          <div className="input_group">
            <h4>???????????? ??????</h4>
            <span>???????????? ?????????????????? ???????????? ?????? ??? ????????????.</span>
            <Textarea
              onChange={onChangeDescription}
              value={useDiary.description}
              placeholder="100 ?????? ????????? ???????????????."
              maxLength={100}
            />
          </div>
          <div className="footer">
            <Button theme="tertiary" onClick={closeEvent}>
              ??????
            </Button>
            {formMode === 'create' || formMode === 'diary_save' ? (
              <Button theme="secondary" onClick={temporarySave}>
                ????????????
              </Button>
            ) : null}
            <Button theme="primary" onClick={onClickDiarySave}>
              {formMode === 'create' || formMode === 'diary_save' ? '?????????' : '??????'}
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SaveFormModal
