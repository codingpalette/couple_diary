import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const ImageContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  background-color: ${colors.Black};
  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
