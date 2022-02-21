import React, { useRef } from 'react'
import ModalContainer from '../../../containers/ModalContainer'
import Button from '../../common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { SlideContainer } from './styles'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
SwiperCore.use([Navigation, Pagination, A11y])

export type SlideModalProps = {
  /** 모달 온, 오프 여부 **/
  isActive: boolean
  /** 모달 닫기 **/
  onClickModalClose: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
  /** 모달 데이타 **/
  modalData: any
}

const SlideModal = ({ isActive, onClickModalClose, modalData }: SlideModalProps) => {
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  const images = [
    {
      original: 'https://placeimg.com/1080/1920/any',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
    },
  ]

  return (
    <>
      <ModalContainer isActive={isActive} closeEvent={onClickModalClose} maxWidth="500px">
        {modalData && (
          <SlideContainer>
            <h4 className="title">{modalData.diaryTitle}</h4>
            <Swiper
              slidesPerView={1}
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
              onSlideChange={() => console.log('slide change')}
            >
              <div className="navigation prev" ref={prevRef}>
                <FontAwesomeIcon icon={faAngleLeft} size="3x" />
              </div>
              <div className="navigation next" ref={nextRef}>
                <FontAwesomeIcon icon={faAngleRight} size="3x" />
              </div>
              {modalData.images.map((v: any) => (
                <SwiperSlide key={v.id}>
                  <div className="slide_box">
                    <img src={v.url} alt="img" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div>sdfsdd</div>
            <Button onClick={onClickModalClose}>닫기</Button>
          </SlideContainer>
        )}
      </ModalContainer>
    </>
  )
}

export default SlideModal
