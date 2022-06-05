import React from 'react'
import { Content } from './styles'
import { Link } from 'react-router-dom'
import Button from '../Button'
import dayjs from 'dayjs'

export type CardListProps = {
  // 제목
  title: string
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
  mode: 'list' | 'save'
  // 삭제 이벤트
  deleteEvent?: any
}

const CardList = ({ title, location, nickname, id, description, created_at, mode, deleteEvent }: CardListProps) => {
  return (
    <>
      <Content>
        <h3>
          <Link to={mode === 'list' ? `/@${nickname}/${location}` : `/write?save_id=${id}`}>{title}</Link>
        </h3>
        <div>
          <span className="date">{dayjs(created_at).format('YYYY-MM-DD')}</span>
        </div>
        <p>
          <Link to={mode === 'list' ? `/@${nickname}/${location}` : `/write?save_id=${id}`}>{description}</Link>
        </p>

        <div className="btn_box">
          <Link to={mode === 'list' ? `/write?id=${id}` : `/write?save_id=${id}`}>
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
