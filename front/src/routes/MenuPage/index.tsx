import React, { useEffect, useLayoutEffect } from 'react'
import SubHeader from '../../components/common/SubHeader'
import MenuList from '../../components/common/MenuList'
import MainContainer from '../../containers/MainContainer'

import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'

const MenuPage = () => {
  const { user, isLoading, isError } = useUser()
  const navigate = useNavigate()

  useLayoutEffect(() => {
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
        <MenuList href="/" icon="💾">
          로그아웃
        </MenuList>
      </MainContainer>
    </>
  )
}

export default MenuPage
