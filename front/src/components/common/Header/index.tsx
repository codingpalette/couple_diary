import React, { useCallback, useEffect, useState } from 'react'
import { HeaderBox, HeaderTag, LoginFormBox } from './styles'
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom'
import Button from '../Button'
import axios from 'axios'
import ModalContainer from '../../../containers/ModalContainer'
import Card from '../Card'
import Input from '../Input'
import useInput from '../../../hooks/useInput'
import { checkEmail, checkEnglish, checkEnglishNumber } from '../../../hooks/useStringCheck'
import { ErrorMessageOpen, SuccessMessageOpen } from '../../../hooks/useToast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import fetcher from '../../../hooks/fetcher'
import { useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'
import loginModalState from '../../../stores/useLoginModalState'

const Header = () => {
  const queryClient = useQueryClient()
  const {
    isLoading: userLoading,
    isError: userIsError,
    data: userData,
    error: userError,
  } = useQuery('user_check', () => fetcher('/api/user/check'), {
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const [useLoginModal, setLoginModal] = useRecoilState(loginModalState)

  const [mode, setMode] = useState('login')
  const [login_id, onChangeLoginId, onResetLoginId] = useInput('')
  const [nickname, onChangeNickname, onResetNickname] = useInput('')
  const [password, onChangePassword, onResetPassword] = useInput('')
  const [passwordCheck, onChangePasswordCheck, onResetPasswordCheck] = useInput('')

  const onClickModalOpen = () => {
    setLoginModal(true)
  }

  const onClickModalClose = () => {
    setLoginModal(false)
  }

  const onClickModeChange = useCallback(() => {
    setMode(mode === 'login' ? 'create' : 'login')
  }, [mode])

  const onSubmitLogin = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()

      if (login_id.trim().length === 0) {
        ErrorMessageOpen('아이디를 입력해 주세요')
        return
      }

      if (!checkEnglishNumber(login_id.trim())) {
        ErrorMessageOpen('아이디는 영어+숫자로 입력해 주세요')
        return
      }

      if (mode === 'create' && nickname.trim().length === 0) {
        ErrorMessageOpen('이름을 입력해 주세요')
        return
      }

      if (password.length < 6) {
        ErrorMessageOpen('6자리 이상의 비밀번호를 입력해 주세요')
        return
      }

      if (mode === 'create' && passwordCheck !== password) {
        ErrorMessageOpen('비밀번호가 서로 다릅니다')
        return
      }

      try {
        let res
        if (mode === 'login') {
          res = await axios.post('/api/user/login', {
            login_id,
            password,
          })
        } else {
          res = await axios.post('/api/user', {
            login_id,
            nickname,
            password,
          })
        }
        if (res.data.result === 'success') {
          onResetLoginId()
          onResetNickname()
          onResetPassword()
          onResetPasswordCheck()
          if (mode === 'login') {
            onClickModalClose()
            await queryClient.invalidateQueries('user_check')
          } else {
            SuccessMessageOpen(res.data.message)
          }
        }
      } catch (e: any) {
        if (e.response.data) {
          console.log(e.response.data)
          ErrorMessageOpen(e.response.data.message)
        }
        if (e.response.data.detail) {
          ErrorMessageOpen(e.response.data.detail.message)
        }
      }
    },
    [mode, login_id, nickname, password, passwordCheck],
  )

  return (
    <>
      <HeaderBox>
        <HeaderTag>
          <div className="logo">
            <Link to="/">로고</Link>
          </div>

          <div className="button_box">
            {userData && userData.result === 'success' && !userError ? (
              <Link to="/menu">
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </Link>
            ) : (
              <Button onClick={onClickModalOpen}>로그인</Button>
            )}
          </div>
        </HeaderTag>
      </HeaderBox>
      <ModalContainer isActive={useLoginModal} closeEvent={onClickModalClose} maxWidth="400px">
        <Card title="로그인">
          <LoginFormBox>
            <form onSubmit={onSubmitLogin}>
              <Input value={login_id} onChange={onChangeLoginId} placeholder="아이디" />
              {mode === 'create' && (
                <Input value={nickname} onChange={onChangeNickname} type="text" placeholder="닉네임" />
              )}
              <Input value={password} onChange={onChangePassword} type="password" placeholder="비밀번호" />
              {mode === 'create' && (
                <Input
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  type="password"
                  placeholder="비밀번호 확인"
                />
              )}
              <div className="mode_box">
                <span>{mode === 'login' ? '아직 회원이 아니신가요?' : '회원 이신가요?'}</span>
                <button type="button" onClick={onClickModeChange}>
                  {mode === 'login' ? '회원가입 하기' : '로그인 하기'}
                </button>
              </div>
              <div className="button_box">
                <Button type="submit">{mode === 'login' ? '로그인' : '회원가입'}</Button>
              </div>
            </form>
          </LoginFormBox>
        </Card>
      </ModalContainer>
    </>
  )
}

export default Header
