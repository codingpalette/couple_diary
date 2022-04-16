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

  .address_group {
    button {
      margin-top: 0.5rem;
    }
  }

  .upload_group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .input-datepicker {
    display: block;
    width: 100%;
    //margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1;
    padding: 0.3rem 0.5rem;
    box-sizing: border-box;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid rgb(209, 213, 219);
    outline: none;
    border-radius: 0.25rem;
    overflow: hidden;
    &:focus {
      border: 1px solid ${colors.Purple_400};
    }
  }

  .react-datepicker__navigation-icon {
    top: 4px;
  }
`

export const CardButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`
