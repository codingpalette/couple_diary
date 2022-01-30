import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const UploadContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  background-color: ${colors.Gray_300};
  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${colors.White};
  }
`
