import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CardButtonGroup, CardInputGroup, ControllerBox, SelectContainerBox } from './styles'
import axios from 'axios'
import useInput from '../../hooks/useInput'
import useBoolean from '../../hooks/useBoolean'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import NavBar from '../../components/write/NavBar'
import Button from '../../components/common/Button'
import ImageBox from '../../components/write/ImageBox'
import MapContainer from '../../containers/MapContainer'
import UploadBox from '../../components/write/UploadBox'
import Textarea from '../../components/common/Textarea'
import ModalContainer from '../../containers/ModalContainer'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import DaumPostcode from 'react-daum-postcode'
import 'react-datepicker/dist/react-datepicker.css'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import SlideModal from '../../components/diary/SlideModal'
import { ErrorMessageOpen } from '../../hooks/useToast'
import useUser from '../../hooks/useUser'

const WritePage = () => {
  const { user, isLoading, isError } = useUser()

  // 다이어리 리스트
  const [mapList, setMapList] = useState<any>([])
  // 달력 상태값
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  // 모달창 주소검색 인풋 상태값
  const [mapInputAddress, onChangeMapInputAddress, onResetMapInputAddress, onSetMapInputAddress] = useInput('')
  // 카카오 주소검색 온,오프 상태값
  const [addressSearchOpen, setAddressSearchOpen] = useState(false)
  // 주소 검색 후 좌표 상태값
  const [mapObjData, setMapObjData] = useState<any>({
    coords: {},
  })
  // 다이어리 제목 상태값
  const [diaryTitle, onChangeDiaryTitle, onResetDiaryTitle] = useInput('')
  // 이미지 리스트 값
  const [images, setImages] = useState<any>([])
  // 내용 상태 값
  const [contentText, onChangeContentText, onResetContentText] = useInput('')
  // 마커 생성을 위한 폼 모달 온,오프 상태값
  const [createModalActive, setCreateModalActive] = useState(false)
  // 마커 클릭시 나오는 슬라이드 모달 온,오프 상태값
  const [slideModalActive, setSlideModalActive] = useState(false)
  // 슬라이드 모달 닫기 함수
  const onClickSlideModalClose = () => {
    setSlideModalActive(false)
  }
  // 마커 생성 폼 모달 오픈 함수
  const onClickCreateModalOpen = () => {
    onResetDiaryTitle()
    onResetContentText()
    onResetMapInputAddress()
    setMapObjData({ coords: {} })
    setImages([])
    setCreateModalActive(true)
  }
  // 마커 생성 폼 모달 닫기 함수
  const onClickCreateModalClose = () => {
    setAddressSearchOpen(false)
    setCreateModalActive(false)
  }
  // 주소검색 버튼 클릭시 카카오 주소검색 오픈 함수
  const onClickSearch = () => {
    setAddressSearchOpen(true)
  }
  // 주소 검색 완료후 이벤트
  const onCompletePost = (data: any) => {
    setAddressSearchOpen(false)
    let fullAddr = data.address
    let extraAddr = ''
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : ''

      const geocoder = new window.kakao.maps.services.Geocoder()
      console.log(fullAddr)

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(fullAddr, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)
          // console.log(coords)
          onSetMapInputAddress(fullAddr)
          setMapObjData({
            ...mapObjData,
            coords,
          })
        }
      })
    }
  }
  // 이미지 업로드 작업
  const onFileChange = useCallback(
    async e => {
      const files = e.target.files
      const formData = new FormData()
      formData.append('file', files[0])
      try {
        const res = await axios.post('/api/image/upload', formData)
        // console.log(res)
        if (res.data.result === 'success') {
          setImages([...images, res.data.data])
        }
      } catch (e) {
        console.log(e)
      }
    },
    [images],
  )
  // 이미지 삭제 모달 온,오프 상태값
  const [imageRemoveModalActive, imageRemoveModalActiveToggle] = useBoolean(false)
  // 삭제할 이미지 아이디 값
  const [removeImageId, setRemoveImageId] = useState<string>('')
  // 이미지 삭제 모달 오픈 함수
  const imageRemoveModalOpen = (id: string) => {
    setRemoveImageId(id)
    imageRemoveModalActiveToggle()
  }
  // 이미지 삭제 이벤트
  const onClickImageRemoveEvent = async () => {
    setImages(images.filter((v: any) => v.id !== removeImageId))
    imageRemoveModalActiveToggle()
  }
  // 마커 생성 이벤트
  const onClickMapSave = () => {
    if (mapObjData.fullAddr === '') {
      ErrorMessageOpen('주소를 입력해 주세요.')
      return
    }
    if (diaryTitle.trim().length === 0) {
      ErrorMessageOpen('타이틀을 입력해 주세요.')
      return
    }
    if (images.length === 0) {
      ErrorMessageOpen('한 장 이상의 이미지를 등록해 주세요.')
      return
    }
    if (contentText.trim().length === 0) {
      ErrorMessageOpen('내용을 입력해 주세요.')
      return
    }

    const data = {
      diaryTitle,
      images,
      contentText,
      fullAddr: mapInputAddress,
      position: { lng: mapObjData.coords.La, lat: mapObjData.coords.Ma },
    }
    console.log('data', data)
    // setMapList([...mapList, { content: '', position: { lng: 126.987024769656, lat: 37.5705611277251 } }])
    setMapList([...mapList, data])
    // setAddressSearchOpen(false)
    onClickCreateModalClose()
  }

  // 모달에 들어갈 데이터값
  const [modalData, setModalData] = useState<any>(null)
  // 저장 확인 모달 상태값
  const [saveModalActive, saveModalActiveToggle] = useBoolean(false)

  // 저장 확인 모달 오픈 이벤트
  const onClickSaveModalOpen = () => {
    saveModalActiveToggle()
  }

  // 다이어리 저장
  const onClickDiarySave = async () => {
    try {
      const res = await axios.post('/api/diary', {
        user_id: user.data.id,
        list: mapList,
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  // 마커 클릭 했을 떄 이벤트
  const onClickMarker = (v: any) => {
    setModalData(v)
    setSlideModalActive(true)
  }

  return (
    <>
      <MapContainer>
        {/*<ControllerBox>*/}
        {/*  <div>*/}
        {/*    <Button onClick={onClickModalOpen}>리스트 추가</Button>*/}
        {/*  </div>*/}
        {/*</ControllerBox>*/}
        <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: '100%', height: '100%' }} level={12}>
          {mapList.map((v: any, i: any) => (
            <MapMarker key={i} position={v.position} onClick={() => onClickMarker(v)} />
          ))}
        </Map>

        {/*<div style={{ width: '100%', height: '100%' }} id="map" ref={mapRef} />*/}
      </MapContainer>

      <ModalContainer isActive={saveModalActive} closeEvent={saveModalActiveToggle} maxWidth="500px">
        <Card title="다이어리 저장">
          <SelectContainerBox>
            <p>다이어리를 저장 하시겠습니까?</p>
            <span className="line" />
            <div className="button_box">
              <Button theme="tertiary" onClick={saveModalActiveToggle}>
                취소
              </Button>
              <Button onClick={onClickDiarySave}>저장</Button>
            </div>
          </SelectContainerBox>
        </Card>
      </ModalContainer>

      <ModalContainer isActive={createModalActive} closeEvent={onClickCreateModalClose} maxWidth="500px">
        <Card title="리스트 추가">
          <CardInputGroup>
            <div className="title">날짜 선택</div>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              locale={ko} // 언어설정 기본값은 영어
              dateFormat="yyyy-MM-dd" // 날짜 형식 설정
              className="input-datepicker" // 클래스 명 지정 css주기 위해
              closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
              // placeholderText="체크인 날짜 선택" // placeholder
            />
          </CardInputGroup>

          <CardInputGroup>
            <div className="title">주소 검색</div>
            <div className="address_group">
              <Input type="text" value={mapInputAddress} onChange={onChangeMapInputAddress} disabled={true} />
              <Button width="100%" onClick={onClickSearch}>
                검색
              </Button>
            </div>
          </CardInputGroup>
          <CardInputGroup>
            {addressSearchOpen && <DaumPostcode autoClose={true} onComplete={onCompletePost} />}
          </CardInputGroup>
          <CardInputGroup>
            <div className="title">다이어리 제목</div>
            <Input type="text" value={diaryTitle} onChange={onChangeDiaryTitle} maxLength={30} />
          </CardInputGroup>
          <CardInputGroup>
            <div className="title">사진 추가</div>
            <div className="upload_group">
              {images.length > 0 &&
                images.map((v: any) => <ImageBox key={v.id} img={v.url} onClick={() => imageRemoveModalOpen(v.id)} />)}
              <UploadBox onFileChange={onFileChange} />
            </div>
          </CardInputGroup>
          <CardInputGroup>
            <div className="title">내용 입력</div>
            <div className="input_group">
              <Textarea
                value={contentText}
                onChange={onChangeContentText}
                maxLength={100}
                placeholder="100글자 이내로 작성해 주세요."
              />
            </div>
          </CardInputGroup>
          <CardButtonGroup>
            <Button onClick={onClickCreateModalClose} theme="tertiary">
              닫기
            </Button>
            <Button onClick={onClickMapSave}>저장</Button>
          </CardButtonGroup>
        </Card>
      </ModalContainer>

      <ModalContainer isActive={imageRemoveModalActive} closeEvent={imageRemoveModalActiveToggle} maxWidth="500px">
        <Card title="이미지 삭제">
          <SelectContainerBox>
            <p>이미지를 삭제 하시겠습니까?</p>
            <span className="line" />
            <div className="button_box">
              <Button theme="tertiary" onClick={imageRemoveModalActiveToggle}>
                취소
              </Button>
              <Button theme="secondary" onClick={onClickImageRemoveEvent}>
                삭제
              </Button>
            </div>
          </SelectContainerBox>
        </Card>
      </ModalContainer>

      <SlideModal isActive={slideModalActive} onClickModalClose={onClickSlideModalClose} modalData={modalData} />

      <NavBar createModalOpen={onClickCreateModalOpen} onClickSaveModalOpen={onClickSaveModalOpen} />
    </>
  )
}

export default WritePage
