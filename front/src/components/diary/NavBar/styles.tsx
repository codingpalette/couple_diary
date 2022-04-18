import styled from 'styled-components'

export const NabBarBox = styled.div`
  position: fixed;
  left: 50%;
  bottom: 5%;
  max-width: 90%;
  width: auto;
  transform: translateX(-50%);
  padding: 5px 10px;
  box-sizing: border-box;
  z-index: 30;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  gap: 10px;
`
export const NabBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
`
