import styled from 'styled-components'
import { colors } from '../../assets/css/GlobalStyles'

export const ControllerBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 250px;
  height: 100%;
  background-color: ${colors.White};
`

export const CardInputGroup = styled.div`
  margin-bottom: 1rem;

  .title {
    font-size: 0.8rem;
    color: ${colors.Gray_500};
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .input_group {
    display: flex;
    align-items: center;

    button {
      min-width: 70px;
      margin-left: 1rem;
    }
  }

  .upload_group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`
