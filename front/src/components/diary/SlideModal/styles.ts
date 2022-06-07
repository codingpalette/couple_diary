import styled from 'styled-components'
import { colors } from '../../../assets/css/GlobalStyles'

export const SlideModalBox = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  align-items: center;
  justify-content: center;
  background-color: #000;
  overflow: auto;

  .content {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
  }
`

export const SlideContainer = styled.div`
  //padding: 1rem;
  box-sizing: border-box;

  .header_box {
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title_box {
      .title {
        color: #fff;
        font-size: 1.5rem;
        text-align: left;
        letter-spacing: -0.004em;
        word-break: keep-all;
        //margin-bottom: 1rem;
      }
    }
    .date {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #fff;
    }
    .close_btn {
      margin-left: auto;
      color: #fff;
    }
  }

  .slide_container {
    max-width: 1000px;
    width: 100%;
    position: relative;
    padding: 0 46px;
    box-sizing: border-box;
    margin: 1rem auto 0;

    @media screen and (max-width: 500px) {
      //padding: 0;
    }
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
    color: #fff;
    cursor: pointer;
    padding: 10px;
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.Gray_400};
    z-index: 30;
    svg {
      color: #000;
    }
  }

  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }

  .content_modal_btn_box {
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
    box-sizing: border-box;
    button {
      display: block;
      width: 100%;
      height: 44px;
      border: 1px solid #fff;
      border-radius: 22px;
      color: #fff;
    }
  }

  .text_content {
    max-width: 500px;
    margin: 1rem auto;
    padding: 1rem;

    p {
      padding: 1rem;
      font-size: 14px;
      border: 1px solid #fff;
      border-radius: 10px;
      color: #fff;
      white-space: pre-wrap;
    }
    //font-weight: 600;
  }
`
