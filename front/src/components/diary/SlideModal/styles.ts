import styled from 'styled-components'

export const SlideContainer = styled.div`
  padding: 1rem;
  box-sizing: border-box;

  .title {
    font-size: 1.5rem;
    text-align: center;
  }

  .swiper-container {
    position: relative;
  }

  .slide_box {
    position: relative;
    &:before {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 100%;
      background-color: #000;
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
`
