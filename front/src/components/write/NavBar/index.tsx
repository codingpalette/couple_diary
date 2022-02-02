import React from 'react'
import { NabBarBox, NabBtn } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export type NavBarProps = {
  /** 클릭했을 때 호출할 함수 */
  createModalOpen?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const NavBar = ({ createModalOpen }: NavBarProps) => {
  const navigate = useNavigate()

  return (
    <>
      <NabBarBox>
        <NabBtn onClick={createModalOpen}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </NabBtn>
        <NabBtn onClick={() => navigate('/menu')}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </NabBtn>
      </NabBarBox>
    </>
  )
}

export default NavBar
