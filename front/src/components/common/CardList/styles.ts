import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const Content = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  line-height: 1.5;
  box-sizing: border-box;

  h3 {
    font-size: 1.25rem;
    margin-top: 0px;
    margin-bottom: 1.5rem;
    color: ${colors.Title};
  }

  p {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: ${colors.Slate_700};
  }

  .date {
    font-size: 0.75rem;
    color: ${colors.Gray_400};
  }
`
