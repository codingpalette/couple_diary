import React, { useCallback, useEffect, useState } from 'react'
import { HeaderBox, HeaderTag, LoginFormBox } from './styles'
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom'
import Button from '../Button'
import axios from 'axios'
import ModalContainer from '../../../containers/ModalContainer'
import Card from '../Card'
import Input from '../Input'
import useInput from '../../../hooks/useInput'
import { checkEmail, checkEnglish, checkEnglishNumber, checkSpace, checkSpecial } from '../../../hooks/useStringCheck'
import { ErrorMessageOpen, SuccessMessageOpen } from '../../../hooks/useToast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import fetcher from '../../../hooks/fetcher'
import { useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'
import loginModalState from '../../../stores/useLoginModalState'
import logo from '../../../assets/images/nyamo.png'

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
        ErrorMessageOpen('???????????? ????????? ?????????')
        return
      }

      if (!checkEnglishNumber(login_id.trim())) {
        ErrorMessageOpen('???????????? ??????+????????? ????????? ?????????')
        return
      }

      if (mode === 'create' && nickname.trim().length === 0) {
        ErrorMessageOpen('???????????? ????????? ?????????')
        return
      }

      if (mode === 'create' && checkSpace(nickname)) {
        ErrorMessageOpen('???????????? ????????? ????????? ?????????')
        return
      }

      if (mode === 'create' && checkSpecial(nickname)) {
        ErrorMessageOpen('??????????????? ??????????????? ????????? ?????????')
        return
      }

      if (password.length < 6) {
        ErrorMessageOpen('6?????? ????????? ??????????????? ????????? ?????????')
        return
      }

      if (mode === 'create' && passwordCheck !== password) {
        ErrorMessageOpen('??????????????? ?????? ????????????')
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
        if (e.response.data.detail) {
          ErrorMessageOpen(e.response.data.detail.message)
        } else {
          ErrorMessageOpen('????????? ?????? ????????????.')
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
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {!userLoading && (
            <div className="button_box">
              {userData && userData.result === 'success' && !userError ? (
                <Link to="/menu">
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </Link>
              ) : (
                <Button onClick={onClickModalOpen}>?????????</Button>
              )}
            </div>
          )}
        </HeaderTag>
      </HeaderBox>
      <ModalContainer isActive={useLoginModal} closeEvent={onClickModalClose} maxWidth="400px">
        <Card title="?????????">
          <LoginFormBox>
            <form onSubmit={onSubmitLogin}>
              <Input value={login_id} onChange={onChangeLoginId} placeholder="?????????" />
              {mode === 'create' && (
                <Input value={nickname} onChange={onChangeNickname} type="text" placeholder="?????????" />
              )}
              <Input value={password} onChange={onChangePassword} type="password" placeholder="????????????" />
              {mode === 'create' && (
                <Input
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  type="password"
                  placeholder="???????????? ??????"
                />
              )}
              <div className="mode_box">
                <span>{mode === 'login' ? '?????? ????????? ????????????????' : '?????? ?????????????'}</span>
                <button type="button" onClick={onClickModeChange}>
                  {mode === 'login' ? '???????????? ??????' : '????????? ??????'}
                </button>
              </div>
              <div className="button_box">
                <Button type="submit">{mode === 'login' ? '?????????' : '????????????'}</Button>
              </div>
            </form>
          </LoginFormBox>
        </Card>
      </ModalContainer>
    </>
  )
}

export default Header
