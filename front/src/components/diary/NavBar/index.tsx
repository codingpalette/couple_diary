import React, { useEffect } from 'react'
import { NabBarBox, NabBtn } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPlusSquare, faList, faSave } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'

export type NavBarProps = {
  /** 클릭했을 때 호출할 함수 (리스트 생성 모달 오픈) */
  createModalOpen?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  /** 클릭했을 때 호출할 함수 (다이어리 저장 모달 오픈) */
  onClickSaveModalOpen?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  /** 클릭했을 때 리스트 모달 호출 함수 **/
  onClickListModalOpen?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const NavBar = ({ createModalOpen, onClickSaveModalOpen, onClickListModalOpen }: NavBarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <NabBarBox>
        {location.pathname === '/write' && (
          <>
            <NabBtn onClick={createModalOpen}>
              <FontAwesomeIcon icon={faPlusSquare} size="lg" />
            </NabBtn>
            <NabBtn onClick={onClickListModalOpen}>
              <FontAwesomeIcon icon={faList} size="lg" />
            </NabBtn>
            <NabBtn onClick={onClickSaveModalOpen}>
              <FontAwesomeIcon icon={faSave} size="lg" />
            </NabBtn>
          </>
        )}
        <NabBtn onClick={() => navigate(`${location.pathname === '/write' ? '/menu' : '/'}`)}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </NabBtn>
      </NabBarBox>
    </>
  )
}

export default NavBar
