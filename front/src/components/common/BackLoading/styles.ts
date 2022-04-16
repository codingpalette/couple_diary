import styled from 'styled-components'

export const BackLoadingContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1300;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`
