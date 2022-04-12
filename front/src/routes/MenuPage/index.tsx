import React, { useEffect, useLayoutEffect } from 'react'
import SubHeader from '../../components/common/SubHeader'
import MenuList from '../../components/common/MenuList'
import MainContainer from '../../containers/MainContainer'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'

const MenuPage = () => {
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  const navigate = useNavigate()

  const onClickLogOut = async (e: any) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/user/logout')
      if (res.data.result === 'success') {
        await userMutate()
        navigate('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (userError) {
      navigate('/')
    }
  }, [navigate, userError])

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
