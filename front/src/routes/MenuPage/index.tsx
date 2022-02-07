import React, { useEffect } from 'react'
import SubHeader from '../../components/common/SubHeader'
import MenuList from '../../components/common/MenuList'
import MainContainer from '../../containers/MainContainer'

import useUser from '../../hooks/useUser'

const MenuPage = () => {
  const { user, isLoading, isError } = useUser()

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
