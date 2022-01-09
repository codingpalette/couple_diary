import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const CardBox = styled.div`
  h1 {
    font-size: 1.25rem;
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid ${colors.Gray_300};
    box-sizing: border-box;
  }

  .card_body {
    padding: 1rem;
    box-sizing: border-box;
  }
`
