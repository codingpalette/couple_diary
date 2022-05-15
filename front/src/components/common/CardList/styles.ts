import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const Content = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  line-height: 1.5;
  box-sizing: border-box;

  &:nth-child(n + 1) {
    border-top: 1px solid #ccc;
  }

  a {
    display: block;
    word-break: break-all;
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 0px;
    margin-bottom: 0.5rem;
    color: ${colors.Title};
  }

  .date {
    font-size: 0.75rem;
    color: ${colors.Gray_400};
  }

  p {
    font-size: 1rem;
    margin: 1rem 0;
    color: ${colors.Slate_700};
  }

  .btn_box {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`
