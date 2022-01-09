import React from 'react'
import SubHeader from '../../components/common/SubHeader'
import MenuList from '../../components/common/MenuList'
import MainContainer from '../../containers/MainContainer'

const MenuPage = () => {
  return (
    <>
      <SubHeader />
      <MainContainer>
        <MenuList href="/" icon="📬">
          다이어리 만들기
        </MenuList>
        <MenuList href="/" icon="📚">
          다이어리 리스트
        </MenuList>
        <MenuList href="/" icon="💾">
          저장 리스트
        </MenuList>
      </MainContainer>
    </>
  )
}

export default MenuPage
