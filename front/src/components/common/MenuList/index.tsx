import React from 'react'
import { ListLink, MenuListContainer } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export type MenuListProps = {
  children?: React.ReactNode
  href: string
  // logOut: boolean
  // img: boolean
  // imgSrc?: string
  icon?: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void
}

const MenuList = ({ children, href, icon, onClick }: MenuListProps) => {
  return (
    <>
      <MenuListContainer>
        <div className="list">
          <ListLink to={href} onClick={onClick}>
            <span className="icon">{icon}</span>
            <p>{children}</p>
            <span className="icon2">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </ListLink>
        </div>
      </MenuListContainer>
    </>
  )
}

export default MenuList
