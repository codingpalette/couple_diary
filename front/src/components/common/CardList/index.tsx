import React from 'react'
import { Content } from './styles'
import { Link } from 'react-router-dom'
import Button from '../Button'

const CardList = () => {
  return (
    <>
      <Content>
        <h3>
          <Link to="/">제목</Link>
        </h3>
        <p>
          <Link to="/">내용 입력......</Link>
        </p>
        <div>
          <span className="date">2021년 12월 11일</span>
        </div>
        <div className="btn_box">
          <Link to={`/`}>
            <Button>보기</Button>
          </Link>
          <Link to={`/`}>
            <Button theme="tertiary">수정</Button>
          </Link>
          <Button theme="secondary">삭제</Button>
        </div>
      </Content>
    </>
  )
}

export default CardList
