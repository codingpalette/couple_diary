import React from 'react'
import ModalContainer from '../../../containers/ModalContainer'
import Card from '../../common/Card'
import { ListContent } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../../common/Button'

export type CardListModalProps = {
  /** 모달 온, 오프 여부 **/
  isActive: boolean
  /** 모달 닫기 **/
  onClickModalClose: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
  /** 모달 데이타 **/
  modalData: any
  /** 리스트 수정 클릭 이벤트 **/
  onClickCardListModify: (e?: React.MouseEvent<HTMLButtonElement>, i?: number | undefined) => void
}

const CardListModal = ({ isActive, onClickModalClose, modalData, onClickCardListModify }: CardListModalProps) => {
  return (
    <>
      <ModalContainer isActive={isActive} closeEvent={onClickModalClose} maxWidth="500px">
        <Card title="카드 리스트">
          <ListContent>
            <div>
              {modalData.mapList.map((v: any, i: number) => (
                <div key={i} className="list">
                  <div className="list_content">
                    <span className="date">{v.date}</span>
                    <span className="img_box">
                      <img src={v.images[0].url} alt="" />
                    </span>
                    <p>{v.diaryTitle}</p>
                    <div className="btn_box">
                      <Button onClick={() => onClickCardListModify(v, i)}>수정</Button>
                      <Button theme="secondary">삭제</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ListContent>
        </Card>
      </ModalContainer>
    </>
  )
}

export default CardListModal
