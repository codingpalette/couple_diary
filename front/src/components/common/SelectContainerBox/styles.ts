import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const Content = styled.div`
  width: 100%;

  .line {
    margin: 1rem -1rem;
    display: block;
    border-bottom: 1px solid ${colors.Gray_300};
  }

  .button_box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`
