import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../../assets/css/GlobalStyles'

export const MenuListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 1rem;

  .list {
    position: relative;
    padding-top: 22px;
    padding-bottom: 17px;
    cursor: pointer;
  }

  .list .icon {
    margin-right: 1rem;
  }
  .list .icon2 {
    margin-left: auto;
    width: 12px;
  }
`

export const ListLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.Black};
`
