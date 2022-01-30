import styled, { css } from 'styled-components'
import transitions from '../../assets/css/transitions'
import { colors } from '../../assets/css/GlobalStyles'

export const Container = styled.div<{ isActive: boolean | undefined; maxWidth: string }>`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  .modal_back {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
  }
  .content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};
    max-height: 100%;
    overflow: auto;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border-radius: 10px;
    background-color: ${colors.White};
    //border-radius: 0.5rem;
    ${props =>
      props.isActive
        ? css`
            animation: ${transitions.popInFromBottom} 0.2s forwards ease-in-out;
          `
        : css`
            animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
          `}
  }
`
