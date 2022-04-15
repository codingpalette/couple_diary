import React, { useEffect, useState } from 'react'
import { BackLink, HeaderBox, HeaderTag, MenuTitle } from './styles'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const SubHeader = () => {
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('/')

  useEffect(() => {
    const pathName = location.pathname
    switch (pathName) {
      case '/menu':
        setTitle('메뉴')
        setLink('/')
        break
      case '/template':
        setTitle('템플릿')
        setLink('/menu')
        break
      case '/write':
        setTitle('초대장 만들기')
        setLink('/menu')
        break
      case '/list':
        setTitle('초대장 리스트')
        setLink('/menu')
        break
      case '/saves':
        setTitle('저장 리스트')
        setLink('/menu')
        break
      default:
        setTitle('')
        setLink('/')
    }
  }, [])

  return (
    <>
      <HeaderBox>
        <HeaderTag>
          <BackLink to={link}>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </BackLink>
          <MenuTitle>{title}</MenuTitle>
        </HeaderTag>
      </HeaderBox>
    </>
  )
}

export default SubHeader
