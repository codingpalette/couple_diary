import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const HeaderBox = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  z-index: 100;
`

export const HeaderTag = styled.header`
  max-width: 1000px;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;

  .button_box a {
    color: ${colors.Gray_400};
  }

  .button_box a:hover {
    color: ${colors.Purple_400};
  }
`

export const LoginFormBox = styled.div`
  input {
    margin-bottom: 0.75rem;
  }
  .mode_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    span,
    button {
      font-size: 0.75rem;
      color: ${colors.Gray_400};
    }
  }
  .button_box {
    display: flex;
    justify-content: flex-end;
  }
`
