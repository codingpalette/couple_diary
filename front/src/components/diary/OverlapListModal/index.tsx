import React from 'react'
import ModalContainer from '../../../containers/ModalContainer'
import { OverlapContent } from './styles'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../common/Button'
import Card from '../../common/Card'

export type OverlapListModalProps = {
  /** 모달 온, 오프 여부 **/
  isActive: boolean
  /** 모달 닫기 **/
  onClickModalClose: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
  /** 모달 데이타 **/
  modalData: any
  /** 리스트 클릭 이벤트 **/
  onClickOverlapList: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const OverlapListModal = ({ isActive, onClickModalClose, modalData, onClickOverlapList }: OverlapListModalProps) => {
  return (
    <>
      <ModalContainer isActive={isActive} closeEvent={onClickModalClose} maxWidth="500px">
        <Card title="이벤트 선택">
          <OverlapContent>
            <div>
              {modalData.map((v: any, i: number) => (
                <div key={i} className="list">
                  <button className="list_content" onClick={() => onClickOverlapList(v)}>
                    <span className="date">{v.date}</span>
                    <span className="img_box">
                      <img src={v.images[0].url} alt="" />
                    </span>
                    <p>{v.diaryTitle}</p>
                    <span className="icon">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <div className="btn_box">
              <Button onClick={onClickModalClose} width="100%">
                닫기
              </Button>
            </div>
          </OverlapContent>
        </Card>
      </ModalContainer>
    </>
  )
}

export default OverlapListModal
