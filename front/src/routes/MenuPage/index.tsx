import React, { useEffect, useLayoutEffect } from 'react'
import SubHeader from '../../components/common/SubHeader'
import MenuList from '../../components/common/MenuList'
import MainContainer from '../../containers/MainContainer'

import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MenuPage = () => {
  const { user, isLoading, isError, mutate } = useUser()
  const navigate = useNavigate()

  const onClickLogOut = async (e: any) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/user/logout')
      if (res.data.result === 'success') {
        await mutate()
        navigate('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!user && !isLoading && isError) {
      navigate('/')
    }
  }, [user, isLoading, isError])

  if (isLoading)
    return (
      <>
        <div>Loading.....</div>
      </>
    )

  return (
    <>
      <SubHeader />
      <MainContainer>
        <MenuList href="/write" icon="📬">
          다이어리 만들기
        </MenuList>
        <MenuList href="/" icon="📚">
          다이어리 리스트
        </MenuList>
        <MenuList href="/" icon="💾">
          저장 리스트
        </MenuList>
        <MenuList href="/" icon="👋" onClick={onClickLogOut}>
          로그아웃
        </MenuList>
      </MainContainer>
    </>
  )
}

export default MenuPage
