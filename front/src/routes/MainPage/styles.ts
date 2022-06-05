import styled from 'styled-components'
import { colors } from '../../assets/css/GlobalStyles'

export const ContentBox = styled.div`
  padding-top: 60px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`
export const Section1 = styled.div`
  background-color: #f9fafb;
  padding: 200px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  p {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    color: ${colors.Title};
    word-break: keep-all;
    white-space: pre-wrap;

    @media screen and (max-width: 680px) {
      font-size: 22px;
    }
  }
`

export const Section2 = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  //box-sizing: border-box;
  position: relative;
  padding: 200px 0;

  .section2_content {
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .title_box {
    position: relative;
    z-index: 20;
    h1 {
      font-size: 50px;
      font-weight: 700;
      line-height: 1.4;
      color: ${colors.Main};
    }
  }
  .image_box {
    width: 100%;
    max-width: 600px;
    //height: 936px;
    position: absolute;
    top: 100px;
    //right: -104px;
    right: 0;
    z-index: 10;
    overflow: hidden;

    .iphone {
      position: relative;
      width: 100%;
      height: 100%;
      right: -104px;
      z-index: 10;
    }

    .image_item {
      position: absolute;
      top: 50%;
      right: 22px;
      width: 57%;
      height: 78%;
      border-radius: 20px;
      overflow: hidden;
      background-color: #ccc;
      transform: translateY(-50%);
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .button_box {
    margin-top: 20px;
  }

  @media screen and (max-width: 680px) {
    .title_box {
      h1 {
        font-size: 28px;
      }
    }
    .image_box {
      position: relative;
      top: 0;

      .iphone {
        right: 0;
      }

      .image_item {
        right: 21%;
      }
    }
  }
`
