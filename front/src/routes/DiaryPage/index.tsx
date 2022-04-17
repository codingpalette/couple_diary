import React, { useEffect, useState } from 'react'
import MapContainer from '../../containers/MapContainer'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'
import { ErrorMessageOpen } from '../../hooks/useToast'
import { useRecoilState } from 'recoil'
import diaryState from '../../stores/useDiaryState'
import OverlapListModal from '../../components/diary/OverlapListModal'
import SlideModal from '../../components/diary/SlideModal'

const DiaryPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  // 다이어리 값
  const [useDiary, setUseDiary] = useRecoilState(diaryState)
  // 오버랩 모달 내용 값
  const [overlapData, setOverLapData] = useState<any>([])
  // 오버랩 모달 상태값
  const [overlapListModalActive, setOverlapListModalActive] = useState(false)
  // 모달에 들어갈 데이터값
  const [modalData, setModalData] = useState<any>(null)
  // 마커 클릭시 나오는 슬라이드 모달 온,오프 상태값
  const [slideModalActive, setSlideModalActive] = useState(false)

  // 데이터 가져오기
  const { data: diaryData, error: diaryError } = useSWR(
    params ? `/api/diary?nickname=${params.nickname}&location=${params.location}` : null,
    fetcher,
  )

  useEffect(() => {
    if (diaryError) {
      navigate('/')
    }
  }, [diaryError])

  useEffect(() => {
    if (diaryData === null) {
      ErrorMessageOpen('저장된 다이어리가 없습니다.')
      navigate('/')
    } else if (diaryData) {
      const data = {
        title: diaryData.title,
        location: diaryData.location,
        description: diaryData.description,
        mapList: diaryData.content,
      }
      setUseDiary(data)
    }
  }, [diaryData])

  // 오버랩 모달 오픈 이벤트
  const onClickOverlapListModalOpen = () => {
    setOverlapListModalActive(true)
  }
  // 오버랩 모달 닫기 이벤트
  const onClickOverlapListModalClose = () => {
    setOverlapListModalActive(false)
  }
  // 오버랩 모달 리스트 클릭 이벤트
  const onClickOverlapList = (v: any) => {
    setOverlapListModalActive(false)
    setModalData(v)
    setSlideModalActive(true)
  }

  // 슬라이드 모달 닫기 함수
  const onClickSlideModalClose = () => {
    setSlideModalActive(false)
  }

  // 마커 클릭 했을 떄 이벤트
  const onClickMarker = (v: any) => {
    const mapList = useDiary.mapList.filter(f => f.position.lng === v.lng && f.position.lat === v.lat)
    // console.log(mapList)
    if (mapList.length > 1) {
      setOverLapData(mapList)
      onClickOverlapListModalOpen()
    } else {
      setModalData(mapList[0])
      setSlideModalActive(true)
    }
  }

  return (
    <>
      <MapContainer>
        <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: '100%', height: '100%' }} level={12}>
          {useDiary.mapList.map((v: any, i: any) => (
            <MapMarker key={i} position={v.position} onClick={() => onClickMarker(v.position)} />
          ))}
        </Map>
      </MapContainer>

      <SlideModal isActive={slideModalActive} onClickModalClose={onClickSlideModalClose} modalData={modalData} />

      <OverlapListModal
        isActive={overlapListModalActive}
        onClickModalClose={onClickOverlapListModalClose}
        modalData={overlapData}
        onClickOverlapList={onClickOverlapList}
      />
    </>
  )
}

export default DiaryPage
