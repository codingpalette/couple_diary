import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { SlideContainer, SlideModalBox } from './styles'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export type SlideModalProps = {
  /** 모달 온, 오프 여부 **/
  isActive: boolean | undefined
  /** 모달 닫기 **/
  onClickModalClose: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
  /** 모달 데이타 **/
  modalData: any
}

const SlideModal = ({ isActive, onClickModalClose, modalData }: SlideModalProps) => {
  if (!isActive) return null

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      <SlideModalBox>
        <div className="content">
          {modalData && (
            <SlideContainer>
              <div className="header_box">
                <button type="button" className="close_btn" onClick={onClickModalClose}>
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <div className="title_box">
                  <h4 className="title">{modalData.diaryTitle}</h4>
                </div>
                <span className="date">{modalData.date}</span>
              </div>
              <div className="slide_container">
                <Slider {...settings}>
                  {modalData.images.map((v: any) => (
                    <div key={v.id}>
                      <div className="slide_box">
                        <img src={v.url} alt="img" />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="text_content">
                <p>{modalData.contentText}</p>
              </div>
            </SlideContainer>
          )}
        </div>
      </SlideModalBox>
    </>
  )
}

export default SlideModal
