import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const OverlapContent = styled.div`
  box-sizing: border-box;

  .list {
    position: relative;
    padding-top: 22px;
    padding-bottom: 17px;

    .list_content {
      width: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .date {
        width: 100%;
        font-size: 0.75rem;
        text-align: right;
        color: ${colors.Gray_400};
      }
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

  .btn_box {
    margin-top: 1.5rem;
  }
`
