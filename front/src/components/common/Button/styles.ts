import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const ButtonTag = styled.button<{ theme: string; width: string; loading: boolean | undefined }>`
  width: ${props => props.width};
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 500;
  color: ${colors.White};
  background: ${props =>
    props.theme === 'primary' ? colors.Purple_400 : props.theme === 'secondary' ? colors.Red_400 : colors.Gray_400};

  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    opacity: 0.8;
  }

  svg {
    margin-left: 5px;
  }

  pointer-events: ${props => (props.loading ? 'none' : 'auto')};
`
