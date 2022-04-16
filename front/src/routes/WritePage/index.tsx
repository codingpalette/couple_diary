import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CardButtonGroup, CardInputGroup, ControllerBox } from './styles'
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
import 'react-datepicker/dist/react-datepicker.css'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import SlideModal from '../../components/diary/SlideModal'
import { ErrorMessageOpen, SuccessMessageOpen } from '../../hooks/useToast'
import BackLoading from '../../components/common/BackLoading'
import SaveFormModal from '../../components/write/SaveFormModal'
import { useRecoilState } from 'recoil'
import diaryState from '../../stores/useDiaryState'
import { checkSpecial } from '../../hooks/useStringCheck'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'
import OverlapListModal from '../../components/diary/OverlapListModal'
import dayjs from 'dayjs'
import PostCodeProps from '../../components/common/PostCode'
import CardListModal from '../../components/write/CardListModal'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SelectContainerBox from '../../components/common/SelectContainerBox'

const WritePage = () => {
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // 다이어리 값
  const [useDiary, setUseDiary] = useRecoilState(diaryState)
  // 시작하고 바로 다이어리값을 초기화를 해준다.
  useEffect(() => {
    const data = {
      title: '',
      location: '',
      description: '',
      mapList: [],
    }
    setUseDiary(data)
  }, [])

  const [formMode, setFormMode] = useState<'create' | 'diary_save' | 'diary'>('create')

  // 임시저장 데이터 가져오기
  const { data: diarySaveData, error: diarySaveError } = useSWR(
    searchParams.get('save_id') ? `/api/diary_save?save_id=${searchParams.get('save_id')}` : null,
    fetcher,
  )

  useEffect(() => {
    if (diarySaveError) {
      navigate('/menu')
    }
  }, [diarySaveError])

  useEffect(() => {
    if (diarySaveData === null) {
      ErrorMessageOpen('저장된 다이어리가 없습니다.')
      navigate('/menu')
    } else if (diarySaveData) {
      if (diarySaveData.user_id === userData.data.id) {
        const data = {
          title: diarySaveData.title,
          location: diarySaveData.location,
          description: diarySaveData.description,
          mapList: diarySaveData.content,
        }
        setUseDiary(data)
        setFormMode('diary_save')
      } else {
        navigate('/menu')
      }
    }
  }, [diarySaveData, userData])

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
  const [diaryTitle, onChangeDiaryTitle, onResetDiaryTitle, onSetDiaryTitle] = useInput('')
  // 이미지 리스트 값
  const [images, setImages] = useState<any>([])
  // 내용 상태 값
  const [contentText, onChangeContentText, onResetContentText, onSetContentText] = useInput('')
  // 마커 생성을 위함 폼 신규생성인지 수정인지에 대한 상태값
  const [markerMode, setMarkerMode] = useState('create')
  // 마커 생성을 위한 폼 모달 온,오프 상태값
  const [createModalActive, setCreateModalActive] = useState(false)
  // 마커 클릭시 나오는 슬라이드 모달 온,오프 상태값
  const [slideModalActive, setSlideModalActive] = useState(false)
  // back 로딩 상태값
  const [backLoadingActive, setBackLoadingActive] = useState(false)
  // save form 모달 상태값
  const [saveFromModalActive, setSaveFormModalActive] = useState(false)
  // 오버랩 모달 내용 값
  const [overlapData, setOverLapData] = useState<any>([])
  // 오버랩 모달 상태값
  const [overlapListModalActive, setOverlapListModalActive] = useState(false)
  // 선택된 리스트 인덱스값
  const [selectList, setSelectList] = useState<number | null>(null)
  // 카드 리스트 모달 상태값
  const [cardListModalActive, setCardListModalActive] = useState(false)
  // 카드 삭제 모달 온, 오프 상태값
  const [cardDeleteModalActive, setCardDeleteModalActive] = useState(false)
  // 삭제될 카드 인덱스값
  const [selectDeleteCard, setSelectDeleteCard] = useState<number | null>(null)
  // 슬라이드 모달 닫기 함수
  const onClickSlideModalClose = () => {
    setSlideModalActive(false)
  }
  // 마커 생성 폼 모달 오픈 함수
  const onClickCreateModalOpen = () => {
    setMarkerMode('create')
    setStartDate(new Date())
    onResetDiaryTitle()
    onResetContentText()
    onResetMapInputAddress()
    setMapObjData({ coords: {} })
    setImages([])
    setSelectList(null)
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
  // 주소검색 닫기 이벤트
  const addressSearchClose = () => {
    setAddressSearchOpen(false)
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
      setBackLoadingActive(true)
      try {
        const res = await axios.post('/api/image/upload', formData)
        // console.log(res)
        if (res.data.result === 'success') {
          setImages([...images, res.data.data])
        }
      } catch (e) {
        console.log(e)
      } finally {
        setBackLoadingActive(false)
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
  // 마커 생성, 수정 이벤트
  const onClickMapSave = () => {
    if (markerMode === 'create') {
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
        date: dayjs(startDate).format('YYYY-MM-DD'),
        images,
        contentText,
        fullAddr: mapInputAddress,
        position: { lng: mapObjData.coords.La, lat: mapObjData.coords.Ma },
      }
      console.log('data', data)
      // setMapList([...mapList, { content: '', position: { lng: 126.987024769656, lat: 37.5705611277251 } }])
      // setMapList([...mapList, data])
      setUseDiary({ ...useDiary, mapList: [...useDiary.mapList, data] })
      // setAddressSearchOpen(false)
    } else {
      console.log(selectList)
      const data = {
        diaryTitle,
        date: dayjs(startDate).format('YYYY-MM-DD'),
        images,
        contentText,
        fullAddr: mapInputAddress,
        position: { lng: mapObjData.coords.La, lat: mapObjData.coords.Ma },
      }
      setUseDiary({
        ...useDiary,
        mapList: useDiary.mapList.map((v, i) => {
          if (i === selectList) {
            return { ...data }
          } else {
            return { ...v }
          }
        }),
      })
    }
    onClickCreateModalClose()
  }

  // 모달에 들어갈 데이터값
  const [modalData, setModalData] = useState<any>(null)
  // 저장 확인 모달 상태값
  const [saveModalActive, saveModalActiveToggle] = useBoolean(false)

  // 저장 확인 모달 오픈 이벤트
  const onClickSaveModalOpen = () => {
    setSaveFormModalActive(true)
    // saveModalActiveToggle()
  }
  // 저장 확인 모달 닫기 이벤트
  const onClickSaveModalClose = () => {
    setSaveFormModalActive(false)
  }
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
  // 카드 리스트 모달 오픈 함수
  const onClickCardListModalOpen = () => {
    setCardListModalActive(true)
  }
  // 카드 리스트 모달 오프 함수
  const onClickCardListModalClose = () => {
    setCardListModalActive(false)
  }
  // 카드 리스트 모달 수정 버튼 클릭 이벤트
  const onClickCardListModify = (v: any, i: any) => {
    setMarkerMode('modify')
    setStartDate(new Date(v.date))
    onSetDiaryTitle(v.diaryTitle)
    onSetContentText(v.contentText)
    onSetMapInputAddress(v.fullAddr)
    setMapObjData({ coords: { La: v.position.lng, Ma: v.position.lat } })
    setImages(v.images)
    setSelectList(i)

    setCardListModalActive(false)
    setCreateModalActive(true)
  }
  // 카드 리스트 삭제 모달 오픈 함수
  const onClickCardDeleteModalOpen = (i: any) => {
    setSelectDeleteCard(i)
    setCardDeleteModalActive(true)
  }
  // 카드 리스트 삭제 모달 오프 함수
  const onClickCardDeleteModalClose = () => {
    setSelectDeleteCard(null)
    setCardDeleteModalActive(false)
  }
  // 카드 삭제 이벤트
  const onClickCardDelete = () => {
    setUseDiary({
      ...useDiary,
      mapList: useDiary.mapList.filter((v, i) => i !== selectDeleteCard),
    })
    onClickCardDeleteModalClose()
  }

  // 다이어리 저장
  const onClickDiarySave = async () => {
    try {
      const res = await axios.post('/api/diary', {
        user_id: userData.data.id,
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  // 마커 클릭 했을 떄 이벤트
  const onClickMarker = (v: any) => {
    const mapList = useDiary.mapList.filter(f => f.position.lng === v.lng && f.position.lat === v.lat)
    console.log(mapList)
    if (mapList.length > 1) {
      setOverLapData(mapList)
      setOverlapListModalActive(true)
    } else {
      setModalData(mapList[0])
      setSlideModalActive(true)
    }
  }

  // 다이어리 임시저장
  const temporarySave = async () => {
    if (useDiary.title.trim().length === 0) {
      ErrorMessageOpen('다이어리 제목을 입력해 주세요.')
      return
    }

    try {
      let res = null
      if (formMode === 'create') {
        res = await axios.post('/api/diary_save', {
          user_id: userData.data.id,
          location: useDiary.location,
          title: useDiary.title,
          description: useDiary.description,
          mapList: useDiary.mapList,
        })
      } else if (formMode === 'diary_save') {
        res = await axios.put('/api/diary_save', {
          id: diarySaveData.id,
          user_id: userData.data.id,
          location: useDiary.location,
          title: useDiary.title,
          description: useDiary.description,
          mapList: useDiary.mapList,
        })
      }
      if (res?.status === 200) {
        SuccessMessageOpen('저장에 성공 했습니다.')
        navigate(`/write?save_id=${res.data.id}`)
        onClickSaveModalClose()
      }
    } catch (e: any) {
      ErrorMessageOpen('저장에 실패 했습니다.')
    }
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
          {useDiary.mapList.map((v: any, i: any) => (
            <MapMarker key={i} position={v.position} onClick={() => onClickMarker(v.position)} />
          ))}
        </Map>

        {/*<div style={{ width: '100%', height: '100%' }} id="map" ref={mapRef} />*/}
      </MapContainer>

      <ModalContainer isActive={saveModalActive} closeEvent={saveModalActiveToggle} maxWidth="500px">
        <Card title="다이어리 저장">
          <SelectContainerBox
            title="다이어리를 저장 하시겠습니까?"
            okEvent={onClickDiarySave}
            okText="저장"
            okTextType="primary"
            closeEvent={saveModalActiveToggle}
            closeText="취소"
          />
        </Card>
      </ModalContainer>

      <ModalContainer isActive={createModalActive} closeEvent={onClickCreateModalClose} maxWidth="500px">
        <Card title="카드 추가">
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
            <PostCodeProps
              addressSearchOpen={addressSearchOpen}
              onCompletePost={onCompletePost}
              addressSearchClose={addressSearchClose}
            />
          </CardInputGroup>
          <CardInputGroup>
            <div className="title">카드 제목</div>
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
          <SelectContainerBox
            title="이미지를 삭제 하시겠습니까?"
            okEvent={onClickImageRemoveEvent}
            okText="삭제"
            okTextType="secondary"
            closeEvent={imageRemoveModalActiveToggle}
            closeText="취소"
          />
        </Card>
      </ModalContainer>

      <SlideModal isActive={slideModalActive} onClickModalClose={onClickSlideModalClose} modalData={modalData} />

      <OverlapListModal
        isActive={overlapListModalActive}
        onClickModalClose={onClickOverlapListModalClose}
        modalData={overlapData}
        onClickOverlapList={onClickOverlapList}
      />

      <CardListModal
        isActive={cardListModalActive}
        onClickModalClose={onClickCardListModalClose}
        modalData={useDiary}
        onClickCardListModify={onClickCardListModify}
        onClickCardDeleteModalOpen={onClickCardDeleteModalOpen}
      />

      <ModalContainer isActive={cardDeleteModalActive} closeEvent={onClickCardDeleteModalClose} maxWidth="500px">
        <Card title="카드 삭제">
          <SelectContainerBox
            title="카드를 삭제 하시겠습니까?"
            okEvent={onClickCardDelete}
            okText="삭제"
            okTextType="secondary"
            closeEvent={onClickCardDeleteModalClose}
            closeText="취소"
          />
        </Card>
      </ModalContainer>

      <NavBar
        createModalOpen={onClickCreateModalOpen}
        onClickSaveModalOpen={onClickSaveModalOpen}
        onClickListModalOpen={onClickCardListModalOpen}
      />

      <BackLoading isActive={backLoadingActive} />

      <SaveFormModal
        isActive={saveFromModalActive}
        closeEvent={onClickSaveModalClose}
        temporarySave={temporarySave}
        formMode={formMode}
      />
    </>
  )
}

export default WritePage
