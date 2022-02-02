import React from 'react'
import { NabBarBox, NabBtn } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()

  return (
    <>
      <NabBarBox>
        <NabBtn onClick={() => navigate('/menu')}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </NabBtn>
      </NabBarBox>
    </>
  )
}

export default NavBar
