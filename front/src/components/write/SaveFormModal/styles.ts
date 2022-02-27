import styled, { css } from 'styled-components'
import transitions from '../../../assets/css/transitions'
import { colors } from '../../../assets/css/GlobalStyles'

export const Container = styled.div<{ isActive: boolean | undefined }>`
  position: fixed;
  left: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  background-color: ${colors.Gray_200};
  padding: 1rem;
  box-sizing: border-box;

  ${props =>
    props.isActive
      ? css`
          animation: ${transitions.slideRightOpen} 0.2s forwards ease-in-out;
        `
      : css`
          animation: ${transitions.slideRightClose} 0.2s forwards ease-in-out;
        `}

  .content_box {
    max-width: 700px;
    width: 100%;
    box-sizing: border-box;
  }

  .input_group {
    margin: 0.5rem 0;
    h4 {
      margin-bottom: 0.2rem;
      font-size: 1.3rem;
    }
    span {
      font-size: 0.75rem;
      display: block;
      margin-bottom: 0.5rem;
      color: ${colors.Slate_400};
    }
  }

  .footer {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
`
