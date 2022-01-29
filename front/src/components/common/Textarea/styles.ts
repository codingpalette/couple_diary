import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const TextareaTag = styled.textarea<{ height: string }>`
  //resize: none;
  width: 100%;
  height: ${props => props.height};
  outline: none;
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
  line-height: 1.6;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.25rem;
  &:focus {
    border: 1px solid ${colors.Purple_400};
  }
`
