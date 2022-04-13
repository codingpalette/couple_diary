import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const OverlapContent = styled.div`
  padding: 1rem;
  box-sizing: border-box;

  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .list {
    position: relative;
    padding-top: 22px;
    padding-bottom: 17px;

    .list_content {
      width: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      .img_box {
        display: block;
        width: 45px;
        height: 45px;
        overflow: hidden;
        border-radius: 50%;
        background-color: #000;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      p {
        margin-left: 0.5rem;
      }
      .icon {
        margin-left: auto;
        width: 12px;
      }
    }
  }
`
