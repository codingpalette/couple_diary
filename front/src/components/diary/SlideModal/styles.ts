import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const SlideContainer = styled.div`
  padding: 1rem;
  box-sizing: border-box;

  .title {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .swiper-container {
    position: relative;
    background-color: #000;
  }

  .slide_box {
    position: relative;
    &:before {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 100%;
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .navigation {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    color: #fff;
    cursor: pointer;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }

  .text_content {
    margin: 2rem 0;
    font-size: 14px;
    color: ${colors.Gray_700};
    font-weight: 600;
  }
`
