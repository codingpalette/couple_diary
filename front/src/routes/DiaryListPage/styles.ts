import styled from 'styled-components'

export const ContentBox = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 1rem;

  .list {
    position: relative;
    padding-top: 22px;
    padding-bottom: 17px;

    .item_box {
      width: 100%;
      display: flex;
      align-items: center;
      color: #000;

      .btn_box {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
`
