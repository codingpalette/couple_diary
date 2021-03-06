import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'
import { Link } from 'react-router-dom'

export const HeaderBox = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${colors.Gray_200};
  box-sizing: border-box;
  z-index: 100;
`

export const HeaderTag = styled.header`
  max-width: 1000px;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
`

export const BackLink = styled(Link)`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.Black};
  cursor: pointer;
  width: 12px;
`

export const MenuTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`
