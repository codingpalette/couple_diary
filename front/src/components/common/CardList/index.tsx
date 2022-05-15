import React from 'react'
import { Content } from './styles'
import { Link } from 'react-router-dom'
import Button from '../Button'
import dayjs from 'dayjs'

export type CardListProps = {
  // 주소
  location: string
  // 닉네임
  nickname: string
  // 아이디
  id: number
  // 내용
  description: string
  // 생성 날짜
  created_at: string
  // 모드
  mode: string
  // 삭제 이벤트
  deleteEvent?: any
}

const CardList = ({ location, nickname, id, description, created_at, mode, deleteEvent }: CardListProps) => {
  return (
    <>
      <Content>
        <h3>
          <Link to={`/@${nickname}/${location}`}>제목</Link>
        </h3>
        <div>
          <span className="date">{dayjs(created_at).format('YYYY-MM-DD')}</span>
        </div>
        <p>
          <Link to={`/@${nickname}/${location}`}>{description}</Link>
        </p>

        <div className="btn_box">
          <Link to={`${mode === 'list' ? `/write?id=${id}` : `/write?save_id=${id}`} `}>
            <Button>수정</Button>
          </Link>
          <Button theme="secondary" onClick={() => deleteEvent(id)}>
            삭제
          </Button>
        </div>
      </Content>
    </>
  )
}

CardList.defaultProps = {
  mode: 'list',
}

export default CardList
