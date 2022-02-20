import React, { useCallback, useEffect, useRef, useState } from 'react'
import MapContainer from '../../containers/MapContainer'
import { CardButtonGroup, CardInputGroup, ControllerBox, SelectContainerBox } from './styles'
import Button from '../../components/common/Button'
import DaumPostcode from 'react-daum-postcode'
import ModalContainer from '../../containers/ModalContainer'
import Card from '../../components/common/Card'
import useInput from '../../hooks/useInput'
import Input from '../../components/common/Input'
import UploadBox from '../../components/write/UploadBox'
import axios from 'axios'
import ImageBox from '../../components/write/ImageBox'
import useBoolean from '../../hooks/useBoolean'
import Textarea from '../../components/common/Textarea'
import NavBar from '../../components/write/NavBar'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import SlideModal from '../../components/diary/SlideModal'

const options = {
  center: new window.kakao.maps.LatLng(37.5705611277251, 126.987024769656),
  level: 12,
}

const WritePage = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [mapList, setMapList] = useState<any>([])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMapList([...mapList, { content: '', position: { lng: 126.987024769656, lat: 37.5705611277251 } }])
  //   }, 1000)
  // }, [])

  const [mapInputAddress, onChangeMapInputAddress, onResetMapInputAddress, onSetMapInputAddress] = useInput('')
  const [addressSearchOpen, setAddressSearchOpen] = useState(false)
  const [diaryTitle, onChangeDiaryTitle] = useInput('')
  const [contentText, onChangeContentText] = useInput('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const [slideModalActive, setSlideModalActive] = useState(false)

  const onClickSlideModalClose = () => {
    console.log('aaaa')
    setSlideModalActive(false)
  }

  const [mapData, setMapData] = useState<any>([])
  const [mapObjData, setMapObjData] = useState<any>({
    fullAddr: '',
    coords: {},
  })

  useEffect(() => {
    console.log(mapObjData)
  }, [mapObjData])

  // let map: any
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])

  const [test, setTest] = useState(false)

  const [isActive, setIsActive] = useState(false)

  const onClickModalOpen = () => {
    setIsActive(true)
  }

  const onClickModalClose = () => {
    setIsActive(false)
  }

  const onClickSearch = () => {
    setAddressSearchOpen(true)
  }

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
      setTest(false)
      const geocoder = new window.kakao.maps.services.Geocoder()
      console.log(fullAddr)

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(fullAddr, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)
          console.log(coords)
          onSetMapInputAddress(fullAddr)
          setMapObjData({
            ...mapObjData,
            fullAddr,
            coords,
          })
        }
      })
    }
  }

  const [images, setImages] = useState<any>([])

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

  const [imageRemoveModalActive, imageRemoveModalActiveToggle] = useBoolean(false)
  const [removeImageId, setRemoveImageId] = useState<string>('')

  const imageRemoveModalOpen = (id: string) => {
    setRemoveImageId(id)
    imageRemoveModalActiveToggle()
  }

  const onClickImageRemoveEvent = async () => {
    setImages(images.filter((v: any) => v.id !== removeImageId))
    imageRemoveModalActiveToggle()
  }

  const closeOverlay = () => {
    console.log('11111')
  }

  const onClickMapSave = () => {
    console.log('2222222')
    const content = `
      <div class="overlay_wrap">
        <div class="info">
            <div class="title">카카오 스페이스닷원</div>
        </div>
      </div>
    `
    const position = { lng: mapObjData.coords.La, lat: mapObjData.coords.Ma }
    const data = {
      content: content,
      position: position,
    }
    console.log('data', data)
    // setMapList([...mapList, { content: '', position: { lng: 126.987024769656, lat: 37.5705611277251 } }])
    setMapList([...mapList, data])
    // setAddressSearchOpen(false)

    onClickModalClose()
  }

  useEffect(() => {
    console.log(mapList)
  }, [mapList])

  // 저장 확인 모달 상태값
  const [saveModalActive, saveModalActiveToggle] = useBoolean(false)

  // 저장 확인 모달 오픈 이벤트
  const onClickSaveModalOpen = () => {
    saveModalActiveToggle()
    console.log('123123')
  }

  // 마커 클릭 했을 떄 이벤트
  const onClickMarker = () => {
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
        <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: '100%', height: '100%' }} level={13}>
          {mapList.map((v: any, i: any) => (
            <MapMarker key={i} position={v.position} onClick={onClickMarker} />
          ))}
        </Map>

        {/*<div style={{ width: '100%', height: '100%' }} id="map" ref={mapRef} />*/}
      </MapContainer>
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

      <ModalContainer isActive={saveModalActive} closeEvent={saveModalActiveToggle} maxWidth="500px">
        <Card title="다이어리 저장">
          <SelectContainerBox>
            <p>다이어리를 저장 하시겠습니까?</p>
            <span className="line" />
            <div className="button_box">
              <Button theme="tertiary" onClick={saveModalActiveToggle}>
                취소
              </Button>
              <Button>저장</Button>
            </div>
          </SelectContainerBox>
        </Card>
      </ModalContainer>

      <ModalContainer isActive={isActive} closeEvent={onClickModalClose} maxWidth="500px">
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
            <Input type="text" value={diaryTitle} onChange={onChangeDiaryTitle} />
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
            <Button onClick={onClickModalClose} theme="tertiary">
              닫기
            </Button>
            <Button onClick={onClickMapSave}>저장</Button>
          </CardButtonGroup>
        </Card>
      </ModalContainer>

      <SlideModal isActive={slideModalActive} onClickModalClose={onClickSlideModalClose} />

      <NavBar createModalOpen={onClickModalOpen} onClickSaveModalOpen={onClickSaveModalOpen} />
    </>
  )
}

export default WritePage
