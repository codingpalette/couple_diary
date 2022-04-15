import React, { useEffect, useRef, useState } from 'react'
import ModalContainer from '../../../containers/ModalContainer'
import Button from '../../common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons'

import { SlideContainer, SlideModalBox } from './styles'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
SwiperCore.use([Navigation, Pagination, A11y])

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

  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

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
                <Swiper
                  slidesPerView={1}
                  loop={true}
                  // navigation={{
                  //   // Both prevEl & nextEl are null at render so this does not work
                  //   prevEl: prevRef.current ? prevRef.current : undefined,
                  //   nextEl: nextRef.current ? nextRef.current : undefined,
                  // }}
                  onSwiper={swiper => {
                    // Delay execution for the refs to be defined
                    setTimeout(() => {
                      // Override prevEl & nextEl now that refs are defined
                      // eslint-disable-next-line no-param-reassign,@typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      swiper.params.navigation.prevEl = prevRef.current
                      // eslint-disable-next-line no-param-reassign,@typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      swiper.params.navigation.nextEl = nextRef.current

                      // Re-init navigation
                      swiper.navigation.destroy()
                      swiper.navigation.init()
                      swiper.navigation.update()
                    })
                  }}
                  // onSlideChange={() => console.log('slide change')}
                >
                  {modalData.images.map((v: any) => (
                    <SwiperSlide key={v.id}>
                      <div className="slide_box">
                        <img src={v.url} alt="img" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="navigation prev" ref={prevRef}>
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                </div>
                <div className="navigation next" ref={nextRef}>
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </div>
              </div>
              {/*<div className="content_modal_btn_box">*/}
              {/*  <button>내용보기</button>*/}
              {/*</div>*/}

              <div className="text_content">
                <p>{modalData.contentText}</p>
              </div>
              {/*<Button onClick={onClickModalClose} width="100%">*/}
              {/*  닫기*/}
              {/*</Button>*/}
            </SlideContainer>
          )}
        </div>
      </SlideModalBox>
    </>
  )
}

export default SlideModal
